import { Comment, Survey } from "@/fooTypes";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";

const Show = (
    props: PageProps<{ survey: Survey; message?: string; comments?: Comment[] }>
) => {
    const { survey, comments } = props;
    return (
        <Authenticated user={props.auth.user}>
            <div className="py-12">
                <div className="px-6 bg-white py-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="prose">
                        <Link href="/dashboard" className="link link-primary">
                            Back
                        </Link>
                        <h3>
                            #{survey.id}: {props.message}
                        </h3>
                        <p>
                            <b>Address:</b> {survey.address}
                        </p>
                        <Link
                            href={survey.file_location}
                            className="btn btn-primary"
                        >
                            Download Survey
                        </Link>

                        <div>
                            {comments &&
                                comments.map((comment) => (
                                    <div key={comment.id}>
                                        <ul>
                                            <li>id: {comment.id}</li>
                                            <li>user_id: {comment.user_id}</li>
                                            <li>comment: {comment.comment}</li>
                                            <li>user: {comment.user.name}</li>
                                        </ul>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
