import React, { FC, memo } from 'react';
import { Column, useTable } from "react-table";

import './timeline.styles.scss';


interface TimelineTableProps {
  columns: Array<Column<object>>;
  data: Array<object>;
}

const CustomTimeline: FC<TimelineTableProps> = memo(({ columns, data }): JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data
    },
  );

  const generateKey = (pre: string | number): string => `${ pre }_${ new Date().getTime() }`;

  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()} key={i}>
            {row.cells.map((cell, n) => {
              return <td {...cell.getCellProps()} key={generateKey(n)}>
                {cell.render('Cell')}
              </td>
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  );
});

export default CustomTimeline;
