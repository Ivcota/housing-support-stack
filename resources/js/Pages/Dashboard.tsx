import _, { initial } from "lodash";
import { router, useForm, useRemember } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { PageProps } from "@/types";
import { Survey } from "@/Components/Survey";
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
}: PageProps<{ surveys: SurveyPaginated }>) {
    useDashboard();

    const { get, setData } = useForm({
        search: "",
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="bg-white">
                <div className="px-9 bg-white py-6 flex flex-col gap-3">
                    <h1 className="text-xl font-bold">
                        Hey {auth.user.name} 👋
                    </h1>
                    <p>
                        Welcome to your survey dashboard. Submit surveys and
                        view their progress.
                    </p>
                    <Button
                        className="max-w-fit"
                        onClick={() => router.get("/upload-survey")}
                    >
                        Upload a Survey
                    </Button>
                </div>
                <div
                    className="flex items-end gap-2 justify-between px-9 max-w-80"
                    role="list"
                >
                    <form
                        role="group"
                        className="flex flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                            get("/dashboard");
                        }}
                    >
                        <label htmlFor="search" className="text-gray-700">
                            Search
                        </label>
                        <Input
                            type="search"
                            placeholder="Search something..."
                            onChange={(e) =>
                                setData({
                                    search: e.target.value,
                                })
                            }
                        />
                    </form>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            router.get("/dashboard");
                        }}
                        variant="outline"
                    >
                        Clear
                    </Button>
                </div>
                <div
                    id="surveys"
                    className="flex pt-5 items-center flex-col mx-auto px-9 gap-7 sm:flex-row sm:flex-wrap pb-10"
                >
                    {/* <ConfirmDialog /> */}
                    {surveys.data.map((survey) => (
                        <Survey survey={survey} key={survey.id} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
