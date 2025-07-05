let webhook = "https://flaviodrumond.app.n8n.cloud/webhook/animacao-css"

async function buttonMagic() {

    const textoInput = document.querySelector('.input-animation').value
    const codigo = document.querySelector('.area-codigo')
    const magica = document.querySelector('.area-resultado')


    let resposta = await fetch(webhook, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({pergunta: textoInput})
    })
    
    let resultado = await resposta.json()

    let info = JSON.parse(resultado.Resposta)

    codigo.innerHTML = info.code
    magica.innerHTML = info.preview
    document.head.insertAdjacentHTML('beforeend', "<style>"+ info.style +"</style>")

    console.log(info)
}