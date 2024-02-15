import jwt from 'jsonwebtoken';

export function generateToken(){
  const payload = {
    // Puedes agregar más información aquí si es necesario
    // Por ejemplo, puedes incluir el ID del usuario para asociarlo con el token de restablecimiento
    // userId: userId
  };
  const secret = process.env.SECRET_TOKEN
  const options = {
    expiresIn : '1h'
  }
  const token = jwt.sign(payload, secret, options);

  return token;
}