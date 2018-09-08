import React, { Component } from 'react';
import Title from '../Title/index';
import './PortfolioManager.css';
import StockItem from '../StockItem/index';
import Insight from '../Insight/index';

const months = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'Mar.',
  '4': 'Apr.',
  '5': 'May ',
  '6': 'June',
  '7': 'July',
  '8': 'Aug.',
  '9': 'Sept.',
  '10': 'Oct. ',
  '11': 'Nov.',
  '12': 'Dec.'
}
class PortfolioManager extends Component {
  constructor (props) {
    super(props);
    this.shareMap = {};
    this.dropHandler = this.dropHandler.bind(this);
    this.manageShare = this.manageShare.bind(this);
    this.removeFromPortfolio = this.removeFromPortfolio.bind(this);
    this.newDrop = false;
    this.state = {
      netWorth: 0,
      pe: 0,
      data: [],
      yearString: ''
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
      let netWorth;
      this.setState({
        netWorth: (netWorth = this.calculateNetWorth()),
        ...this.parseDataForInsight(),
        pe: this.calculatePE(netWorth)
      });
      this.newDrop = false;
    }
  }
  /*
    handling drag and drop 
  */
  /**
   * drop handler method
   * @param {Object} e react event object
   */
  dropHandler (e) {
    let name = e.dataTransfer.getData('name');
    this.props.pickedStocks(name);
  }
  /**
   * drag over handler method
   * @param {Object} e react event object
   */
  dragOverHandler (e) {
    // invoking e.preventDefault(), otherwise the drop event will never fire for some browsers
    // also we do not need this event
    e.preventDefault();
  }
  /*
    managing portfolio
  */
  removeFromPortfolio (name) {
    let netWorth;
    delete this.shareMap[name];
    this.setState({
      netWorth: (netWorth = this.calculateNetWorth()),
      ...this.parseDataForInsight(),
      pe: this.calculatePE(netWorth)
    });
    this.props.removeFromPortfolio(name);
  }
  /*
    managing shares
  */
  getAllShares () {
    return this.shareMap;
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
  manageShare (name, share) {
    if (this.setShare(name, share)){
      let netWorth;
      this.setState({
        netWorth: (netWorth = this.calculateNetWorth()),
        ...this.parseDataForInsight(),
        pe: this.calculatePE(netWorth)
      });
    }
  }
  /**
   * calculate net worth
   */
  calculateNetWorth () {
    return Object.keys(this.getAllShares()).reduce((sum, v) => {
      return sum + ((+this.getShares(v)) * (+this.props.price[v]));
    }, 0).toFixed(2);
  }
  /**
   * calculate weight for a stock
   */
  calculateWeight (name) {
    return (+this.props.price[name] * +this.getShares(name) / this.state.netWorth * 100).toFixed(0);
  }
  /*
   * it calculates price to earning ratio 
   */
  calculatePE (netWorth) {
    return (netWorth / Object.keys(this.getAllShares()).reduce((sum, v) => {
      return sum + ((+this.getShares(v)) * (+this.props.eps[v]));
    }, 0)).toFixed(2);
  }
  /*
    parse data to render chart
   */
  parseDataForInsight () {
    let data = [],
      yearString,
      minYear = 9999,
      maxYear = 0;

    Object.keys(this.getAllShares()).forEach(v => {
      this.props.historical[v].point.forEach((p, i) => {
        let datum = data[i] || (data[i] = {}),
          fullDate = p.date.split('T')[0].split('-');
          // month = months[+fullDate[1]],
          // date = fullDate[2];

        datum.label = `${i}`; //`${month} ${date}`
        !datum.value && (datum.value = 0);
        datum.value += (p.price * this.getShares(v));
        if (minYear > +fullDate[0]) {
          minYear = +fullDate[0];
        }
        if (maxYear < +fullDate[0]) {
          maxYear = +fullDate[0];
        }
      })
    });
    if (minYear === maxYear) {
      yearString = `year of ${minYear}`;
    } else {
      yearString = `year of ${minYear} - ${maxYear}`;
    }
    return {
      data,
      yearString
    };
  }
  /**
   * render function for stock items
   */
  renderStockItems () {
    return <React.Fragment>
      {
        this.props.addedInPortfolio.map(name => {
          let weight = this.calculateWeight(name);
          return <StockItem 
            name={name}
            key={name}
            price={this.props.price[name]}
            weight={weight}
            removeFromPortfolio={this.removeFromPortfolio}
            manageShare={this.manageShare}/>
        })
      }
    </React.Fragment>
  }
  /**
   * render function for the component
   */
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
              pick stocks from list
            </div>
            <div className="portfolio-table-body">
              { this.renderStockItems() }
            </div>
          </div>
          <Insight 
            className="portfolio-insight"
            data={this.state.data}
            yearString={this.state.yearString}
          />
          <div className="portfolio-summary">
            <div className="summary">
              <div className="summary-row">
                <div className="stocks-summary">
                  <div className="summary-label">Stocks</div>
                  <div className="summary-value">{this.props.addedInPortfolio.length}</div>
                </div>
                <div className="net-summary">
                  <div className="summary-label">Net Worth</div> 
                  <div className="summary-value">₹{this.state.netWorth}</div>
                </div>
              </div>
              <div className="summary-row">
                <div className="pe-summary">
                  <div className="summary-label">P/E Ratio</div>
                  <div className="summary-value">{this.state.pe}</div>
                </div>
              </div>
            </div>
            <div className="build-button">BUILD PORTFOLIO</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioManager;