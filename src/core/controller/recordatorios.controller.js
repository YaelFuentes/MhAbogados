import { RecordatorioService } from '@/core/services'

class RecordatorioController{
  static recordatorioController = new RecordatorioService();
  static async getAll(){
    return await this.recordatorioController.getAll();
  }
  static async getRecordById(data){
    return await this.recordatorioController.create(data)
  }
}

export default RecordatorioController;