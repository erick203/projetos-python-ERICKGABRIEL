# FastAPI CRUD de Produtos

Este é um projeto de exemplo que implementa uma API REST funcional para o gerenciamento (CRUD) de produtos. Ele utiliza a arquitetura recomendada pela documentação oficial do **FastAPI**, integrando validação de dados com **Pydantic** e persistência em banco de dados utilizando **SQLAlchemy**.

---

## 🛠️ Tecnologias Utilizadas

* **FastAPI:** Framework web moderno, rápido (alta performance) e fácil de usar.
* **SQLAlchemy:** ORM SQL para mapeamento de entidades do banco de dados.
* **Pydantic:** Validação de dados e gerenciamento de configurações via Schemas.
* **SQLite:** Banco de dados relacional leve (em arquivo local).

---

## 📂 Estrutura do Projeto

O projeto está estruturado como um pacote Python (`sql_app`), contendo os seguintes arquivos principais:

* `__init__.py`: Arquivo que transforma o diretório em um pacote Python.
* `database.py`: Configura a conexão com o banco de dados SQLite e a sessão (`SessionLocal`).
* `models.py`: Define o modelo de dados da tabela `products` no banco.
* `schemas.py`: Contém os schemas do Pydantic para validação de entrada e saída de dados.
* `crud.py`: Implementa as funções com a lógica de criação, leitura e deleção no banco.
* `main.py`: Inicializa o aplicativo, configura o CORS e expõe as rotas HTTP (endpoints).

---

## 🚀 Como Executar o Projeto

### 1. Clonar ou baixar o projeto
Certifique-se de que todos os arquivos (`main.py`, `models.py`, etc.) estejam na mesma pasta do seu projeto.

### 2. Instalar as dependências
Você precisará do FastAPI, SQLAlchemy e de um servidor ASGI como o `uvicorn`. Execute no seu terminal:

```bash
pip install fastapi sqlalchemy pydantic uvicorn
