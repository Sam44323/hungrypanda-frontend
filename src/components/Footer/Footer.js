import React from 'react';
import styles from './Footer.module.css';

const footer = () => (
  <React.Fragment>
    <div className={styles.footer}>
      <p className={styles.termOfServicePara}>
        <a href='/' className={styles.termOfService}>
          Terms of service
        </a>
      </p>
      <h1 className={styles.copyrighTitle}>
        All rights are reserved by Sam44323
      </h1>
    </div>
  </React.Fragment>
);

export default footer;
