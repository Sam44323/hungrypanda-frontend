import React from 'react';

import styles from './ErrorModal.module.css';
import btnStyles from '../Button/Button.module.css';
import Button from '../Button/Button';

const ErrorModal = ({ errorMessage, handleModal }) => {
  return (
    <React.Fragment>
      <div className={styles.errorModalBackdrop}>
        <div className={styles.errorModalContent}>
          <h1 className={styles.errorModalMessage}>{errorMessage}</h1>
          <Button class={`${btnStyles.DangerBtn}`} clickAction={handleModal}>
            Close
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
