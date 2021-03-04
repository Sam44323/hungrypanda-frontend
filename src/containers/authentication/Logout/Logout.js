import React from 'react';

import Loader from 'react-loader-spinner';

const logout = (props) => {
  setTimeout(() => {
    localStorage.clear();
    props.history.replace('/auth/login');
  }, 10);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center' }}>Logging you out</h1>
      <div style={{ textAlign: 'center' }}>
        <Loader type='Puff' color='#493323' height={100} width={100} />
      </div>
    </React.Fragment>
  );
};

export default logout;
