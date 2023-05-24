import Editor from 'react-simple-code-editor'
import React, { useState, useEffect } from 'react'
import { Tabs } from 'react-daisyui'

import api from '../../../api'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-sql'
import 'prism-themes/themes/prism-coldark-dark.css'

import { FaPlay, FaStop } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-toastify'

const CodeEditor = ({ terminal }) => {
  const token = localStorage.getItem('token')

  const [history, setHistory] = useState([])
  const [tabValue, setTabValue] = React.useState(0)
  const [showOutput, setOutput] = useState({
    output: true,
    history: false,
  })

  const [code, setCode] = useState('')
  const [response, setResponse] = useState([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    try {
      const getHistory = async () => {
        const res = await api.get('/api/queries/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res) return toast.error('Erro ao carregar histórico de consultas')

        const { data } = res
        const history = data.history

        // Se o history for maior que 0, sete o history
        if (history.length > 0) {
          // Estruture os dados para exibir a data formatada e a query
          const historyFormatted = history.map((item) => {
            const date = new Date(item.date)
            const dateFormatted = date.toLocaleString('pt-BR')

            return {
              query: item.query,
              date: dateFormatted,
            }
          })

          return setHistory(historyFormatted)
        }

        setHistory([])
      }
      getHistory()
    } catch (err) {
      toast.error(err)
    }
  }, [])

  const handleClear = () => {
    setCode('')
  }

  const handleRun = () => {
    try {
      api
        .post(
          '/api/queries/query',
          {
            query: code,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.data[0].length === 0) {
            setError('')
            setSuccess('')
            setInfo('Executado, mas nenhum resultado de retorno encontrado')
            return setResponse([])
          }

          if (res.data[0].length > 0) {
            setError('')
            setSuccess('Consulta realizada com sucesso')
            setInfo('')
            return setResponse(res.data[0])
          }

          setSuccess('')
          setError('')
          setInfo('')
          setResponse(res.data[0])
        })
        .catch((err) => {
          setError(err.response?.data || err)
          setResponse([])
        })
    } catch (err) {
      toast.error(err)
    }
  }

  const changeContent = () => {
    if (tabValue === 0) {
      setTabValue(1)
      setOutput({ output: false, history: true })
    } else {
      setTabValue(0)
      setOutput({ output: true, history: false })
    }
  }

  return (
    <div className='flex h-full w-full flex-col'>
      {/* Code editor */}
      <div className='h-full min-h-[50vh] min-w-full'>
        <div className='bg-black100 relative left-0 right-0 flex items-center justify-between px-4 py-2'>
          <div className='flex items-center justify-center'>
            <button className='mr-2 rounded-md px-2 py-1' onClick={handleRun}>
              <FaPlay
                size={18}
                style={{
                  fill: '#25AD6B',
                }}
              />
            </button>
            <button className='px-2 py-1 text-orange-300'>
              <FaStop size={20} />
            </button>
          </div>
          <div className='flex items-center justify-center'>
            <button className='px-2 py-1 text-gray-300' onClick={handleClear}>
              <TiDeleteOutline size={28} />
            </button>
          </div>
        </div>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => highlight(code, languages.sql)}
          padding={20}
          maxLength={1000}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
          className='relative h-full !overflow-auto whitespace-nowrap text-white'
        />
      </div>

      {/* Output */}
      <div className='h-full min-h-[50vh] w-full min-w-full overflow-x-hidden'>
        {terminal && (
          <Tabs value={tabValue} onChange={changeContent}>
            <Tabs.Tab value={0}>Comandos</Tabs.Tab>
            <Tabs.Tab value={1}>Histórico</Tabs.Tab>
          </Tabs>
        )}

        {showOutput.output && (
          <div className='flex h-full w-full flex-col ' id='output'>
            {error && (
              <div className='direction-normal relative my-3 mx-3 animate-bounce rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700'>
                <strong className='font-bold'>Error: </strong>
                <span className='block'>{error}</span>
              </div>
            )}
            {info && !error && (
              <div className='relative my-3 mx-3 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700'>
                <strong className='font-bold'>Info: </strong>
                <span className='block'>{info}</span>
              </div>
            )}
            <div className='h-full max-h-32 w-full max-w-full overflow-auto'>
              {success && !error && (
                <div className='text-black100 relative my-3 mx-3 rounded border border-green-400 bg-green-100 px-4 py-3'>
                  <strong className='font-bold'>Sucesso: </strong>
                  <span className='block'>{success}</span>
                </div>
              )}
              {response && (
                <table className='my-2 mx-2 min-w-full divide-y divide-gray-200 border'>
                  <thead className='bg-gray-50'>
                    <tr>
                      {Object.keys(response[0] || {}).map((key) => (
                        <th
                          key={key}
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                    {/* Exibe sucesso somente se for um comando que não retorna dados */}

                    {response.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, index) => (
                          <td
                            key={index}
                            className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {showOutput.history && (
          <div
            className='mx-4 flex h-full flex-col overflow-auto py-3'
            id='history'
            style={{
              maxHeight: '300px',
            }}
          >
            {history.length === 0 ? (
              <span>
                Histórico vazio. Execute algum comando para ver o histórico.
              </span>
            ) : (
              <table className='my-2 mx-2 divide-y divide-gray-200 overflow-auto'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Comando
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                    >
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-black200 divide-y divide-gray-100'>
                  {history?.map((row, index) => (
                    <tr key={index}>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        {row.query}
                      </td>
                      {row.date}
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeEditor
