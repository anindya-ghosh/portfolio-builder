import React from 'react';
import './Title.css'
function Title (props) {
  return <div className={props.className}>
    <div className="box">{props.title}</div>
    <div className="tail"></div>
  </div>
}
export default Title;