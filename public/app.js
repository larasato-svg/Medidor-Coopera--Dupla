const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor Express rodando com sucesso no VS Code!' });
});

app.listen(3000, () => {
  console.log('Servidor ativo em http://localhost:3000');
});