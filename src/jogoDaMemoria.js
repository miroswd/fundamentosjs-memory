class JogoDaMemoria {
  constructor({ tela, util }) {
    this.tela = tela;
    this.util = util;
    this.heroisIniciais = [
      { img: './arquivos/hulk.png', name: 'hulk' },
      { img: './arquivos/flash.png', name: 'flash' },
      { img: './arquivos/wolverine.png', name: 'wolverine' },
      { img: './arquivos/wonder-woman.png', name: 'wonder-woman' },
    ]
    this.iconePadrao = './arquivos/default.png';
    this.heroisEscondidos = []
    this.heroisSelecionados = []
  }

  // usamos o static quando não precisamos usar a palavra this
  inicializar() {
    this.tela.atualizarImagens(this.heroisIniciais)
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
    // força a tela a usar o this do jogoDaMemoria
    // a função do bind é de manter as variáveis dessa classe, tmb na outra classe, quando ela for executada

    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
    this.tela.configuraBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
  }

  async embaralhar() {
    const copias = this.heroisIniciais.concat(this.heroisIniciais).map(
      item => {
        return Object.assign({}, item, {
          id: Math.random() / 0.5
        })
      }
    ).sort(() => Math.random() - 0.5)

    this.tela.atualizarImagens(copias)
    this.tela.exibirCarregando()


    const idDoInterval = this.tela.iniciarContador()

    await this.util.timeout(3000)
    this.tela.limparContador(idDoInterval)

    this.esconderHerois(copias)
    this.tela.exibirCarregando(false)


  }

  esconderHerois(herois) {
    // trocar a imagem de todos os herois existentes pelo ícone oculto

    const heroisOcultos = herois.map(({ name, id }) => ({
      id, name, img: this.iconePadrao
    }))

    this.tela.atualizarImagens(heroisOcultos);
    this.heroisEscondidos = heroisOcultos
  }

  exibirHerois(nameDoHeroi) {
    const { img } = this.heroisIniciais.find(({ name }) => nameDoHeroi === name);
    this.tela.exibirHerois(nameDoHeroi, img)


  }

  verificarSelecao(id, name) {
    const item = { id, name }
    const heroisSelecionados = this.heroisSelecionados.length

    switch (heroisSelecionados) {
      case 0:
        this.heroisSelecionados.push(item);
        break;
      case 1:
        const [opcao1] = this.heroisSelecionados
        this.heroisSelecionados = []

        if (opcao1.name === item.name && item.id !== opcao1.id) {
          this.exibirHerois(item.name)
          this.tela.exibirMensagem()
          return
        }

        this.tela.exibirMensagem(false)

        break;

    }
  }

  mostrarHeroisEscondidos() {
    const heroisEscondidos = this.heroisEscondidos

    for (const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(item =>
        item.name === heroi.name
      )
      heroi.img = img
    }

    this.tela.atualizarImagens(heroisEscondidos)
  }

  jogar() {
    this.embaralhar()
  }

}