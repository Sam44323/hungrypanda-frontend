import React from 'react';

import styles from './ProfileInput.module.css';
import sharedStyles from '../../../containers/shared/sharedStyles/styles.module.css';

const ProfileInput = (props) => {
  let inputValue;
  switch (props.type) {
    case 'file':
      inputValue = (
        <div className={styles.profileInputSection}>
          <label htmlFor={props.name} className={sharedStyles.fileLabel}>
            {props.name}
            <hr />
            <input
              type={props.type}
              name={props.name}
              onChange={(event) => props.changeAction(event.target.files[0])}
              className={styles.profileInputTag}
            />
          </label>
        </div>
      );
      break;

    default:
      inputValue = (
        <div className={styles.profileInputSection}>
          <label htmlFor={props.name} className={styles.profileInputLabel}>
            {props.name}
          </label>
          <input
            type={props.type}
            value={props.value}
            name={props.name}
            onChange={(event) =>
              props.changeAction(props.id, event.target.value)
            }
            className={styles.profileInputTag}
            autoComplete='off'
          />
          {!props.isValid && props.isTouched ? (
            <p className={styles.messageSection}>{props.message}</p>
          ) : null}
        </div>
      );
  }

  return <React.Fragment>{inputValue}</React.Fragment>;
};

export default ProfileInput;
