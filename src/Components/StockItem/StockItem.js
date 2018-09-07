import React, { Component } from 'react';
import Shares from "./Shares";
import './StockItem.css';

class StockItem extends Component {
  constructor (props) {
    super(props);
    this.removeFromPortfolio = this.removeFromPortfolio.bind(this);
    this.manageShare = this.manageShare.bind(this);
  }

  removeFromPortfolio () {
    this.props.removeFromPortfolio(this.props.name);
  }
  manageShare (value) {
    this.props.manageShare(this.props.name, value);
  }
  render () {
    return (
      <div className="stockitem">
        <div className="stock-name">
          <div className="gutter"></div>
          <div className="name">
            {this.props.name}
          </div>
        </div>
        <div className="price">₹{this.props.price}</div>
        <Shares className="shares" manageShare={this.manageShare}/>
        <div className="weight">{this.props.weight}%</div>
        <div className="remove" onClick={this.removeFromPortfolio}></div>
      </div>
    );
  }
}

export default StockItem;