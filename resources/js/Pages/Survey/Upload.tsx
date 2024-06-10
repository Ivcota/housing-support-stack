import { Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { PageProps } from "@/types";

const UploadSurvey = ({ auth }: PageProps) => {
    const { post, setData, errors } = useForm<{
        survey?: File;
        address: string;
    }>({
        address: "",
        survey: undefined,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("survey.upload.survey"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Upload a Survey
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="prose bg-white mx-auto overflow-hidden shadow-sm sm:rounded-lg py-6 px-5">
                    <Link href="/dashboard" className="link link-primary">
                        Back to Dashboard
                    </Link>

                    <p>Hey {auth.user.name}, you can upload a survey here!</p>

                    <p>
                        Before you upload, ensure you've reviewed the
                        requirements of the survey:{" "}
                        <Link
                            className="link link-primary hover:link-hover"
                            href=""
                        >
                            How to fill out a survey?
                        </Link>
                    </p>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="flex flex-col gap-3 pt-9">
                            <label htmlFor="address">Address</label>
                            <input
                                name="survey"
                                type="text"
                                className="input input-primary w-full max-w-xs"
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />

                            <InputError message={errors.address} />
                            <label htmlFor="survey">Survey</label>
                            <input
                                name="survey"
                                type="file"
                                className="file-input w-full max-w-xs"
                                onChange={(e) =>
                                    setData("survey", e.target.files?.[0])
                                }
                            />
                            <InputError message={errors.survey} />
                        </div>
                        <button type="submit" className="btn mt-4 btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UploadSurvey;
