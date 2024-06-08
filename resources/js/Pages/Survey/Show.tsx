import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Survey } from "../Dashboard";

const Show = (props: PageProps<{ survey: Survey; message?: string }>) => {
    const { survey } = props;
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
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Show;
