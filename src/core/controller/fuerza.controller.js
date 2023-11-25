import { FuerzaService } from "../services";

class FuerzaController {
  static fuerzaService = new FuerzaService();
  static async getDataById(id) {
    return await this.fuerzaService.getById(id);
  }

  static async createData(fileData) {
    return await this.fuerzaService.create(fileData);
  }

  static async getAllData() {
    return await this.fuerzaService.getAll();
  }

  static async updateDataByIds(ids, fieldsToUpdate) {
    return await this.fuerzaService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteDataByIds(ids) {
    return await this.fuerzaService.deleteByIds(ids);
  }
}
export default FuerzaController;