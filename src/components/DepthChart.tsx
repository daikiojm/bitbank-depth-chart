import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useDepth } from 'react-use-bitbank';

import { DEPTH_PRICE_INDEX, DEPTH_AMOUNT_INDEX } from '../constants';

const pair = 'btc_jpy';

type Depth = {
  price: number;
  volume: number;
};

type DepthWithStackedVolume = Depth & {
  stackedVolume: Depth['volume'];
};

const defaultChartOptions: Partial<Options> = {
  title: {
    text: 'ETH-BTC Market Depth',
  },
  xAxis: {
    minPadding: 0,
    maxPadding: 0,
    plotLines: [
      {
        color: '#888',
        value: 0.1523,
        width: 1,
        label: {
          text: 'Actual price',
          rotation: 90,
        },
      },
    ],
    title: {
      text: 'Price',
    },
  },
  yAxis: [
    {
      lineWidth: 1,
      gridLineWidth: 1,
      title: undefined,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: 'inside',
      labels: {
        align: 'left',
        x: 8,
      },
    },
    {
      opposite: true,
      linkedTo: 0,
      lineWidth: 1,
      gridLineWidth: 0,
      title: undefined,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: 'inside',
      labels: {
        align: 'right',
        x: -8,
      },
    },
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
      step: 'center',
    },
  },
  tooltip: {
    headerFormat:
      '<span style="font-size=10px;">Price: {point.key}</span><br/>',
    valueDecimals: 2,
  },
  series: [
    {
      name: 'Bids',
      type: 'area',
      data: [],
      color: '#03a7a8',
    },
    {
      name: 'Asks',
      type: 'area',
      data: [],
      color: '#fc5857',
    },
  ],
};

const DepthChart: React.VFC = () => {
  const depth = useDepth(pair, 200);
  const [options, setOptions] = useState<Options>(defaultChartOptions);

  const asksWithStackedVolume = useMemo<DepthWithStackedVolume[]>(() => {
    return depth.asks.reduce((prev, curr) => {
      const next: DepthWithStackedVolume = {
        price: +curr[DEPTH_PRICE_INDEX],
        volume: +curr[DEPTH_AMOUNT_INDEX],
        stackedVolume:
          prev.length > 0
            ? prev[prev.length - 1].stackedVolume + +curr[DEPTH_AMOUNT_INDEX]
            : 0,
      };
      return [...prev, next];
    }, [] as DepthWithStackedVolume[]);
  }, [depth.asks]);

  const bidsWithStackedVolume = useMemo<DepthWithStackedVolume[]>(() => {
    return depth.bids.reduce((prev, curr) => {
      const next: DepthWithStackedVolume = {
        price: +curr[DEPTH_PRICE_INDEX],
        volume: +curr[DEPTH_AMOUNT_INDEX],
        stackedVolume:
          prev.length > 0
            ? prev[prev.length - 1].stackedVolume + +curr[DEPTH_AMOUNT_INDEX]
            : 0,
      };
      return [...prev, next];
    }, [] as DepthWithStackedVolume[]);
  }, [depth.bids]);

  useEffect(() => {
    setOptions((prev) => {
      return {
        ...prev,
        series: [
          {
            ...defaultChartOptions.series![0],
            data: bidsWithStackedVolume.map((b) => [
              +b.price,
              +b.stackedVolume,
            ]) as any,
          },
          {
            ...defaultChartOptions.series![1],
            data: asksWithStackedVolume.map((a) => [
              +a.price,
              +a.stackedVolume,
            ]) as any,
          },
        ],
      };
    });
  }, [asksWithStackedVolume, bidsWithStackedVolume]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Box>
  );
};

export default DepthChart;
