import React, { useState } from 'react'

const TableEdit = ({ columns, rows, buttons, onClickRow }) => {
  if (!rows || !Array.isArray(rows)) {
    return <p>No hay datos disponibles.</p>;
  }

  const renderCellContent = (column, row) => {
    if (column.format && row && typeof row === 'object' && column.id in row) {
      return column.format(row[column.id]);
    } else {
      return row && typeof row === 'object' && column.id in row ? row[column.id] : '';
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white text-center uppercase bg-blue-800 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-center sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12"
              >
                {column.label}
              </th>
            ))}
            {buttons &&
              buttons.length > 0 &&
              buttons.map((button, buttonIndex) => (
                <th
                  key={`button-${buttonIndex}`}
                  className="px-6 py-3 text-center sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12"
                >
                  {button.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              onClick={() => onClickRow && onClickRow(row)}
              className={`${index % 2 === 0
                ? 'even:bg-gray-50 even:dark:bg-gray-800'
                : 'odd:bg-white odd:dark:bg-gray-900'
                } border-b dark:border-gray-700`}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className="px-6 py-4 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12 text-center"
                >
                  {renderCellContent(column, row)}
                </td>
              ))}
              {buttons &&
                buttons.length > 0 &&
                buttons.map((button, buttonIndex) => (
                  <td
                    key={`button-${buttonIndex}`}
                    className="px-6 py-4 sm:w-1/4 md:w-1/6 lg:w-1/8 xl:w-1/12"
                  >
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        button.onClick(row);
                      }}
                    >
                      {button.button}
                    </span>
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default TableEdit