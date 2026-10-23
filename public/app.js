const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor Express rodando com sucesso no VS Code!' });
});

app.listen(3000, () => {
  console.log('Servidor ativo em http://localhost:3000');
});



// public/app.js — esqueleto
const aparelhos = [];
const form = document.querySelector('#form-aparelho');
const lista = document.querySelector('#lista-aparelhos');
const saida = document.querySelector('#resultado');

function desenharLista() { /* TODO: limpar lista e recriar cada <li> */ }

form.addEventListener('submit', (event) => { /* TODO */ });

document.querySelector('#btn-simular').addEventListener('click', async () => {
  //
}