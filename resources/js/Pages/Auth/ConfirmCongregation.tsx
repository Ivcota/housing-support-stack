import { useForm, usePage } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { PageProps } from "@/types";

const ConfirmCongregation = () => {
    const { props, url } = usePage<PageProps>();
    const { patch, setData, data, errors } = useForm({
        congregation: "",
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    patch(
                        route("auth.confirmCongregation.update", {
                            congregation: data.congregation,
                        }),
                        {
                            preserveScroll: true,
                        }
                    );
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-6 rounded flex flex-col gap-3">
                    <h1>Congregation Confirmation </h1>
                    <Input
                        placeholder="Congregation"
                        onChange={(e) =>
                            setData("congregation", e.target.value)
                        }
                        value={data.congregation}
                    />
                    {errors.congregation && (
                        <p className="text-red-500">{errors.congregation}</p>
                    )}
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmCongregation;
