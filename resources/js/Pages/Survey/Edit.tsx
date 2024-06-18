import { Link, useForm } from "@inertiajs/react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import { Survey } from "@/types/application";

const Edit = ({
    survey,
    back,
    ...props
}: PageProps<{ survey: Survey; back: string }>) => {
    const { setData, patch, processing, data } = useForm({
        address: survey.address,
    });
    return (
        <Authenticated user={props.auth.user}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    patch(route("survey.update", { id: survey.id }));
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-6 rounded">
                    <div className="flex flex-col gap-3">
                        <Link href={back}>Back</Link>
                        <h1 className="font-bold text-lg">{survey.address}</h1>

                        <Label htmlFor="address">Address</Label>
                        <Input
                            onChange={(e) => setData("address", e.target.value)}
                            value={data.address}
                        />
                        <Button disabled={processing} type="submit">
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </Authenticated>
    );
};

export default Edit;
