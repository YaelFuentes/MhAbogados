import { RecordatorioService } from '@/core/services'

class RecordatorioController{
  static recordatorioController = new RecordatorioService();
  static async getAll(isSend){
    return await this.recordatorioController.getAll(isSend);
  }
  static async getRecordById(data){
    return await this.recordatorioController.create(data)
  }
}

export default RecordatorioController;