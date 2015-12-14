import d3 from 'd3';

export function mockSinCos () {
  let sin = [];
  let cos = [];

  for (let i = 0; i < 100; i++) {
    sin.push({ x: i, y: Math.sin(i/10) });
    cos.push({ x: i, y: .5 * Math.cos(i/10) });
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

function streamLayers (n, m, o) {
  if (arguments.length < 3) o = 0;
  function bump (a) {
    let x = 1 / (.1 + Math.random());
    let y = 2 * Math.random() - .5;
    let z = 10 / (.1 + Math.random());

    for (let i = 0; i < m; i++) {
      let w = (i / m - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  return d3.range(n).map(function () {
    let a = [], i;
    for (i = 0; i < m; i++) a[i] = o + o * Math.random();
    for (i = 0; i < 5; i++) bump(a);
    return a.map(streamIndex);
  });
}

function streamIndex (d, i) {
  return { x: i, y: Math.max(0, d) };
}

export function exampleData () {
  return streamLayers(3,10+Math.random()*100,.1).map((data, i) => {
    return {
      key: 'Stream #' + i,
      values: data
    };
  });
}

export const horizontalMock = [
  {
    key: 'Series 1',
    color: '#d67777',
    values: [
      {
        label: 'Group A',
        value: -1.8746444827653
      },
      {
        label: 'Group B',
        value: -8.0961543492239
      },
      {
        label: 'Group C',
        value: -0.57072943117674
      },
      {
        label: 'Group D',
        value: -2.4174010336624
      },
      {
        label: 'Group E',
        value: -0.72009071426284
      },
      {
        label: 'Group F',
        value: -0.77154485523777
      },
      {
        label: 'Group G',
        value: -0.90152097798131
      },
      {
        label: 'Group H',
        value: -0.91445417330854
      },
      {
        label: 'Group I',
        value: -0.055746319141851
      }
    ]
  },
  {
    key: 'Series 2',
    color: '#4f99b4',
    values: [
      {
        label: 'Group A',
        value: 25.307646510375
      },
      {
        label: 'Group B',
        value: 16.756779544553
      },
      {
        label: 'Group C',
        value: 18.451534877007
      },
      {
        label: 'Group D',
        value: 8.6142352811805
      },
      {
        label: 'Group E',
        value: 7.8082472075876
      },
      {
        label: 'Group F',
        value: 5.259101026956
      },
      {
        label: 'Group G',
        value: 0.30947953487127
      },
      {
        label: 'Group H',
        value: 0
      },
      {
        label: 'Group I',
        value: 0
      }
    ]
  }
];

export const donutMock = [
  {
    'label': 'One',
    'value' : 29.765957771107
  } ,
  {
    'label': 'Two',
    'value' : 0
  } ,
  {
    'label': 'Three',
    'value' : 32.807804682612
  } ,
  {
    'label': 'Four',
    'value' : 196.45946739256
  } ,
  {
    'label': 'Five',
    'value' : 0.19434030906893
  } ,
  {
    'label': 'Six',
    'value' : 98.079782601442
  } ,
  {
    'label': 'Seven',
    'value' : 13.925743130903
  } ,
  {
    'label': 'Eight',
    'value' : 5.1387322875705
  }
];

