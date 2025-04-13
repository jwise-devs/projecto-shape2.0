
document.addEventListener("DOMContentLoaded", () => {
    const categoriaSelect = document.getElementById("pacote");
    const subcategoriaContainer = document.getElementById("subpacote-container");
    const subcategoriaSelect = document.getElementById("subpacote");
    const produtosSelect = document.getElementById("tratamentos");
    const precoInput = document.getElementById("preco_tratamentos");
    const precoTotalText = document.getElementById("precoTotal");

    const tratamentosDataElement = document.getElementById("tratamentosData");
    const tratamentosData = JSON.parse(tratamentosDataElement.getAttribute("data-tratamentos"));

    const dados = {};

    tratamentosData.forEach(tratamento => {
        if (!dados[tratamento.pacote]) dados[tratamento.pacote] = {};

        if (tratamento.subpacote && tratamento.subpacote.trim() !== "" && tratamento.subpacote !== "Nenhum subpacote") {
            if (!dados[tratamento.pacote].subpacotes) dados[tratamento.pacote].subpacotes = {};
            if (!dados[tratamento.pacote].subpacotes[tratamento.subpacote]) dados[tratamento.pacote].subpacotes[tratamento.subpacote] = [];
            dados[tratamento.pacote].subpacotes[tratamento.subpacote].push({
                value: tratamento.nome,
                text: tratamento.nome,
                preco: parseFloat(tratamento.preco) || 0
            });
        } else {
            if (!dados[tratamento.pacote].produtos) dados[tratamento.pacote].produtos = [];
            dados[tratamento.pacote].produtos.push({
                value: tratamento.nome,
                text: tratamento.nome,
                preco: parseFloat(tratamento.preco) || 0
            });
        }
    });

    categoriaSelect.addEventListener("change", () => {
        const categoriaSelecionada = categoriaSelect.value;

        subcategoriaSelect.innerHTML = "";
        produtosSelect.innerHTML = "";
        produtosSelect.disabled = true;
        precoTotalText.textContent = "0.00";
        precoInput.value = "";

        if (dados[categoriaSelecionada]) {
            const possuiSubpacotes = dados[categoriaSelecionada].subpacotes && Object.keys(dados[categoriaSelecionada].subpacotes).length > 0;

            if (possuiSubpacotes) {
                subcategoriaContainer.classList.remove("d-none");
                subcategoriaSelect.disabled = false;
                subcategoriaSelect.innerHTML = `<option value="" disabled selected>Selecione um subpacote</option>`;

                Object.keys(dados[categoriaSelecionada].subpacotes).forEach(sub => {
                    const option = document.createElement("option");
                    option.value = sub;
                    option.textContent = sub;
                    subcategoriaSelect.appendChild(option);
                });

                subcategoriaSelect.addEventListener("change", () => {
                    produtosSelect.innerHTML = "";
                    produtosSelect.disabled = false;

                    const subcategoriaSelecionada = subcategoriaSelect.value;
                    const produtos = dados[categoriaSelecionada].subpacotes[subcategoriaSelecionada] || [];

                    produtos.forEach(prod => {
                        const option = document.createElement("option");
                        option.value = prod.value;
                        option.textContent = `${prod.text} - R$ ${prod.preco.toFixed(2)}`;
                        option.dataset.preco = prod.preco;
                        produtosSelect.appendChild(option);
                    });
                });

            } else {
                subcategoriaContainer.classList.add("d-none");
                subcategoriaSelect.disabled = true;
                produtosSelect.disabled = false;

                (dados[categoriaSelecionada].produtos || []).forEach(produto => {
                    const option = document.createElement("option");
                    option.value = produto.value;
                    option.textContent = `${produto.text} - R$ ${produto.preco.toFixed(2)}`;
                    option.dataset.preco = produto.preco;
                    produtosSelect.appendChild(option);
                });
            }
        }
    });

    produtosSelect.addEventListener("change", () => {
        let total = 0;
        let precos = [];

        Array.from(produtosSelect.selectedOptions).forEach(opt => {
            const preco = parseFloat(opt.dataset.preco);
            if (!isNaN(preco)) {
                total += preco;
                precos.push(preco);
            }
        });

        precoInput.value = JSON.stringify(precos);
        precoTotalText.textContent = total.toFixed(2);
    });
});

