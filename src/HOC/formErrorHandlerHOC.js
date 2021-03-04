import React from 'react';

import axios from 'axios';
import ErrorModal from '../components/ErrorModal/ErrorModal';

const formErrorHandlerHOC = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err.response) {
            this.setState({ error: err.response.data.message });
          } else {
            return this.setState({ error: 'Network Error' });
          }
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <ErrorModal
              errorMessage={this.state.error}
              handleModal={() => {
                this.setState({ error: null });
              }}
            />
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default formErrorHandlerHOC;
