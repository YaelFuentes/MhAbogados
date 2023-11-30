const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
let isAuthenticated = false;

client.on('qr', (qrCode) => {
  // Puedes mostrar o hacer lo que quieras con el código QR aquí
  console.log('QR Code received:', qrCode);

  // También puedes utilizar la librería de whatsapp-web.js para mostrar el código QR en la terminal
  client.qrCode = qrCode;
  console.log('Scan this QR code with your phone to authenticate.');
});

client.on('authenticated', (session) => {
  console.log(session);
  // Guardar la información de la sesión para futuras conexiones
  isAuthenticated = true;
  console.log('Authenticated');
});

client.on('ready', () => {
  console.log('Client is ready!');
  // Puedes agregar lógica adicional aquí, por ejemplo, enviar un mensaje
  // después de que la conexión sea exitosa.
});

client.on('message', (message) => {
  // Lógica para manejar mensajes entrantes
});

// Evento para manejar errores
client.on('auth_failure', (message) => {
  console.error('Authentication failed:', message);
});

// Evento para manejar otros errores
client.on('disconnected', (reason) => {
  console.error('Client was disconnected:', reason);
});

// Conectar el cliente a WhatsApp
client.initialize().then(() => {
  console.log('Client initialized successfully');
}).catch((error) => {
  console.error('Error initializing client:', error);
});

// Función para enviar un mensaje
async function enviarMensaje(numero, mensaje) {
  const contacto = await client.getContactById(numero);
  console.log('contacto: ', contacto)
  if (contacto) {
    await contacto.sendMessage(mensaje);
  }else{
    console.log(`contacto is undefined : ${contacto}`)
  }
}

module.exports = {
  enviarMensaje,
};
