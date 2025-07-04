let todosOsPersonagens = [];

async function buscarDados() {
    try {
        const resposta = await fetch('personagens.json');

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);        
        }

        todosOsPersonagens = await resposta.json();
    } catch (error) {
        console.log("Erro: ", error);
        todosOsPersonagens = [];
    }
}

function pesquisarPersonagens(termo) {
    return todosOsPersonagens.filter(personagem => {
        const nome = personagem.nome.toLowerCase();
        const alcunha = personagem.alcunha ? personagem.alcunha.toLowerCase() : '';

        return nome.includes(termo) || alcunha.includes(termo);
    });
}

function exibirLista(resultados) {
    const lista = document.getElementById('characterList');
    lista.innerHTML = '';

    if (resultados.length === 0) {
        lista.classList.add('hidden');
        return;
    }

    resultados.forEach(personagem => {
        const item = document.createElement('li');
        item.textContent = personagem.nome + (personagem.alcunha ? ` — ${personagem.alcunha}` : '');
        lista.appendChild(item);
    });

    lista.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', async function() {
    await buscarDados();

    const campoBusca = document.getElementById('searchInput');
    const listaPersonagens = document.getElementById('characterList');

    campoBusca.addEventListener('input', function() {
        const termoDigitado = campoBusca.value.trim().toLowerCase();

        if (termoDigitado === '') {
            listaPersonagens.classList.add('hidden');
            listaPersonagens.innerHTML = '';
            return;
        }

        const resultados = pesquisarPersonagens(termoDigitado);
        exibirLista(resultados);
    });
});