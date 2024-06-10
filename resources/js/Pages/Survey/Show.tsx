import { Comment, Survey } from "@/types/application";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";

function Comments({ comments }: { comments?: Comment[] }) {
    return (
        <div className="rounded-md gap-12 flex flex-col">
            {comments &&
                comments.map((comment) => (
                    <div
                        className="shadow-lg py-5 px-4 rounded-md"
                        key={comment.id}
                    >
                        <p>{comment.comment}</p>
                        <div className="text-gray-500 font-bold text-sm flex flex-col ">
                            <div>by {comment.user.name}</div>
                            <div>
                                {new Date(comment.created_at).toLocaleString()}
                            </div>
                        </div>
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
