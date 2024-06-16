import { Button } from "./ui/button";
import { FileIcon } from "@radix-ui/react-icons";
// import { Button } from "primereact/button";
import { SurveyPaginated } from "@/types/application";
import _ from "lodash";
// import { confirmDialog } from "primereact/confirmdialog";
import { router } from "@inertiajs/react";

export const Survey = ({ survey }: { survey: SurveyPaginated["data"][0] }) => {
    return (
        <>
            <div className="flex shadow-lg bg-white border-gray-500 border gap-4 py-7 justify-between items-center rounded-lg sm:px-5 px-7 w-full md:w-80 ">
                <FileIcon className="w-5 h-5" />
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
                    <Button variant="outlineDestructive" onClick={() => {}}>
                        Archive
                    </Button>
                    <Button
                        onClick={() => router.get(`/survey/${survey.id}/`)}
                        className="flex justify-center max-w-full"
                    >
                        View
                    </Button>
                </div>
            </div>
        </>
    );
};
