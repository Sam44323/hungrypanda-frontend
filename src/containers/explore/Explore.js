import React, { PureComponent } from 'react';

import sharedStyles from '../shared/sharedStyles/styles.module.css';

import Navigation from '../../components/navigation/Navigation';

import RecipesCard from '../../components/recipesCardView/recipesCard';
import tokenChecker from '../util/tokenCheckFunction';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import axiosMethod from '../util/axiosMethodCreator';

class Explore extends PureComponent {
  state = {
    recipes: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    this.axiosCancelSource = axios.CancelToken.source();
    this.setState({ loading: true });

    axios(
      axiosMethod(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL_RECIPES}/explore`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    )
      .then((recipes) => {
        if (recipes) {
          this.setState({
            recipes: recipes.data.recipes,
            loading: false,
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false, error: 'Network error!' });
      });
  }

  likeValueHandler = (recipeId) => {
    axios(
      axiosMethod(
        'PATCH',
        `${process.env.REACT_APP_BACKEND_URL_RECIPES}/updatelike/${recipeId}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    )
      .then((response) => {
        if (response) {
          this.setState({ recipes: response.data.recipes });
        }
      })
      .catch(() => {
        this.setState({ error: 'Please try again after some time!' });
      });
  };

  checkUserInLikes = (likedArray) =>
    likedArray.includes(localStorage.getItem('userId'));

  render() {
    const recipesCard = this.state.recipes.map((recipe) => {
      return (
        <RecipesCard
          key={recipe._id}
          id={recipe._id}
          name={recipe.name}
          cooktime={recipe.cookTime}
          imageUrl={recipe.image}
          keyIngrd={recipe.keyIngred}
          includesUser={this.checkUserInLikes(recipe.likedBy)}
          showRecipeDetails={() =>
            this.props.history.push(`/recipeDetails/${recipe._id}`)
          }
          kIngredLength={recipe.keyIngred.length}
          desc={recipe.description}
          likeValueHandler={this.likeValueHandler}
          loves={recipe.likes}
          creator={recipe.creator}
        />
      );
    });
    return (
      <React.Fragment>
        {this.state.error && (
          <ErrorModal
            handleModal={() => this.setState({ error: null })}
            errorMessage={this.state.error}
          />
        )}
        <Navigation />
        {this.state.loading ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Loader type='Puff' color='#493323' height={100} width={100} />
          </div>
        ) : (
          <div className={sharedStyles.recipesCardSection}>{recipesCard}</div>
        )}
        {this.state.recipes.length === 0 && !this.state.loading && (
          <h1
            style={{
              marginTop: '100px',
              textAlign: 'center',
              color: 'saddlebrown',
            }}
          >
            No recipes to show!
          </h1>
        )}
      </React.Fragment>
    );
  }
}

export default Explore;
