import { db } from "../connection/databaseService";

class ClienteService {
  constructor(id, dni, nombre, apellido, telcel, email, idFueza, idRevista, idGrado) {
    this.id = id;
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telcel = telcel;
    this.email = email;
    this.idFueza = idFueza;
    this.idRevista = idRevista;
    this.idGrado = idGrado;
  }

  async getById(id) {
    try {
      const client = await db("cliente").where("id", id).first();
      return client;
    } catch (e) {
      console.error("Error fetching client by ID:", e);
      return null;
    }
  }

  async getAll() {
    try {
      const clients = await db("cliente")
      return clients
    } catch (e) {
      console.error("Error fetching all clients:", e);
      return [];
    }
  }

  async create(newClientData) {
    try {
      const newClientId = await db("cliente").insert(newClientData)
      return newClientId;
    } catch (e) {
      console.error('Error creating a new client:', e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("cliente").where("id", ids).update(updateObject);
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
      await db("cliente").whereIn("id", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting client by ID:", e);
      return false;
    }
  }
}

export default ClienteService;