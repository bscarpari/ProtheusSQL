import React, { useEffect } from 'react'

import api from '../../../api'
import Chart from 'react-apexcharts'

import { formatDateTime } from '../../../utils'

const AreaChart = () => {
  const [options, setOptions] = React.useState({})
  const [dataSeries, setSeries] = React.useState([])
  const [hasData, setHasData] = React.useState(false)

  useEffect(() => {
    /*
      1) Pega o histórico de tentativas do usuário (json)
      2) Pega o número de tentativas, acertos e erros
      3) Cria um array com os dados para o gráfico
    */
    const backendInformations = api
      .get('/api/users/performance', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const { data } = res
        const { attemptHistory } = data

        if (!data) {
          setSeries([
            {
              name: 'Tentativas',
              data: [
                {
                  x: formatDateTime(new Date()),
                  y: 1,
                },
                {
                  x: formatDateTime(new Date() + 1),
                  y: 2,
                },
              ],
            },
            {
              name: 'Acertos',
              data: [
                {
                  x: formatDateTime(new Date()),
                  y: 1,
                },
                {
                  x: formatDateTime(new Date() + 1),
                  y: 1,
                },
              ],
            },
            {
              name: 'Erros',
              data: [
                {
                  x: formatDateTime(new Date()),
                  y: 0,
                },
                {
                  x: formatDateTime(new Date() + 1),
                  y: 0,
                },
              ],
            },
          ])
          return
        }

        const attempts = attemptHistory.map(({ createdAt, attempts }) => ({
          x: formatDateTime(createdAt),
          y: attempts,
        }))

        const correct = attemptHistory.map(({ createdAt, correct }) => ({
          x: formatDateTime(createdAt),
          y: correct,
        }))

        const incorrect = attemptHistory.map(({ createdAt, incorrect }) => ({
          x: formatDateTime(createdAt),
          y: incorrect,
        }))

        setSeries([
          {
            name: 'Tentativas',
            data: attempts,
          },
          {
            name: 'Acertos',
            data: correct,
          },
          {
            name: 'Erros',
            data: incorrect,
          },
        ])
      })

    if (backendInformations) setHasData(true)

    setOptions({
      series: [dataSeries],
      chart: {
        stacked: true,
        toolbar: {
          offsetX: 'left',
          offsetY: 8,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        curve: 'straight',
      },
      fill: {
        type: 'solid',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.7,
        },
      },
      legend: {
        fontFamily: 'Inter',
        fontWeight: 400,
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: '#fff',
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#7259FD',
          shadeTo: 'dark',
        },
      },
      grid: {
        show: false,
      },
    })
  }, [])

  return (
    <>
      {hasData ? (
        <span>
          <h1 className='text-sm'>
            Não há dados suficientes para gerar o gráfico
          </h1>
        </span>
      ) : (
        <Chart
          type={'area'}
          width={'100%'}
          height={200}
          options={options}
          series={dataSeries}
        />
      )}
    </>
  )
}

export default AreaChart
