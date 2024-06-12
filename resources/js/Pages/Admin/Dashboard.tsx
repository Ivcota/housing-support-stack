import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export interface Lhc {
    id: number;
    user_id: number;
    congregation: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_id: number;
}

const Dashboard = ({ auth, lhcs }: PageProps<{ lhcs: Lhc[] }>) => {
    return (
        <Authenticated user={auth.user}>
            {lhcs.map((lhc) => (
                <div key={lhc.id}>
                    <p>{lhc.congregation}</p>
                </div>
            ))}
        </Authenticated>
    );
};

export default Dashboard;
