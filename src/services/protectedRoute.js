import { useRouter } from 'next/router';
import withSession from '../lib/session';

const ProtectedRoute = ({ children, user }) => {
  const router = useRouter();

  // Verificar la sesión
  if (!user) {
    // Redireccionar a la página de inicio de sesión si no hay usuario
    router.replace('/login');
    return null; // No renderizar nada mientras se redirecciona
  }

  // Renderizar el contenido protegido
  return children;
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');

  // Si no hay usuario, redireccionar a la página de inicio de sesión
  if (!user) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  // Pasar el usuario como prop al componente
  return {
    props: { user },
  };
});

export default ProtectedRoute;
