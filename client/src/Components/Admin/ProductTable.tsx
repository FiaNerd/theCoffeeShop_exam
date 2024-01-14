import { NavLink } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const ProductTable = () => {
 
const { allProducts } = useProducts()

  const columns = [
    { Header: "# Id", accessor: "id" },
    { Header: "Product", accessor: "product" },
    { Header: "Price", accessor: "price"},
    { Header: "Type", accessor: "type" },
    { Header: "Roast Level", accessor: "roastLevel" },
    { Header: "Quantity", accessor: "orderquantityStatus" },
    {
      Header: "Produkter",
      accessor: "id",
      Cell: ({ value }) => (
        <NavLink to={`/orders/${value}`} className="px-6 justify-end py-4 whitespace-nowrap text-sm font-bold underline underline-offset-4 text-deep-brown cursor-pointer hover:opacity-80 flex items-center">
          <span className="my-auto">Se produk info </span>
        </NavLink>
      ),
    },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: allProducts ?? [] }, useSortBy, useFilters, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto m-8">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <input
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Sök..."
              className="px-4 py-2 border rounded"
            />
            <div>
              Sortera efter:{' '}
              {headerGroups.map((headerProduct) =>
                headerProduct.headers.map((column) => (
                  <span
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="cursor-pointer text-blue-500 ml-2"
                  >
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="overflow-hidden">
            <table {...getTableProps()} className="min-w-full">
              <thead className="bg-deep-brown border-b">
                {headerGroups.map((headerProduct) => (
                  <tr {...headerProduct.getHeaderGroupProps()}>
                    {headerProduct.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="text-md font-bold text-white px-6 py-4 text-left uppercase"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className={`${
                        row.index % 2 === 0 ? 'bg-white bg-opacity-40' : 'bg-orange bg-opacity-30'
                      } items-center border-b border-deep-brown  text-left`}
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap text-sm font-bold text-deep-brown"
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
