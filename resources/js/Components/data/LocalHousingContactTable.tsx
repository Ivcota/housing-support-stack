import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { columns } from "@/Pages/Admin/helpers/columns";

const LocalHousingContactTable = ({ lhcs }: { lhcs: LHC[] }) => {
    const table = useReactTable({
        data: lhcs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <Table>
            <TableCaption>Local Housing Contacts</TableCaption>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default LocalHousingContactTable;
