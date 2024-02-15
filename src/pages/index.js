import Head from 'next/head'
import { Inter } from 'next/font/google'
import withSession from "../lib/session";
import HomePage from './Home';
import Recordatorios from './recordatorios';
import RequestClient from './requestClient';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user, mail, status, dni }) {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className={`${inter.className}`}>
        {status == 1 ? <RequestClient user={user} dni={dni}/> : <HomePage user={user} mail={mail} />}
      </main>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const mail = req.session.get("mail");
  const status = req.session.get("status");

  if (user === undefined) {
    res.setHeader("location", "/websiteHome");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      user: req.session.get("user"),
      mail: req.session.get("email") ? req.session.get("email") : null,
      status: req.session.get("status"),
      dni: req.session.get('DNI') ? req.session.get('DNI') : null
    },
  };
});