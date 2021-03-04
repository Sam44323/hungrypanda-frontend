import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';

import Navigation from '../../components/navigation/Navigation';
import tokenChecker from '../util/tokenCheckFunction';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import RecipeDetailsComponent from '../../components/recipesDetailsComponent/RecipeDetailsComponent';
import axiosMethod from '../util/axiosMethodCreator';

class RecipeDetails extends Component {
  state = {
    recipe: {},
    loading: false,
    hasRecipe: false,
    creatorUsername: '',
    error: null,
    showLikeValue: true,
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
    this.setState({ loading: true });
    axios(
      axiosMethod(
        'GET',
        `${process.env.REACT_APP_BACKEND_URL_RECIPES}/recipe/${this.props.match.params.id}`,
        null,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      )
    )
      .then((recipe) => {
        if (recipe) {
          this.setState({
            recipe: { ...recipe.data.recipe },
            loading: false,
            hasRecipe: true,
            showLikeValue:
              localStorage.getItem('userId') !==
              recipe.data.recipe.creatorId._id.toString(),
            creatorUsername: recipe.data.recipe.creatorId.userName,
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
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
          const recipeIndex = response.data.recipes.findIndex(
            (recipe) => recipe._id === recipeId
          );
          this.setState({ recipe: response.data.recipes[recipeIndex] });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Please try again after some time!' });
      });
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <ErrorModal
            errorMessage={this.state.error}
            handleModal={() => this.setState({ error: null })}
          />
        )}
        <Navigation />
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          {this.state.loading ? (
            <Loader type='Puff' color='#493323' height={100} width={100} />
          ) : this.state.hasRecipe ? (
            <RecipeDetailsComponent
              recipe={this.state.recipe}
              userName={this.state.creatorUsername}
              likeValueHandler={this.likeValueHandler}
              showLikeValue={this.state.showLikeValue}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default RecipeDetails;
