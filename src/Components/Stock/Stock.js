import React, { Component } from 'react';
import './Stock.css';

class Stock extends Component {
  constructor (props) {
    super(props);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.pickStock = this.pickStock.bind(this);
    this.state = {
      stocks: this.props.stocks
    };
  }
  /**
   * handles drag start event
   * @param {Object} e react event object
   */
  dragStartHandler (e) {
    e.dataTransfer.setData('name', this.props.name);
  }
  /**
   * handles the click event on add button
   */
  pickStock () {
    this.props.pickStock(this.props.name);
  }
  render () {
    return (
      <div className="stock" draggable={true} onDragStart={this.dragStartHandler}>
        <div className="stock-info">
          <div className="stock-name">{this.props.name}</div>
          <div className="stock-description">Financial Services</div>
        </div>
        <div className="stock-price-details">
          <div className="stock-price">
            <span className="rupee-text">₹</span>
            {this.props.price}
          </div>
          <div className="stock-add-icon" onClick={this.pickStock}></div>
        </div>
      </div>
    );
  }
}
export default Stock;