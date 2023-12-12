import { MovimientosService } from "../services";

class MovimientoController {
  static movimientoService = new MovimientosService();
  static async getDataById(id) {
    return await this.movimientoService.getById(id);
  }

  static async createData(fileData) {
    return await this.movimientoService.create(fileData);
  }

  static async getAllData() {
    return await this.movimientoService.getAll();
  }

  static async updateDataByIds(ids, fieldsToUpdate) {
    return await this.movimientoService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteDataByIds(ids) {
    return await this.movimientoService.deleteByIds(ids);
  }
}
export default MovimientoController;