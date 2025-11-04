import { createTheme, type MantineTheme } from '@mantine/core';

export const theme = createTheme({
  breakpoints: {
    xs: '0', // 0px
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '80em', // 1280px
  },
  primaryColor: 'primary',
  primaryShade: 6,
  colors: {
    primary: [
      '#FFF2F3', // 50
      '#FFEDEF', // 100
      '#FBBDC3', // 200
      '#F89DA5', // 300
      '#F67C87', // 400
      '#DA4957', // 500
      '#C13646', // 600
      '#A72534', // 700
      '#8E1422', // 800
      '#750310', // 900
    ],
    grayscales: [
      '#FAFAFA', // 50
      '#F5F5F5', // 100
      '#EEEEEE', // 200
      '#E0E0E0', // 300
      '#BDBDBD', // 400
      '#9E9E9E', // 500
      '#757575', // 600
      '#616161', // 700
      '#424242', // 800
      '#212121', // 900
    ],
  },
  other: {
    red: '#DA294A',
    orange: '#E0AB37',
    green: '#39B26F',
  },
  fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontFamilyMonospace: 'SF Mono, Monaco, Courier, monospace',
  headings: {
    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: {
        fontSize: '48px',
        lineHeight: '56px',
        fontWeight: '700',
      },
      h2: {
        fontSize: '32px',
        lineHeight: '36px',
        fontWeight: '700',
      },
      h3: {
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '700',
      },
      h4: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '700',
      },
      h5: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: '700',
      },
    },
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  lineHeights: {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '28px',
    xl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  components: {
    NavLink: {
      styles: (theme: MantineTheme) => ({
        root: {
          fontWeight: 500,
          fontSize: theme.fontSizes.sm,
          padding: '10px 12px',
          transition: 'all 0.2s ease',
        },
        section: {
          marginInlineEnd: '8px',
        },
      }),
    },
  },
});
