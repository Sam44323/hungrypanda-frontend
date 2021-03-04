import React from 'react';
import uuid from 'react-uuid';

import styles from './Form.module.css';
import sharedStyles from '../../containers/shared/sharedStyles/styles.module.css';
import btnStyles from '../Button/Button.module.css';
import Input from './InputFields/Input';
import Button from '../Button/Button';
import Ingredients from '../IngredientsTODO/Ingredients';
import FAICON from '../FontAwesome/FontAwesome';
import * as constants from '../Constants/uiconstants';

const Form = (props) => {
  const returnIngredArray = (type) => {
    return props[type].ing.map((item) => (
      <div key={uuid()} className={styles.ingValueDivision}>
        <h1 className={styles.ingValueStyle}>
          {item.value}{' '}
          <Button
            class={`${btnStyles.ingsButton}`}
            clickAction={() => props.removeIngredients(type, item.id)}
          >
            <FAICON iconName={constants.FATIMESCIRCLE} color='black' />
          </Button>
        </h1>
      </div>
    ));
  };
  //STORING THE INPUTS FOR THE TEXTS
  let c = 0;
  const textInputs = props.textFieldName.map((item) => (
    <Input
      key={c++}
      type={item.type}
      name={item.name}
      required
      value={item.value}
      actionHandler={props.changeValue}
      isValid={item.isValid}
      touched={item.touched}
      message={item.message}
    />
  ));
  //STORING THE INPUTS FOR THE NUMBERS
  const numberInputs = (
    <div className={styles.numberSection}>
      {props.numberFieldName.map((item) => (
        <Input
          key={c++}
          type='number'
          name={item.name}
          required
          classValue='numberInput'
          value={item.value}
          actionHandler={props.changeValue}
          isValid={item.isValid}
          touched={item.touched}
          message={item.message}
        />
      ))}
    </div>
  );

  //FOR STORING THE INGREDIENTS IN A STYLED INPUT
  const ingrd = returnIngredArray('ingredients');
  const keyIngred = returnIngredArray('keyingredients');

  const disabled = !props.checkFormValidation();
  return (
    <React.Fragment>
      <div className={styles.formSection} style={{ marginTop: '100px' }}>
        {!props.imageField.value ? (
          <Input
            type='file'
            name={props.imageField.name}
            fileActionHandler={props.fileActionMethod}
          />
        ) : (
          <div className={sharedStyles.changePhotoButtonSection}>
            <Button
              class={`${btnStyles.EditPhoto}`}
              clickAction={() => props.fileActionMethod(null)}
            >
              Change Photo
            </Button>
          </div>
        )}
        {numberInputs}
        {textInputs}
        <div className={styles.ingredientsSection}>
          <h1 className={styles.ingTitle}>Key Ingredients (with values)</h1>
          <Ingredients
            type='keyingredients'
            submitIngredients={props.setIngredients}
          />
          {keyIngred.length > 0 ? (
            <div className={styles.ingValueSection}>{keyIngred}</div>
          ) : null}
        </div>
        <div className={styles.ingredientsSection}>
          <h1 className={styles.ingTitle}>Ingredients (with values)</h1>
          <Ingredients
            type='ingredients'
            submitIngredients={props.setIngredients}
          />
          {ingrd.length > 0 ? (
            <div className={styles.ingValueSection}>{ingrd}</div>
          ) : null}
        </div>
        <div className={styles.formBtnSection}>
          {' '}
          <Button
            class={`${btnStyles.SuccessBtn}`}
            clickAction={props.submit}
            disabledValue={disabled}
          >
            {props.buttonName}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
