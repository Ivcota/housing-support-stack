import { Link, router } from "@inertiajs/react";
import { Survey, SurveyPaginated } from "@/types/application";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";

export const SurveyList = ({ surveys }: { surveys: SurveyPaginated }) => {
    const survey = createColumnHelper<Survey>();
    console.log(surveys);

    const onPageChange = (event: any) => {
        router.get(`/dashboard?page=${event.first}`);
    };

    const columns = [
        survey.accessor("id", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("address", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("status", {
            cell: (info) => info.getValue(),
        }),
        survey.accessor("id", {
            header: () => "details",
            cell: (info) => (
                <Link
                    href={`/survey/${info.getValue()}`}
                    className="link link-primary"
                >
                    View Details
                </Link>
            ),
        }),
    ];

    const table = useReactTable({
        columns,
        data: surveys.data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <section className="flex gap-4 pt-10 flex-wrap">
            <DataTable
                paginator
                first={surveys.current_page}
                rows={surveys.per_page}
                totalRecords={surveys.total}
            >
                <Column field="id" header="ID" />
                <Column field="address" header="Address" />
                <Column field="status" header="Status" />
                <Column
                    header="Action"
                    body={(props: Survey) => {
                        return <Link href={`/survey/${props.id}`}>View</Link>;
                    }}
                />
            </DataTable>

            <Paginator
                first={surveys.current_page}
                rows={surveys.per_page}
                totalRecords={surveys.total}
                onPageChange={onPageChange}
                template={{
                    layout: "PrevPageLink CurrentPageReport NextPageLink",
                }}
            />
        </section>
    );
};
