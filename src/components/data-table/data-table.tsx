import React from 'react';
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { useTranslation } from 'react-i18next';

type DataTableProps<TyData, TyValue> = {
	columns: Array<ColumnDef<TyData, TyValue>>;
	data: TyData[];
	onRowClick?: (row: TyData) => void;
	rowTestIdPrefix?: string;
	cellTestIdPrefix?: string;
};

export function DataTable<TyData, TyValue>({
	columns,
	data,
	onRowClick,
	rowTestIdPrefix = 'data-table-row',
	cellTestIdPrefix = 'data-table-cell',
}: DataTableProps<TyData, TyValue>) {
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);

	const { t } = useTranslation();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<div className="p-1 mt-5 w-full h-full overflow-auto">
			<div className="rounded-md border overflow-x-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row, rowIndex) => (
								<TableRow
									key={row.id}
									data-testid={`${rowTestIdPrefix}-${rowIndex}`}
									data-state={row.getIsSelected() && 'selected'}
									onClick={() => onRowClick?.(row.original)}
									className={onRowClick ? ('cursor-pointer hover:underline underline-offset-4') : ''}>
									{row.getVisibleCells().map((cell, cellIndex) => (
										<TableCell
											key={cell.id}
											data-testid={`${cellTestIdPrefix}-${rowIndex}-${cellIndex}`}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									{t('noData')}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
