import { UserClientService } from "../services";

class UserClientController {
  static userClientController = new UserClientService();
  static async getUserClientById(id) {
    return await this.userClientController.getById(id);
  }
  static async createUserClient(data) {
    return await this.userClientController.create(data);
  }
  static async getAllUserClient() {
    return await this.userClientController.getAll();
  }
  static async updateUserClientById(ids, fieldsToUpdate) {
    return await this.userClientController.updateByIds(ids, fieldsToUpdate);
  }
  static async deleteUserClientById(ids) {
    return await this.userClientController.deleteByIds(ids);
  }
}
export default UserClientController