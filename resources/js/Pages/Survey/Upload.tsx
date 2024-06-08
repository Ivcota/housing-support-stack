import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";

const UploadSurvey = ({ auth }: PageProps) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="prose bg-white mx-auto overflow-hidden shadow-sm sm:rounded-lg py-6 px-5">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Upload A Survey
                        </h2>

                        <p>
                            Hey {auth.user.name}, you can upload a survey here.
                            Before you upload, ensure you've reviewed the
                            requirements of the survey:{" "}
                            <Link
                                className="link link-primary hover:link-hover"
                                href=""
                            >
                                How to fill out a survey
                            </Link>
                        </p>

                        <form method="post">
                            <div className="flex flex-col gap-3 pt-9">
                                <label htmlFor="survey"> Survey</label>
                                <input
                                    name="survey"
                                    type="file"
                                    className="file-input w-full max-w-xs"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn mt-4 btn-primary"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UploadSurvey;
