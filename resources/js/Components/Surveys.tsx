import { Survey, SurveyPaginated } from "@/types/application";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Link } from "@inertiajs/react";

export const SurveyList = ({ surveys }: { surveys: SurveyPaginated }) => {
    return (
        <section className="flex gap-4 pt-10 flex-wrap">
            <DataTable
                value={surveys.data}
                paginator
                first={surveys.current_page}
                rows={10}
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
        </section>
    );
};
