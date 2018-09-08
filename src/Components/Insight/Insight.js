import React, { Component } from 'react';
import FusionCharts from 'fusioncharts/core';
import Area2D from 'fusioncharts/viz/area2d';
import Gammel from 'fusioncharts/themes/es/fusioncharts.theme.candy';
import './Insight.css';

FusionCharts.addDep(Area2D);
FusionCharts.addDep(Gammel);

class Insight extends Component {
  constructor (props) {
    super(props);
    this.json = {
      chart: {
        theme: 'candy',
        xaxisname: this.props.yearString,
        yaxisname: 'price',
        'showXAxisLine': 1,
        'showYAxisLine': 1,
        'numberPrefix': '₹',
        'showValues': '0',
        'bgAlpha': 0,
        'canvasBgAlpha': 0,
        'showcanvasborder': 0,
        'showBorder': 0,
        'divLineAlpha': 60,
        'divLineDashed': 1,
        'divLineDashLen': 1,
        'showAlternateHGridColor': '0',
        'xAxisValuesStep': 3,
        'baseFontColor': '#666666',
        'usePlotGradientColor': '1',
        'plotGradientColor': '#3489D1',
        'plotFillColor': '#2BC4DD',
        'plotFillAlpha': 60,
        'plotBorderAlpha': '0',
        'baseFontSize': 8,
        'yAxisNameFontSize': 10,
        'xAxisNameFontSize': 10,
        'labelFontColor': '#666666',
        'labelFontsize': '12',
        'outcnvbasefontsize': '12',
        'outcnvbasefontcolor': '#666666',
        'drawcrossline': '0',
        animation: 1,
        initialAnimduration: 1,
        updateAnimduration: 2
      },
      data: props.data
    };
    FusionCharts.ready(() => {
      this.chart = new FusionCharts({
        type: 'area2d',
        renderAt: 'chart-container',
        height: '100%',
        width: '100%',
        dataFormat: 'json',
        dataSource: this.json,
        animation: {
          rule: {
            'update.dataset.area': {
              '*': [{
                slot: 'plot'
              }]
            }
          }
        }
      }).render();
    });
  }

  componentDidUpdate () {
    this.json.chart.xaxisname = this.props.yearString;
    this.json.data = this.props.data;
    this.chart.setChartData(this.json);
  }
  render () {
    return (
      <div className={`insight ${this.props.className}`}>
        <div className="caption">Portfolio Overview</div>
        <div className="chart" id="chart-container"></div>
      </div>
    );
  }
}
export default Insight;