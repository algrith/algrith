'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { MainViewWrapper, InfoWrapper, SummaryWrapper } from './styled';
import { StatusBadgeWrapper } from '@/components/shared/layout/styled';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteUser, fetchOrders, fetchUser } from './slices';
import { getDateFormat } from '@/utils';
import Button from '../shared/button';

const User = ({ id }: { id: string }) => {
  const dashboard = useAppSelector((state) => state.dashboard);
  const { loading: isFetchingOrders, list: orders } = dashboard.orders;
  const { loading: isFetchingUser, data: user } = dashboard.user;
  const verification = user?.is_verified ? 'verified' : 'unverified';
  const [isDeleting, setDeleting] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const isLoggedInUser = id === session?.user.id;
  const isAdmin = session?.user.role === 'admin';
  const canDeleteUser = isAdmin || isLoggedInUser;

  const handleDeleteAccount = async () => {
    setDeleting(true);
    
    await dispatch(deleteUser(
      id as string,
      isLoggedInUser
    ));

    setDeleting(false);
  };

  useEffect(() => {
    dispatch(fetchOrders(id));
    dispatch(fetchUser(id));
  }, [id]);
  
  return (
    <MainViewWrapper>
      <header>
        <h1>Account Details</h1>
        <span>{user?.role}</span>
      </header>

      <div className="content">
        {user && (
          <div className="metadata">
            <div className="left">
              <p>Joined: {getDateFormat(user.createdAt).full}</p>

              <p>
                Status: <StatusBadgeWrapper className={verification}>
                  {verification}
                </StatusBadgeWrapper>
              </p>
            </div>
          </div>
        )}

        <div className="columns">
          <div className="column">
            <InfoWrapper className={isFetchingUser ? 'loading' : ''}>
              {isFetchingUser ? (
                <Spin />
              ) : !user ? (
                'Oops! Could not retrieve user info!'
              ) : (
                <>
                  <h3>Basic Info</h3>

                  <div className="info">
                    <div className="item">
                      <p className="label">Name</p>
                      <p className="value">{user.name}</p>
                    </div>

                    <div className="item">
                      <p className="label">Email</p>
                      <p className="value">{user.email}</p>
                    </div>
                    
                    <div className="item">
                      <p className="label">Provider</p>
                      <p className="value capitalize">{user.auth_provider}</p>
                    </div>
                  </div>
                </>
              )}
            </InfoWrapper>
          </div>

          <div className="column">
            <SummaryWrapper className={isFetchingOrders ? 'loading' : ''}>
              {isFetchingOrders ? (
                <Spin />
              ) : !user ? (
                'Oops! Could not retrieve order info!'
              ) : (
                <>
                  <h3>Order Summary</h3>
                
                  <div className="summary">
                    <p className="item">
                      <span>Total Orders</span>
                      <span>{orders.length}</span>
                    </p>
                  </div>
                </>
              )}
            </SummaryWrapper>

            <div className="links">
              {canDeleteUser && (
                <Button
                  onClick={handleDeleteAccount}
                  loading={isDeleting}
                  size="small"
                  danger
                >
                  Delete {isLoggedInUser ? 'Account' : 'User'}
                </Button>
              )}
              
              {/* <Link href="">
                Download Invoice
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </MainViewWrapper>
  );
};

export default User;