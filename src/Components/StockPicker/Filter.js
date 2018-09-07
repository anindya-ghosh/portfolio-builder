import React from 'react';
import './Filter.css';

function Filter (props) {
  return <div className="filter">
    <div className="filter-icon"></div>
    <div className="filter-text">APPLY FILTERS</div>
    <div className="filter-count">{props.value}</div>
  </div>
}

export default Filter;