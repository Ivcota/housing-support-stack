import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export interface LHC {
    id: number;
    user_id: number;
    name: string;
    congregation: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_id: number;
}

const LHC = ({ auth, lhc }: PageProps<{ lhc: LHC }>) => {
    return (
        <Authenticated
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {lhc.name}
                </h2>
            }
            user={auth.user}
        ></Authenticated>
    );
};

export default LHC;
