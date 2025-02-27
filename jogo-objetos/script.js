const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gameOver = false
let gravidade = 0.5
let contagem = 0

document.addEventListener("click", (e) => {
    if (gameOver == true) {
        location.reload()
    }
})

document.addEventListener("keypress", (e) => {
    if (e.code == "Space" && personagem.pulando == false) {
        personagem.velocidadey = -15
        personagem.pulando = true
    }
})

class Jogo {
    constructor(posx, posy, tamx, tamy) {
        this.posx = posx;
        this.posy = posy;
        this.tamx = tamx;
        this.tamy = tamy;
    }
    desenhar(cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.posx, this.posy, this.tamx, this.tamy) //x, y, largura, altura
    }
}

class Personagem extends Jogo {
    constructor(posx, posy, tamx, tamy) {
        super(posx, posy, tamx, tamy)
        this.velocidade = 0
        this.pulando = false
    }

    atualizaPersonagem() {
        if (this.pulando == true) {
            this.velocidadey += gravidade
            this.posy += personagem.velocidadey
            if (this.posy >= canvas.height - 50) {
                this.velocidadey = 0
                this.pulando = false
            }
        }
    }
}

class Obstaculo extends Jogo {
    constructor(posx, posy, tamx, tamy) {
        super(posx, posy, tamx, tamy)
        this.velocidade = 10
    }
    atualizaObstaculo() {
        this.posx -= this.velocidade
        let contagem = 1

        if (this.posx <= 0 - this.tamx) {
            this.posx = canvas.width
            let tamy_random = (Math.random() * 50) + 90
            this.tamy = tamy_random
            this.posy = canvas.height - tamy_random
            this.velocidade += 0.5
            contagem += 1
        }
            ctx.fillText(contagem, (canvas.width), (canvas.height))
            ctx.fillStyle = 'black'
            ctx.font = '50px Arial'
            ctx.fillText(contagem, (canvas.width / 2.1), canvas.height / 7);
    }
}


const personagem = new Personagem(50, canvas.height - 50, 50, 50)
const obstaculo = new Obstaculo(canvas.width - 100, canvas.height - 100, 50, 100)

function verificaColisao() {
    if (Personagem.posx - 1 < obstaculo.posx + obstaculo.tamx && personagem.posx + personagem.tamx > obstaculo.posx && personagem.posy - 1 < obstaculo.posy + obstaculo.tamy && personagem.posy + personagem.tamy > obstaculo.posy) {
        houveColisao()
    }
}

function houveColisao() {
    obstaculo.velocidade = 0
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100)
    ctx.fillStyle = 'black'
    ctx.font = '50px Arial'
    ctx.fillText("GAME OVER", (canvas.width / 2) - 150, (canvas.height / 2))
    gameOver = true
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    personagem.atualizaPersonagem()
    // verificaColisao()
    obstaculo.atualizaObstaculo()
    obstaculo.desenhar('red')
    personagem.desenhar('black')
    requestAnimationFrame(loop)
}

loop()
