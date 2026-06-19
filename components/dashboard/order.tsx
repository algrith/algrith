'use client';

import { MessageOutlined } from '@ant-design/icons';
import { Badge, Divider, Image, Spin } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BillingCycleBadgeWrapper, MainViewWrapper, SummaryWrapper, AddonWrapper, InfoWrapper, PlanWrapper } from './styled';
import { fetchOrderConversation, setupOrderChat } from '../shared/chats/slices';
import { setConversation, setShowConversations } from '../shared/chats/reducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FontRole, FontsList } from '../shared/input/fonts';
import { Swatches } from '../shared/input/color/palette';
import { formatCurrency, getDateFormat } from '@/utils';
import { EmptyWrapper } from '../shared/layout/styled';
import Status from '../shared/layout/status';
import Link from '../shared/button/link';
import { fetchOrder } from './slices';
import Button from '../shared/button';

const Order = () => {
  const { profile: { data: authUser }, order: { data: order, loading } } = useAppSelector((state) => state.dashboard);
  const { orderConversation: { data: conversation, unread } } = useAppSelector((state) => state.chat);
  const [activeFontRole, setActiveFontRole] = useState<FontRole>('heading');
  const dispatch = useAppDispatch();
  const { orderId } = useParams();

  const handleActiveFontRole = (role: FontRole) => {
    setActiveFontRole(role);
  };

  const handleOrderChat = () => {
    if (!conversation) dispatch(setupOrderChat(order, authUser));
    else dispatch(setConversation({ data: conversation }));
    dispatch(setShowConversations(true));
  };
  
  const closeChatWidget = () => {
    dispatch(setConversation({ data: undefined }));
    dispatch(setShowConversations(false));
  };

  useEffect(() => {
    if (!orderId || typeof orderId !== 'string') return;
    dispatch(fetchOrderConversation(orderId));
    dispatch(fetchOrder(orderId));
    closeChatWidget();
  }, []);

  return (
    <MainViewWrapper className={loading ? 'loading' : ''}>
      {loading ? (
        <Spin />
      ) : !order ? (
        <EmptyWrapper>
          <h1>404 Not Found</h1>
          <p>Oops! Could not retrieve order.</p>
        </EmptyWrapper>
      ) : (
        <>
          <header>
            <h1>Order Details</h1>
            <span>Ref: {order.reference}</span>
          </header>

          <div className="content">
            <div className="metadata">
              <div className="left">
                <div>Date: {getDateFormat(order?.paid_at).full}</div>

                <div>
                  Status: <Status isEditable={authUser?.role === 'admin'} payload={order} />
                </div>
              </div>

              <div className="right">
                <Badge count={unread} offset={[-15, 0]}>
                  <Button onClick={handleOrderChat} icon={<MessageOutlined />} type="primary" size="small" rounded>
                    Order Chat
                  </Button>
                </Badge>
              </div>
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

                      <div>{order.plan.description}</div>
                    </div>

                    <div className="right">
                      <div className="price">{formatCurrency(order.plan.price)}</div>
                      <div className="billing-cycle">
                        {order.plan.one_time_payment ? 'One-time payment' : 'Recurring'}
                      </div>
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
                          <div>{addon.text}</div>
                          
                          <BillingCycleBadgeWrapper className={addon.billing_cycle}>
                            {addon.billing_cycle}
                          </BillingCycleBadgeWrapper>
                        </div>
                      </div>

                      <div className="price">{formatCurrency(addon.price)}</div>
                    </div>
                  ))}
                </AddonWrapper>

                {order.requirements && (
                  <InfoWrapper>
                    <h3>Requirements</h3>

                    <div className="info">
                      <div className="item">
                        <div className="label">Business/Website Name</div>
                        <div className="value">{order.requirements.business_name}</div>
                      </div>

                      <div className="item">
                        <div className="label">Domain Name</div>
                        <div className="value">
                          {order.requirements.domain_name || 'N/A'}
                        </div>
                      </div>
                      
                      <div className="item">
                        <div className="label">Theme Colors</div>
                        <div className="value">
                          {order.requirements.colors ? (
                            <Swatches palette={order.requirements.colors} />
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </div>

                      <div className="item">
                        <div className="label">Logo</div>
                        <div className="value">
                          {order.requirements.logo?.url ? (
                            <Image src={`/images/placeholder-white.webp?original=${order.requirements.logo?.url}`} />
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </div>

                      <div className="item">
                        <div className="label">Social Media Handles</div>
                        <div className="value col">
                          {Boolean(order.requirements.social_media.length) ? (
                            order.requirements.social_media.map((link) => (
                              <span key={link}>{link}</span>
                            ))
                          ) : (
                            'N/A'
                          )}
                        </div>
                      </div>
                      
                      <div className="item">
                        <div className="label">Fonts</div>
                        <div className="value">
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
                        </div>
                      </div>

                      <div className="item">
                        <div className="label">Images</div>
                        <div className="value">
                          {Boolean(order.requirements.images.length) ? (
                            order.requirements.images.map((image) => (
                              <Image
                                src={`/images/placeholder-white.webp?original=${image.url}`}
                                key={image.url}
                              />
                            ))
                          ) : (
                            'N/A'
                          )}
                        </div>
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
                      <div className="label">Name</div>
                      <div className="value">{order.customer.name}</div>
                    </div>
                    <div className="item">
                      <div className="label">Email</div>
                      <div className="value">{order.customer.email}</div>
                    </div>
                    <div className="item">
                      <div className="label">Phone</div>
                      <div className="value">{order.customer.phone}</div>
                    </div>
                  </div>
                </InfoWrapper>
                
                <SummaryWrapper>
                  <h3>Payment Summary</h3>

                  <div className="summary">
                    <div className="item">
                      <span>Plan ({order.plan.name})</span>
                      <span>{formatCurrency(order.plan.price)}</span>
                    </div>

                    <div className="item">
                      <span>Add-ons ({order.addons.length})</span>
                      <span>{formatCurrency(order.addon_total)}</span>
                    </div>

                    <div className="item total">
                      <span>Total</span>
                      <span>{formatCurrency(order.total)}</span>
                    </div>
                    
                    <div className="item">
                      <div className="label">Paid At</div>
                      <div className="value">{getDateFormat(order.paid_at).full}</div>
                    </div>

                    <div className="item">
                      <div className="label">Order ID</div>
                      <div className="value">{order.id}</div>
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