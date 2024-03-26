import { db } from "../connection/databaseService";
import { format } from "date-fns";

class MovimientosService {
  constructor(idfuerza, tipofuerza) {
    this.idfuerza = idfuerza;
    this.tipofuerza = tipofuerza;
  }

  async getById(info) {
    try {
      /* const table = 'movimiento'
      const tableClient = 'cliente'
      const tableExpcliente = 'expcliente'
      if (dni) {
        --const movimientoExpcliente = await db(`${table}`).where('idexp', dni);
        --return movimientoExpcliente;
        const dataExpcliente = await db(`${tableExpcliente}`).where('dni', dni)

        const movimientoExpclienteInfo = await Promise.all(
          dataExpcliente.map(async (exp) => {
            const movimientoExpcliente = await db(`${table}`).where('idexp', exp.idexp);
            return movimientoExpcliente;
          })
        );
        return movimientoExpclienteInfo
      } else {
        const dataClient = await db(`${tableClient}`).where('id', id).first()
        const dataExpcliente = await db(`${tableExpcliente}`).where('dni', dataClient.dni)

        const movimientoExpclienteInfo = await Promise.all(
          dataExpcliente.map(async (exp) => {
            const movimientoExpcliente = await db(`${table}`).where('idexp', exp.idexp);
            return movimientoExpcliente;
          })
        );
        return movimientoExpclienteInfo
      } */
      const table = 'movimiento'
      const tableClient = 'cliente'
      const tableExpcliente = 'expcliente'
      switch (info) {
        case dni:
          const dataExpcliente = await db(`${tableExpcliente}`).where('dni', info.dni)

          const movimientoExpclienteInfo = await Promise.all(
            dataExpcliente.map(async (exp) => {
              const movimientoExpcliente = await db(`${table}`).where('idexp', exp.idexp);
              return movimientoExpcliente;
            })
          );
          return movimientoExpclienteInfo;
        case id:
          const dataClient = await db(`${tableClient}`).where('id', info.id).first()
          const dataExpclienteId = await db(`${tableExpcliente}`).where('dni', dataClient.dni)

          const movimientoExpclienteInfoId = await Promise.all(
            dataExpclienteId.map(async (exp) => {
              const movimientoExpcliente = await db(`${table}`).where('idexp', exp.idexp);
              return movimientoExpcliente;
            })
          );
          return movimientoExpclienteInfoId
        case mov:
          const dataMov = await db(`${table}`).where('idexp', info.idexp)
          return dataMov
      }
    } catch (e) {
      console.error(`Error al traer los datos de movimiento: `, e);
      return null;
    }
  }

  async create(newData) {
    try {
      const table = 'movimiento'
      const newResult = await db(`${table}`).insert(newData)
      return newResult
    } catch (e) {
      console.error(`Error al insertar los datos : `, e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const table = 'movimiento'
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});
        if (updateObject.fecha) {
          updateObject.fecha = format(new Date(updateObject.fecha), 'yyyy-MM-dd HH:mm:ss');
        }

        await db(`${table}`).where("idmovimiento", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error(`Error al modificar los datos: `, e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      const table = 'movimiento'
      await db(`${table}`).where('idmovimiento', ids).del()
      return true
    } catch (e) {
      console.error(`Error al borrar los datos de la tabla`, e);
      return false;
    }
  }
}

export default MovimientosService;