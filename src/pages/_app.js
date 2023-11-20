import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { Montserrat } from "next/font/google"
import { SWRConfig } from "swr";
import fetch from "../lib/fetchJson";
import { useRouter } from 'next/router'
import axios from 'axios'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
})

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoginPage = router.pathname === '/login';

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/api/user');
        const data = response.data
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
      {/* {isLoggedIn && <ResponsiveAppBar />} */}
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err);
          },
        }
        }
      >{isLoggedIn && !isLoginPage /* && <ResponsiveAppBar /> */}
        <Component {...pageProps} isLoggedIn={isLoggedIn} />
      </SWRConfig>
    </main>
  );
}

export default MyApp