import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { DataView } from "primereact/dataview";
import { PageProps } from "@/types";
import { router } from "@inertiajs/react";

export interface LHC {
    id: number;
    name: string;
    user_id: number;
    congregation?: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_id: number;
}

const Dashboard = ({ auth, lhcs }: PageProps<{ lhcs: LHC[] }>) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 rounded bg-white">
                <DataTable value={lhcs} className="w-full">
                    <Column field="id" header="ID" />
                    <Column field="name" header="Name" />
                    <Column field="congregation" header="Congregation" />
                    <Column field="created_at" header="Created At" />
                    <Column field="updated_at" header="Updated At" />
                    <Column
                        body={(lhc) => (
                            <Button
                                onClick={() =>
                                    router.get(`/admin/lhc/${lhc.id}`)
                                }
                            >
                                View
                            </Button>
                        )}
                    />
                </DataTable>

                <DataView
                    value={lhcs}
                    itemTemplate={({ id, name, congregation }: LHC) => {
                        return (
                            <div
                                className="prose mt-5 py-7 px-4 rounded-lg shadow-lg"
                                key={id}
                            >
                                <h1>{name}</h1>
                                <p>Congregation: {congregation}</p>
                                <Button>View</Button>
                            </div>
                        );
                    }}
                />
            </div>
        </Authenticated>
    );
};

export default Dashboard;
