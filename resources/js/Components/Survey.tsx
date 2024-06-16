import { Button } from "primereact/button";
import { SurveyPaginated } from "@/types/application";
import _ from "lodash";
import { confirmDialog } from "primereact/confirmdialog";
import { router } from "@inertiajs/react";

export const Survey = ({ survey }: { survey: SurveyPaginated["data"][0] }) => {
    return (
        <>
            <div className="flex shadow-lg bg-white border-gray-500 border gap-4 py-7 justify-center items-center rounded-lg px-5 w-full md:w-80 ">
                <i className="pi pi-file"></i>
                <div role="list">
                    <div role="listitem">
                        {_.truncate(survey.address, { length: 15 })}
                    </div>
                    <div role="listitem">{survey.status}</div>
                    <div role="listitem" className="text-gray-40 text-gray-500">
                        {_.truncate(survey.file_location.split("/").pop(), {
                            length: 15,
                        })}
                        (...).docx
                    </div>
                </div>
                <div role="list" className="flex flex-col gap-2">
                    <Button
                        size="small"
                        severity="danger"
                        className="flex justify-center max-w-full"
                        text
                        onClick={() => {
                            confirmDialog({
                                header: "Archive Survey",
                                message:
                                    "Are you sure you want to archive this survey?",
                                accept: () =>
                                    router.delete(`/survey/${survey.id}`, {
                                        preserveScroll: true,
                                    }),
                                reject: () => "",
                            });
                        }}
                    >
                        Archive
                    </Button>
                    <Button
                        onClick={() => router.get(`/survey/${survey.id}/`)}
                        size="small"
                        className="flex justify-center max-w-full"
                    >
                        View
                    </Button>
                </div>
            </div>
        </>
    );
};
