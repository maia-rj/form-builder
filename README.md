# Form Builder

Bem-vindo ao **Form Builder**, uma aplicação Vue.js que permite criar formulários personalizados de forma dinâmica e intuitiva. Este projeto foi desenvolvido para facilitar a criação e gerenciamento de formulários complexos, oferecendo uma interface amigável e componentes reutilizáveis.

## Sumário

- [Arquitetura do Projeto](#arquitetura-do-projeto)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Principais Componentes](#principais-componentes)
  - [Fluxo de Dados com Vuex](#fluxo-de-dados-com-vuex)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
  - [Pré-requisitos](#pré-requisitos)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Instalando as Dependências](#instalando-as-dependências)
  - [Executando o Projeto](#executando-o-projeto)
  - [Executando os Testes](#executando-os-testes)
- [Contato](#contato)

---

## Arquitetura do Projeto

A aplicação é estruturada para facilitar a escalabilidade e a manutenção, utilizando as melhores práticas do Vue.js e do Vuex para gerenciamento de estado.

### Estrutura de Pastas
```
form-builder/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── variables.scss
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.vue
│   │   │   ├── Menu.vue
│   │   │   └── Modal.vue
│   │   ├── FormBuilder/
│   │   │   ├── FieldEditor.vue
│   │   │   ├── FormBuilder.vue
│   │   │   ├── SectionEditor.vue
│   │   │   └── SectionList.vue
│   │   └── FormResponse/
│   │       ├── FieldRenderer.vue
│   │       └── FormResponse.vue
│   ├── store/
│   │   └── modules/
│   │       └── formBuilder.js
│   ├── utils/
│   │   └── uniqueId.js
│   ├── App.vue
│   ├── main.js
│   └── router.js
├── test/
│   └── unit/
│       ├── specs/
│       │   ├── FieldEditor.spec.js
│       │   ├── FormBuilder.spec.js
│       │   └── Menu.spec.js
│       └── jest.conf.js
└── README.md
```

### Principais Componentes

- **FormBuilder.vue**: Componente principal para a construção do formulário. Permite adicionar seções, colunas e campos.
- **SectionEditor.vue**: Modal para criação e edição de seções.
- **FieldEditor.vue**: Modal para criação e edição de campos, suportando vários tipos de entrada.
- **SectionList.vue**: Lista as seções, colunas e campos adicionados, permitindo a organização e remoção.
- **FieldRenderer.vue**: Responsável por renderizar os campos no formulário de resposta.
- **FormResponse.vue**: Componente para exibir o formulário finalizado e coletar as respostas dos usuários.
- **Componentes Comuns**:
  - **Button.vue**: Componente de botão reutilizável.
  - **Menu.vue**: Componente de menu para ações em itens.
  - **Modal.vue**: Componente de modal para diálogos.

### Fluxo de Dados com Vuex

O Vuex é utilizado para gerenciar o estado global da aplicação, especialmente para armazenar a estrutura do formulário em construção. Isso inclui:

- **Seções**: Título e identificação única.
- **Colunas**: Cada seção pode conter várias colunas.
- **Campos**: Cada coluna pode conter vários campos com propriedades específicas.

---

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript progressivo para construir interfaces de usuário.
- **Vuex**: Gerenciamento de estado centralizado para aplicações Vue.js.
- **Vue Router**: Sistema de roteamento oficial para Vue.js.
- **SASS (SCSS)**: Extensão CSS que adiciona poder e elegância à linguagem.
- **Jest**: Framework de testes JavaScript.
- **Vue Test Utils**: Utilitários oficiais para testar componentes Vue.js.
- **Yarn**: Gerenciador de pacotes rápido, confiável e seguro.

---

## Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 12 ou superior)
- **Yarn** (recomendado) ou **npm**

### Clonando o Repositório

```bash
git clone https://github.com/maia-rj/form-builder.git
cd form-builder
```
## Instalando as Dependências

Utilize o Yarn para instalar as dependências do projeto:

```bash
yarn install
```
Se preferir usar npm:

```bash
npm install
```

## Executando o Projeto

Para iniciar a aplicação em modo de desenvolvimento com hot-reload:

```bash
yarn dev
```
Se preferir usar npm:

```bash
npm run dev
```
A aplicação estará disponível em http://localhost:8080.

## Executando os Testes

Para executar os testes unitários com cobertura de código:

```bash
yarn unit
```
Se preferir usar npm:

```bash
npm run unit
```

## Contato

	•	Nome: Luccas Maia
	•	Email: lccmaiaa@gmail.com
	•	GitHub: maia-rj

