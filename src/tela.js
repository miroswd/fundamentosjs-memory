
// métodos estáticos não podem acessar o this
// por isso, não vamos colocar o util no construtor
const util = Util

const ID_CONTEUDO = 'conteudo'
const ID_BTN_JOGAR = 'jogar'
const ID_MENSAGEM = 'mensagem'
const CLASSE_INVISIBLE = 'invisible'
const ID_CARREGANDO = 'carregando'
const ID_CONTADOR = 'contador'
const ID_MOSTRAR_TUDO = 'mostrarTudo'
const MENSAGENS = {
  sucesso: {
    texto: 'Combinação correta',
    classe: 'alert-success'
  },
  erro: {
    texto: 'Combinação incorreta',
    class: 'alert-danger'
  }
}

class Tela {
  static obterCodigoHtml(item) {
    return `
    <div class="col-md-3">
    <div class="card" style="width: 50%;" onClick='window.verificarSelecao("${item.id}","${item.name}")'>
      <img src="${item.img}" name="${item.name}" class="card-img-top"> 
    </div>
    <br>
    </div>
    `
  }

  static configurarBotaoVerificarSelecao(funcaoOnClick) {
    window.verificarSelecao = funcaoOnClick
  }

  static alterarConteudoHtml(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO)
    conteudo.innerHTML = codigoHtml
  }

  static gerarStringHtmlPelaImagem(itens) {
    return itens.map(this.obterCodigoHtml).join('')
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHtmlPelaImagem(itens)
    Tela.alterarConteudoHtml(codigoHtml)
  }

  static configurarBotaoJogar(funcaoOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR)
    btnJogar.onclick = funcaoOnClick

  }

  static exibirHerois(nomeDoHeroi, img) {
    const elementosHtml = document.getElementsByName(nomeDoHeroi)
    elementosHtml.forEach(item => (item.src = img))
  }

  static async exibirMensagem(sucesso = true) {
    const elemento = document.getElementById(ID_MENSAGEM);

    if (sucesso) {
      elemento.classList.remove(MENSAGENS.erro.class)
      elemento.classList.add(MENSAGENS.sucesso.class)
      elemento.innerText = MENSAGENS.sucesso.texto
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.class)
      elemento.classList.add(MENSAGENS.erro.class)
      elemento.innerText = MENSAGENS.erro.texto
    }

    elemento.classList.remove(CLASSE_INVISIBLE)
    await util.timeout(1000)
    elemento.classList.add(CLASSE_INVISIBLE)


  }

  static exibirCarregando(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO)
    if (mostrar) {
      carregando.classList.remove(CLASSE_INVISIBLE)
      return
    }
    carregando.classList.add(CLASSE_INVISIBLE)
  }

  static iniciarContador() {
    let contarAte = 3
    const elementoContador = document.getElementById(ID_CONTADOR);

    const identificadorNoTexto = "$$contador";

    const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
    const atualizarTexto = () => (
      elementoContador.innerHTML =
      textoPadrao.replace(identificadorNoTexto, contarAte--)
    )
    atualizarTexto()
    const idDoInterval = setInterval(atualizarTexto, 1000)
    return idDoInterval
  }

  static limparContador(idDoInterval) {
    clearInterval(idDoInterval)
    document.getElementById(ID_CONTADOR).innerHTML = ""
  }

  static configuraBotaoMostrarTudo(funcaoOnClick) {
    const btnMostrarTudo = document.getElementById(ID_MOSTRAR_TUDO)
    btnMostrarTudo.onclick = funcaoOnClick
  }
}