/* import { db } from "@/core/connection/databaseService"; */
const { db } = require('../core/connection/databaseService')

async function updateTable() {
  const clienteTable = await db.schema.hasTable('cliente');
  if (clienteTable) {
    // Verificar y agregar columnas si no existen
    const columnsToCheck = [
      { name: 'dni', type: 'integer' },
      { name: 'nombre', type: 'string' },
      { name: 'apellido', type: 'string' },
      { name: 'telcel', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'idfuerza', type: 'integer' },
      { name: 'idrevista', type: 'integer' },
      { name: 'idgrado', type: 'integer' },
      { name: 'domicilio', type: 'string' },
      { name: 'observaciones', type: 'string' },
    ];
    await Promise.all(columnsToCheck.map(async (column) => {
      const columnExists = await db.schema.hasColumn('cliente', column.name);
      if (!columnExists) {
        await db.schema.table('cliente', (table) => {
          if (column.type === 'integer') {
            table.integer(column.name);
          } else if (column.type === 'string') {
            if (column.name === 'observaciones') {
              table.string(column.name, 400);
            } else {
              table.string(column.name);
            }
          }
        });
        console.log(`Columna ${column.name} agregada a la tabla 'cliente'.`);
      } else {
        const columnInfo = await db.columnInfo('cliente.' + column.name);

        if (
          (column.type === 'integer' && columnInfo.type !== 'integer') ||
          (column.type === 'string' && columnInfo.type !== 'varchar')
        ) {
          console.error(`La columna ${column.name} en 'cliente' no tiene el tipo de datos esperado.`);
        }
      }
    }));
  }
}

// Llamada a la función para actualizar la tabla si es necesario
updateTable();
