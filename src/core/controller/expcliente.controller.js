import { ExpclienteService } from "../services";

class ExpClienteController {
  static expClienteService = new ExpclienteService();
  static async getDataById(info) {
    return await this.expClienteService.getById(info);
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