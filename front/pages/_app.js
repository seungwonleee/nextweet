import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import theme from '../Theme/theme';

import wrapper from '../store/configureStore';

const App = ({ Component }) => (
  <>
    <Head>
      <title>Nextweet</title>
    </Head>

    <ThemeProvider theme={theme}>
      <Component />
    </ThemeProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
