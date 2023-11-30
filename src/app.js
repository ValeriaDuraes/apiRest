import express from 'express';
import conexao from './app/database/conexao.js';
import SelecaoController from './app/controllers/SelecaoController.js';

const app = express();

// Indica para o express ler body com JSON
app.use(express.json());

// Mock de dados para teste
// const selecoes = [
//   {id: 1, selecao: "Brasil", grupo: "G"},
//   {id: 2, selecao: "Sérvia", grupo: "G"},
//   {id: 3, selecao: "Holanda", grupo: "G"},
//   {id: 4, selecao: "França", grupo: "G"}
// ]

// // Função auxiliar para retornar o objeto por Id
// function buscarSelecaoPorId(id) {
//   return selecoes.filter( selecao => selecao.id == id);
// }

// // Função auxiliar para pegar o índice do elemento no array por id
// function buscarIndexSelecao(id) {
//   return selecoes.findIndex( selecao => selecao.id == id)
// }

// Criar rota padrão ou raiz
// app.get('/', (req, res) => {
//   res.send("Hello World!! Let's become a Backend developer!");
// })

// ======================= ROTAS ======================= //

// CREATE
app.post('/selecoes', (req,res) => {
  // selecoes.push(req.body);
  // res.status(201).send("Seleção cadastrada com sucesso!");
  const selecao = req.body;
  const sql = `INSERT INTO selecoes SET ?;`
  conexao.query(sql, selecao, (error, result) => {
    if(error) {
      res.status(404).json({ 'error': error})
    } else {
      res.status(201).json(result)
    }
  })
})

// READ
app.get('/selecoes', SelecaoController.index)

// READ
app.get('/selecoes/:id', (req, res) => {
  // let index = req.params.id
  // res.json(buscarSelecaoPorId(req.params.id));
  const id = req.params.id;
  const sql = `SELECT * FROM selecoes WHERE id=?;`
  conexao.query(sql, id, (error, result) => {
    const row = result[0]
    if(error) {
      res.status(404).json({ 'error': error})
    } else {
      res.status(200).json(row)
    }
  })
})

// UPDATE
app.put('/selecoes/:id', (req, res) => {
  // let index = buscarIndexSelecao (req.params.id);
  // selecoes[index].selecao = req.body.selecao;
  // selecoes[index].grupo = req.body.grupo;
  // res.json(selecoes);
  const selecao = req.body;
  const id = req.params.id;
  const sql = `UPDATE selecoes SET ? WHERE id=?;`
  conexao.query(sql, [selecao, id], (error, result) => {
    if(error) {
      res.status(404).json({ 'error': error})
    } else {
      res.status(200).json(result)
    }
  })
})

// DELETE
app.delete('/selecoes/:id', (req, res) => {
  // let index = buscarIndexSelecao (req.params.id);
  // selecoes.splice(index, 1);
  // res.send(`Seleção com id ${req.params.id} excluída com sucesso!`);
  const id = req.params.id;
  const sql = `DELETE FROM selecoes WHERE id=?;`
  conexao.query(sql, id, (error, result) => {
    if(error) {
      res.status(404).json({ 'error': error})
    } else {
      res.status(200).json(result)
    }
  })
})

export default app;
