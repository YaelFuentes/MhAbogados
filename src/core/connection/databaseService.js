const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();
const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
  }
});
db.raw('select 1+1 as result')
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });


const databaseServiceFactory = () => {
  const TABLE = 'users';

  const getUser = async (username) => {
    const user = await db(TABLE).select().where('username', username);
    if (user.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return user[0];
  };

  return { getUser };
};

const databaseServiceClient = () => {
  const TABLE = 'cliente'

  const getClient = async (username, dni) => {
    const client = await db(TABLE).select().where({apellido:username, dni:dni});
    if (client.length === 0) {
      throw new Error(`El cliente ${username}, ${dni} no existe`);
    }
    return client;
  }
  return { getClient }
}



module.exports = {
  databaseServiceFactory,
  databaseServiceClient,
  db
}