// Pega a URL salva localmente no navegador ou usa o padrão localhost
let API_BASE_URL = localStorage.getItem("fastapi_url") || "http://localhost:8000";

const productForm = document.getElementById("productForm");
const productsTableBody = document.getElementById("productsTableBody");
const noProducts = document.getElementById("noProducts");
const apiUrlInput = document.getElementById("apiUrlInput");
const btnSalvarUrl = document.getElementById("btnSalvarUrl");
const btnAtualizar = document.getElementById("btnAtualizar");

apiUrlInput.value = API_BASE_URL;

// Atualiza a URL dinamicamente sem quebrar o código no GitHub
btnSalvarUrl.addEventListener("click", () => {
    let url = apiUrlInput.value.trim();
    if (url.endsWith("/")) {
        url = url.slice(0, -1); 
    }
    localStorage.setItem("fastapi_url", url);
    API_BASE_URL = url;
    alert(`URL da API atualizada para: ${url}`);
    fetchProducts();
});

btnAtualizar.addEventListener("click", fetchProducts);
document.addEventListener("DOMContentLoaded", fetchProducts);

// 1. BUSCAR PRODUTOS (GET)
async function fetchProducts() {
    try {
        productsTableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500">Carregando...</td></tr>`;
        const response = await fetch(`${API_BASE_URL}/products/`);
        if (!response.ok) throw new Error();
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        productsTableBody.innerHTML = "";
        noProducts.classList.remove("hidden");
    }
}

function renderProducts(products) {
    productsTableBody.innerHTML = "";
    if (products.length === 0) {
        noProducts.classList.remove("hidden");
        return;
    }
    noProducts.classList.add("hidden");
    
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-500">${product.id}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">${product.name}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">${product.description}</td>
            <td class="px-6 py-4 text-right text-sm">
                <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-900 font-semibold cursor-pointer">Excluir</button>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

// 2. CRIAR PRODUTO (POST)
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    try {
        const response = await fetch(`${API_BASE_URL}/products/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        });
        if (response.ok) {
            productForm.reset();
            fetchProducts();
        } else {
            alert("Erro ao salvar produto.");
        }
    } catch (error) {
        alert("Erro de conexão com a API.");
    }
});

// 3. DELETAR PRODUTO (DELETE)
async function deleteProduct(id) {
    if (!confirm("Deseja excluir este produto?")) return;
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE"
        });
        if (response.ok) fetchProducts();
    } catch (error) {
        alert("Erro ao deletar.");
    }
}