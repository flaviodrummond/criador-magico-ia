// Define a URL do webhook que será chamada para processar a "mágica"
let webhook = "https://flaviodrumond.app.n8n.cloud/webhook/animacao-css"

// Função assíncrona acionada ao clicar no botão
async function buttonMagic() {

    // Pega o valor digitado pelo usuário no input com a classe 'input-animation'
    const textoInput = document.querySelector('.input-animation').value

    // Seleciona a área onde o código retornado será exibido
    const codigo = document.querySelector('.area-codigo')

    // Seleciona a área onde o resultado visual (preview) será mostrado
    const magica = document.querySelector('.area-resultado')

    // Seleciona o botão que foi clicado, com classe 'button-animation'
    const button = document.querySelector('.button-animation')

    // Verifica se o usuário não digitou nada no input
    if (textoInput === "") {
        // Mostra um alerta informando que o campo precisa ser preenchido
        alert("Por favor, escreva algo no campo antes de criar a mágica ✨");
        return; // Interrompe a execução da função
    }

    // Desativa o botão para evitar múltiplos cliques enquanto a mágica está sendo criada
    button.disabled = true;

    // Muda o texto do botão para indicar que a mágica está em andamento
    button.textContent = "Criando...";

    // Muda a cor de fundo e texto do botão enquanto ele está desativado
    button.style.background = "#888888";
    button.style.color = "#fff";

    // Faz a requisição POST para o webhook, enviando o texto digitado como JSON
    let resposta = await fetch(webhook, {
        method: 'POST', // Método HTTP usado
        headers: {'Content-Type' : 'application/json'}, // Define que o corpo é JSON
        body: JSON.stringify({pergunta: textoInput}) // Envia o valor digitado no input como "pergunta"
    })
    
    // Converte a resposta recebida em JSON
    let resultado = await resposta.json()

    // A resposta tem uma propriedade "Resposta" que contém um JSON como string
    // Aqui é feito o parse para transformar essa string em objeto JavaScript
    let info = JSON.parse(resultado.Resposta)

    // Insere o código HTML retornado na área de código
    codigo.innerHTML = info.code

    // Insere o preview visual na área de resultado
    magica.innerHTML = info.preview

    // Insere dinamicamente o CSS retornado dentro da tag <head> do HTML
    document.head.insertAdjacentHTML('beforeend', "<style>"+ info.style +"</style>")

    // Reativa o botão, voltando ao estado original
    button.disabled = false;
    button.textContent = "Criar Mágica 🪄";
    button.style.background = "rgb(4, 158, 158)";
    button.style.color = "#1b1b1b";
}
