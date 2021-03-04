import React, { PureComponent } from 'react';
import Loader from 'react-loader-spinner';

import {
  socialMediaObjectCreator,
  userInputDetailState,
} from '../../components/Constants/utilityFunction/createStateValue';

import sharedStyles from '../shared/sharedStyles/styles.module.css';
import tokenChecker from '../util/tokenCheckFunction';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Navigation from '../../components/navigation/Navigation';
import axios from 'axios';
import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';
import axiosMethod from '../util/axiosMethodCreator';

class EditProfile extends PureComponent {
  state = {
    loading: false,
    userData: {
      name: {},
      image: {},
      email: {},
      userName: {},
      age: {},
      city: {},
    },
    socialMedia: {
      fb: {},
      insta: {},
      twitter: {},
    },
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    this.setState({ loading: true });

    axios(
      axiosMethod(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/myprofile/${this.props.match.params.id}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    ).then((user) => {
      if (user) {
        const userData = {
          name: userInputDetailState(
            'Name',
            true,
            'Enter a name!',
            user.data.user.name,
            true
          ),
          image: userInputDetailState(
            'Profile Picture',
            true,
            'Enter an image url!',
            user.data.user.image,
            true
          ),
          email: userInputDetailState(
            'Email',
            true,
            'Enter a valid email!',
            user.data.user.email,
            true
          ),
          userName: userInputDetailState(
            'User name',
            true,
            'Enter a User Name!',
            user.data.user.userName,
            true
          ),
          age: userInputDetailState(
            'Age',
            true,
            'Enter an age!',
            user.data.user.age,
            true
          ),
          city: userInputDetailState(
            'City',
            true,
            'Enter a city!',
            user.data.user.location,
            true
          ),
        };
        const socialMedia = {
          fb: socialMediaObjectCreator(
            'Facebook',
            user.data.user.socialMedia[0].value,
            user.data.user.socialMedia[0].hasValue
          ),
          insta: socialMediaObjectCreator(
            'Instagram',
            user.data.user.socialMedia[1].value,
            user.data.user.socialMedia[1].hasValue
          ),
          twitter: socialMediaObjectCreator(
            'Twitter',
            user.data.user.socialMedia[2].value,
            user.data.user.socialMedia[2].hasValue
          ),
        };
        this.setState({ loading: false, userData, socialMedia });
      }
    });
  }

  //FOR VALIDATING THE INPUT VALUE
  checkValidity = (name, value) => {
    if (
      name === 'name' ||
      name === 'userName' ||
      name === 'image' ||
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
      userName: this.state.userData.userName.value.trim(),
      age: this.state.userData.age.value,
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
        'PATCH',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/editprofile/${this.props.match.params.id}`,
        data,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      )
    ).then((response) => {
      this.setState({ loading: false });
      if (response) {
        this.props.history.push('/profile');
      }
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
            userDataLength={6}
            changeDataValue={this.changeDataValue}
            socialMediaDataChange={this.socialMediaDataChange}
            btntext='Update'
          />
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(EditProfile);
