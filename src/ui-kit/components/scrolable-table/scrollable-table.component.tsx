import React, { FC, ReactNode } from 'react';
import { Column, useTable } from 'react-table'
import InfiniteScroll from "react-infinite-scroll-component";
import SortIcon from "@/ui-kit/customized-icons/sort/sort.component";

import './scrollable-table.styles.scss'


interface ScrollableTableProps {
  columns: Array<Column<object>>;
  data: Array<object>;
  onScrollHandler: () => void;
  onRowClickHandler?: (id: string) => void;
  loader: ReactNode;
  hasMore: boolean;
  scrollBodyHeight: number;
  noDataMessage: ReactNode;
}

const ScrollableTable: FC<ScrollableTableProps> = (
  {
    columns,
    data,
    onScrollHandler,
    onRowClickHandler,
    loader,
    hasMore,
    scrollBodyHeight,
    noDataMessage,
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
      className="scrollable-table"
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
                <div className="sort-icon">
                  {/*@ts-ignore*/}
                  {column.sortByHandler && <SortIcon onClickHandler={column.sortByHandler} color={'#FFFFFF'} size={22}/>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className="body"
        {...getTableBodyProps()}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={onScrollHandler}
          hasMore={hasMore}
          height={scrollBodyHeight}
          loader={loader}
        >
          {
            data.length
              ? rows.map((row, i) => {
                prepareRow(row)
                return (
                  <div
                    className={`table-row ${onRowClickHandler ? "clickable" : ""}`}
                    {...row.getRowProps()}
                    onClick={onRowClickHandler && ((e) => {
                      e.stopPropagation();
                      onRowClickHandler(row.values.id)
                    })}
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
              })
              : noDataMessage
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ScrollableTable;
