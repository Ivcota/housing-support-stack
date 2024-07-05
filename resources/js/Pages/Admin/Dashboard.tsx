import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";

export interface LHC {
    id: number;
    name: string;
    user_id: number;
    congregation?: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_name?: string;
    project_housing_contact_id?: number;
}

const columnHelper = createColumnHelper<LHC>();

const columns = [
    columnHelper.accessor("id", {
        header: () => "ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("congregation", {
        header: () => "Congregation",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project_housing_contact_name", {
        header: () => "Project Housing Contact Name",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("project_housing_contact_id", {
        header: () => "Project Housing Contact ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: (info) => {
            return (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>View</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{info.row.getValue("name")}</SheetTitle>
                            <SheetDescription>
                                Here are some notes that have been recorded
                                based on your conversations with{" "}
                                {info.row.getValue("name")}.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            );
        },
    }),
];

const Dashboard = ({ auth, lhcs }: PageProps<{ lhcs: LHC[] }>) => {
    const table = useReactTable({
        data: lhcs,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 rounded bg-white">
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
                                                  header.column.columnDef
                                                      .header,
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
            </div>
        </Authenticated>
    );
};

export default Dashboard;
