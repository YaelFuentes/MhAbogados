import { ExpedienteService } from "../services";

class ExpedienteController {
  static expedienteService = new ExpedienteService();
  static async getFileById(id) {
    return await this.expedienteService.getById(id);
  }

  static async createFile(fileData) {
    return await this.expedienteService.create(fileData);
  }

  static async getAllFiles() {
    return await this.expedienteService.getAll();
  }

  static async updateFilesById(ids, fieldsToUpdate) {
    return await this.expedienteService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteFileById(ids) {
    return await this.expedienteService.deleteByIds(ids);
  }
}

export default ExpedienteController;