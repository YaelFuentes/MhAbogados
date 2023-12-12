import { ClientNotification } from "../services";

class clientNotificationController {
  static clientNotificationservice = new ClientNotification();
  static async getClientById() {
    return await this.clientNotificationservice.getById()
  }
}

export default clientNotificationController;