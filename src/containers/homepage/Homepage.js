import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Homepage.module.css';
import Navigation from '../../components/navigation/Navigation';
import * as constants from '../../components/Constants/uiconstants';
import FAICON from '../../components/FontAwesome/FontAwesome';
import Footer from '../../components/Footer/Footer';

const Homepage = () => {
  return (
    <React.Fragment>
      <Navigation />
      <div className={styles.homepageHeader}>
        <h1 className={styles.homepageTitle}>Hungry Panda!</h1>
        <p className={styles.homepageHeaderPara}>
          For all the food lovers and aspiring chef's out there!
        </p>
      </div>
      <div className={styles.homepageFeaturesMain}>
        <h1 className={styles.homepageFeaturesTitle}>What you'll get?</h1>
        <div className={styles.homepageFeatures}>
          <h1 className={styles.features}>
            <span className={styles.featuresIcon}>
              <FAICON iconName={constants.FAEDIT} color='brown' />
            </span>
            Create Your own recipes
          </h1>
          <h1 className={styles.features}>
            <span className={styles.featuresIcon}>
              <FAICON iconName={constants.FACOMPASS} color='brown' />
            </span>
            Explore new recipes by others!
          </h1>
          <h1 className={styles.features}>
            <span className={styles.featuresIcon}>
              <FAICON iconName='faHeart' color='brown' />
            </span>
            Love a recipe?
            <br /> Just like it and you'll get to see it later!
          </h1>
        </div>
      </div>
      <div className={styles.hompageCTA}>
        <h1 className={styles.hompageCTATitle}>Excited! Let's go</h1>
        <p className={styles.CTApara}>
          <NavLink to='/auth/signup' className={styles.homepageCTALink}>
            Create An Account
          </NavLink>
        </p>
        <div className={styles.homepageCTALoginSection}>
          <h3 className={styles.homepageCTASubTitle}>
            Already have an account? Login
          </h3>
          <p className={styles.CTApara}>
            <NavLink to='/auth/login' className={styles.homepageCTALink}>
              Login
            </NavLink>
          </p>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
