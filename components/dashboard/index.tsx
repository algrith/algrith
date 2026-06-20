'use client';

import { ApartmentOutlined, AuditOutlined, BookOutlined, CarryOutOutlined, ExperimentOutlined, FireOutlined, HourglassOutlined, ShopOutlined, StopOutlined } from '@ant-design/icons';
import capitalize from 'lodash/capitalize';
import { useEffect } from 'react';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders, fetchOrdersAnalytics } from './slices';
import { Cards, MainViewWrapper } from './styled';
import { OrderStatus, Plans } from '@/types';
import PieChart from '../shared/charts/pie';
import { roundNumber } from '@/utils';
import Revenue from './revenue';

const statusIcons = {
  completed: <CarryOutOutlined />,
  pending: <HourglassOutlined />,
  delivered: <AuditOutlined />,
  cancelled: <StopOutlined />
};

const planIcons = {
  enterprise: <ApartmentOutlined />,
  starter: <ExperimentOutlined />,
  professional: <FireOutlined />,
  business: <ShopOutlined />
};

const Dashboard = () => {
  const { analytics: { data: analytics, loading } } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const orderStatusAnalytics = Object.values(OrderStatus).map((status) => {
    const count = analytics.status[status] ?? 0;

    return {
      percentage: roundNumber((count / analytics.summary.total_orders) * 100),
      title: `${capitalize(status)} orders`,
      description: `All ${status} orders`,
      icon: statusIcons[status],
      count
    };
  });

  const orderPlansAnalytics = Object.values(Plans).map((plan) => {
    const analytic = analytics.plan[plan] ?? { average_revenue: 0, total_revenue: 0, count: 0 };

    return {
      percentage: roundNumber((analytic.count / analytics.summary.total_orders) * 100),
      description: `All ${plan} orders`,
      icon: planIcons[plan],
      title: plan,
      ...analytic
    };
  });

  useEffect(() => {
    dispatch(fetchOrdersAnalytics());
    dispatch(fetchOrders());
  }, []);

  return (
    <MainViewWrapper>
      <div className="content">
        <Cards className={`cols-${orderStatusAnalytics.length}`}>
          {orderStatusAnalytics.map((item) => (
            <div className="item" key={item.title} title={item.description}>
              <div className="metadata">
                <h2>{item.title}</h2>
                <span>
                  {loading ? <Spin size="small" /> : item.count}
                </span>
              </div>

              <div className="icon">
                {item.icon}
              </div>
            </div>
          ))}
        </Cards>
        
        <div className="columns reversed">
          <div className="column">
            <PieChart
              data={orderStatusAnalytics.map(({ percentage, title }) => ({ name: title, value: percentage }))}
              title={<><BookOutlined /> Order Summary by Status</>}
              loading={loading}
              unit="%"
            />
          </div>

          <div className="column">
            <Revenue />
          </div>
        </div>

        {/* <header>
          <h1>Order Summary by Plan</h1>
        </header> */}
        
        <Cards className={`cols-${orderPlansAnalytics.length}`}>
          {orderPlansAnalytics.map((item) => (
            <div className="item" key={item.title}>
              <div className="metadata">
                <h2>{item.title}</h2>
                <span>
                  {loading ? <Spin size="small" /> : item.count}
                </span>
              </div>

              <div className="icon">
                {item.icon}
              </div>
            </div>
          ))}
        </Cards>
      </div>
    </MainViewWrapper>
  );
};



export default Dashboard;