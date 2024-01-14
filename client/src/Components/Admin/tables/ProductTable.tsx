import { faArrowDown, faArrowUp, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';
import { Product } from '../../../types/products';

interface IProps {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<Product, any>[];
	data: Product[];
	onSelectProduct: (product: Product) => void;
}

const ProductTable = ({ columns, data, onSelectProduct }: IProps) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const productTable = useReactTable({
		data: data,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className=' my-2 border rounded-md overflow-hidden custom-shadow '>
			<table className='w-full mx-auto table-auto' table-layout=''>
				<thead className=''>
					{productTable.getHeaderGroups().map((headerGroup) => (
						<tr className='bg-deep-brown uppercase' key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									className={`p-3 font-heading-text tracking-wide text-left text-white ${
										header.column.getCanSort()
											? 'hover:text-light-tan cursor-pointer'
											: ''
									} `}
									key={`${header.id}-${header.column.id}`}
									onClick={
										header.column.getCanSort()
											? header.column.getToggleSortingHandler()
											: undefined
									}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
									<span className='text-white-tan ml-1'>
										{header.column.getCanSort() &&
											(header.column.getIsSorted() === 'asc' ? (
												<FontAwesomeIcon icon={faArrowDown} />
											) : header.column.getIsSorted() === 'desc' ? (
												<FontAwesomeIcon icon={faArrowUp} />
											) : (
												<FontAwesomeIcon icon={faArrowsAltV} />
											))}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{productTable.getSortedRowModel().rows.map((row, index) => (
						<tr
							key={row.id}
							className={index % 2 === 0 ? 'bg-warm-gray' : 'bg-white'}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={`${cell.id}-${cell.column.id}`}
									className='p-3 cursor-pointer' 
									onClick={() => onSelectProduct(row.original)} 
								>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext()
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
