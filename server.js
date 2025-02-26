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
const adminDashboardRoute = require('./src/routes/adminDashboardRoute');
const consultaRoute = require('./src/routes/consultaRoute');
const sessaoRoute = require('./src/routes/sessaoRoute');
const clientesRoute = require('./src/routes/clientesRoute');
const concasaRoute = require('./src/routes/concasaRoute');
const procedimentosRoute = require('./src/routes/procedimentosRoute');

const User = require('./src/model/Usuario');

const app = express();

// Configura o EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src",'views'));

// Serve arquivos estáticos (CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

const csurf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');
const sequelize = require('./src/database');

const MySQLStore = require("express-mysql-session")(session);

const {middlewareGlobal,checkCsrfError,csrfMiddleware} = require("./src/middlewares/middleware");

// Configuração da conexão com o banco MySQL
const sessionStore = new MySQLStore({
  host: process.env.BD_HOST,        // Endereço do servidor MySQL
  port: process.env.BD_PORT,               // Porta do MySQL (3306 por padrão)
  user: process.env.BD_USER,      // Nome de usuário do banco de dados
  password: process.env.BD_PASSWORD,    // Senha do banco de dados
  database: process.env.BD_NAME// Nome do banco de dados
});

// Configuração das opções de sessão
const sessionOptions = session({
  secret: "fefefeffvrgfsfwmimmiminnnnnunuunun", // Chave secreta
  store: sessionStore, // Define o MySQL como armazenamento
  resave: false,       // Não salvar novamente se não houver mudanças
  saveUninitialized: false, // Não salvar sessões não inicializadas
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // Duração: 7 dias
    httpOnly: true,                  // Torna os cookies acessíveis apenas via HTTP
  },
});

// Função para criar o administrador ao iniciar o programa
const createAdminUser = async () => {
  try {
      const [admin, created] = await User.findOrCreate({
          where: { role: 'admin' }, // Verifica se já existe um administrador
          defaults: {
              nome: 'Willton',
              email: 'willton@gmail.com',
              role: 'admin',
              password: '123456',
          }
      });

      if (created) {
          console.log("Administrador criado com sucesso!");
      } else {
          console.log("Administrador já existe.");
      }
  } catch (error) {
      console.error("Erro ao criar administrador:", error);
  }
};

// Tratamento de erros na conexão com o banco
sessionStore.onReady()
  .then(() => console.log('Conexão com o banco de dados MySQL bem-sucedida!'))
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados MySQL:', err.message);
    process.exit(1); // Encerra o servidor em caso de erro
  });

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(sessionOptions);
app.use(flash());

app.use(csurf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(homeRoute);
app.use(sobreRoute);
app.use(localRoute);
app.use(tratamentoRoute);
app.use(contactoRoute);
app.use(registroRoute);
app.use(loginRoute);
app.use(userDashboardRoute);
app.use(consultaRoute);
app.use(sessaoRoute);
app.use(clientesRoute);
app.use(concasaRoute);
app.use(adminDashboardRoute);
app.use(procedimentosRoute);

// // Rota principal renderizando o arquivo index.ejs
// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Webpack com Express e EJS',
//     message: 'Bem-vindo ao meu projeto!',
//   });
// });

// Inicia o servidor
sequelize.authenticate()
  .then(async () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(3003, () => {
      console.log('Servidor rodando em http://localhost:3003');
    });
    await createAdminUser(); // Chama a função para criar o admin
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });
// const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });