import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';

// pages
import Main from '@/pages/Main';
import Create from '@/pages/Create';

// url constants
import { ROUTES } from '@/constants/routes';

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Routes>
          <Route path={ROUTES.ROOT} element={<Main />} />
          <Route path={ROUTES.CREATE} element={<Create />} />

          <Route path="*" element={<Navigate to={ROUTES.ROOT} />} />
        </Routes>
      </BasicLayout>
    </BrowserRouter>
  );
};

export default RouterConfig;
