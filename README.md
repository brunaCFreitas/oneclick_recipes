# oneClick Recipes

No processo de aprimoramento do nosso sistema, criamos um backend personalizado para substituir a API de terceiros previamente utilizada. Essa decisão foi tomada para ter maior controle sobre os recursos e funcionalidades disponíveis, além de reduzir a dependência externa. 

Implementamos recursos robustos de criação e login de usuários, oferecendo aos usuários uma experiência aprimorada e segura. Realizamos a refatoração das operações de armazenamento local do frontend, migrando-as para o backend, o que proporciona maior segurança e escalabilidade ao sistema. 

Essas melhorias resultaram em um sistema mais independente, com melhor desempenho e funcionalidade, garantindo uma experiência otimizada para os usuários.

## Projeto

<div align="center">
  <img src="https://i.imgur.com/Gw1laoX.png" alt="Home" width="200px" height="353px" />
  <img src="https://i.imgur.com/q0yeBwp.png" alt="Login" width="200px" height="353px" />
  <img src="https://i.imgur.com/W5ZFNOt.png" alt="Register" width="200px" height="353px" />
  <img src="https://i.imgur.com/1QXYBRi.png" alt="Site Home" width="200px" height="353px" />
  <img src="https://i.imgur.com/9yrk1io.png" alt="Drink" width="200px" height="353px" />
  <img src="https://i.imgur.com/895RYAX.png" alt="Recipe" width="200px" height="353px" />
  <img src="https://i.imgur.com/uyO7vIZ.png" alt="Profile" width="200px" height="353px" />
  <img src="https://i.imgur.com/TSvhn3l.png" alt="Done Recipes" width="200px" height="353px" />
  <img src="https://i.imgur.com/lsYKSXQ.png" alt="Favorite Recipes" width="200px" height="353px" />
</div>

## Executar Localmente

Clone o repositório

```bash
  git clone git@github.com:tryber/sd-026-a-project-recipes-app-full-stack.git
```

Entre no diretório

```bash
  cd sd-026-a-project-recipes-app-full-stack/
```

Troque de branch

```bash
  git checkout oneclick_recipes
```

Inicie os containers

```bash
  npm run compose:up
```

Acesse a pasta do frontend e instale as dependências

```bash
  cd app/frontend && npm i
```

Acesse a pasta do backend e instale as dependências

```bash
  cd ../backend && npm i
```

Acesse o endereço do frontend

- [http://localhost:3000](http://localhost:3000)

## Executar os Testes

Dentro do diretório do projeto, acesse a pasta de testes

```bash
  cd app/backend/src/tests
```

Inicie os testes

```bash
  npm run test
```

## Documentação da API

Após realizar os procedimentos na seção "Executar Localmente", acesse o endereço abaixo

- [http://localhost:3001/docs](http://localhost:3001/docs)

## Tecnologias

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Typescript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white) 
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=for-the-badge&logo=MySQL&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Mocha](https://img.shields.io/badge/Mocha-8D6748.svg?style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/Chai-A30701.svg?style=for-the-badge&logo=Chai&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Autores

- [@andersoncrodrigues](https://github.com/AndersonCRodrigues) - Desenvolvimento e organização do projeto
- [@brunacfreitas](https://github.com/brunaCFreitas) - Desenvolvimento do projeto
- [@brunokye](https://github.com/brunokye) - Desenvolvimento do projeto e ajustes em CSS
