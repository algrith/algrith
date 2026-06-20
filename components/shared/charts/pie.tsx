'use client';

import { Pie, PieConfig } from '@ant-design/plots';
import { useAppSelector } from '@/store/hooks';
import { ChartWrapper } from './styled';
import { BaseObject } from '@/types';

const PieChart = ({ angleField, title, unit, ...props }: Partial<PieConfig & { unit?: string; }>) => {
  const { theme } = useAppSelector((state) => state.theme);

  const themeStyle = {
    fill: theme === 'dark' ? 'white' : 'rgb(0 0 0/.9)'
  };

  const config: PieConfig = {
    angleField: angleField || 'value',
    colorField: 'name',
    innerRadius: 0.66,
    legend: false,
    height: 300,
    tooltip: {
      valueFormatter: (d: string) => `${d}${unit}`,
      field: 'value',
      name: ''
    },
    labels: [
      {
        text: (d: BaseObject) => d.value ? d.name : '',
        style: {
          fontWeight: 'bold',
          ...themeStyle,
          fontSize: 13,
          dy: -8
        }
      },
      {
        text: (d: BaseObject) => d.value ? `${d.value}${unit}` : '',
        style: { ...themeStyle, fontSize: 14, dy: 9 }
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
    <ChartWrapper>
      {title && <h2>{title}</h2>}

      <div className="container">
        <Pie {...config} />
      </div>
    </ChartWrapper>
  );
};

export default PieChart;