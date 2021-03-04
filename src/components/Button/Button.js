import styles from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${styles.btn} ${props.class} ${
        props.disabledValue && styles.disableClass
      }`}
      onClick={props.clickAction}
      disabled={props.disabledValue}
    >
      {props.children}
    </button>
  );
};

export default Button;
