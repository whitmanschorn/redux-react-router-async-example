function randomValue () {
  return parseInt(Math.random() * 100, 10);
};

module.exports = function () {

  var _ = require('lodash'); //eslint-disable-line no-var

  return {
    nodes: _.times(100, function (n) {
      return {
        id: 'node:' + n,
        data: {
          volume: [
            {
              label: 'Comorbid',
              value: randomValue()
            },
            {
              label: 'Undiagnosed',
              value: randomValue()
            },
            {
              label: 'BH Only',
              value: randomValue()
            },
            {
              label: 'Chronic Only',
              value: randomValue()
            },
          ],
          cost: [
            {
              label: 'Comorbid',
              value: randomValue()
            },
            {
              label: 'Undiagnosed',
              value: randomValue()
            },
            {
              label: 'BH Only',
              value: randomValue()
            },            {
              label: 'Chronic Only',
              value: 0
            },
          ],
        }
      };
    })
  };
};
