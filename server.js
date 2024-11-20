const express = require('express');
const path = require('path');
const homeRoute = require('./src/routes/homeRoute');
const sobreRoute = require('./src/routes/sobreRoute');
const localRoute = require('./src/routes/localRoute');
const tratamentoRoute = require('./src/routes/tratamentoRoute');
const contactoRoute = require('./src/routes/contactoRoute');
const loginRoute = require('./src/routes/loginRoute');
const registroRoute = require('./src/routes/registroRoute');

const app = express();

// Configura o EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src",'views'));

// Serve arquivos estáticos (CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use(homeRoute);
app.use(sobreRoute);
app.use(localRoute);
app.use(tratamentoRoute);
app.use(contactoRoute);
app.use(registroRoute);
app.use(loginRoute);

// // Rota principal renderizando o arquivo index.ejs
// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Webpack com Express e EJS',
//     message: 'Bem-vindo ao meu projeto!',
//   });
// });

// Inicia o servidor
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});