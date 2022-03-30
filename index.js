function onLoad() {
  // console.log(`Carregou a tela`, Tela, JogoDaMemoria)

  /*
  const heroi = {
    // sempre relativo ao index.html
    img: './arquivos/hulk.png',
    name: 'hulk'
  }
  // const codigoHtml = Tela.obterCodigoHtml(heroi)
  // Tela.alterarConteudoHtml(codigoHtml)

  // Tela.atualizarImagens([
  //   heroi, heroi
  // ])
  */

  const dependencias = {
    tela: Tela,
    util: Util
  }

  const jogoDaMemoria = new JogoDaMemoria(dependencias)
  jogoDaMemoria.inicializar()
}

window.onload = onLoad