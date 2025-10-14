import React from "react";
import LogoutButton from "./LogoutButton";

const Header = () => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Petugas</h1>
            <LogoutButton />
        </div>
    );
};

export default Header;
