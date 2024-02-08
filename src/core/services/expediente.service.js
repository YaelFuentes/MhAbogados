import { db } from "../connection/databaseService";
import { format } from "date-fns";

class ExpedienteService {
  constructor(idexp, caratula, juzgasecret, avisodeuda, observaciones, honoinicial, honocamara, honocortsupr,
    honoretromcaut, honofinal, decretos, camara, fechacautelar, idfuerza, fechasentencia, sentencia) {
    this.idexp = idexp;
    this.caratula = caratula;
    this.juzgasecret = juzgasecret;
    this.avisodeuda = avisodeuda;
    this.observaciones = observaciones;
    this.honoinicial = honoinicial;
    this.honocamara = honocamara;
    this.honocortsupr = honocortsupr;
    this.honoretromcaut = honoretromcaut;
    this.honofinal = honofinal;
    this.decretos = decretos;
    this.camara = camara;
    this.fechacautelar = fechacautelar;
    this.idfuerza = idfuerza;
    this.fechasentencia = fechasentencia;
    this.sentencia = sentencia;
  }
  async getById(id) {
    try {
      const isDNI = id && id.toString().length >= 6;
      let clienteQuery;
      if (isDNI) {
        clienteQuery = db('cliente').where('dni', id);
      } else {
        clienteQuery = db('cliente').where('id', id);
      }

      const getClientDni = await clienteQuery.first();

      const expCliente = await db('expcliente').where('dni', getClientDni.dni);
      const expedienteInfo = await Promise.all(
        expCliente.map(async (exp) => {
          const expedienteData = await db('expediente').where('idexp', exp.idexp).first();
          return expedienteData;
        })
      );

      const resultArray = {
        getClientDni,
        expCliente,
        expedienteInfo,
      };
      return resultArray;
    } catch (e) {
      console.error("Error fetching user by ID:", e);
      return null;
    }
  }

  async getAll() {
    try {
      const files = await db('expediente');
      return files;
    } catch (e) {
      console.error("Error fetching all users:", e);
      return [];
    }
  }

  async create(newFileData) {
    try {
      const dataId = await db('cliente').where('id', newFileData.id).first()
      const dataExpediente = { ...newFileData, fechasentencia: db.raw('NOW()') }
      delete dataExpediente.id
      const newData = await db('expediente').insert(dataExpediente);
      const [newFileId] = await db('expediente').select('id').orderBy('id', 'desc').limit(1);
      await db('expcliente').insert({ idexp: dataExpediente.idexp, dni: dataId.dni })
      return newFileId;
    } catch (e) {
      console.error('Error creating a new user:', e);
      return null;
    }
  }

  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const updateData = { ...update };
        delete updateData.idexpOld;
        if (updateData.fechasentencia) {
          updateData.fechasentencia = format(new Date(updateData.fechasentencia), 'yyyy-MM-dd HH:mm:ss');
        }
        await db('expcliente')
          .where({ dni: ids, idexp: updates.idexpOld })
          .update({ idexp: updateData.idexp });

        await db('expediente')
          .where('idexp', updates.idexpOld)
          .update({
            idexp: updateData.idexp,
            fechasentencia: updateData.fechasentencia,
            caratula: updateData.caratula,
            juzgasecret: updateData.juzgasecret,
            decretos: updateData.decretos,
            camara: updateData.camara
          })
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating user by IDs:", e);
      return false;
    }
  }

  async deleteByIds(ids, idexpe) {
    console.log(idexpe, ids)
    try {
      await db.transaction(async (trx) => {
        await db("expcliente").transacting(trx).where({ dni: ids, idexp: idexpe }).del();
        await db("expediente").transacting(trx).where("idexp", idexpe).del();
      });
      return { status: 200, message: "Operación exitosa" };
    } catch (e) {
      console.error("Error deleting user by ID:", e);
      return { status: 400, message: "Operación Fallida" };
    }
  }
}

export default ExpedienteService;