import { NotificationService } from '@/core/services'

class NotitifacionController {
  static notificationService = new NotificationService();
  static async getNotificationById(mailOptions) {
    return await this.notificationService.notificationMail(mailOptions)
  }
  static async envioRecordatorio(mailOptions) {
    return await this.notificationService.recordatorioMail(mailOptions)
  }
}

export default NotitifacionController;