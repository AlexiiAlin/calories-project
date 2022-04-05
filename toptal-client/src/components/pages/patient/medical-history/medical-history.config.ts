import Highcharts from "highcharts";

export const highchartsOptions: Highcharts.Options = {
  title: {
    text: 'Medical history'
  },
  subtitle: {
    text: ''
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  xAxis: {},
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
    }
  },
  series: [],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
};
