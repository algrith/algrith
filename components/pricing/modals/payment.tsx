'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { ModalProps } from 'antd';

import FlutterWave from '@/components/shared/payments/flutterwave';
import Paystack from '@/components/shared/payments/paystack';
import { Addon, BaseObject, Plan } from '@/types';
import { Input } from '@/components/shared/input';
import Button from '@/components/shared/button';
import { PaymentModalWrapper } from './styled';
import { formatCurrency } from '@/utils';
import useMailer from '@/hooks/mailer';
import Addons from '../addons';

const customerModel = { phone: '', name: '', email: '' };

const PaymentModal = ({ plan, ...rest }: ModalProps & { plan?: Plan; }) => {
  const [view, setView] = useState<'payment' | 'addons'>('addons');
  const [customer, setCustomer] = useState(customerModel);
  const [addons, setAddons] = useState<Array<Addon>>([]);
  const { sendCheckoutMail } = useMailer();
  const [open, setOpen] = useState(false);
  const showAddons = view === 'addons';
  const discount = 0;
  const tax = 0;

  const description = `Payment for ${plan?.name}${addons.length ? ` and ${addons.length} add-ons` : ''}`;
  const title = showAddons ? 'Would you like to select some addons?' : 'Checkout';
  const addonsTotal = addons.reduce((acc, { price }) => acc + price, 0);
  const total = ((plan?.price || 0) + addonsTotal + tax - discount);

  const proceedToPayment = (addons: Array<Addon>) => {
    setView('payment');
    setAddons(addons);
  };

  const handleSuccess = (data: BaseObject) => {
    sendCheckoutMail({
      plan: plan as Plan,
      customer,
      addons,
      order: {
        date: data.created_at ?? new Date().toISOString(),
        reference: data.tx_ref ?? data.reference,
        addon_total: addonsTotal,
        total
      }
    });

    handleReset();
  };

  const handleChange = (e: ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setCustomer((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setCustomer(customerModel);
    setView('addons');
    setOpen(false);
    setAddons([]);
  };

  useEffect(() => {
    setOpen(!!plan);
  }, [plan]);

  return (
    <PaymentModalWrapper {...rest} afterClose={handleReset} width={450} footer={null} title={title} open={open} centered>
      {view === 'addons' ? (
        <Addons proceedToPayment={proceedToPayment} inPaymentModal />
      ) : (
        <form className="checkout" onSubmit={(e) => e.preventDefault()}>
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
              placeholder="E.g: John Doe"
              onChange={handleChange}
              value={customer.name}
              label="Full Name"
              tabIndex={0}
              autoFocus
              id="name"
              required
            />

            <Input
              placeholder="E.g: johndoe@email.com"
              onChange={handleChange}
              value={customer.email}
              label="Email"
              type="email"
              id="email"
              required
            />
            
            <Input
              placeholder="e.g. +88 9209 635"
              onChange={handleChange}
              value={customer.phone}
              label="Phone"
              id="phone"
              type="tel"
            />
          </div>

          <div className="footer">
            <FlutterWave
              onSuccess={handleSuccess}
              description={description}
              htmlType="submit"
              amount={total}
              {...customer}
            />

            {/* <Paystack
              onSuccess={handleSuccess}
              description={description}
              title={plan?.name}
              htmlType="submit"
              amount={total}
              {...customer}
            /> */}
          </div>
        </form>
      )}
    </PaymentModalWrapper>
  );
};

export default PaymentModal;