let todosOsPersonagens = [];

async function buscarDados() {
    try {
        const resposta = await fetch('../assets/data/personagens.json');

        if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);
        todosOsPersonagens = await resposta.json();
    } catch (erro) {
        document.getElementById('mensagemErro').textContent = 'Erro ao carregar os dados dos personagens.';
    }
}

function preencherDados(personagem) {
    document.getElementById('nomeEAlcunhaPersonagem').textContent = personagem.nome + (personagem.alcunha ? ` — ${personagem.alcunha}` : '');
    document.getElementById('imagemPersonagem').src = '../' + personagem.imagem;
    document.getElementById('imagemPersonagem').alt = personagem.nome;
    const recompensaPersonagem = personagem.recompensa;
    document.getElementById('recompensaPersonagem').textContent = recompensaPersonagem !== null ? `Recompensa: ${recompensaPersonagem}` : '';
    document.getElementById('frutaPersonagem').textContent = personagem.fruta || '';
    document.getElementById('descricaoPersonagem').textContent = personagem.descricao || '';
    document.getElementById('textoPersonagem').textContent = personagem.texto?.replaceAll('/n', '\n\n') || '';

    const elementos = [
        document.getElementById('recompensaPersonagem'),
        document.getElementById('frutaPersonagem'),
        document.getElementById('descricaoPersonagem')
    ];

    elementos.forEach(elemento => elemento.style.removeProperty('padding-bottom'));

    const visiveis = elementos.filter(elemento => elemento.textContent.trim() !== '');

    visiveis.forEach(elemento => elemento.style.paddingBottom = '15px');
}

document.addEventListener('DOMContentLoaded', async () => {
    const parametros = new URLSearchParams(window.location.search);
    const id = parseInt(parametros.get('id'));
    if (isNaN(id)) {
        document.getElementById('mensagemErro').textContent = 'Página não encontrada.';
        return;
    }

    await buscarDados();

    const personagem = todosOsPersonagens.find(personagem => personagem.id === id);
    if (!personagem) {
        document.getElementById('mensagemErro').textContent = 'Personagem não encontrado.';
        return;
    }

    preencherDados(personagem);
});
