import LocalHousingContactTable from "@/Components/data/LocalHousingContactTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

type CustomPageProps = PageProps<{
    lhcs: LHC[];
    selected?: LHC;
    selected_notes?: Note[];
}>;

const Dashboard = ({ auth, lhcs }: CustomPageProps) => {
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <div className="px-4 mx-auto mt-6 bg-white rounded max-w-7xl sm:px-6 lg:px-8">
                <LocalHousingContactTable lhcs={lhcs} />
            </div>
        </Authenticated>
    );
};

export default Dashboard;
