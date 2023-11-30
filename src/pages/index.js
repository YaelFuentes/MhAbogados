import Head from 'next/head'
import { Inter } from 'next/font/google'
import withSession from "../lib/session";
import HomePage from './Home';
import ProtectedRoute from '@/services/protectedRoute';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className={`${inter.className}`}>
        <ProtectedRoute user={user}>
          <HomePage user={user} />
        </ProtectedRoute>
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
