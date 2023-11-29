import { ExpclienteService } from "../services";

class ExpClienteController {
  static expClienteService = new ExpclienteService();
  static async getDataById(id) {
    return await this.expClienteService.getById(id);
  }

  static async createData(data) {
    return await this.expClienteService.create(data);
  }

  static async getAllData() {
    return await this.expClienteService.getAll();
  }

  static async updateDataById(ids, fieldsToUpdate) {
    return await this.expClienteService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteDataById(ids) {
    return await this.expClienteService.deleteByIds(ids);
  }
}
export default ExpClienteController;