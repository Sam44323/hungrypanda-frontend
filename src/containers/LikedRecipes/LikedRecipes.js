import React, { PureComponent } from 'react';

import styles from './LikedRecipes.module.css';
import tokenChecker from '../util/tokenCheckFunction';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import Navigation from '../../components/navigation/Navigation';
import uuid from 'react-uuid';
import axiosMethod from '../util/axiosMethodCreator';

class LikedRecipes extends PureComponent {
  state = {
    loading: true,
    likedRecipesData: [],
    error: null,
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    axios(
      axiosMethod(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL_USERS}/getLikedRecipes`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    )
      .then((response) => {
        this.setState({
          likedRecipesData: response.data.user.likedRecipes,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: 'Please try again later!',
          loading: false,
        });
      });
  }

  render() {
    const LikedRecipes = this.state.likedRecipesData.map((recipe) => (
      <div
        className={styles.likedRecipesCard}
        key={recipe._id}
        onClick={() =>
          this.props.history.replace(`/recipeDetails/${recipe._id}`)
        }
      >
        <h1 className={styles.likedRecipesCardTitle}>{recipe.name}</h1>
        <h3 className={styles.likedRecipesCardDesc}>{recipe.description}</h3>
        {recipe.keyIngred.map((item) => (
          <h1 key={uuid()} className={styles.likedRecipesCardIngreds}>
            {item}
          </h1>
        ))}
      </div>
    ));
    return (
      <React.Fragment>
        <Navigation />
        {this.state.error && (
          <ErrorModal
            handleModal={() => this.setState({ error: null })}
            errorMessage={this.state.error}
          />
        )}
        {this.state.loading && (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        )}
        {LikedRecipes}
      </React.Fragment>
    );
  }
}

export default LikedRecipes;
