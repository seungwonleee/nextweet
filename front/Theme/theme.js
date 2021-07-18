// *** 중요 ***
// html,body font-size: 10px; 설정하기. 이처럼 설정해두면 아래와 같이 사용할 수 있다.
// * 10px ==> 1rem / 14px ==> 1.4rem

const fontSizes = {
  xsmall: '1.2rem',
  small: '1.4rem',
  base: '1.6rem',
  large: '1.8rem',
  xlarge: '2.0rem',
  xxlarge: '2.2rem',
  xxxlarge: '2.4rem',
  titleSize: '3.4rem',
};

const paddings = {
  xsmall: '0.5rem',
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const margins = {
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const interval = {
  small: '2.5rem',
  base: '5rem',
  large: '10rem',
  xlarge: '15',
  xxlarge: '20rem',
  xxxlarge: '25rem',
};

const verticalInterval = {
  base: `10rem 0 1rem 0`,
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#CCCCCC',
  DarkMode: '#222222',
};

const deviceSizes = {
  // antd break-points
  // value         |0px     576px    768px    992px   1200px  1600px
  // key           |xs      sm       md       lg       xl      xxl
  // screen width  |--------|--------|--------|--------|--------|--------
  // range         |   xs   |   sm   |   md   |   lg   |   xl      xxl

  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px',
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export default theme;
