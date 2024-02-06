import React from 'react';

export default function FooterWeb() {
  return (
    <footer className="bg-gradient-to-b from-blue-900 via-blue-800 to-black shadow dark:bg-gray-900 text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="sm:grid sm:grid-cols-2 sm:gap-4">
          <a href="/img/logo/Logo.png" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/img/logo/Logo.png" className="h-8" alt="M.H Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Mariana Heredia abogados</span>
          </a>
          <div className="sm:w-full md:w-2/3 lg:w-3/4">
            <h1 className="mb-2">Contacto: 261 256 0300</h1>
            <h1>Correo electrónico: estudioherediamza@gmail.com</h1>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="/img/logo/Logo.png" className="hover:underline">Mariana Heredia abogados</a>. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
