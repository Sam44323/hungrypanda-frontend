import React from 'react';

import styles from './ProfileForm.module.css';
import sharedStyles from '../../containers/shared/sharedStyles/styles.module.css';
import btnStyles from '../Button/Button.module.css';
import Input from './ProfileInput/ProfileInput';
import FAICON from '../FontAwesome/FontAwesome';
import Button from '../Button/Button';

const ProfileForm = (props) => {
  let c = 0;
  const dataInput = [];
  for (let keyValue in props.userData) {
    const type = keyValue === 'age' ? 'number' : 'text';
    dataInput.push(
      <Input
        key={keyValue}
        id={keyValue}
        type={type}
        name={props.userData[keyValue].name}
        value={props.userData[keyValue].value}
        changeAction={props.changeDataValue}
        message={props.userData[keyValue].message}
        isValid={props.userData[keyValue].isValid}
        isTouched={props.userData[keyValue].touched}
      />
    );
  }
  const socialMedia = [];
  for (let keyValue in props.socialMedia) {
    socialMedia.push(
      <Input
        key={keyValue}
        id={keyValue}
        type='text'
        name={props.socialMedia[keyValue].name}
        value={props.socialMedia[keyValue].value}
        changeAction={props.socialMediaDataChange}
      />
    );
  }
  let valid = true;
  for (let key in props.userData) {
    if (props.userData[key].isValid && props.userData[key].touched) {
      c++;
    }
  }
  valid = c === props.userDataLength ? true : false;
  return (
    <div className={styles.profileFormMain}>
      <div className={styles.userDetailsSection}>
        <h1 className={styles.userDataTitle}>
          My Profile <FAICON iconName='faUser' color='brown' />
        </h1>
        {!props.imageData.value ? (
          <Input
            name={props.imageData.name}
            type='file'
            changeAction={props.imageValueHandler}
          />
        ) : (
          <div className={sharedStyles.changePhotoButtonSection}>
            <Button
              class={`${btnStyles.EditPhoto}`}
              clickAction={() => props.changeAction(null)}
            >
              Change Photo
            </Button>
          </div>
        )}

        {dataInput}
      </div>
      <div className={styles.socialMediaSection}>
        <h1 className={styles.userSocialMediaTitle}>
          Follow me on <FAICON iconName='faHashtag' color='brown' />
        </h1>
        {socialMedia}
      </div>
      <div className={styles.profileBtnSection}>
        <Button
          class={`${btnStyles.ingsBtn} ${btnStyles.SuccessBtn}`}
          clickAction={props.submitForm}
          disabledValue={!valid}
        >
          {props.btntext}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
