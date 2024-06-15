import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PageProps } from "@/types";
import { Survey } from "@/Components/Survey";
import { SurveyPaginated } from "@/types/application";
import _ from "lodash";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const useDashboard = () => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    useEffect(() => {
        if (message) toast.error(message);
    }, [message]);

    return {
        message,
        params,
    };
};

export default function Dashboard({
    auth,
    surveys,
    ziggy,
}: PageProps<{ surveys: SurveyPaginated }>) {
    useDashboard();
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="bg-white">
                <div className="px-9 bg-white py-6 flex flex-col gap-3">
                    <h1 className="text-xl font-bold">
                        Hey {auth.user.name} 👋
                    </h1>
                    <p>
                        Welcome to your survey dashboard. Submit surveys’ and
                        view their progress.
                    </p>
                    <Button
                        className="max-w-fit"
                        size="small"
                        onClick={() => router.get("/upload-survey")}
                    >
                        Upload a Survey
                    </Button>
                </div>
                <div role="group" className="px-9 flex flex-col">
                    <label htmlFor="search" className="text-gray-700">
                        Search
                    </label>
                    <InputText size="small" className="p-inputtext-sm" />
                </div>
                <div
                    id="surveys"
                    className="flex pt-5 items-center flex-col mx-auto px-9 gap-7 sm:flex-row sm:flex-wrap pb-10"
                >
                    {surveys.data.map((survey) => (
                        <Survey survey={survey} key={survey.id} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
