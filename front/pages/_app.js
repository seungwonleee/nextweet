import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

import wrapper from '../store/configureStore';

const App = ({ Component }) => (
  <>
    <Head>
      <title>nextweet</title>
      {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
