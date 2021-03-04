import React, { PureComponent } from 'react';
import { getTextField } from '../../../components/Constants/utilityFunction/createStateValue';

import styles from './loginStyles.module.css';
import sharedStyles from '../../shared/sharedStyles/styles.module.css';
import btnStyles from '../../../components/Button/Button.module.css';
import Button from '../../../components/Button/Button';
import Navigation from '../../../components/navigation/Navigation';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Input from '../../../components/ProfileForm/ProfileInput/ProfileInput';
import formErrorHandlerHOC from '../../../HOC/formErrorHandlerHOC';
import axiosMethod from '../../util/axiosMethodCreator';

class Login extends PureComponent {
  state = {
    loading: false,
    email: getTextField(
      'email',
      'email',
      'email',
      'Please enter a valid email!',
      false
    ),
    password: getTextField(
      'password',
      'password',
      'text',
      'Please enter a password!',
      false
    ),
  };

  checkValidation = (name, value) => {
    if (name === 'email') {
      return /.+@.+\.[A-Za-z]+$/.test(value);
    }
    return value.trim() === '' ? false : true;
  };

  changeValue = (name, value) => {
    const inputObj = { ...this.state[name] };
    inputObj.value = value;
    inputObj.touched = true;
    inputObj.isValid = this.checkValidation(name, value);
    this.setState((prevObject) => (prevObject[name] = { ...inputObj }));
  };

  loginHandler = () => {
    this.setState({ loading: true });
    const data = {
      email: this.state.email.value,
      password: this.state.password.value,
    };
    axios(
      axiosMethod(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/login`,
        data,
        {
          'Content-Type': 'application/json',
        }
      )
    ).then((response) => {
      if (response) {
        const expiresTime = new Date();
        expiresTime.setHours(expiresTime.getHours() + 1); // setting the expire time for the token of 1hour from the time it was created
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expiresIn', expiresTime.toISOString());
        localStorage.setItem('userId', response.data.userId);
        this.props.history.replace('/myrecipes');
      } else {
        this.setState({ loading: false });
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
          <div className={styles.loginSectionDiv}>
            <h1 className={styles.loginSectionTitle}>Login</h1>
            <Input
              id={this.state.email.name}
              type={this.state.email.type}
              value={this.state.email.value}
              name={this.state.email.name}
              changeAction={(name, value) => this.changeValue(name, value)}
              isValid={this.state.email.isValid}
              isTouched={this.state.email.touched}
              message={this.state.email.message}
            />
            <Input
              id={this.state.password.name}
              type={this.state.password.type}
              value={this.state.password.value}
              name={this.state.password.name}
              changeAction={(name, value) => this.changeValue(name, value)}
              isValid={this.state.password.isValid}
              isTouched={this.state.password.touched}
              message={this.state.password.message}
            />
            <div className={styles.loginBtnSection}>
              <Button
                class={btnStyles.SuccessBtn}
                clickAction={this.loginHandler}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(Login);
