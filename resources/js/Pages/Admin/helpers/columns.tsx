import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type CustomPageProps = PageProps<{
    lhcs: LHC[];
    selected?: LHC;
    selected_notes?: Note[];
}>;

const useLocalHousingContactSheet = ({
    info,
    selected,
}: {
    selected?: LHC;
    info: CellContext<LHC, unknown>;
}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        router.get(
            route("admin.dashboard.selected", {
                id: info.row.original.id,
            }),
            {},
            { preserveScroll: true }
        );
    };

    const handleOnOpenChange = (open: boolean) => {
        if (open) {
            return;
        }

        if (!open) {
            router.get(
                route("admin.dashboard"),
                {},
                {
                    preserveScroll: true,
                }
            );
        }
    };

    useEffect(() => {
        if (info.row.original.id === selected?.id) {
            setOpen(true);
        }
    }, []);

    return {
        open,
        handleClick,
        handleOnOpenChange,
    };
};

const columnHelper = createColumnHelper<LHC>();

export const columns = [
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
            const {
                props: { selected, selected_notes },
            } = usePage<CustomPageProps>();
            const { open, handleClick, handleOnOpenChange } =
                useLocalHousingContactSheet({
                    info,
                    selected,
                });

            return (
                <Sheet open={open} onOpenChange={handleOnOpenChange}>
                    <SheetTrigger asChild>
                        <Button onClick={handleClick}>View</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>{info.row.getValue("name")}</SheetTitle>
                            <SheetDescription className="flex flex-col gap-4">
                                <span>
                                    Here are some notes that have been recorded
                                    based on your conversations with{" "}
                                    {info.row.getValue("name")}.
                                </span>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex flex-col gap-2">
                                        <Input placeholder="Add a note" />
                                        <Button>Add Note</Button>
                                    </div>
                                </form>
                            </SheetDescription>
                            <SheetDescription className="mt-4">
                                {selected_notes?.map((notes) => (
                                    <div key={notes.id}>
                                        <p>{notes.note}</p>
                                        <p>user: {notes.user_id}</p>
                                    </div>
                                ))}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            );
        },
    }),
];
