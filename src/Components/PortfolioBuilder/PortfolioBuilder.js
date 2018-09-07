import React, {Component} from 'react';
import './PortfolioBuilder.css';
import StockPicker from '../StockPicker/index';
import PortfolioManager from '../PortfolioManager';

class PortfolioBuilder extends Component {
  constructor (props) {
    super(props);
    let data = props.data;
    this.stockPrice = data.price;
    this.stockEps = data.eps;
    this.stockHistorical = data.historical;
    this.state = {
      availableStock: Object.keys(this.stockPrice),
      addedInPortfolio: []
    };
    this.addToPortfolio = this.addToPortfolio.bind(this);
    this.removeFromPortfolio = this.removeFromPortfolio.bind(this);
  }
  addToPortfolio (_stockName) {
    this.setState(prevState => {
      return {
        availableStock: prevState.availableStock.filter(v => v !== _stockName),
        addedInPortfolio: [...prevState.addedInPortfolio, _stockName]
      };
    })
  }
  removeFromPortfolio (_stockName) {
    this.setState(prevState => {
      return {
        addedInPortfolio: prevState.addedInPortfolio.filter(v => v !== _stockName),
        availableStock: [...prevState.availableStock, _stockName]
      };
    })
  }
  render () {
    return (
      <div className="portfoliobuilder">
        <div className="header"></div>
        <div className="body">
          <div className="banner">
            smallcase Portfolio Builder
          </div>
          <StockPicker stocks={this.state.availableStock} price={this.stockPrice} pickStock={this.addToPortfolio}/>
          <PortfolioManager
            addedInPortfolio={this.state.addedInPortfolio}
            price={this.stockPrice}
            eps={this.stockEps}
            historical={this.stockHistorical}
            pickedStocks={this.addToPortfolio}
            removeFromPortfolio={this.removeFromPortfolio}
          />
        </div>
      </div>
    );
  }
}

export default PortfolioBuilder;