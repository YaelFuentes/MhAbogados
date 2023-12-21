import { db } from '@/core/connection/databaseService'

class ExpclienteService {
  constructor(
    idexpcliente,
    idexp,
    dni,
    avisodeuda,
    observaciones,
    honoinicial,
    honocamara,
    honocortsupr,
    honomedcaut,
    honoretromcaut,
    honofinal,
    cautelarfecha,
    cautelardeuda,
    cautelarobs,
    retrofecha,
    retrodeuda,
    retroobs,
    honofecha,
    honodeuda,
    honoobs) {
    this.idexpcliente = idexpcliente;
    this.idexp = idexp;
    this.dni = dni;
    this.avisodeuda = avisodeuda;
    this.observaciones = observaciones;
    this.honoinicial = honoinicial;
    this.honocamara = honocamara;
    this.honomedcaut = honomedcaut;
    this.honocortsupr = honocortsupr;
    this.honoretromcaut = honoretromcaut;
    this.honofinal = honofinal;
    this.cautelarfecha = cautelarfecha;
    this.cautelardeuda = cautelardeuda;
    this.cautelarobs = cautelarobs;
    this.retrofecha = retrofecha;
    this.retrodeuda = retrodeuda;
    this.retroobs = retroobs;
    this.honofecha = honofecha;
    this.honodeuda = honodeuda;
    this.honoobs = honoobs;
  }
  async getById(id) {
    try {
      const clientId = await db("cliente").where("id", id)
      const expCliente = await db("expcliente").where("dni", clientId[0].dni).first(); 
      return expCliente;
    } catch (e) {
      console.error("Error fetching client by ID:", e);
      return null;
    }
  }
  async getAll() {
    try {
      const clients = await db("expcliente")
      return clients
    } catch (e) {
      console.error("Error fetching all clients:", e);
      return [];
    }
  }
  async create(newClientData) {
    try {
      const newClientId = await db("expcliente").insert(newClientData)
      return newClientId;
    } catch (e) {
      console.error('Error creating a new client:', e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];
      console.log(updates, ids)
      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("expcliente").where("idexpcliente", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating client by IDs:", e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      await db("expcliente").whereIn("idexpcliente", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting client by ID:", e);
      return false;
    }
  }
}
export default ExpclienteService;