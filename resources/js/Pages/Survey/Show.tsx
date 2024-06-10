import { Comment, Survey } from "@/types/application";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
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

        return `${Math.floor(diff / 1000)} seconds ago`;
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
            <div className="px-6  bg-white py-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="prose">
                    <h3>
                        #{survey.id}: {props.message}
                    </h3>
                    <p>
                        <b>Address:</b> {survey.address}
                    </p>
                    <a
                        href={`/survey-download/${file}`}
                        className="btn btn-primary"
                    >
                        Download Survey
                    </a>

                    <div className="pt-12">
                        <Comments comments={comments} />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
