import React, { PureComponent } from 'react';
import uuid from 'react-uuid';

import {
  getTextField,
  timeValue,
  ingObjectCreator,
  getImageField,
} from '../../components/Constants/utilityFunction/createStateValue';

import sharedStyles from '../shared/sharedStyles/styles.module.css';
import tokenChecker from '../util/tokenCheckFunction';
import formErrorHandlerHOC from '../../HOC/formErrorHandlerHOC';
import Navigation from '../../components/navigation/Navigation';
import Form from '../../components/Form/Form';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import axiosMethod from '../util/axiosMethodCreator';

class AddRecipes extends PureComponent {
  state = {
    loading: false,
    image: getImageField('Image', 'image'),
    textFieldName: [
      getTextField(
        'Recipe Name',
        'name',
        'text',
        'Enter the recipe name!',
        false
      ),
      getTextField(
        'Description',
        'description',
        'textarea',
        'Give some recipe description!',
        false
      ),
      getTextField(
        'Procedure',
        'procedure',
        'textarea',
        'Enter the procedure!',
        false
      ),
    ],
    numberFieldName: [
      timeValue('Hours', 0, false),
      timeValue('Minutes', 0, false),
    ],
    ingredients: { ...ingObjectCreator() },
    keyingredients: { ...ingObjectCreator() },
  };

  componentDidMount() {
    if (tokenChecker()) {
      return this.props.history.replace('/auth/login');
    }
  }

  //FOR CHANGING THE VALUE OF THE RECIPE DETAILS
  changeValueHandler = (name, type, value) => {
    let valueArray =
      type === 'number'
        ? [...this.state.numberFieldName]
        : [...this.state.textFieldName];

    valueArray = valueArray.map((item) => {
      if (item.name === name) {
        item.value = value;
        item.touched = true;
        item.isValid =
          (type === 'text' || type === 'textarea') && value === ''
            ? false
            : true;
      }
      return item;
    });
    if (type === 'number') {
      this.setState({ numberFieldName: [...valueArray] });
    } else {
      this.setState({ textFieldName: [...valueArray] });
    }
  };

  //FOR CHANGING THE VALUE OF THE IMAGE FILE
  imageValueChangeHandler = (value) => {
    this.setState({ image: { ...this.state.image, value } });
  };

  //CHECKING THE VALIDATION OF THE FORM
  checkFormValidation = () => {
    let c = 0;
    for (let item of this.state.textFieldName) {
      if (item.isValid) {
        c++;
      }
    }
    return c === 3;
  };

  //ADDING THE INGREDIENTS TO THE RESPECTIVE ARRAYS
  setIngredients = (value, type) => {
    if (value.trim() === '') {
      return;
    }
    const ingObject = { ...this.state[type] };
    ingObject.ing.push({ id: uuid(), value: value.trim() });
    if (type === 'ingredients') {
      this.setState({ ingredients: ingObject });
    } else {
      this.setState({ keyingredients: ingObject });
    }
  };

  //FOR SUBMITTING THE FORM
  submitForm = () => {
    this.setState({ loading: true });
    const bodyFormData = new FormData();

    bodyFormData.append('name', this.state.textFieldName[0].value.trim());
    bodyFormData.append('image', this.state.image.value);
    bodyFormData.append(
      'description',
      this.state.textFieldName[1].value.trim()
    );
    bodyFormData.append('procedure', this.state.textFieldName[2].value.trim());
    bodyFormData.append(
      'cookTime',
      JSON.stringify({
        hours: parseFloat(this.state.numberFieldName[0].value),
        minutes: parseFloat(this.state.numberFieldName[1].value),
      })
    );
    bodyFormData.append(
      'keyIngred',
      JSON.stringify(
        this.state.keyingredients.ing.map((item) => item.value.trim())
      )
    );
    bodyFormData.append(
      'ingredients',
      JSON.stringify(
        this.state.ingredients.ing.map((item) => item.value.trim())
      )
    );

    axios(
      axiosMethod(
        'POST',
        `${process.env.REACT_APP_BACKEND_URL_RECIPES}/addrecipe`,
        bodyFormData,
        {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        }
      )
    ).then((resp) => {
      this.setState({ loading: false });
      if (resp) {
        this.props.history.push('/myrecipes');
      }
    });
  };

  //FOR REMOVING THE INGREDIENTS FROM THE RESPECTIVE ARRAYS
  removeIngredients = (type, ingId) => {
    let ings = { ...this.state[type] };
    ings.ing = ings.ing.filter((item) => item.id !== ingId);
    ings.isValid = ings.ing.length > 0;
    if (type === 'ingredients') {
      this.setState({ ingredients: ings });
    } else {
      this.setState({ keyingredients: ings });
    }
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
          <Form
            submitForm={this.submitForm}
            imageField={this.state.image}
            fileActionMethod={this.imageValueChangeHandler}
            textFieldName={this.state.textFieldName}
            numberFieldName={this.state.numberFieldName}
            ingredients={this.state.ingredients}
            keyingredients={this.state.keyingredients}
            removeIngredients={this.removeIngredients}
            changeValue={this.changeValueHandler}
            checkFormValidation={this.checkFormValidation}
            setIngredients={this.setIngredients}
            submit={this.submitForm}
            buttonName='Create'
            buttonStyle='SuccessBtn'
          />
        )}
      </React.Fragment>
    );
  }
}

export default formErrorHandlerHOC(AddRecipes);
