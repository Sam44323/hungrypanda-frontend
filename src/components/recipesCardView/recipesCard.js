import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './recipesCard.module.css';
import btnStyles from '../Button/Button.module.css';
import Button from '../Button/Button';
import FAICON from '../FontAwesome/FontAwesome';
import { FACLOCK, FAEDIT } from '../Constants/uiconstants';

const RecipesCard = React.memo((props) => {
  let c = 0;
  let likedValue = (
    <Fragment>
      <h3 className={styles.loveTitle}>{props.loves}</h3>
      <FAICON iconName='faHeart' color='red' />
    </Fragment>
  );
  const ingreds = (
    <ul className={styles.keyIngredContainer}>
      <h3 className={styles.keyIngredTitle}>Key Ingredients</h3>
      <div className={styles.keyIngredItemsSection}>
        {props.keyIngrd.map((item) => {
          ++c;
          return (
            <li key={c} className={styles.keyIngredItem}>
              <h4 className={styles.keyIngredItemHeading}>{item}</h4>
            </li>
          );
        })}
      </div>
    </ul>
  );

  const timeValue =
    props.cooktime.hours > 0
      ? props.cooktime.hours === 1
        ? props.cooktime.hours + ' h '
        : props.cooktime.hours + ' hrs '
      : null;

  return (
    <div className={styles.mainCardContent}>
      <div className={styles.recipeImageContainer}>
        <img
          src={props.imageUrl}
          alt={props.name}
          className={styles.recipeImage}
        />
      </div>
      <h3 className={styles.recipeTitle}>{props.name}</h3>
      <p className={styles.cookingTime}>
        <FAICON iconName={FACLOCK} color='white' /> {timeValue}{' '}
        {props.cooktime.minutes < 10
          ? `0${props.cooktime.minutes}`
          : props.cooktime.minutes}{' '}
        minutes
      </p>
      <h3 className={styles.recipeDescription}>{props.desc}</h3>
      {ingreds}
      <div className={styles.actionButtons}>
        <Button
          class={`${btnStyles.SuccessBtn}`}
          clickAction={props.showRecipeDetails}
        >
          Show
        </Button>
        {props.editBtn && (
          <Button
            class={`${btnStyles.EditBtn}`}
            clickAction={() => props.history.push(`edit-recipe/${props.id}`)}
          >
            <FAICON iconName={FAEDIT} color='white' />
          </Button>
        )}
        {props.showDeleteButton ? (
          <Button
            class={`${btnStyles.DangerBtn}`}
            clickAction={() => props.deleteRecipe(props.id)}
          >
            Delete
          </Button>
        ) : null}
      </div>
      {props.loves >= 0 ? (
        <div
          className={
            props.includesUser
              ? styles.userInLikingContainer
              : styles.likingContainer
          }
          onClick={() => props.likeValueHandler(props.id)}
        >
          {likedValue}
        </div>
      ) : null}
    </div>
  );
});

export default withRouter(RecipesCard);
