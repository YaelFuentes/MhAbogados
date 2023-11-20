import { ClienteService } from "../services";

class ClientController{
  static clienteService = new ClienteService();
  static async getClientById(id) {
    return await this.clienteService.getById(id);
  }

  static async createClient(clientData) {
    return await this.clienteService.create(clientData);
  }

  static async getAllClients() {
    return await this.clienteService.getAll();
  }

  static async updateClientById(ids, fieldsToUpdate) {
    return await this.clienteService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteClientById(ids) {
    return await this.clienteService.deleteByIds(ids);
  }
}

export default ClientController;