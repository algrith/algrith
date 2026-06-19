'use client';

import { LineChartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import { useAppSelector } from '@/store/hooks';
import { RevenueWrapper } from './styled';
import { formatCurrency } from '@/utils';
import { Plans } from '@/types';

const PLAN_COLORS: Record<string, string> = {
  professional: '#0f6e56',
  enterprise: '#185fa5',
  business: '#533ab7',
  starter: '#993c1d'
};

const getFallbackColor = (index: number) => {
  const fallbacks = ['#185fa5', '#533ab7', '#0f6e56', '#993c1d', '#888780'];
  return fallbacks[index % fallbacks.length];
};

const Revenue = () => {
  const { profile: { data: authUser }, analytics: { data: analytics } } = useAppSelector((state) => state.dashboard);
  const addonPercent = analytics.revenue.total > 0 ? ((analytics.revenue.addon_total / analytics.revenue.total) * 100).toFixed(1) : '0.0';
  const maxRevenue = Math.max(...Object.values(analytics.plan).map((plan) => plan.total_revenue), 1);
  const isAdmin = authUser?.role === 'admin';
  
  return (
    <RevenueWrapper>
      <div className="header">
        <div className="title">
          <LineChartOutlined />
          <h2>{isAdmin ? 'Revenue' : 'Expenses'} overview</h2>
        </div>
        <span className="period">
          All time
        </span>
      </div>

      <div className="metric">
        <div className="tile">
          <p className="label">Total {isAdmin ? 'revenue' : 'expenses'}</p>
          <p className="value">{formatCurrency(analytics.revenue.total)}</p>
          {/* {trend !== undefined && (
            <span className="badge" $positive={trend >= 0}>
              {trend >= 0 ? <RiseOutlined /> : <FallOutlined />}
              {Math.abs(trend)}%
            </span>
          )} */}
        </div>

        <div className="tile">
          <p className="label">Avg order value</p>
          <p className="value">{formatCurrency(analytics.revenue.average)}</p>
          <p className="sub">per order</p>
        </div>

        <div className="tile">
          <p className="label">Addon {isAdmin ? 'revenue' : 'expenses'}</p>
          <p className="value">{formatCurrency(analytics.revenue.addon_total)}</p>
          <p className="sub">{addonPercent}% of total</p>
        </div>
      </div>

      <Divider />

      <h3>{isAdmin ? 'Revenue' : 'Expenses'} by plan</h3>

      {Object.values(Plans).map((plan, index) => {
        const analytic = analytics.plan[plan] ?? { average_revenue: 0, total_revenue: 0, count: 0 };
        const barWidth = (analytic.total_revenue / maxRevenue) * 100;
        const color = PLAN_COLORS[plan] ?? getFallbackColor(index);

        return (
          <div className="plan" key={plan}>
            <span className="dot" style={{ backgroundColor: color }} />
            <span className="name">{plan}</span>
            <div className="track">
              <span className="fill" style={{ width: `${barWidth}%`, backgroundColor: color }} />
            </div>
            <div className="meta">
              <div className="revenue">{formatCurrency(analytic.total_revenue)}</div>
              <div className="avg">
                avg {formatCurrency(Math.round(analytic.average_revenue))} · {analytic.count} orders
              </div>
            </div>
          </div>
        );
      })}
    </RevenueWrapper>
  );
};

export default Revenue;