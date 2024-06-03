import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, idAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || idAdminLoading) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/home' state={{ from: location }} replace />  //for extracting the location as state
};

export default AdminRoute;