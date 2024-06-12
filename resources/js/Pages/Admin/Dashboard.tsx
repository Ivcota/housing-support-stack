import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import React from "react";

const Dashboard = ({ auth }: PageProps) => {
    return (
        <Authenticated user={auth.user}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                ipsam amet obcaecati dolorum placeat beatae dolor. Reiciendis
                quisquam quibusdam dolor provident illo modi veritatis error
                animi placeat, ipsam eligendi minus.
            </p>
        </Authenticated>
    );
};

export default Dashboard;
