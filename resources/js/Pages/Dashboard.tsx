import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import toast from "react-hot-toast";
import { useEffect } from "react";

export interface SurveyPaginated {
    current_page: number;
    data: Survey[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Survey {
    id: number;
    local_housing_contact_id: number;
    address: string;
    file_location: string;
    status: SurveyStatus;
    created_at: Date;
    updated_at: Date;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}

export type SurveyStatus =
    | "needs_uploader_action"
    | "pre_review"
    | "in_review"
    | "approved"
    | "rejected";

export default function Dashboard({
    auth,
    surveys,
}: PageProps<{ surveys: SurveyPaginated }>) {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");

    useEffect(() => {
        if (message) {
            toast.error(message);
        }
    }, [message]);

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

                            <section className="flex gap-4 pt-10 flex-wrap">
                                {surveys.data.map((survey) => (
                                    <div
                                        key={survey.id}
                                        className="card w-60 bg-base-100 mx-auto shadow-xl"
                                    >
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {survey.address}
                                            </h2>
                                            <p>{survey.status}</p>
                                            <div className="card-actions justify-start">
                                                <Link
                                                    href={`/survey/${survey.id}`}
                                                    className="btn btn-primary"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
