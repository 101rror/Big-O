import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};
