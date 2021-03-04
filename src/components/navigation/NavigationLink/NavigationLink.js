import { NavLink } from 'react-router-dom';

import './NavigationLink.css';

const NavigationLink = (props) => {
  return props.show ? (
    <li className={props.listClass}>
      <NavLink
        to={props.destination}
        className={props.classValue}
        activeStyle={{
          color: 'saddlebrown',
          backgroundColor: 'wheat',
          borderRadius: '10px',
        }}
      >
        {props.children}
      </NavLink>
    </li>
  ) : null;
};

export default NavigationLink;
