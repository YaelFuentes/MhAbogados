import { UserService } from "../services";

class UserController {
  static userService = new UserService();
  static async getUsersById(id) {
    return await this.userService.getById(id);
  }

  static async createUser(userData) {
    return await this.userService.create(userData);
  }

  static async getAllUsers() {
    return await this.userService.getAll();
  }

  static async updateUsersById(ids, fieldsToUpdate) {
    return await this.userService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteUsersById(ids) {
    return await this.userService.deleteByIds(ids);
  }
}

export default UserController;