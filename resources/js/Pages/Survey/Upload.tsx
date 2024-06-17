import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { FormEventHandler } from "react";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import { UploadIcon } from "@radix-ui/react-icons";

const UploadSurvey = ({ auth }: PageProps) => {
    const { post, setData, errors, data, processing } = useForm<{
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Upload a Survey" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white ">
                <div className="prose bg-white mx-auto overflow-hidden shadow-sm sm:rounded-lg py-6 px-5">
                    <div className="flex gap-3 flex-col">
                        <Link href="/dashboard" className="link link-primary">
                            Back
                        </Link>

                        <h1 className="text-xl font-bold">
                            Upload Your Survey
                        </h1>

                        <p className="font">
                            Thanks for filling out a housing survey for us! You
                            may upload it here:
                        </p>
                    </div>

                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="mt-5"
                    >
                        <div className="flex flex-col gap-3 pt-3">
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    placeholder="Enter your address"
                                    id="address"
                                    name="address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    value={data.address}
                                />
                                <div className="text-sm text-gray-600 pt-1">
                                    Provide an address that could be searched
                                    via google maps
                                </div>

                                <InputError message={errors.address} />
                            </div>

                            <div className="card">
                                <Label htmlFor="survey">Survey</Label>
                                <Input
                                    type="file"
                                    name="survey"
                                    onChange={(e) => {
                                        setData("survey", e.target.files?.[0]);
                                    }}
                                    placeholder="Upload a survey document"
                                />
                                <InputError message={errors.survey} />
                            </div>
                        </div>

                        <Button
                            className="p-button mt-4 flex gap-2 items-center"
                            type="submit"
                            disabled={processing}
                        >
                            Upload & Submit <UploadIcon />
                        </Button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UploadSurvey;
