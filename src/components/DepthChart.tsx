import React, { useEffect, useMemo, useRef } from 'react'
import { Box, Fade, CircularProgress, useTheme } from '@mui/material'
import Highcharts, { Options } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useDepth } from 'react-use-bitbank'

import { Pair } from '@/types'
import { DEPTH_PRICE_INDEX, DEPTH_AMOUNT_INDEX } from '@/constants'
import { isJpyPair } from '@/utils'

const DEPTH_LENGTH = 200
const DEPTH_BTC_PAIR_LENGTH = 50
const CHART_ENTER_DELAY = 1500

type Depth = {
  price: number
  volume: number
}

type DepthWithStackedVolume = Depth & {
  stackedVolume: Depth['volume']
}

type Props = {
  pair?: Pair
}

const defaultChartOptions: Partial<Options> = {
  title: undefined,
  chart: {
    height: 500,
  },
  loading: {
    hideDuration: 300,
    showDuration: 300,
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
    headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
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
}

const getDepthLength = (pair: Pair) => (isJpyPair(pair) ? DEPTH_LENGTH : DEPTH_BTC_PAIR_LENGTH)

const DepthChart: React.VFC<Props> = ({ pair = 'btc_jpy' }) => {
  const theme = useTheme()
  const depth = useDepth(pair, getDepthLength(pair))
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)
  const [chartVisible, setChartVisible] = React.useState(false)

  const asksWithStackedVolume = useMemo<DepthWithStackedVolume[]>(() => {
    return depth.asks.reduce<DepthWithStackedVolume[]>((prev, curr) => {
      const next: DepthWithStackedVolume = {
        price: +curr[DEPTH_PRICE_INDEX],
        volume: +curr[DEPTH_AMOUNT_INDEX],
        stackedVolume: prev.length > 0 ? prev[prev.length - 1].stackedVolume + +curr[DEPTH_AMOUNT_INDEX] : 0,
      }
      return [...prev, next]
    }, [])
  }, [depth.asks])

  const bidsWithStackedVolume = useMemo<DepthWithStackedVolume[]>(() => {
    return depth.bids.reduce<DepthWithStackedVolume[]>((prev, curr) => {
      const next: DepthWithStackedVolume = {
        price: +curr[DEPTH_PRICE_INDEX],
        volume: +curr[DEPTH_AMOUNT_INDEX],
        stackedVolume: prev.length > 0 ? prev[prev.length - 1].stackedVolume + +curr[DEPTH_AMOUNT_INDEX] : 0,
      }
      return [...prev, next]
    }, [])
  }, [depth.bids])

  useEffect(() => {
    setChartVisible(false)
    const timer = setTimeout(() => setChartVisible(true), CHART_ENTER_DELAY)
    return () => clearTimeout(timer)
  }, [pair])

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        chart: {
          backgroundColor: theme.palette.background.default,
        },
      })
    }
  }, [theme.palette.mode])

  useEffect(() => {
    if (chartComponentRef.current) {
      chartComponentRef.current.chart.update({
        series: [
          {
            ...defaultChartOptions.series![0],
            data: bidsWithStackedVolume.map((b) => [+b.price, +b.stackedVolume]) as any,
          },
          {
            ...defaultChartOptions.series![1],
            data: asksWithStackedVolume.map((a) => [+a.price, +a.stackedVolume]) as any,
          },
        ],
      })
    }
  }, [pair, asksWithStackedVolume, bidsWithStackedVolume])

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      {!chartVisible && <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-20px' }} />}
      <Fade in={chartVisible} mountOnEnter={false}>
        <Box sx={{ width: '100%' }}>
          <HighchartsReact ref={chartComponentRef} highcharts={Highcharts} options={defaultChartOptions} />
        </Box>
      </Fade>
    </Box>
  )
}

export default DepthChart
