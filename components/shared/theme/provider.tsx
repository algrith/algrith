'use client';

import { AntDesignThemeProviderProps, ConfigProvider, ThemeConfig, theme, Spin } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { Spinner } from '@/components/shared/icon/spinner';
import { useAppSelector } from '@/store/hooks';
import { AppTheme } from '@/types';
import colors from '@/libs/colors';

Spin.setDefaultIndicator(<Spinner />);

const tokenConfigs: AppTheme['tokenConfigs'] = {
  app: {
    token: {
      fontFamily: 'var(--font-ibm-plex-sans), var(--font-nunito-sans), sans-serif',
      colorWarning: colors.theme.secondary,
      colorPrimary: colors.theme.primary,
      // colorError: colors.theme.error
    } as ThemeConfig['token'],
    components: {
      Segmented: {
        paddingInlineLG: 16,
        paddingBlockLG: 12,
        controlHeight: 44,
        borderRadius: 13,
        algorithm: true,
        fontWeight: 400,
        size: 16,
      },
      TextArea: {
        paddingInlineLG: 20,
        paddingBlockLG: 14,
        borderRadiusLG: 12,
        borderRadius: 12,
      },
      Select: {
        multipleItemHeightLG: 42,
        singleItemHeightLG: 50,
        borderRadiusLG: 8,
        borderRadius: 8
      },
      Avatar: {
        borderRadiusLG: 12,
        borderRadiusSM: 8
      },
      Anchor: {
        colorText: colors.theme.primary
      },
      Button: {
        paddingInlineLG: 16,
        paddingBlockLG: 12,
        borderRadiusLG: 13,
        borderRadiusMD: 13,
        controlHeight: 46,
        borderRadius: 7,
        algorithm: true,
        fontWeight: 400,
        size: 16,
      },
      Group: {
        paddingInlineLG: 16,
        paddingBlockLG: 12,
        controlHeight: 44,
        borderRadius: 13,
        algorithm: true,
        fontWeight: 400,
        size: 16,
      },
      Input: {
        paddingInlineLG: 12,
        paddingInlineSM: 12,
        paddingBlockLG: 14,
        borderRadiusLG: 10,
        borderRadiusMD: 10,
        borderRadius: 8
      },
      Table: {
        // rowSelectedBg: colors.theme.quinary,
        // rowHoverBg: colors.theme.quinary
      },
      Radio: {
        wrapperMarginInlineEnd: 32,
        radioSize: 20,
        dotSize: 8
      },
      Card: {
        borderRadiusLG: 12,
      }
    } as ThemeConfig['components']
  }
};

const AntDesignThemeProvider = ({ children, type = 'app' }: AntDesignThemeProviderProps) => {
  const { mode } = useAppSelector((state) => state.theme);
  const themeConfig = {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    ...tokenConfigs[type]
  };
  
  return (
    <ConfigProvider theme={themeConfig}>
      <AntdRegistry>
        {children}
      </AntdRegistry>
    </ConfigProvider>
  );
};

export default AntDesignThemeProvider;
