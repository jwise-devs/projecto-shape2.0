require('dotenv').config();
const express = require('express');
const path = require('path');
const homeRoute = require('./src/routes/homeRoute');
const sobreRoute = require('./src/routes/sobreRoute');
const localRoute = require('./src/routes/localRoute');
const tratamentoRoute = require('./src/routes/tratamentoRoute');
const contactoRoute = require('./src/routes/contactoRoute');
const loginRoute = require('./src/routes/loginRoute');
const registroRoute = require('./src/routes/registroRoute');
const userDashboardRoute = require('./src/routes/userDashboardRoute');
const consultaRoute = require('./src/routes/consultaRoute');

const app = express();

// Configura o EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src",'views'));

// Serve arquivos estáticos (CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

const csurf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = session({
  secret: "fefefeffvrgfsfwmimmiminnnnnunuunun",
  store: new MongoStore({ mongoUrl: process.env.CONNECTSTRING}),
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
  }
});

app.use(express.urlencoded({extended: true}));

app.use(homeRoute);
app.use(sobreRoute);
app.use(localRoute);
app.use(tratamentoRoute);
app.use(contactoRoute);
app.use(registroRoute);
app.use(loginRoute);
app.use(userDashboardRoute);
app.use(consultaRoute);

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