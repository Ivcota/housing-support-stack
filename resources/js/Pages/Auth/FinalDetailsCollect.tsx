import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";

const FinalDetailsCollect = () => {
    const { patch, setData, data, errors } = useForm({
        congregation: "",
        phone: "",
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    patch(
                        route("auth.final-details-collect.update", {
                            congregation: data.congregation,
                        }),
                        {
                            preserveScroll: true,
                        }
                    );
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-6 rounded flex flex-col gap-3">
                    <h1 className="font-bold text-2xl">
                        Final Details Collect
                    </h1>
                    <Label htmlFor="congregation">Congregation</Label>
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        placeholder="Phone"
                        onChange={(e) => setData("phone", e.target.value)}
                        value={data.phone}
                    />
                    {errors.phone && (
                        <p className="text-red-500">{errors.phone}</p>
                    )}
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default FinalDetailsCollect;
