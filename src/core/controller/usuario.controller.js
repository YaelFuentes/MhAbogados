import { UserService } from '@/core/services/usuario.service';

class UserController {
  static userService = new UserService();
  static async getFileById(id) {
    return await this.userService.getById(id);
  }

  static async createFile(fileData) {
    return await this.userService.create(fileData);
  }

  static async getAllFiles() {
    return await this.userService.getAll();
  }

  static async updateFilesById(ids, fieldsToUpdate) {
    return await this.userService.updateByIds(ids, fieldsToUpdate);
  }

  static async deleteFileById(ids) {
    return await this.userService.deleteByIds(ids);
  }
}

export default UserController;