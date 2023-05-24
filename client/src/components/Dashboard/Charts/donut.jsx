import React from 'react'
import Chart from 'react-apexcharts'

import { ChartContainer } from './style'
import { useEffect } from 'react'
import api from '../../../api'

const Donut = () => {
  const [options, setOptions] = React.useState({})
  const [series, setSeries] = React.useState([0, 0])

  useEffect(() => {
    api
      .get('/api/users/performance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const { data } = res
        console.log(data)
        const { forumPosts, forumReplies } = data

        if (!data) {
          setSeries([0, 0])
          return
        }
        setSeries([forumPosts, forumReplies])
      })

    setOptions({
      labels: ['Respostas', 'Interações'],
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            expandOnClick: true,
            customScale: 1,
            size: '70%',
            labels: {
              show: true,
              name: {
                offsetY: 20,
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '18px',
                fontFamily: 'Inter',
                fontWeight: 600,
                color: '#ffffff',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b
                  }, 0)
                },
              },
              value: {
                show: true,
                fontSize: '18px',
                fontFamily: 'Inter',
                fontWeight: 400,
                color: '#fff',
                offsetY: -20,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        fontSize: '16px',
        fontFamily: 'Inter',
        offsetY: 20,
        fontWeight: 400,
        labels: {
          colors: '#fff',
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#7259FD',
          shadeTo: 'light',
        },
      },
    })
  }, [])

  return (
    <ChartContainer>
      <Chart type='donut' width={'100%'} options={options} series={series} />
    </ChartContainer>
  )
}

export default Donut
