import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TableResponsive({ columns, rows, optional, routes }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null); // null o 'asc' o 'desc'
  const [filterBy, setFilterBy] = useState(''); // Puede ser 'name', 'age', etc.
  const usersPerPage = 15;
  optional = optional || '';

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (indexOfLastUser < rows.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatId = (id) => {
    return typeof id === 'string' && id.includes('/') ? id.replace(/\//g, '-') : id;
  };

  const sortData = (key) => {
    if (key === filterBy) {
      setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy('asc');
      setFilterBy(key);
    }
  };

  const sortedUsers = useMemo(() => {
    if (filterBy) {
      const sorted = [...rows].sort((a, b) => {
        const valueA = a[filterBy];
        const valueB = b[filterBy];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortBy === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else {
          return sortBy === 'asc' ? valueA - valueB : valueB - valueA;
        }
      });
      return sorted;
    } else {
      return rows;
    }
  }, [rows, filterBy, sortBy]);

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <div className="container mx-auto my-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((i) => (
                  <th
                    scope="col"
                    className="px-6 py-3 border-r border-gray-300 bg-blue-800 text-white cursor-pointer"
                    key={i.id}
                    onClick={() => sortData(i.id)}
                  >
                    {i.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((i) => (
                <tr
                  id={i.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={i.id}
                >
                  {columns.map((column) => (
                    <td className="px-6 py-4" key={`${i.id}-${column.id}`}>
                      {routes ? (
                        <Link
                          href={`/${routes}/[id]`}
                          as={`/${routes}/${formatId(i.clientId || i.id || i.idexp || i.idexpediente)}`}
                        >
                          {i[column.id]}
                        </Link>
                      ) : (
                        <span>{i[column.id]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Mostrando{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {indexOfFirstUser + 1} - {indexOfLastUser > rows.length ? rows.length : indexOfLastUser}
              </span>{' '}
              clientes de{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{rows.length}</span>
            </span>
            <ul className="inline-flex -space-x-px text-sm h-8">
              <li>
                <button
                  onClick={handlePreviousPage}
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Anterior
                </button>
              </li>
              <li>
                <button
                  onClick={handleNextPage}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
