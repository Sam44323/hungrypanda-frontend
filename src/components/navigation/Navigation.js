import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import NavigationLink from './NavigationLink/NavigationLink';
import PandaLogo from '../../assets/images/panda.svg';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';

//WILL REFACTOR THE NAVLINK CREATION PROCESS

class Navigation extends React.Component {
  state = {
    backdrop: false,
    showmenu: false,
    showMenuButton: true,
  };

  //for opening the backdrop and the sidebar
  openBackdrop = () => {
    this.setState({ backdrop: true, showmenu: true, showMenuButton: true });
  };

  //for closing the backdrop and the sidebar
  closeBackdrop = () => {
    this.setState({ backdrop: false, showmenu: false });
  };

  createNavLink = (
    classname,
    destinationName,
    linkname,
    iconName,
    showLink
  ) => {
    return (
      <NavigationLink
        listClass={classname}
        destination={destinationName}
        classValue='navLinks'
        show={showLink}
      >
        <FAICON iconName={iconName} color='brown' /> {linkname}
      </NavigationLink>
    );
  };

  render() {
    let showButtonMenu = null;
    let backD = <div className='backdrop' onClick={this.closeBackdrop}></div>;
    if (!this.state.backdrop) {
      backD = null;
      showButtonMenu = (
        <button className='hamburgerSection' onClick={this.openBackdrop}>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
        </button>
      );
    }
    const expirationDate =
      localStorage.getItem('token') &&
      new Date(localStorage.getItem('expiresIn')) > new Date();
    let menu = (
      <div className='navigationListMobile' onClick={this.closeBackdrop}>
        <ul className='navLinksMobileList'>
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/add-recipes',
            'Add',
            constants.FAPLUS,
            expirationDate
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/explore',
            'Explore',
            constants.FACOMPASS,
            expirationDate
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/profile',
            'My Profile',
            constants.FAUSERCIRCLE,
            expirationDate
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/auth/logout',
            'Logout',
            constants.FASIGNALTOUT,
            expirationDate
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/auth/login',
            'Login',
            constants.FASIGNINALT,
            !expirationDate
          )}
          {this.createNavLink(
            constants.MOBILE_CLASS,
            '/auth/signup',
            'Sign Up',
            constants.FAUSERPLUS,
            !expirationDate
          )}
        </ul>
      </div>
    );
    if (!this.state.showmenu) {
      menu = null;
    }

    return (
      <React.Fragment>
        {backD}
        {menu}
        <div className='navigation'>
          <div className='appLogoSection'>
            <Link to={expirationDate ? '/myrecipes' : '/'}>
              <img src={PandaLogo} alt='pic of panda' />
            </Link>
          </div>
          {showButtonMenu}
          <ul className='navigationList'>
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/add-recipes',
              'Add',
              constants.FAPLUS,
              expirationDate
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/explore',
              'Explore',
              constants.FACOMPASS,
              expirationDate
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/profile',
              'My Profile',
              constants.FAUSERCIRCLE,
              expirationDate
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/auth/logout',
              'Logout',
              constants.FASIGNALTOUT,
              expirationDate
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/auth/login',
              'Login',
              constants.FASIGNINALT,
              !expirationDate
            )}
            {this.createNavLink(
              constants.DESKTOP_CLASS,
              '/auth/signup',
              'Sign Up',
              constants.FAUSERPLUS,
              !expirationDate
            )}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default Navigation;
