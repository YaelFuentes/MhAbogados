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
      console.error("Error fetching client by ID:", error);
      return null;
    }
  }

  async getAll() {
    try {
      const clients = await db("cliente")
      return clients
    } catch (e) {
      console.error("Error fetching all clients:", error);
      return [];
    }
  }

  async create(newClientData){
    try{
      
    }catch (e) {

    }
  }
}