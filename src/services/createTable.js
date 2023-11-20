import { db } from "@/core/connection/databaseService";

async function createTable() {
  try {
    const clienteTable = await db.schema.hasTable('cliente')

    if (!clienteTable) {
      await db.schema.createTable('cliente', (table) => {
        table.increments("id").primary().notNullable()
        table.integer('dni')
        table.string('nombre')
        table.string('apellido')
        table.string('telcel')
        table.string('email')
        table.integer('idfuerza')
        table.integer('idrevista')
        table.integer('idgrado')
        table.string('domicilio', 200)
        table.string('observaciones', 800)
      })
      console.log(usersTable);
    }
  } catch (e) {
    console.log(`La tabla que esta intentando crear ya se encuentra en ${process.env.DB_HOST}, en caso que desee actualizarla
    por favor ejecute el siguiente comando 'npm run update-table' y asi actualizar la tabla`);
  }
}

createTable()