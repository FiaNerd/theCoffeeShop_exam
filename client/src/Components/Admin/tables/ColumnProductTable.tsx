import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/products';
import { formatPrice } from '../../../utils/formatPrice';

const columnHelper = createColumnHelper<Product>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productColumns: ColumnDef<Product, any>[] = [
    columnHelper.accessor('id', {
		header: 'Id',
	}),
	columnHelper.accessor('imageUrl', {
		header: 'Image',
		enableSorting: false,

		cell: (props) => (
			<img
				src={
					props.row.original.imageUrl
						? props.row.original.imageUrl
						: `https://placehold.co/400x400/033249/FFFFFF?text='No image'`
				}
				alt='product image'
				className='w-10 img-product'
			/>
		),
	}),
	columnHelper.accessor('name', {
		header: 'Product',
		cell: (props) => (
			<Link
				className='text-dark-blue hover:text-orange hover:opacity-80 hover:underline'
				to={`/products/${props.row.original.id}`}
			>
				{props.row.original.name}
			</Link>
		),
	}),
	columnHelper.accessor('type', {
		header: 'Type',
	}),
	columnHelper.accessor('roastLevel', {
		header: 'Roast Level',
		cell: (props) => <span>{props.row.original.roastLevel || '-'}</span>,
		sortDescFirst: false,
	}),

	columnHelper.accessor('quantityInStock', {
		header: 'I lager',
		cell: (props) => (
			<span>{props.row.original.quantityInStock || '-'}</span>
		),
		sortDescFirst: false,
	}),
	columnHelper.accessor('price', {
		header: 'Pris',
		cell: (props) => (
			<span>{formatPrice(props.row.original.price) || '-'}</span>
		),
		sortDescFirst: false,
	}),
	columnHelper.display({
		id: 'actions',
		cell: (props) => (
			<Link
				key={props.row.original.id}
				to={`/products/${props.row.original.id}`}
			>
				<FontAwesomeIcon icon={faPenToSquare} className='text-amber-600'/>
			</Link>
		),
	}),
    columnHelper.display({
		id: 'actions',
		cell: (props) => (
			<Link
				key={props.row.original.id}
				to={`/products/${props.row.original.id}`}
			>
				<FontAwesomeIcon icon={faTrash} className='text-red-800'/>
			</Link>
		),
	}),
]
