import { Head, Link, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "primereact/button";
import { PageProps } from "@/types";
import { SurveyList } from "@/Components/Surveys";
import { SurveyPaginated } from "@/types/application";
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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 rounded bg-white">
                <div className="px-5 py-4">
                    <div className="prose">
                        <p>
                            Welcome to your dashboard. All your surveys are
                            listed here.
                        </p>
                        <Button
                            size="small"
                            onClick={() => router.get("/upload-survey")}
                        >
                            Upload a Survey
                        </Button>
                    </div>

                    <SurveyList surveys={surveys} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
