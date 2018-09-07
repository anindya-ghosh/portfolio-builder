import React, { Component } from 'react';
import Title from '../Title/index';
import './PortfolioManager.css';
import StockItem from '../StockItem/index';

class PortfolioManager extends Component {
  constructor (props) {
    super(props);
    this.shareMap = {};
    this.dropHandler = this.dropHandler.bind(this);
    this.manageShare = this.manageShare.bind(this);
    this.removeFromPortfolio = this.removeFromPortfolio.bind(this);
    this.newDrop = false;
    this.state = {
      netWorth: 0
    }
  }
  componentDidUpdate () {
    let newDropArrived = false;
    this.props.addedInPortfolio.forEach(v => {
      if (!this.shareMap[v]) {
        this.shareMap[v] = 1;
        newDropArrived = true;
      }
    });
    if (newDropArrived) {
      this.setState({
        netWorth: Object.keys(this.shareMap).reduce((sum, v) => {
          return sum + ((+this.shareMap[v]) * (+this.props.price[v]));
        }, 0)
      })
      this.newDrop = false;
    }
  }
  dropHandler (e) {
    let name = e.dataTransfer.getData('name');
    this.props.pickedStocks(name);
  }
  dragOverHandler (e) {
    e.preventDefault();
  }

  getShares (name) {
    return this.shareMap[name];
  }
  setShare (name, value) {
    if (!this.shareMap[name]) {
      this.shareMap[name] = 1;
    }
    if ((this.shareMap[name] + value) > 0) {
      this.shareMap[name] += value;
      return true;
    }
    return false;
  }
  getShareList () {
    return Object.keys(this.shareMap);
  }

  calculateNetWorth () {
    this.setState({
      netWorth: this.getShareList().reduce((sum, v) => {
        return sum + ((+this.getShares(v)) * (+this.props.price[v]));
      }, 0)
    });
  }
  calculateWeight (name) {
    return (+this.props.price[name] * +this.getShares(name) / this.state.netWorth * 100).toFixed(0);
  }
  manageShare (name, share) {
    this.setShare(name, share) && this.calculateNetWorth();
  }
  removeFromPortfolio (name) {
    delete this.shareMap[name];
    this.calculateNetWorth();
    this.props.removeFromPortfolio(name);
  }
  renderStockItems () {
    return <React.Fragment>
      {
        this.props.addedInPortfolio.map(name => {
          let share = this.getShares(name),
            weight = this.calculateWeight(name);
          return <StockItem 
            name={name}
            key={name}
            price={this.props.price[name]}
            share={share}
            weight={weight}
            removeFromPortfolio={this.removeFromPortfolio}
            manageShare={this.manageShare}/>
        })
      }
    </React.Fragment>
  }
  render () {
    let isEmpty = this.props.addedInPortfolio.length ? '' : 'empty';
    return (
      <div className="portfoliomanager">
        <Title className="portfoliomanager-title" title="MANAGE PORTFOLIO"/>
        <div className="portfolio-playground">
          <div className="portfolio-table" onDrop={this.dropHandler} onDragOver={this.dragOverHandler} >
            <div className="table-header">
              <div className="header-values">STOCK</div>
              <div className="header-values">PRICE</div>
              <div className="header-values">SHARES</div>
              <div className="header-values">WEIGHT</div>
            </div>
            <div className={isEmpty} style={{display: 'none'}}>
              pick a stock
            </div>
            <div className="portfolio-table-body">
              { this.renderStockItems() }
            </div>
          </div>
          <div className="portfolio-insight"></div>
          <div className="portfolio-summary"></div>
        </div>
      </div>
    );
  }
}

export default PortfolioManager;