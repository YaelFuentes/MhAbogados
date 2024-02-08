import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { clientServiceFactory } from '@/clientServices/userService';
import Loading from '@/components/mui/Loading';
import useUser from '@/lib/useUser';

const clientService = clientServiceFactory()


const LoginClient = () => {
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

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
  }
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
                              Bienvenidos
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                              <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Nombre de usuario</label>
                                <input
                                  name="uname"
                                  type="text"
                                  onChange={usernameHandler}
                                  required
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Heredia" />
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
                              <a href="#" className="text-sm font-medium text-white hover:underline dark:text-primary-500">Olvidaste la contraseña?</a>
                              <div>
                                <button
                                  type="submit"
                                  className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                  Ingresar
                                </button>
                                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                No recuerdas la contraseña? <a href="#" className="font-medium text-primary-10 hover:underline dark:text-primary-20">Sign up</a>
                              </p> */}
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