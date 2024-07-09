type Note = {
    id: number;
    local_housing_contact_id: number;
    user_id: number;
    note: string;
    created_at: string;
    updated_at: string;
};

type LHC = {
    id: number;
    name: string;
    user_id: number;
    congregation?: string;
    created_at: Date;
    updated_at: Date;
    project_housing_contact_name?: string;
    project_housing_contact_id?: number;
};
