import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './ErrorPage.module.css';
import Navigation from '../../components/navigation/Navigation';
import tokenChecker from '../util/tokenCheckFunction';

const PageNotFound = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className={styles.NotFoundSection}>
        <h1 className={styles.NotFoundTitle}>Page Not Found!</h1>
        <NavLink
          to={tokenChecker() ? '/' : '/myrecipes'}
          className={styles.NotFoundLink}
        >
          Return
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
