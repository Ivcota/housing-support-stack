import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export interface LHC {
    id: number;
    name: string;
    user_id: number;
    congregation?: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_id: number;
}

const Dashboard = ({ auth }: PageProps<{ lhcs: LHC[] }>) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 rounded bg-white"></div>
        </Authenticated>
    );
};

export default Dashboard;
