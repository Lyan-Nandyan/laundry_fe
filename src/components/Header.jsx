import React from "react";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
const Header = ({ link, title }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <Link to={link}>
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            </Link>
            <LogoutButton />
        </div>
    );
};

export default Header;
