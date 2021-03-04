import React from 'react';

import Navigation from './components/navigation/Navigation';
import Loader from 'react-loader-spinner';

const fallback = () => (
  <React.Fragment>
    <Navigation />
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Loader type='Puff' color='#493323' height={100} width={100} />
    </div>
  </React.Fragment>
);

export default fallback;
