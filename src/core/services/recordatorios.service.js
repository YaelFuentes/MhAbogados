import {db} from '@/core/connection/databaseService'

class RecordatorioService {
  constructor(idEventos, startDate, endDate){
    this.idEventos = idEventos;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  async getAll(){
    try{
      const table = 'eventos'
      const records = await db(`${table}`)
      return records
    }catch(e){
      console.error("Error fetching records by ID:", e)
      return null
    }
  }

  async create(newDataRecord){
    try{
      console.log(newDataRecord)
      const table = 'eventos'
      const newRecordId = await db(`${table}`).insert(newDataRecord)
      return newRecordId;
    }catch (e){
      console.error('Error creating a new record:', e);
      return null;
    }
  }
}
export default RecordatorioService;