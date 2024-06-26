import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { router, usePage } from "@inertiajs/react";

import { Button } from "./ui/button";
import { FileIcon } from "@radix-ui/react-icons";
import { SurveyPaginated } from "@/types/application";
import _ from "lodash";

export const Surveys = () => {
    const {
        props: { surveys },
    } = usePage<{ surveys: SurveyPaginated }>();
    return (
        <div
            id="surveys"
            className="flex pt-5 items-center flex-col mx-auto px-9 gap-7 sm:flex-row sm:flex-wrap pb-10"
        >
            {surveys.data.map((survey) => (
                <Survey survey={survey} key={survey.id} />
            ))}
        </div>
    );
};

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
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline-destructive"
                                onClick={() => {}}
                            >
                                Archive
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    remove your survey from being viewed within
                                    the application.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        router.delete(
                                            route("survey.delete", {
                                                id: survey.id,
                                            }),
                                            {
                                                preserveScroll: true,
                                            }
                                        );
                                    }}
                                >
                                    Archive
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
