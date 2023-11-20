import React from 'react';

function SearchTable({ data, columns }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="w-full mx-auto text-sm text-center rtl:text-right text-white bg-yellow-300 dark:bg-yellow-500">
                    <tr>
                        {columns.map((item) => {
                            return(
                            <th scope="col" className="p-4" key={item.id}>
                                {item.label}
                            </th>)
                        })}

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-black border-b border-white text-white dark:bg-gray-800 dark:border-gray-700 text-center">
                            <td className="px-6 py-4">{`${item.nombre} ${item.apellido}`}</td>
                            <td className="px-6 py-4">{item.dni}</td>
                            <td className="px-6 py-4">{item.contacto}</td>
                            <td className="px-6 py-4">{item.correo}</td>
                            <td className="px-6 py-4">{item.domicilio}</td>
                            <td className="px-6 py-4">{item.observaciones}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Exporta el componente SearchTable
export default SearchTable;
