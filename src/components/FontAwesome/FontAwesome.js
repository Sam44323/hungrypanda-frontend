import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fontIcons from '@fortawesome/free-solid-svg-icons';

const getFont = (props) => {
  return (
    <FontAwesomeIcon
      icon={fontIcons[props.iconName]}
      style={{ color: props.color ? props.color : 'black' }}
    />
  );
};

export default getFont;
