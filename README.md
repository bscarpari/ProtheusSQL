# Protheus SQL: Ferramenta de Estudo de Comandos SQL

Este é o projeto de TCC do aluno Bruno Moraes Scarpari, do Curso Técnico em Informática do IFSul Campus Gravataí. O objetivo deste projeto é criar uma ferramenta web que atue como instrumento de estudo dos comandos SQL.

## Descrição do Projeto

A ferramenta web criada neste projeto tem como objetivo auxiliar o usuário a aprender e praticar os comandos SQL de maneira interativa.

Ela permite que o usuário execute **consultas SQL** em um banco de dados fictício e veja o resultado dessas consultas **em tempo real**. Além disso, a ferramenta oferece recursos como **Dashboard**, **Agenda** e **Fórum** para que o usuário possa testar, monitorar e repassar seus conhecimentos, afim de fixá-los eficientemente.

Para garantir que o usuário tenha uma experiência de aprendizado completa, a ferramenta também inclui recursos de ajuda e referência, como um guia de sintaxe SQL e uma lista de funções comuns que são exibidas no local de execução dos comandos.

### Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- Postgres
- React
- TailwindCSS

## Instalação e Execução

Para instalar e executar o projeto, siga os seguintes passos:

- Clone este repositório para o seu computador.<br>

- Na pasta raiz do projeto, execute o comando para instalar as dependências (front & back):

```
yarn run install
```

ou faça manualmente (recomendado), estando na pasta raíz (/protheus/)

1. Crie dois terminais e separe-os por diretório

a. Client (front-end)

```
cd /client

yarn

yarn run dev
```

b. Server (back-end)

```
cd /server

yarn

yarn run dev
```

- Na pasta server, configure o arquivo pré disponibilizado de acordo com as suas informações o PgAdmin 4:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
```

- Estando pasta raiz do projeto (/protheus), execute o comando para criar a estrutura necessário do banco de dados:

```
cd server/

yarn run configDB

CTRL + C (pare o processo atual)

yarn run configDB:next
```

- Estando pasta raiz do projeto (/protheus), execute o comando para iniciar o projeto. Ele abrirá automaticamente o navegador em http://localhost:81

```
yarn run start
```

_OBS.:_ se porta já estiver em uso, automaticamente será usado a porta posterior. Ex.: 82/83/84, etc.

## Contribuições

Este projeto é um trabalho de conclusão de curso e não está aberto a contribuições externas. No entanto, qualquer feedback ou sugestão é bem-vindo e pode ser enviado para o e-mail do autor.

## Autor

Bruno Moraes Scarpari

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
