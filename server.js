const express = require('express');

const app = express();

let usuarios = [
    { id:1, nome:"João" },
    { id:2, nome:"Maria" }
];

app.use(express.json());

app.get('/', (req,res) => {
    res.send('API funcionando!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  usuario.nome = req.body.nome;

  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  usuarios.splice(index, 1);

  res.json({
    mensagem: "Usuário removido",
  });
});