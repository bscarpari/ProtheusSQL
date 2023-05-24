import React from 'react'
import { useEffect } from 'react'

import Chart from 'react-apexcharts'
import api from '../../../api'

import { ChartContainer } from './style'

const RadialBar = () => {
  const [options, setOptions] = React.useState({})
  const [series, setSeries] = React.useState([0, 0])

  useEffect(() => {
    api.post('/api/users/status').then((res) => {
      const { data } = res
      const { online, offline } = data

      if (!data) return
      setSeries([online, offline])

      setOptions({
        labels: ['Online', 'Offline'],
        stroke: {
          lineCap: 'round',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: 20,
              },
              total: {
                show: true,
                showAlways: false,
                label: 'Total',
                fontSize: '18px',
                fontFamily: 'Inter',
                fontWeight: '600',
                color: '#ffffff',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                },
              },
              value: {
                offsetY: -20,
                color: '#ffffff',
                fontFamily: 'Inter',
                fontSize: '20px',
                show: true,
              },
            },
          },
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'dark',
            color: '#7259FD',
          },
        },
        legend: {
          show: true,
          fontSize: '16px',
          fontFamily: 'Inter',
          fontWeight: 400,
          offsetY: 30,
          labels: {
            colors: '#fff',
          },
        },
      })
    })
  }, [])

  return (
    <ChartContainer>
      <div className='max-h-[140px]'>
        <Chart
          width={'100%'}
          type={'radialBar'}
          options={options}
          series={series}
        />
      </div>
    </ChartContainer>
  )
}

export default RadialBar
