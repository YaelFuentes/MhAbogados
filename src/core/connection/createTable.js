const { db } = require('./databaseService.js')

async function createTable() {
  try {
    //Tabla usuarios
    const usersTable = await db.schema.hasTable('users');
    if (!usersTable) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary().notNullable();
        table.string('username')
        table.string('password')
      })
    }
  } catch (e) {
    console.log(`La tabla que esta intentando crear ya se encuentra en ${process.env.DB_HOST}`);
  }
}

// Call the createTable function
createTable()