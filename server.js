require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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
const criarProcedimentosRoute = require('./src/routes/criarProcedimentosRoute');
const verificarProcedimentosRoute = require('./src/routes/verificarProcedimentosRoute');
const progressoRoute = require('./src/routes/progressoRoute');
const progressoUsuarioRoute = require('./src/routes/progressoUsuarioRoute ');
const fourofourRoute = require('./src/routes/404Route');
const deskDashboardRoute = require('./src/routes/deskDashboardRoute');
const perfilRoute = require('./src/routes/perfilRoute');
const fotoRoute = require('./src/routes/fotoRoute');
const marcacoesRoute = require('./src/routes/marcacoesRoute');
const pupilasRoute = require('./src/routes/pupilasRoute');
const criarPupilasRoute = require('./src/routes/criaPupilasRoute');
const alocacaoRoute = require('./src/routes/alocacaoRoute');


const User = require('./src/model/Usuario');

const app = express();

// Configura o EJS como mecanismo de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "src",'views'));

// Serve arquivos estáticos (CSS, JS) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Serve arquivos estáticos da pasta uploads/images
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

// No server.js:



// Use o body-parser para lidar com requisições JSON
app.use(bodyParser.json());


const session = require('express-session');
const flash = require('connect-flash');
const csurf = require('csurf');
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

// Função para criar o desk ao iniciar o programa
const createDeskUser = async () => {
  try {
      const [desk, created] = await User.findOrCreate({
          where: { role: 'desk' }, // Verifica se já existe um administrador
          defaults: {
              nome: 'willas',
              email: 'willas@gmail.com',
              role: 'desk',
              password: '123456',
          }
      });

      if (created) {
          console.log("Desk Maneger criado com sucesso!");
      } else {
          console.log("Desk Maneger já existe.");
      }
  } catch (error) {
      console.error("Erro ao criar Desk Maneger:", error);
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

// Middleware condicional para aplicar CSRF apenas onde necessário
app.use((req, res, next) => {
  const rotasSemCSRF = ['/funcionarios/create/data', '/fotos/upload','/funcionarios/edit']; // adicione aqui todas que quiser ignorar

  if (rotasSemCSRF.some(route => req.path.startsWith(route))) {
    return next();
  }

  // ⚠️ Garante que o csrf só será criado quando necessário e após a sessão estar ativa
  return csurf()(req, res, next);
});



app.set('view cache', false); // Desabilita o cache de views

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
app.use(criarProcedimentosRoute);
app.use(verificarProcedimentosRoute);
app.use(progressoRoute);
app.use(fourofourRoute);
app.use(deskDashboardRoute);
app.use(perfilRoute);
app.use(progressoUsuarioRoute);
app.use(fotoRoute);
app.use(marcacoesRoute);
app.use(pupilasRoute);
app.use(criarPupilasRoute);
app.use(alocacaoRoute);

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
    await createDeskUser(); // Chama a função para criar o desk
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  });
// const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });