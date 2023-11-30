class SelecaoController {
  // Método index vai listar tudo, como se fosse um 'select *'
  index(req, res) {
    // res.status(200).send(selecoes);
    const sql = `SELECT * FROM selecoes;`
    conexao.query(sql, (error, result) => {
      if(error) {
        res.status(404).json({ 'error': error})
      } else {
        res.status(200).json(result)
      }
    })
  }

  // Método que lista tudo por Id
  show() {}
  
  // Método store, que vai criar dados
  store() {}

  // Método update, que atualiza dados
  update() {}

  // Método delete, para apagar dados
  delete () {}

}

// Padrão Singleton
export default new SelecaoController()
