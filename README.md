# 📦 FastAPI CRUD de Produtos com Front-end

Este projeto consiste em uma API REST funcional para o gerenciamento (CRUD) de produtos integrada a uma interface de usuário (Front-end) responsiva. A aplicação utiliza a arquitetura recomendada pela documentação oficial do **FastAPI**, integrando validação de dados com **Pydantic** e persistência em banco de dados utilizando **SQLAlchemy**.

O projeto está preparado para rodar localmente ou ser hospedado no **GitHub Pages**.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **FastAPI:** Framework web moderno e de alta performance.
* **SQLAlchemy:** ORM SQL para mapeamento e manipulação do banco de dados.
* **Pydantic:** Validação de dados de entrada e saída via Schemas.
* **SQLite:** Banco de dados relacional leve armazenado em arquivo local.

### Frontend
* **HTML5 & JavaScript (Vanilla):** Para estruturação e consumo assíncrono da API via `fetch`.
* **Tailwind CSS:** Framework utilitário para estilização moderna e responsiva.

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
├── frontend/                 # Diretório do Front-end (GitHub Pages)
│   ├── index.html            # Interface visual com formulário e listagem
│   └── app.js                # Lógica de consumo da API e gerenciamento de estado
└── README.md 
---

## 🚀 Como Executar o Projeto Localmente

### 1. Configurar e rodar o Backend

1. Certifique-se de ter o Python instalado em sua máquina.
2. Instale as dependências necessárias executando o seguinte comando no seu terminal:
   ```bash
   pip install fastapi sqlalchemy pydantic uvicorn
