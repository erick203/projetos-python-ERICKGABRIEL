# 📦 FastAPI CRUD de Produtos com Front-end

Este projeto consiste em uma API REST funcional para o gerenciamento (CRUD) de produtos integrada a uma interface de usuário (Front-end) responsiva e moderna. A aplicação segue os padrões recomendados pela documentação oficial do **FastAPI**, utilizando **SQLAlchemy** para persistência e **Pydantic** para validação de dados.

O projeto foi estruturado para funcionar de forma independente, permitindo que o Backend rode localmente ou em um servidor, enquanto o Frontend pode ser hospedado facilmente no **GitHub Pages**.

---

## 🚀 Recursos de Destaque (UX Premium)
*   **Modo Escuro (Dark Mode):** Alternância de tema integrada que respeita a preferência do sistema do usuário e salva a escolha no `localStorage`.
*   **Sistema de Toasts:** Notificações flutuantes estilizadas para feedbacks de sucesso, informação ou erro em tempo real.
*   **Configuração Dinâmica de API:** Input na interface que permite alterar o endpoint da API em tempo de execução sem mexer no código.

---

## 🛠️ Tecnologias Utilizadas

### Backend
*   **FastAPI:** Framework web moderno, rápido (alta performance) e fácil de codificar.
*   **SQLAlchemy:** ORM SQL para mapeamento, criação e manipulação automatizada do banco de dados.
*   **Pydantic:** Validação robusta de dados de entrada e saída via Schemas.
*   **SQLite:** Banco de dados relacional leve armazenado localmente em arquivo.

### Frontend
*   **HTML5 & JavaScript (Vanilla):** Estrutura limpa e manipulação assíncrona do DOM via `fetch` API.
*   **Tailwind CSS:** Framework utilitário utilitário para estilização rápida, responsiva e moderna.

---

## 📂 Estrutura do Projeto

```text
├── sql_app/                  # Diretório do Backend (Pacote Python)
│   ├── __init__.py           # Identifica a pasta como um pacote Python
│   ├── database.py           # Configuração da conexão SQLite e sessões do banco
│   ├── models.py             # Modelo de dados da tabela 'products'
│   ├── schemas.py            # Schemas Pydantic para validação de dados
│   ├── crud.py               # Funções de persistência (Create, Read, Delete)
│   └── main.py               # Inicialização da API, rotas HTTP e CORS
│
├── frontend/                 # Diretório do Front-end (Pronto para GitHub Pages)
│   ├── index.html            # Interface visual com formulário e listagem
│   └── app.js                # Lógica de consumo da API e gerenciamento de estado
└── README.md                 # Documentação do projeto
