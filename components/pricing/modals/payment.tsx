'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ModalProps } from 'antd';

import { Addon, BaseObject, OrderRequirements, Plan } from '@/types';
import FlutterWave from '@/components/shared/payments/flutterwave';
import Paystack from '@/components/shared/payments/paystack';
import ColorPalettes from '@/components/shared/input/color';
import FontSelector from '@/components/shared/input/fonts';
import FileUpload from '@/components/shared/input/file';
import { formatCurrency, randomId } from '@/utils';
import { Input } from '@/components/shared/input';
import Button from '@/components/shared/button';
import { useAppDispatch } from '@/store/hooks';
import { PaymentModalWrapper } from './styled';
import useClassName from '@/hooks/class-name';
import { UploadProps } from 'antd/es/upload';
import { createOrder } from '../slices';
import Addons from '../addons';

const requirementsModel: OrderRequirements = {
  business_name: '',
  social_media: [],
  domain_name: '',
  hosting: false,
  logo_path: '',
  logo_url: '',
  images: [],
  colors: [],
  fonts: []
};

const customerModel = {
  phone: '',
  email: '',
  name: ''
};

const PaymentModal = ({ plan, ...rest }: ModalProps & { plan?: Plan; }) => {
  const [view, setView] = useState<'requirements' | 'payment' | 'addons'>('addons');
  const [requirements, setRequirements] = useState(requirementsModel);
  const [customer, setCustomer] = useState(customerModel);
  const [addons, setAddons] = useState<Array<Addon>>([]);
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const discount = 0;
  const tax = 0;

  const description = `Payment for ${plan?.name}${addons.length ? ` and ${addons.length} add-ons` : ''}`;
  const addonsTotal = addons.reduce((acc, { price }) => acc + price, 0);
  const total = ((plan?.price || 0) + addonsTotal + tax - discount);

  const className = useClassName([
    'content',
    view
  ]);

  const title = {
    addons: 'Would you like to select some addons?',
    requirements: 'Provide Helpful Information',
    payment: 'Checkout'
  }[view];

  const handleFiles: UploadProps['onUpload'] = (event) => {
    const { value, id } = event.target;
    console.log(value);
    
    // if (id === 'logo')

    if (!id) return;
    
    // setRequirements((prev) => ({
    //   ...prev,
    //   [id]: value
    // }));
  };

  const handleRequirementsChange = (e: ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    const newValue = id === 'social_media' ? value.replaceAll(' ', '') : value;
    setRequirements((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleCustomerChange = (e: ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setCustomer((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddons = (addons: Array<Addon>) => {
    setAddons(addons);
  };

  const handleSuccess = (data: BaseObject) => {
    dispatch(createOrder({
      paid_at: data.created_at ?? new Date().toISOString(),
      reference: data.tx_ref ?? data.reference,
      addon_total: addonsTotal,
      plan: plan as Plan,
      status: 'pending',
      id: randomId(),
      requirements,
      customer,
      addons,
      total
    }));

    handleReset();
    router.push('/dashboard/orders');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (view === 'requirements') {
      handleRequirements();
    }

    if (view === 'addons') {
      setView('requirements');
    }
  };

  const handleRequirements = () => {
    setView('payment');
  };

  const handleReset = () => {
    setCustomer(customerModel);
    setView('addons');
    setOpen(false);
    setAddons([]);
  };

  const handleBack = () => {
    const newView = {
      payment: 'requirements',
      requirements: 'addons',
      addons: 'addons'
    }[view] as typeof view;

    setView(newView);
  };

  useEffect(() => {
    setOpen(!!plan);

    setCustomer({
      email: session?.user.email || '',
      name: session?.user.name || '',
      phone: ''
    });
  }, [plan]);

  return (
    <PaymentModalWrapper {...rest} afterClose={handleReset} width={480} footer={null} title={title} open={open} centered>
      <form className={className} onSubmit={handleSubmit}>
        {view === 'requirements' && (
          <>
            <div>
              <h2>Brand & Identity</h2>

              <div className="items">
                <div className="items">
                  <Input
                    onChange={handleRequirementsChange}
                    value={requirements.business_name}
                    label="Business/website name"
                    placeholder="E.g. Microsoft"
                    id="business_name"
                    tabIndex={0}
                    autoFocus
                    required
                  />
                
                  <ColorPalettes
                    onChange={handleRequirementsChange}
                    value={requirements.colors}
                    label="Brand/theme color"
                    id="colors"
                  />
                </div>

                <div className="items">
                  <FontSelector
                    onChange={handleRequirementsChange}
                    value={requirements.fonts}
                    placeholder="E.g. Roboto"
                    label="Preferred Fonts"
                    id="fonts"
                  />

                  <FileUpload
                    onUpload={handleFiles}
                    label="Logo"
                    id="logo"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2>Content</h2>

              <div className="items">
                <Input
                  placeholder="E.g. https://facebook.com/mycompany,https://instagram.com/mycompany,https://x.com/mycompany"
                  onChange={handleRequirementsChange}
                  value={requirements.social_media}
                  label="Social Media Handles"
                  id="social_media"
                />
                
                <FileUpload
                  onUpload={handleFiles}
                  label="Images"
                  id="images"
                />
              </div>
            </div>

            <div>
              <h2>Domain & Hosting</h2>

              <div className="items row">
                <Input
                  onChange={handleRequirementsChange}
                  value={requirements.domain_name}
                  placeholder="E.g. domain.com"
                  label="Domain Name"
                  id="domain_name"
                />
              </div>
            </div>
          </>
        )}
      
        {view === 'payment' && (
          <>
            <div className="plan">
              <h2>{plan?.name} Package</h2>
              Billed Once
            </div>

            <div className="items">
              <ul className="breakdown">
                <li>
                  <span>{plan?.name} Package</span>
                  <span>{formatCurrency(plan?.price)}</span>
                </li>
                <li>
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </li>
                <li>
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </li>
              </ul>

              {Boolean(addons.length) && (
                <>
                  <h2 className="addons">Add-ons</h2>

                  <ul className="breakdown">
                    {addons.map((addon) => (
                      <li key={addon.id}>
                        <span>{addon.text}</span>
                        <span>{formatCurrency(addon.price)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <h2 className="total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </h2>

            <div className="coupon-code">
              <Input
                placeholder="Coupon code"
                size="small"
              />

              <Button type="dashed" size="small">
                Apply
              </Button>
            </div>

            <div className="items">
              <h2>Billing Information</h2>

              <Input
                onChange={handleCustomerChange}
                placeholder="E.g: John Doe"
                value={customer.name}
                label="Full Name"
                tabIndex={0}
                autoFocus
                id="name"
                required
              />

              <Input
                placeholder="E.g: johndoe@email.com"
                onChange={handleCustomerChange}
                value={customer.email}
                label="Email"
                type="email"
                id="email"
                required
              />
              
              <Input
                placeholder="e.g. +88 9209 635"
                onChange={handleCustomerChange}
                value={customer.phone}
                label="Phone"
                id="phone"
                type="tel"
              />
            </div>
          </>
        )}
        
        {view === 'addons' && (
          <Addons
            onSelect={handleAddons}
            selected={addons}
            inPaymentModal
          />
        )}

        <div className="footer">
          {view !== 'addons' && (
            <Button onClick={handleBack} type="secondary">
              Back
            </Button>
          )}

          {view !== 'payment' ? (
            <Button
              htmlType="submit"
              type="primary"
            >
              Continue
            </Button>
          ) : (
            <>
              <FlutterWave
                onSuccess={handleSuccess}
                description={description}
                htmlType="submit"
                amount={total}
                block={false}
                {...customer}
              />

              {/* <Paystack
                onSuccess={handleSuccess}
                description={description}
                title={plan?.name}
                htmlType="submit"
                amount={total}
                block={false}
                {...customer}
              /> */}
            </>
          )}
        </div>
      </form>
    </PaymentModalWrapper>
  );
};

export default PaymentModal;