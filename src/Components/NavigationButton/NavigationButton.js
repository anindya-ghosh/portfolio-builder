import React from 'react';
import './NavigationButton.css';

function NavigationButton (props) {
  return <div className={'nav ' + props.className} onClick={props.navigate}>
    {props.value}
  </div>
}

export default NavigationButton;