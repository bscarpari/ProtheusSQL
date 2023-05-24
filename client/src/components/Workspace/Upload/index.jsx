function UploadComponent() {
  // pega o localStorage de pdfFile
  const pdfFiles = Object.keys(localStorage)

  const handleRemove = (fileName) => {
    const fileContent = localStorage.getItem(fileName)
    handlePdfSelect(fileContent)
  }

  return (
    <ul>
      {pdfFiles.map((fileName) => (
        <li
          key={fileName}
          onClick={() => {
            handleRemove(fileName)
          }}
        >
          {fileName}
        </li>
      ))}
    </ul>
  )
}

export default UploadComponent
