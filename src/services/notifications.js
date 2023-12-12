import Twilio from 'twilio'
import { NextResponse } from 'next/server';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = Twilio(accountSid, authToken)

export async function GET() {
  try {
    const message = await client.messages.create({
      body: "esto es una prueba",
      from: process.env.TEST_NUMBER,
      to: process.env.USER_NUMBER
    })
    console.log(message.sid)
    return NextResponse.json({ message: 'success' })
  } catch (e) {
    console.log(e)
    return NextResponse.json({ message: 'error' }, {stauts: 400})
  }
}