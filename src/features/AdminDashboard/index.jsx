import React from "react";
import { usePageTitle } from "../../hooks/usePageTitle";

const AdminDashboard = () => {
    
    usePageTitle('Dashboard')

    return (
        <div>
            <h1>Selamat Datang</h1>
        </div>
    )
}

export default AdminDashboard