import { db } from "../connection/databaseService";

class ForgotPasswordService{
  constructor(id, dni, email){
    this.id = id;
    this.dni = dni;
    this.email = email;
  }
  async create(){
    
  }
}