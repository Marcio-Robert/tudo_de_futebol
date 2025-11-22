let cardContainer = document.querySelector(".card-container");
let dados = [];
const initialStateContainer = document.querySelector("#initial-state");

// Adiciona a referência para o campo de busca do HTML
let campoBusca = document.querySelector("#caixa-busca");

// Adiciona um "ouvinte" para o evento de digitação no campo de busca
if (campoBusca) {
    campoBusca.addEventListener("input", () => {
        const termoBusca = campoBusca.value.toLowerCase();

        // Só busca e renderiza se houver algo digitado
        if (termoBusca.length > 0) {
            const dadosFiltrados = dados.filter(dado =>
                dado.nome.toLowerCase().includes(termoBusca) ||
                dado.descrição.toLowerCase().includes(termoBusca)
            );
            initialStateContainer.style.display = 'none'; // Esconde a tela inicial
            cardContainer.style.display = 'block'; // Mostra o container dos cards
            document.body.classList.remove('initial-view'); // Remove a imagem de fundo e a sobreposição
            renderizarCards(dadosFiltrados);
        } else {
            // Se o campo de busca estiver vazio, limpa a tela
            cardContainer.innerHTML = "";
            cardContainer.style.display = 'none'; // Esconde o container dos cards
            initialStateContainer.style.display = 'flex'; // Mostra a tela inicial
            document.body.classList.add('initial-view'); // Adiciona a imagem de fundo de volta
        }
    });
}

// Animação da bola de futebol no cabeçalho
const kickTrigger = document.querySelector(".kick-animation-trigger");
const goalAnimationContainer = document.querySelector("#goal-animation");

if (kickTrigger) {
    const soccerBallIcon = kickTrigger.querySelector(".soccer-ball-icon");

    kickTrigger.addEventListener("click", () => {
        // 1. Animação da bola girando
        soccerBallIcon.classList.add("spin-ball");

        // 2. Animação de "GOL"
        if (goalAnimationContainer) {
            goalAnimationContainer.classList.remove("hidden");
            // Força o reinício da animação removendo e adicionando os spans
            const letters = goalAnimationContainer.innerHTML;
            goalAnimationContainer.innerHTML = letters;
        }

        // Remove a classe da bola após a animação terminar
        setTimeout(() => {
            soccerBallIcon.classList.remove("spin-ball");
        }, 700);
    });
}

// Função para carregar os dados iniciais
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        // Garante que o container de cards comece escondido
        cardContainer.style.display = 'none';
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

function renderizarCards(dados) {
    // Limpa o container antes de renderizar os novos cards
    cardContainer.innerHTML = "";

    const imagemPadrao = "https://cdn-icons-png.flaticon.com/512/53/53283.png"; // URL de uma bola de futebol

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Usa a imagem do JSON ou a imagem padrão
        const imagemSrc = dado.imagem ? encodeURI(dado.imagem) : imagemPadrao;

        article.innerHTML = `
        <img src="${imagemSrc}" alt="Logo de ${dado.nome}" class="card-image" onerror="this.style.display='none';">
        <h2>${dado.nome}</h2>
        <p>${dado.descrição}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `   
        cardContainer.appendChild(article);
    }
}

// Carrega os dados assim que o script é executado
carregarDados();