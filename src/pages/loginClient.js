import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { clientServiceFactory } from '@/clientServices/userService';
import Loading from '@/components/mui/Loading';
import useUser from '@/lib/useUser';
import RegisterClient from './registerClient';
import ForgotPassword from './forgotPassword';
import NavbarWeb from "./navbarWeb";
import Swal from 'sweetalert2';

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
      /* alert(e.response.data.error) */
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: e.response.data.error,
        showConfirmButton: true,
      })
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
      <NavbarWeb />
      <div>
        {!user ?
          (<Loading />) :
          <section>
            {!user.isLoggedIn &&
              <div className="flex flex-col gap items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                {isLoading ?
                  (<Loading />) :
                  (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="md:mx-4">
                        <h1 className="mb-4">Bienvenido al servicio de acceso en línea de MhAbogados</h1>
                        <p className="mb-4">
                          Este portal en línea le brinda acceso a toda la información asociada a las causas judiciales que tiene con el estudio jurídico de la Dra. Mariana Heredia. Lo invitamos a completar el formulario de login
                          en su primer acceso para garantizar la seguridad de sus datos.

                        </p>
                        <br />
                        <p className="mb-4">
                          Una vez dentro del portal, podrá acceder a la información asociada a sus causas.
                        </p>
                        <br />
                        <p>
                          Queda bajo su exclusiva responsabilidad el uso del Sitio al momento de su ingreso,
                          y nos deslindamos de toda responsabilidad por el uso inadecuado de la información que brinda este sitio.
                        </p>
                      </div>
                      <div className="flex items-center justify-center md:col-span-1">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-white">
                          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                              <img className="mx-auto h-32 w-auto" src="/img/logo/Logo.png" alt="MarianaHeredia abogados" />
                            </div>
                            <h1 className="text-xl text-center ml-8 mr-8 font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                              Bienvenido
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                              <div>
                                <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
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
                                    placeholder=" Ej. 30235865"
                                  />
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
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <ForgotPassword />
                              </div>
                                <div className="flex">
                                  <button
                                    type="submit"
                                    className="w-full mb-4 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    Ingresar
                                  </button>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="w-full text-white bg-blue-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  >
                                    <RegisterClient />
                                  </button>
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