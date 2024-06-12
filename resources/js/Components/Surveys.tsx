import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Survey, SurveyPaginated } from "@/types/application";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { router } from "@inertiajs/react";

export const SurveyList = ({ surveys }: { surveys: SurveyPaginated }) => {
    const confirm = (id: number) =>
        confirmDialog({
            message: "Are you sure you want to delete this survey?",
            header: "Delete Survey",
            icon: "pi pi-exclamation-triangle",
            accept: () => router.delete(`/survey/${id}`),
            reject: () => console.log("Rejected"),
        });

    return (
        <section className="flex gap-4 pt-10">
            <ConfirmDialog />
            <DataTable
                value={surveys.data}
                paginator
                first={surveys.current_page}
                rows={10}
                totalRecords={surveys.total}
                className="w-full"
            >
                <Column field="id" header="ID" />
                <Column sortable filter field="address" header="Address" />
                <Column sortable filter field="status" header="Status" />
                <Column
                    header="Action"
                    body={({ id }: Survey) => {
                        return (
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => router.get(`/survey/${id}`)}
                                >
                                    View
                                </Button>
                                <Button
                                    severity="danger"
                                    outlined
                                    onClick={() => confirm(id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        );
                    }}
                />
            </DataTable>
        </section>
    );
};
