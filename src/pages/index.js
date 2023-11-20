import Head from 'next/head'
import { Inter } from 'next/font/google'
import withSession from "../lib/session";
import HomePage from './Home';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {

  //tabs content


  const tabsData = [
    { label: 'Clientes', link: '#clientes', className: '...', isActive: false },
    { label: 'Decretos', link: '#decretos', className: '...', isActive: false },
    { label: 'Expedientes', link: '#expedientes', className: '...', isActive: false },
    { label: 'Consultas', link: '#consultas', className: '...', isActive: false },
    { label: 'Honorarios', link: '#honorarios', className: '...', isActive: false },
  ];

  //table content HAY QUE MODIFICARLO
  const data = [
    {
      nombre: 'John',
      apellido: 'Doe',
      dni: '12345678',
      contacto: '123-456-7890',
      correo: 'john.doe@example.com',
      domicilio: '123 Main St, City',
      observaciones: 'Some observations',
    },
  ];

  const headers = [
    { id: 'dni', label: 'dni', minWidth: 170 },
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'apellido', label: 'Apellido', minWidth: 100 },
    { id: 'telcel', label: 'Contacto', minWidth: 100 },
    { id: 'email', label: 'Correo electronico', minWidth: 100 },
    { id: 'domicilio', label: 'Domicilio', minWidth: 100 },
    { id: 'observaciones', label: 'Observaciones', minWidth: 100 },
  ];

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className={`${inter.className}`}>
        <HomePage user={user} />
        <a href='/api/logout'>Logout</a>
      </main>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});