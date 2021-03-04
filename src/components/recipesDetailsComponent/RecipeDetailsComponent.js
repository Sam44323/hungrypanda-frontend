import React from 'react';

import styles from './RecipeDetailsComponent.module.css';
import { FACLOCK } from '../Constants/uiconstants';
import FAICON from '../FontAwesome/FontAwesome';

const RecipeDetailsComponent = (props) => {
  const keyIngredientsSection = props.recipe.keyIngred.map((kIng) => (
    <h1 key={kIng} className={styles.recipeDetailsKeyIngredItem}>
      {kIng}
    </h1>
  ));

  const ingredientsDetailsSection = props.recipe.ingredients.map((ingr) => (
    <h1 key={ingr} className={styles.recipeDetailsIngredItem}>
      {ingr}
    </h1>
  ));

  const cookTime = {
    hours:
      props.recipe.cookTime.hours > 0
        ? props.recipe.cookTime.hours === 1
          ? `${props.recipe.cookTime.hours} hour`
          : `${props.recipe.cookTime.hours} hours`
        : null,
    minutes: `${props.recipe.cookTime.minutes} minutes`,
  };

  return (
    <div className={styles.recipeDetailsSection}>
      <img
        src={props.recipe.image}
        alt={props.recipe.name}
        className={styles.recipeDetailsImage}
      />
      {props.showLikeValue && (
        <div
          className={styles.likingContainer}
          onClick={() => props.likeValueHandler(props.recipe._id)}
        >
          <h3 className={styles.loveTitle}>{props.recipe.likes}</h3>
          <FAICON iconName='faHeart' color='red' />
        </div>
      )}
      <h1 className={styles.recipeDetailsUserName}>
        <span style={{ color: 'saddlebrown' }}>Creator |</span> {props.userName}
      </h1>
      <div className={styles.recipeDetailsMain}>
        <h1 className={styles.recipeDetailsName}>{props.recipe.name}</h1>
        <h4 className={styles.recipeDetailsDescription}>
          {props.recipe.description}
        </h4>
        <h3 className={styles.recipeDetailsCooktime}>
          <FAICON iconName={FACLOCK} color='brown' /> {cookTime.hours}{' '}
          {cookTime.minutes}
        </h3>
      </div>
      <div className={styles.keyIngredientsDetailsSection}>
        <h1 className={styles.recipeDetailsKIngredTitle}>Key Ingredients</h1>
        {keyIngredientsSection}
      </div>
      <div className={styles.ingredientsDetailsSection}>
        <h1 className={styles.recipeDetailsIngredientsTitle}>Ingredients</h1>
        {ingredientsDetailsSection}
      </div>
      <div className={styles.recipeDetailsProcedure}>
        <h1 className={styles.recipeDetailsProcedureTitle}>Procedure</h1>
        <p className={styles.recipeDetailProcedureParagraph}>
          {props.recipe.procedure}
        </p>
      </div>
    </div>
  );
};

export default RecipeDetailsComponent;
