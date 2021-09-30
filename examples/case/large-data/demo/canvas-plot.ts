import { PixelPlot } from '@antv/g2plot';

function fetchRawData() {
  return fetch('https://gw.alipayobjects.com/os/bmw-prod/d3bec0a1-737d-4ff8-b2c2-3bec766ba617.json').then((data) =>
    data.json()
  );
}
function fetchPixelData() {
  return fetch('https://gw.alipayobjects.com/os/antfincdn/eMjWBsbpkV/renderPixelsData.json').then((data) =>
    data.json()
  );
}

Promise.all([fetchRawData(), fetchPixelData()]).then(([rawData, pixelData]) => {
  const plot = new PixelPlot('container', {
    rawData,
    pixelData, // 暂时以外部方式请求拿到 pixels数据，接口内置后取消该写法
    width: 1100,
    height: 600,
    padding: 50,
    xField: 'date',
    yField: 'high',
    seriesField: 'name',
    meta: {
      date: {
        type: 'time',
      },
    },
    xAxis: {
      top: true,
    },
    yAxis: {
      top: true,
    },
  });

  plot.render();

  setTimeout(() => {
    // plot.changeData(data.slice(0, data.length / 2));
  }, 5000);
});


import { Line } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/bmw-prod/d3bec0a1-737d-4ff8-b2c2-3bec766ba617.json')
  .then((res) => res.json())
  .then((data) => {
console.time(`render ${data.length} 条数据`);
    const line = new Line('container', {
      data,
      xField: 'date',
      yField: 'high',
      seriesField: 'name',
      color: 'steelblue',
meta: {
date: {
type: 'time'
},

   interactions: [{ type: 'element-active' }],
      tooltip: true,

     state: {
    // 设置 active 激活状态的样式
    active: {
      style: {
        lineWidth: 2,
        stroke: 'red',
      },
    },
  }


}
 
    });

    line.render();
console.timeEnd(`render ${data.length} 条数据`);
  });

