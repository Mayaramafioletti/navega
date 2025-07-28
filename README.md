
# 📊 Desafio Técnico - Navega (Angular 16 + Angular Material)

Este projeto foi desenvolvido como parte de um desafio técnico. Ele apresenta uma aplicação Angular 16 com Angular Material que exibe um **gráfico**, mais algumas informações seguindo o layout fornecido no [figma](https://www.figma.com/design/XEjahNUOeCfe4wNMKEruMh/Prot%C3%B3tipo-Front-End?node-id=2-1219&t=EQUk96W7G3k9rwtX-0).

## 🚀 Tecnologias Utilizadas

- [Angular 16](https://v16.angular.io/docs)
- [Angular Material](https://v16.material.angular.dev/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chart.js](https://www.chartjs.org/) via [ng2-charts](https://valor-software.com/ng2-charts/)
- [Jasmine & Karma](https://jasmine.github.io/) 

## 📦 Funcionalidades

- Login com validação de CPF ou Email
- Autenticação simulada usando dados mockados
- Dashboard com resumo financeiro
- Tela responsiva para mobile e desk
- Código limpo e componentizado, seguindo boas práticas

## 🛠️ Como Rodar o Projeto
### 1. Pré-requisitos

- Node.js (versão 16+)
- Angular CLI instalado globalmente:

```bash
npm install -g @angular/cli
```
### 2. Clonando o Repositório

```bash
git clone https://github.com/Mayaramafioletti/navega.git 
cd navega
```

### 3. Instalando Dependências
```bash
npm install
```

### 4. Rodando o Projeto Localmente
```bash
ng serve
```
A aplicação estará disponível em: http://localhost:4200

## 🔐 Autenticação

A autenticação é **simulada (mock)** com base em um usuário fictício. Os dados são armazenados no `localStorage` após login bem-sucedido.

### ✅ Credenciais para teste

- **Email:** `user@navega.com`
- **CPF:** `987.987.987-99`
- **Senha:** `123456`

### 🔄 Lógica de Login

- Validação feita por CPF ou email
- Formatação automática de CPF enquanto digita
- Exibe erro caso os dados estejam incorretos
- Armazena token simulado e redireciona para `/dashboard`


## ✅ Testes Unitário
Rode o comando abaixo para ver a cobertura dos testes

```bash
ng test 
```


## 📂 Estrutura do Projeto

- `login/`: Tela de login com validação e formatação de CPF
- `dashboard/`: Página principal com cards, gráfico e menu lateral
- `dashboard/chart` e  `dashboard/cards`: Componentes reutilizáveis
- `core/`: Serviços (como `AuthService`, `DashboardService`)



## 📌 Observações
- O sistema foi projetado com escalabilidade e legibilidade em mente.

💬 Em caso de dúvidas ou sugestões, fique à vontade para entrar em contato.

[Linkedin](https://www.linkedin.com/in/mayara-mafioletti/) 



