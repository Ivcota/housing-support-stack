import { Comment, Survey } from "@/types/application";
import { Link, useForm } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Comments } from "@/Components/Comments";
import { Input } from "@/Components/ui/input";
import { Label } from "@radix-ui/react-label";
import { PageProps } from "@/types";
import { format } from "date-fns";

const Show = (
    props: PageProps<{
        survey: Survey;
        message?: string;
        comments?: Comment[];
        file?: string;
    }>
) => {
    const { survey, comments, file } = props;
    const { setData, post, errors, data } = useForm({
        comment: "",
        survey_id: survey.id,
    });

    return (
        <Authenticated user={props.auth.user}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-6 rounded">
                <div className="flex flex-col gap-3">
                    <Link href="/dashboard">Back</Link>
                    <h1 className="font-bold text-lg">{survey.address}</h1>
                    <p>
                        This survey was uploaded on{" "}
                        {format(new Date(survey.created_at), "MMMM d, yyyy")}{" "}
                        and currently has a status of {survey.status}.
                    </p>
                    <Button asChild variant="outline" className="w-32">
                        <a href={file}>View</a>
                    </Button>
                </div>

                <div className="prose mx-auto">
                    <div className="pt-12">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                post("/comment", {
                                    preserveScroll: true,
                                    onFinish: () => {
                                        setData("comment", "");
                                    },
                                });
                            }}
                        >
                            <Label htmlFor="comment">Comment</Label>
                            <div className="flex flex-col gap-2">
                                <Input
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    value={data.comment}
                                />
                                {errors.comment && (
                                    <p className="text-red-500">
                                        {errors.comment}
                                    </p>
                                )}
                                <Button>Send</Button>
                            </div>
                        </form>
                    </div>
                    <div className="pt-4 flex flex-col gap-4">
                        <h3 className="text-lg self-start ">Comments</h3>
                        <Comments comments={comments} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
