'use client';

import { ConfigProvider, Pie, PieConfig } from '@ant-design/plots';
import { useAppSelector } from '@/store/hooks';
import { ChartWrapper } from './styled';
import { BaseObject } from '@/types';

const PieChart = ({ angleField, title, unit, ...props }: Partial<PieConfig & { unit?: string; }>) => {
  const { theme } = useAppSelector((state) => state.theme);
  const config: PieConfig = {
    angleField: angleField || 'value',
    colorField: 'name',
    innerRadius: 0.66,
    legend: false,
    height: 300,
    width: 300,
    tooltip: {
      valueFormatter: (d: string) => `${d}%`,
      field: 'value',
      name: ''
    },
    labels: [
      {
        style: { fontWeight: 'bold', fontSize: 10, dy: -8 },
        text: (d: BaseObject) => d.value ? d.name : ''
      },
      {
        text: (d: BaseObject) => d.value ? `${d.value}${unit}` : '',
        style: { fontSize: 14, dy: 9 }
      }
    ],
    style: {
      stroke: '#fff',
      radius: 10,
      inset: 1
    },
    scale: {
      color: {
        offset: (t: number) => t * 0.8 + 0.1,
        palette: 'spectral'
      }
    },
    ...props
  };

  return (
    <ConfigProvider common={{ theme }}>
      <ChartWrapper>
        {title && <h2>{title}</h2>}

        <div className="container">
          <Pie {...config} />
        </div>
      </ChartWrapper>
    </ConfigProvider>
  );
};

export default PieChart;