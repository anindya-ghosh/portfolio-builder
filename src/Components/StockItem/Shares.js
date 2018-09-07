import React, { Component } from 'react';
import './Shares.css';
class Shares extends Component {
  constructor (props) {
    super(props);
    this.decrease = this.decrease.bind(this);
    this.increase = this.increase.bind(this);
    this.state = {
      share: 1
    };
  }
  decrease () {
    this.setState(prev => {
      return { share: prev.share > 1 ? prev.share - 1 : prev.share };
    });
    this.props.manageShare(-1);
  }

  increase () {
    this.setState(prev => {
      return { share: prev.share + 1 };
    });
    this.props.manageShare(1);
  }
  render () {
    let active = this.state.share === 1 ? '' : 'active';
    return <div className={`share ${this.props.className}`}>
      <div className={`decrease ${active}`}  onClick={this.decrease}></div>
      <div className="value">{this.state.share}</div>
      <div className="increase" onClick={this.increase}></div>
    </div>
  }
}

export default Shares;