import { db } from "../connection/databaseService";
import Twilio from 'twilio'
import { NextResponse } from 'next/server';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Twilio(accountSid, authToken)

class ClientNotification {
  constructor(id, user, from) {
    this.id = id;
    this.user = user;
    this.from = from;
  }
  async getById() {
    try {
      const message = await client.messages.create({
        body: "esto es una prueba",
        from: process.env.TEST_NUMBER,
        to: process.env.USER_NUMBER
      })
      console.log(message.sid)
      return message
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
export default ClientNotification;
