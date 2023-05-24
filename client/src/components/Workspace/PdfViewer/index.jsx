import { useState, useEffect } from 'react'

import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import { dropPlugin } from '@react-pdf-viewer/drop'

// Styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/drop/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import pt_PT from '@react-pdf-viewer/locales/lib/pt_PT.json'
import { toast } from 'react-toastify'

const PdfViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const dropPluginInstance = dropPlugin()

  const [pdfFile, setPdfFile] = useState(null)

  const allowedFiles = ['application/pdf', 'image/jpeg', 'image/png']

  const handleFile = (e) => {
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(`${selectedFile.type}`)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = (e) => {
          setPdfFile(e.target.result)
          localStorage.setItem('pdfFile', e.target.result)
        }
      } else {
        toast.error('Selecione somente arquivos do tipo PDF, JPEG ou PNG')
        setPdfFile('')
      }
    } else {
      console.log('please select a file')
    }
  }

  const isImage = pdfFile && pdfFile.startsWith('data:image/')

  useEffect(() => {
    const pdfFromStorage = localStorage.getItem('pdfFile')
    if (pdfFromStorage) {
      setPdfFile(pdfFromStorage)
    }
  }, [pdfFile])

  return (
    <div className='relative h-full'>
      <form className='absolute'>
        {!pdfFile && (
          <label
            htmlFor='fileInput'
            className='bg-primary relative top-5 rounded-md p-3 text-white'
          >
            Selecionar arquivo
          </label>
        )}
        <input
          type='file'
          id='fileInput'
          className='hidden'
          onChange={handleFile}
        ></input>
      </form>
      <div>
        {/* Botão para remover arquivo atual */}
        {pdfFile && (
          <button
            className='bg-primary absolute top-5 right-5 z-50 rounded-md p-3 text-white'
            onClick={() => {
              setPdfFile('')
              localStorage.removeItem('pdfFile')
            }}
          >
            Remover arquivo
          </button>
        )}
      </div>
      <div className='h-full'>
        {isImage ? (
          <img className='h-full w-full object-contain' src={pdfFile} alt='' />
        ) : (
          pdfFile && (
            <Worker workerUrl='https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js'>
              <Viewer
                theme='dark'
                localization={pt_PT}
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance, dropPluginInstance]}
              ></Viewer>
              <div>
                {/* Botão para remover arquivo atual */}
                {pdfFile && (
                  <button
                    className='bg-primary absolute top-5 right-5 z-50 rounded-md p-3 text-white'
                    onClick={() => {
                      setPdfFile('')
                      localStorage.removeItem('pdfFile')
                    }}
                  >
                    Remover arquivo
                  </button>
                )}
              </div>
            </Worker>
          )
        )}
      </div>
    </div>
  )
}

export default PdfViewer
