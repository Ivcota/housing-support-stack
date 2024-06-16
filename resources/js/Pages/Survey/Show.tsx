import { Comment, Survey } from "@/types/application";
import { Link, useForm } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { PageProps } from "@/types";

const useTimeAgo = () => {
    const timeAgo = (date: Date) => {
        const diff = new Date().getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
            return `${hours} hours ago`;
        }

        if (minutes > 0) {
            return `${minutes} minutes ago`;
        }

        return `Just now`;
    };

    return { timeAgo };
};

function Comments({ comments }: { comments?: Comment[] }) {
    const { timeAgo } = useTimeAgo();
    return (
        <div className="rounded-md gap-12 flex flex-col">
            {comments &&
                comments.map((comment) => (
                    <div
                        className="shadow-lg py-5 px-4 rounded-md"
                        key={comment.id}
                    >
                        <div className="text-gray-500 font-bold text-sm flex gap-2">
                            <div>{comment.user.name}</div>
                            <div>{timeAgo(new Date(comment.created_at))}</div>
                        </div>
                        <p>{comment.comment}</p>
                    </div>
                ))}
        </div>
    );
}

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
        <Authenticated
            user={props.auth.user}
            header={
                <div className="flex flex-col gap-2">
                    <Link href="/dashboard" className="link link-primary">
                        Back
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Display Survey
                    </h2>
                </div>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white mt-6 py-6 rounded">
                <div className="prose mx-auto">
                    <h3>
                        #{survey.id}: {props.message}
                    </h3>
                    <p>
                        <b>Address:</b> {survey.address}
                    </p>
                    <Button role="link" variant="outline">
                        <a href={`/survey-download/${file}`}>Download Survey</a>
                    </Button>

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
                        <div className="pt-4">
                            <Comments comments={comments} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
