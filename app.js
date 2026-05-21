// URL base armazenada ou padrão local
let API_BASE_URL = localStorage.getItem("fastapi_url") || "http://localhost:8000";

// Elementos do DOM
const productForm = document.getElementById("productForm");
const productsTableBody = document.getElementById("productsTableBody");
const noProducts = document.getElementById("noProducts");
const apiUrlInput = document.getElementById("apiUrlInput");
const btnSalvarUrl = document.getElementById("btnSalvarUrl");
const btnAtualizar = document.getElementById("btnAtualizar");
const refreshIcon = document.getElementById("refreshIcon");

// Elementos do Dark Mode
const btnThemeToggle = document.getElementById("btnThemeToggle");
const themeIcon = document.getElementById("themeIcon");

// Inicializa o input da API
apiUrlInput.value = API_BASE_URL;

// ==========================================
// CONTROLADOR DE TEMA (DARK MODE)
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add("dark");
        themeIcon.innerText = "☀️";
    } else {
        document.documentElement.classList.remove("dark");
        themeIcon.innerText = "🌙";
    }
}

btnThemeToggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        themeIcon.innerText = "🌙";
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        themeIcon.innerText = "☀️";
    }
});

// Inicializar tema assim que carrega
initTheme();

// ==========================================
// CONFIGURAÇÃO DA URL DA API
// ==========================================
btnSalvarUrl.addEventListener("click", () => {
    let url = apiUrlInput.value.trim();
    if (url.endsWith("/")) {
        url = url.slice(0, -1); 
    }
    localStorage.setItem("fastapi_url", url);
    API_BASE_URL = url;
    alert(`Conectado com sucesso ao endpoint: ${url}`);
    fetchProducts();
});

btnAtualizar.addEventListener("click", fetchProducts);
document.addEventListener("DOMContentLoaded", fetchProducts);

// ==========================================
// FUNÇÕES PRINCIPAIS (CRUD & UX)
// ==========================================

// 1. BUSCAR E LISTAR PRODUTOS (GET)
async function fetchProducts() {
    // Ativa a animação de rotação (Spin) no ícone de atualização
    refreshIcon.classList.add("animate-spin");
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw new Error();
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Erro de conexão com a API:", error);
        productsTableBody.innerHTML = "";
        noProducts.classList.remove("hidden");
    } finally {
        // Remove a animação após o término da requisição (mesmo se der erro)
        setTimeout(() => {
            refreshIcon.classList.remove("animate-spin");
        }, 400);
    }
}

// Colocar dados na tabela
function renderProducts(products) {
    productsTableBody.innerHTML = "";
    
    if (products.length === 0) {
        noProducts.classList.remove("hidden");
        return;
    }
    
    noProducts.classList.add("hidden");
    
    products.forEach(product => {
        const row = document.createElement("tr");
        row.className = "hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors duration-150";
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-400 dark:text-slate-500">${product.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">${product.name}</td>
            <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">${product.description}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button onclick="deleteProduct(${product.id}, '${product.name}')" 
                        class="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200 font-medium focus:outline-hidden focus:underline cursor-pointer px-2 py-1"
                        aria-label="Excluir produto ${product.name}">
                    Excluir
                </button>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

// 2. CRIAR NOVO PRODUTO (POST)
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("description");

    const newProduct = { 
        name: nameInput.value, 
        description: descInput.value 
    };

    try {
        const response = await fetch(`${API_BASE_URL}/products/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            productForm.reset();
            fetchProducts();
        } else {
            alert("Erro ao salvar produto. Verifique as regras da API.");
        }
    } catch (error) {
        alert("Não foi possível enviar os dados. Verifique a API.");
    }
});

// 3. DELETAR PRODUTO (DELETE)
async function deleteProduct(id, name) {
    if (!confirm(`Tem certeza que deseja remover o produto "${name}" permanentemente do inventário?`)) return;

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            fetchProducts();
        } else {
            alert("Erro ao tentar excluir o produto.");
        }
    } catch (error) {
        alert("Erro de conexão ao tentar deletar o item.");
    }
}
