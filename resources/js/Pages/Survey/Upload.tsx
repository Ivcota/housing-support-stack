import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { InputText } from "primereact/inputtext";
import { PageProps } from "@/types";

const UploadSurvey = ({ auth }: PageProps) => {
    const { post, setData, errors, data } = useForm<{
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
            <Head title="Upload a Survey" />

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
                        <div className="flex flex-col gap-3 pt-3">
                            <FloatLabel>
                                <InputText
                                    id="address"
                                    name="address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    value={data.address}
                                />
                                <label htmlFor="Address">Address</label>
                            </FloatLabel>

                            <InputError message={errors.address} />

                            <div className="card">
                                <FileUpload
                                    mode="basic"
                                    name="survey"
                                    maxFileSize={1000000}
                                    onSelect={(e) => {
                                        setData("survey", e.files[0]);
                                    }}
                                />
                                <InputError message={errors.survey} />
                            </div>
                        </div>

                        <Button
                            size="small"
                            className="p-button mt-4"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UploadSurvey;
