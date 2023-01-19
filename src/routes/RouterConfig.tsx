import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';
import PrivateRoute from './PrivateRoute';

// pages
import Main from '@/pages/Main';
import Login from '@/pages/Login';

// url constants
import { ROUTES } from '@/constants/routes';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route
            path={ROUTES.ROOT}
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default RouterConfig;
