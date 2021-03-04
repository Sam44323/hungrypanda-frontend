import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Fallback from './fallback';

import Homepage from './containers/homepage/Homepage';
import Explore from './containers/explore/Explore';
import UserPage from './containers/userPage/userPage';
import AddRecipes from './containers/AddRecipes/AddRecipes';
import Signup from './containers/authentication/Signup/Signup';

//RECIPES RELATED LAZY LOADING
const RecipeDetails = React.lazy(() =>
  import('./containers/recipeDetails/RecipeDetails')
);
const EditRecipes = React.lazy(() =>
  import('./containers/EditRecipes/EditRecipes')
);

//USER PROFILE RELATED LAZY LOADING COMPONENTS
const MyProfile = React.lazy(() => import('./containers/myProfile/MyProfile'));
const EditProfile = React.lazy(() =>
  import('./containers/EditProfile/EditProfile')
);
const LikedRecipes = React.lazy(() =>
  import('./containers/LikedRecipes/LikedRecipes.js')
);
const Login = React.lazy(() =>
  import('./containers/authentication/Login/Login')
);
const Logout = React.lazy(() =>
  import('./containers/authentication/Logout/Logout.js')
);
const NotFoundPage = React.lazy(() =>
  import('./containers/ErrorPage/ErrorPage.js')
);

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path='/explore' component={Explore} />
        <Route path='/add-recipes' component={AddRecipes} />
        <Route path='/auth/signup' component={Signup} />
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route path='/myrecipes' component={UserPage} />
            <Route path='/recipeDetails/:id' component={RecipeDetails} />
            <Route path='/edit-recipe/:id' component={EditRecipes} />
            <Route path='/edit-profile/:id' component={EditProfile} />
            <Route path='/liked-recipes' component={LikedRecipes} />
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/logout' component={Logout} />
            <Route path='/profile' component={MyProfile} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
