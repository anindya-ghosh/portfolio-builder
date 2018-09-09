import React, {Component} from 'react';
import Title from '../Title/index';
import Filter from './Filter';
import Stock from '../Stock/index';
import NavigationButton from '../NavigationButton/index';
import { sortFn } from '../../lib/index';
import './StockPicker.css';

const pageSize = 8;

class StockPicker extends Component {
  constructor (props) {
    super(props);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);

    this.state = {
      pageNumber: 0,
      isPrevActive: false,
      isNextActive: pageSize < props.stocks.length
    };
  }
  componentDidUpdate () {
    this.adjustPageNumber();
  }
  /**
   * adjust page number when there is no card in the page
   */
  adjustPageNumber () {
    if (this.state.pageNumber > this.getTotalPageNumber() && (this.state.pageNumber - 1) > -1) {
      this.setState(prevState => {
        return { pageNumber: prevState.pageNumber - 1 };
      });
    }
  }
  /**
   * handle prev navigation
   */
  goToPrevPage () {
    this.setState(prevState => {;
      return {
        pageNumber: prevState.pageNumber > 0 ? prevState.pageNumber - 1 : prevState.pageNumber
      };
    });
  }
  /**
   * handle next navigation
   */
  goToNextPage () {
    this.setState(prevState => {
      return {
        pageNumber: prevState.pageNumber < this.getTotalPageNumber() ? prevState.pageNumber + 1 : prevState.pageNumber
      };
    });
  }
  /**
   * calculate total page number
   */
  getTotalPageNumber () {
    return Math.ceil(this.props.stocks.length / pageSize) - 1;
  }
  /**
   * return total count of stocks
   */
  getTotalStockCount () {
    return this.props.stocks.length;
  }
  /**
   * calculate page stock count details
   */
  getVisualRange () {
    let pageNumber = this.state.pageNumber,
      min = pageNumber * pageSize,
      max = (pageNumber + 1) * pageSize,
      total = this.getTotalStockCount();
    (max > total) && (max = total);
    return [
      min,
      max
    ];
  }
  /**
   * get list of stocks in current page
   */
  getCurrStockList () {
    return this.props.stocks.sort(sortFn).slice(...this.getVisualRange());
  }
  /**
   * render all the available stocks with info
   */
  renderStocks () {
    console.log(this.getCurrStockList().sort(sortFn));
    return <React.Fragment>
      {
        this.getCurrStockList().map(v => {
          return <Stock name={v} key={v} price={this.props.price[v]} pickStock={this.props.pickStock}/>
        })
      }
    </React.Fragment>
  }
  /**
   * render stockpicker component
   */
  render () {
    let isPrevActive = this.state.pageNumber > 0 ? 'active' : '',
      isNextActive = this.state.pageNumber < this.getTotalPageNumber() ? 'active' : '',
      [min, max] = this.getVisualRange(),
      total = this.getTotalStockCount();
    return (
      <div className="stockpicker">
        <Title className="stockpicker-title" title="PICK STOCKS"/>
          <div className="stock-page">
            <div className="stock-header">
              <div className="stock-description">
                Showing {min} - {max} of {total} matching stocks
              </div>
              <Filter value={3}/>
            </div>
            <div className="stock-body">
              <div className="stock-area">
                {this.renderStocks()}
              </div>
              <div className="stock-nav">
                <NavigationButton value="PREV" className={isPrevActive} navigate={this.goToPrevPage}/>
                <NavigationButton value="NEXT" className={isNextActive} navigate={this.goToNextPage}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default StockPicker;