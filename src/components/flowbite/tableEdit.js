import React from 'react'

const TableEdit = ({ columns, rows, editButtonComponent }) => {
  if (!rows || !Array.isArray(rows)) {
    return <p>No hay datos disponibles.</p>;
  }
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((i) => {
              return (
                <>
                  <th scope="col" class="px-6 py-3" key={i.id}>
                    {i.label}
                  </th>
                </>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0
                ? 'even:bg-gray-50 even:dark:bg-gray-800'
                : 'odd:bg-white odd:dark:bg-gray-900'
                } border-b dark:border-gray-700`}
            >
              {columns.map((column) => (
                <td key={column.id} className="px-6 py-4">
                  {row && typeof row === 'object' && column.id in row ? row[column.id] : ''}
                </td>
              ))}
              <td className="px-6 py-4">
                {editButtonComponent && (
                  <span onClick={() => editButtonComponent.onEditClick(row)}>
                    {editButtonComponent.button}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableEdit