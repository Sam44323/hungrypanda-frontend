import React, { PureComponent } from 'react';

import {
  userInputDetailState,
  socialMediaObjectCreator,
} from '../../../components/Constants/utilityFunction/createStateValue';
import sharedStyles from '../../shared/sharedStyles/styles.module.css';
import formErrorHandlerHOC from '../../../HOC/formErrorHandlerHOC';
import Navigation from '../../../components/navigation/Navigation';
import ProfileForm from '../../../components/ProfileForm/ProfileForm';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import axiosMethod from '../../util/axiosMethodCreator';

class Signup extends PureComponent {
  state = {
    loading: false,
    userData: {
      name: userInputDetailState('Name', false, 'Enter a name!'),
      image: userInputDetailState(
        'Profile Picture',
        false,
        'Enter an image url!'
      ),
      email: userInputDetailState('Email', false, 'Enter a valid email!'),
      password: userInputDetailState('Password', false, 'Enter a password!'),
      userName: userInputDetailState('User name', false, 'Enter a User Name!'),
      age: userInputDetailState('Age', false, 'Enter an age!', 0),
      city: userInputDetailState('City', false, 'Enter a city!'),
    },
    socialMedia: {
      fb: socialMediaObjectCreator('Facebook'),
      insta: socialMediaObjectCreator('Instagram'),
      twitter: socialMediaObjectCreator('Twitter'),
    },
  };

  //FOR VALIDATING THE INPUT VALUE
  checkValidity = (name, value) => {
    if (
      name === 'name' ||
      name === 'password' ||
      name === 'image' ||
      name === 'userName' ||
      name === 'city'
    ) {
      return value === '' ? false : true;
    } else if (name === 'age') {
      return value <= 0 ? false : true;
    } else if (name === 'email') {
      return /.+@.+\.[A-Za-z]+$/.test(value);
    }
  };

  //FOR CHANGING THE VALUE OF THE userData OBJECT
  changeDataValue = (name, value) => {
    const objectData = { ...this.state.userData };
    objectData[name].value = value;
    objectData[name].touched = true;
    objectData[name].isValid = this.checkValidity(name, value);
    this.setState({ userData: objectData });
  };

  // FOR CHANGING THE VALUE OF THE SOCIAL-MEDIA OBJECT
  socialMediaDataChange = (name, value) => {
    const objectData = { ...this.state.socialMedia };
    objectData[name].value = value;
    objectData[name].hasValue =
      objectData[name].value.trim().length > 0 ? true : false;
    this.setState({ socialMedia: objectData });
  };

  submitForm = () => {
    this.setState({ loading: true });

    const data = {
      name: this.state.userData.name.value.trim(),
      image: this.state.userData.image.value.trim(),
      email: this.state.userData.email.value.trim(),
      password: this.state.userData.password.value.trim(),
      userName: this.state.userData.userName.value.trim(),
      age: this.state.userData.age.value.trim(),
      location: this.state.userData.city.value.trim(),
      socialMedia: [
        {
          name: 'Facebook',
          value: this.state.socialMedia.fb.value.trim(),
          hasValue: this.state.socialMedia.fb.hasValue,
        },
        {
          name: 'Instagram',
          value: this.state.socialMedia.insta.value.trim(),
          hasValue: this.state.socialMedia.insta.hasValue,
        },
        {
          name: 'Twitter',
          value: this.state.socialMedia.twitter.value.trim(),
          hasValue: this.state.socialMedia.twitter.hasValue,
        },
      ],
    };

    axios(
      axiosMethod(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/signup`,
        data,
        {
          'Content-Type': 'application/json',
        }
      )
    ).then(() => {
      this.props.history.push('/auth/login');
    });
  };
  render() {
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading ? (
          <div className={sharedStyles.loadingDivStyles}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <ProfileForm
            submitForm={this.submitForm}
            userData={this.state.userData}
            socialMedia={this.state.socialMedia}
            userDataLength={7}
            changeDataValue={this.changeDataValue}
            socialMediaDataChange={this.socialMediaDataChange}
            btntext='Add'
          />
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(Signup);
