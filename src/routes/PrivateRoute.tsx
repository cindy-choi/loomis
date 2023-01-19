import React, { useEffect } from 'react';
import { useAuthState } from '@/contexts/auth';
import { Route, Navigate, useLocation } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

function PrivateRoute({ children, exact = false, ...rest }: PrivateRouteProps) {
  const authState = useAuthState();
  const location = useLocation();

  if (authState.loading) return <div>loading</div>;

  return !authState.authentificated ? <Navigate to="/login" state={{ from: location.pathname }} /> : children;
}

export default PrivateRoute;
