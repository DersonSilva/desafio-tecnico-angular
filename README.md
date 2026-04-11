# 🚀 Desafio Técnico Angular — Gestão de Usuários

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico com o objetivo de demonstrar habilidades em desenvolvimento front-end utilizando **Angular moderno**, boas práticas de arquitetura, testes automatizados e organização de código.

A aplicação consiste em uma **listagem de usuários**, com funcionalidades de criação, validação e manipulação de dados através de uma interface moderna utilizando Angular Material e Tailwind.

---

## 🧠 Tecnologias Utilizadas

- Angular 21+
- Angular Material
- Tailwind CSS
- RxJS
- Vitest (testes unitários)
- Testing Library (Angular)
- Vite (ambiente de build e testes)

---

## ⚙️ Funcionalidades

✔ Listagem de usuários  
✔ Paginação de usuários  
✔ Busca e filtro por nome/email  
✔ Criação de usuário via modal  
✔ Validação de formulário (nome, email, CPF, telefone)  
✔ Tipagem forte com TypeScript  
✔ Interface responsiva  
✔ Feedback visual com snackbar  
✔ Estrutura modular organizada

---

## 🧪 Testes

O projeto possui testes unitários implementados com:

- Vitest
- @testing-library/angular

### ✔ Cobertura de testes

- Cobertura total: **+90%**
- Componentes testados:
  - User Card
  - User Modal

### 🧠 Destaque técnico

Foi realizada a configuração do ambiente de testes para suportar corretamente:

- `templateUrl` (HTML externo)
- Angular TestBed com Vitest
- Integração com Vite Plugin Angular em modo JIT

---

## 📁 Estrutura do Projeto

A estrutura segue o padrão de organização por feature, contendo componentes, serviços, estado e mocks.

```
src/
 ├── app/
 │   └── features/
 │       └── users/
 │           ├── components/
 │           ├── mocks/
 │           ├── services/
 │           ├── store/
 │           │   └── user.model.ts
 ├── setup-tests.ts
```

---

## 🚀 Como rodar o projeto

### 🔧 Instalar dependências

npm install

---

### ▶️ Rodar aplicação

npm start

---

### 🧪 Rodar testes

npm test

---

### 📊 Rodar testes com coverage

npm run test:coverage

---

## ⚙️ Configuração de Testes

Para garantir funcionamento correto com Angular 21 + Vitest, foi necessário:

- Uso do plugin:
  - `@analogjs/vite-plugin-angular`

- Ativação do modo JIT

- Configuração manual do ambiente Angular:

```
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

- Inclusão do setup no `tsconfig.spec.json`
- Import do setup nos testes

---

## 🎯 Decisões Técnicas

- Componentes standalone (Angular moderno)
- Organização por feature
- Reactive Forms para validação
- Testes focados em comportamento (Testing Library)
- Manutenção de templates HTML externos

---

## 👨‍💻 Autor

Desenvolvido por **Anderson Pereira da Silva**

---

## 🏁 Conclusão

O projeto atende aos requisitos do desafio técnico, entregando:

✔ Código limpo e organizado
✔ Paginação implementada
✔ Alta cobertura de testes
✔ Arquitetura moderna com Angular
✔ Integração funcional entre Angular + Vitest

---
