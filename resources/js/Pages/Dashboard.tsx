import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { SurveyList } from "@/Components/Surveys";
import { SurveyPaginated } from "@/fooTypes";
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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-5 py-4">
                            <div className="prose">
                                <h2>Dashboard</h2>
                                <p>
                                    Welcome to your dashboard. All your surveys
                                    are listed here.
                                </p>
                                <Link
                                    href="/upload-survey"
                                    className="btn btn-primary"
                                >
                                    Upload A Survey
                                </Link>
                            </div>

                            <SurveyList surveys={surveys} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
