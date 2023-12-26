import Head from 'next/head'
import { Inter } from 'next/font/google'
import withSession from "../lib/session";
import HomePage from './Home';
import Recordatorios from './recordatorios';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user, mail }) {

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className={`${inter.className}`}>
        <HomePage user={user} mail={mail}/>
      </main>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const mail = req.session.get("mail")

  if (user === undefined) {
    res.setHeader("location", "/websiteHome");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user"), mail: req.session.get("email") },
  };
});