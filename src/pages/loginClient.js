import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { clientServiceFactory } from '@/clientServices/userService';
import Loading from '@/components/mui/Loading';
import useUser from '@/lib/useUser';
import RegisterClient from './registerClient';
import ForgotPassword from './forgotPassword';

const clientService = clientServiceFactory()


const LoginClient = () => {
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const clientData = await clientService.login(username, password)
      window.location.reload()
      mutateUser(clientData)
    } catch (e) {
      setIsLoading(false)
      alert(e.response.data.error)
    }
  }
  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };

  return (
    <main>
      <div>
        {!user ?
          (<Loading />) :
          <section>
            {!user.isLoggedIn &&
              <div className="flex flex-col gap items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {isLoading ?
                  (<Loading />) :
                  (
                    <div>
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-white">
                        <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                              <img className="mx-auto h-32 w-auto"
                                src="/img/logo/Logo.png"
                                alt="MarianaHeredia abogados" />
                            </div>
                            <h1 className="text-xl text-center ml-8 mr-8 font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                              Bienvenido
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                              <div>
                                <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
                                <div className='flex'>
                                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                  </span>
                                  <input
                                    name="uname"
                                    type="text"
                                    onChange={usernameHandler}
                                    required
                                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=" Ej. 30235865" />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Contraseña</label>
                                <input
                                  name="psw"
                                  type="password"
                                  onChange={passwordHandler}
                                  required
                                  placeholder="••••••••"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                              </div>
                              {/* <a href="#" className="text-sm font-medium text-black hover:underline dark:text-primary-500">Olvidaste la contraseña?</a> */}
                              <div>
                                <ForgotPassword />
                              </div>
                              <div>
                                <button
                                  type="submit"
                                  className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                  Ingresar
                                </button>
                                <div
                                  className="w-full mt-4 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                  <RegisterClient />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            }
          </section>
        }
      </div>
    </main>
  )
}
export default LoginClient;