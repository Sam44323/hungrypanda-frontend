import React, { Component } from 'react';

import styles from './Ingredients.module.css';
import btnStyles from '../Button/Button.module.css';
import Button from '../Button/Button';

class Ingredients extends Component {
  state = {
    value: '',
  };
  render() {
    return (
      <React.Fragment>
        <input
          type='text'
          className={styles.ingredInput}
          name='ingred'
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
          autoComplete='off'
        />
        <div className={styles.addButtonSection}>
          <Button
            clickAction={() => {
              this.props.submitIngredients(this.state.value, this.props.type);
              this.setState({ value: '' });
            }}
            class={`${btnStyles.SuccessBtn}`}
          >
            Add
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Ingredients;
