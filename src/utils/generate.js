function randomValue () {
  return parseInt(Math.random() * 100, 10);
};

module.exports = function () {

  var _ = require('lodash'); //eslint-disable-line no-var

  return {
    nodes: _.times(100, function (n) {
      return {
        id: 'node:' + n,
        'data': [
          {
            'label': 'One',
            'value': randomValue()
          },
          {
            'label': 'Two',
            'value': randomValue()
          },
          {
            'label': 'Three',
            'value': randomValue()
          },
          {
            'label': 'Four',
            'value': randomValue()
          },
        ],
      };
    })
  };
};
