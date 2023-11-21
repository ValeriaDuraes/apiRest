import express from 'express';

const app = express();

// Indica para o express ler body com JSON
app.use(express.json());

// Mock
const selecoes = [
  {id: 1, selecao: "Brasil", grupo: "G"},
  {id: 2, selecao: "Sérvia", grupo: "G"},
  {id: 3, selecao: "Holanda", grupo: "G"},
  {id: 4, selecao: "França", grupo: "G"},
]

// Função auxiliar para retornar o objeto por Id
function buscarSelecaoPorId(id) {
  return selecoes.filter( selecao => selecao.id == id);
}

// Função auxiliar para pegar o índice do elemento no array por id
function buscarIndexSelecao(id) {
  return selecoes.findIndex( selecao => selecao.id == id)
}

app.get('/', (req, res) => {
  res.send("Hello World!! Let's become a Backend developer!");
})

app.get('/selecoes', (req, res) => {
  res.status(200).send(selecoes);
})

app.get('/selecoes/:id', (req, res) => {
  // let index = req.params.id
  res.json(buscarSelecaoPorId(req.params.id));
})

app.post('/selecoes', (req,res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso!");
})

app.delete('/selecoes/:id', (req, res) => {
  let index = buscarIndexSelecao (req.params.id);
  selecoes.splice(index, 1);
  res.send(`Seleção com id ${req.params.id} excluída com sucesso!`);
})

export default app;
