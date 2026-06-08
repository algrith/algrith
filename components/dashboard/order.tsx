'use client';

import { Divider, Image, Spin } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BillingCycleBadgeWrapper, MainViewWrapper, SummaryWrapper, AddonWrapper, InfoWrapper, PlanWrapper } from './styled';
import { StatusBadgeWrapper } from '@/components/shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FontRole, FontsList } from '../shared/input/fonts';
import { Swatches } from '../shared/input/color/palette';
import { formatCurrency, getDateFormat } from '@/utils';
import useLazyLoader from '@/hooks/lazy-loader';
import Link from '../shared/button/link';
import { fetchOrder } from './slices';

const Order = () => {
  const { order: { data: order, loading } } = useAppSelector((state) => state.dashboard);
  const [activeFontRole, setActiveFontRole] = useState<FontRole>('heading');
  const dispatch = useAppDispatch();
  const { orderId } = useParams();
  useLazyLoader();

  const handleActiveFontRole = (role: FontRole) => {
    setActiveFontRole(role);
  };

  useEffect(() => {
    if (!orderId || typeof orderId !== 'string') return;
    dispatch(fetchOrder(orderId));
  }, []);

  return (
    <MainViewWrapper className={loading ? 'loading' : ''}>
      {loading ? (
        <Spin />
      ) : !order ? (
        'Oops! Could not retrieve order.'
      ) : (
        <>
          <header>
            <h1>Order Details</h1>
            <span>Ref: {order.reference}</span>
          </header>

          <div className="content">
            <div className="metadata">
              <p>Date: {getDateFormat(order?.paid_at).full}</p>

              <p>
                Status: <StatusBadgeWrapper className={order.status}>
                  {order.status}
                </StatusBadgeWrapper>
              </p>
            </div>

            <div className="columns">
              <div className="column">
                <PlanWrapper>
                  <h3>Plan</h3>
                  
                  <div className="top">
                    <div className="left">
                      <h4 className="name">
                        {order.plan.name}
                        
                        {order.plan.most_popular && (
                          <span className="most-popular">
                            Most Popular
                          </span>
                        )}
                      </h4>

                      <p>{order.plan.description}</p>
                    </div>

                    <div className="right">
                      <p className="price">{formatCurrency(order.plan.price)}</p>
                      <p className="billing-cycle">
                        {order.plan.one_time_payment ? 'One-time payment' : 'Recurring'}
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <h3>What's included</h3>

                  <ul className="features">
                    {order.plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </PlanWrapper>
                
                <AddonWrapper>
                  <h3>Add-ons</h3>

                  {order.addons.map((addon) => (
                    <div className="addon" key={addon.id}>
                      <div className="item">
                        <div className="icon">
                          {addon.id === "branding" ? "🎨" : addon.id === "maintenance" ? '🔧' : '✍️'}
                        </div>

                        <div className="text">
                          <p>{addon.text}</p>
                          
                          <BillingCycleBadgeWrapper className={addon.billing_cycle}>
                            {addon.billing_cycle}
                          </BillingCycleBadgeWrapper>
                        </div>
                      </div>

                      <p className="price">{formatCurrency(addon.price)}</p>
                    </div>
                  ))}
                </AddonWrapper>

                {order.requirements && (
                  <InfoWrapper>
                    <h3>Requirements</h3>

                    <div className="info">
                      <div className="item">
                        <p className="label">Business/Website Name</p>
                        <p className="value">{order.requirements.business_name}</p>
                      </div>

                      <div className="item">
                        <p className="label">Domain Name</p>
                        <p className="value">
                          {order.requirements.domain_name || 'N/A'}
                        </p>
                      </div>
                      
                      <div className="item">
                        <p className="label">Theme Colors</p>
                        <p className="value">
                          {order.requirements.colors ? (
                            <Swatches palette={order.requirements.colors} />
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>

                      <div className="item">
                        <p className="label">Logo</p>
                        <p className="value">
                          {order.requirements.logo ? (
                            <Image
                              src={`/images/placeholder-white.webp?original=${order.requirements.logo?.url}`}
                              height={100}
                              width={120}
                            />
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>

                      <div className="item">
                        <p className="label">Social Media Handles</p>
                        <p className="value col">
                          {Boolean(order.requirements.social_media.length) ? (
                            order.requirements.social_media.map((link) => (
                              <span key={link}>{link}</span>
                            ))
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>
                      
                      <div className="item">
                        <p className="label">Fonts</p>
                        <p className="value">
                          {order.requirements.fonts ? (
                            <FontsList
                              selectedFont={order.requirements.fonts[activeFontRole]}
                              fonts={Object.values(order.requirements.fonts)}
                              onActiveRole={handleActiveFontRole}
                              {...order.requirements.fonts}
                              activeRole={activeFontRole}
                            />
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>

                      <div className="item">
                        <p className="label">Images</p>
                        <p className="value">
                          {Boolean(order.requirements.images.length) ? (
                            order.requirements.images.map((image) => (
                              <Image
                                src={`/images/placeholder-white.webp?original=${image.url}`}
                                key={image.url}
                                height={100}
                                width={120}
                              />
                            ))
                          ) : (
                            'N/A'
                          )}
                        </p>
                      </div>
                    </div>
                  </InfoWrapper>
                )}
              </div>
              
              <div className="column">
                <InfoWrapper>
                  <h3>Customer</h3>

                  <div className="info">
                    <div className="item">
                      <p className="label">Name</p>
                      <p className="value">{order.customer.name}</p>
                    </div>
                    <div className="item">
                      <p className="label">Email</p>
                      <p className="value">{order.customer.email}</p>
                    </div>
                    <div className="item">
                      <p className="label">Phone</p>
                      <p className="value">{order.customer.phone}</p>
                    </div>
                  </div>
                </InfoWrapper>
                
                <SummaryWrapper>
                  <h3>Payment Summary</h3>

                  <div className="summary">
                    <p className="item">
                      <span>Plan ({order.plan.name})</span>
                      <span>{formatCurrency(order.plan.price)}</span>
                    </p>

                    <p className="item">
                      <span>Add-ons ({order.addons.length})</span>
                      <span>{formatCurrency(order.addon_total)}</span>
                    </p>

                    <p className="item total">
                      <span>Total</span>
                      <span>{formatCurrency(order.total)}</span>
                    </p>
                    
                    <div className="item">
                      <p className="label">Paid At</p>
                      <p className="value">{getDateFormat(order.paid_at).full}</p>
                    </div>

                    <div className="item">
                      <p className="label">Order ID</p>
                      <p className="value">{order.id}</p>
                    </div>
                  </div>
                </SummaryWrapper>

                {/* <div className="links">
                  <Link href="">
                    Update Status
                  </Link>
                  
                  <Link href="">
                    Download Invoice
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </MainViewWrapper>
  );
};

export default Order;