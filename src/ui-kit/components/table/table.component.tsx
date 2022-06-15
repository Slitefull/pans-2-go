import React, { FC } from 'react';
import { Column, useTable } from 'react-table'

import './table.styles.scss'


interface TableProps {
  columns: Array<Column<object>>;
  data: Array<object>;
}

const Table: FC<TableProps> = (
  {
    columns,
    data,
  }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <div
      className="custom-table"
      {...getTableProps()}
    >
      <div className="header">
        {headerGroups.map(headerGroup => (
          <div
            className="header-group"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                className="header-group__element"
                {...column.getHeaderProps([
                  {
                    /*@ts-ignore*/
                    style: column.style
                  },
                ])}
              >
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="body"
        {...getTableBodyProps()}
      >
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div
              className="table-row"
              {...row.getRowProps()}
            >
              {row.cells.map(cell => {
                return <div
                  className="table-row__content"
                  {...cell.getCellProps([{
                    /*@ts-ignore*/
                    style: cell.column.style,
                  }])}
                >
                  {cell.render('Cell')}
                </div>
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Table;
