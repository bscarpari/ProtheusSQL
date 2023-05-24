import api from "../../../api"

import { toast } from "react-toastify"
import jwtDecode from "jwt-decode"

const token = localStorage.getItem("token")
const { username } = jwtDecode(token)

export const fetchUserSchema = async () => {
  try {
    const { data } = await api.get('/api/queries/schema')

    if (!data) return []

    // Primeiro nó do TreeView é o nome do banco de dados (schema) e não uma tabela
    const treeData = [{
      id: data.schema,
      label: username,
      icon: 'fa-solid fa-database',
      key: data.schema,
      children: [],
    }]

    // Estruture a resposta da API para o formato que o TreeView espera
    const filteredData = data.map(({ table, columns, dataTypes }) => ({
      id: table,
      label: table,
      icon: 'fa fa-table',
      children: columns.map((column, index) => ({
        id: `${table}-${column}`,
        label: column,
        icon: 'fa fa-columns',
        type: dataTypes[index],
      }))
    }))

    treeData[0].children = filteredData

    return treeData
  } catch (err) {
    toast.error(err.message || err)
  }
}

export const fetchUserFiles = (userId) => {
  try {
    // pega o nome de todos os arquivos no diretório do usuário
    const res = api.get(`/api/files/${userId}`)

    if (!res.data) return []

    return res.data
  } catch (err) {
    console.error(`Erro ao ler diretório de arquivos do usuário ${userId}:`, err);
    return [];
  }
};