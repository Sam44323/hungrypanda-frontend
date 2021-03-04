import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

import styles from './ProfileMain.module.css';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';

const ProfileMain = (props) => {
  const socialMediaLinks = props.socialMedia.map((item) => {
    const icon =
      item.name === 'Facebook'
        ? faFacebook
        : item.name === 'Instagram'
        ? faInstagram
        : faTwitter;
    if (item.hasValue) {
      return (
        <a href={item.value} key={item.name}>
          <div className={styles.socialMediaSectionDiv}>
            <FontAwesomeIcon icon={icon} />
          </div>
        </a>
      );
    }
    return null;
  });
  return (
    <React.Fragment>
      <div className={styles.userSectionMain}>
        <div className={styles.userImageSection}>
          <img
            src={props.image}
            alt={props.name}
            className={styles.userImage}
          />
        </div>
        <h1 className={styles.userNameHeading}>{props.userName}</h1>
        <div className={styles.recipesLoveDivSection}>
          <h1 className={styles.recipesLove}>{props.recipes} Recipes</h1>
          <h1 className={styles.recipesLove}>{props.likes} Loves</h1>
        </div>
        {props.likedRecipes ? (
          <h1
            className={styles.likedRecipesStyles}
            onClick={props.likedRecipesHandler}
          >
            {props.likedRecipes} <FAICON iconName='faHeart' color='coral' />
          </h1>
        ) : null}
        <div className={styles.editButtonSection}>
          <button
            className={styles.userProfileButton}
            onClick={props.editHandler}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className={styles.userDetailSub}>
        <div className={styles.subSecFirst}>
          <h1 className={styles.nameTag}>{props.name}</h1>
          <div className={styles.ageLocSection}>
            <h1 className={styles.ageLoc}>{props.location},</h1>
            <h1 className={styles.ageLoc}>{props.age}</h1>
          </div>
          <div className={styles.emailTagSection}>
            <a
              href={`mailto:${props.email}`}
              className={styles.emailIconsStyle}
            >
              <FAICON iconName={constants.FAEMAIL} color='white' />
            </a>
            <br />
            Email
          </div>
        </div>
        <div className={styles.socialMediaSectionContainer}>
          {socialMediaLinks}
        </div>
        <div className={styles.deleteAccount} onClick={props.deleteAccount}>
          <FAICON iconName={constants.FADELETE} color='red' />
          <p className={styles.deleteAccPara}>Delete</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileMain;
