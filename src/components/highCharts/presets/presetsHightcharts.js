export const presetsHightcharts = {
  chart: {
    animation: false,
    zoomType: 'x',
    height: 500,
  },
  time: {
    timezoneOffset: -5 * 60
  },
  rangeSelector: {
    enabled: true,
    buttons: [{
      type: 'minute',
      count: 1,
      text: '1m',
      title: 'Просмотр за 1 минуту'
    }, {
      type: 'minute',
      count: 3,
      text: '3m',
      title: 'Просмотр за 3 минуты'
    },
      {
        type: 'all',
        text: '5m',
        title: 'Просмотр за всё время (за 5 минут)'
      }],
    inputEnabled: false,
  },

}
