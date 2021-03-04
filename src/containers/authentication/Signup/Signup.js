import React, { PureComponent } from 'react';

import {
  userInputDetailState,
  socialMediaObjectCreator,
  getImageField,
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
    image: getImageField('Profile picture', 'profilePicture'),
    userData: {
      name: userInputDetailState('Name', false, 'Enter a name!'),
      email: userInputDetailState('Email', false, 'Enter a valid email!'),
      password: userInputDetailState('password', false, 'Enter a password!'),
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

  //FOR CHANGING THE VALUE OF THE IMAGE FIELD

  changeImageValue = (value) => {
    this.setState({ image: { ...this.state.image, value } });
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
    const bodyFormData = new FormData();

    bodyFormData.append('image', this.state.image.value);
    bodyFormData.append('name', this.state.userData.name.value.trim());
    bodyFormData.append('email', this.state.userData.email.value.trim());
    bodyFormData.append('password', this.state.userData.password.value.trim());
    bodyFormData.append('userName', this.state.userData.userName.value.trim());
    bodyFormData.append('age', JSON.parse(this.state.userData.age.value));
    bodyFormData.append('location', this.state.userData.city.value.trim());
    bodyFormData.append(
      'socialMedia',
      JSON.stringify([
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
      ])
    );

    axios(
      axiosMethod(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/signup`,
        bodyFormData,
        { 'Content-Type': 'multipart/form-data' }
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
            imageData={this.state.image}
            imageValueHandler={this.changeImageValue}
            userData={this.state.userData}
            socialMedia={this.state.socialMedia}
            userDataLength={6}
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
