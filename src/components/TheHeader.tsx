import React, { useState, useEffect, } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/constants/routes';
import { useNavigate, useLocation } from 'react-router';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .header__inner {
    padding: 0 2rem;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    cursor: pointer;
  }

  .menu-list {
    display: flex;
    margin-left: auto;
    align-items: center;
  }

  .menu-item {
    height: 60px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--black);

    font-size: 20px;
    font-weight: 500;

    &:hover { font-weight: 700; }
    &.active, &:active { font-weight: 700; color: var(--white); }
  }
`;

export const TheHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = [
    { title: t('menu.about'), href: ROUTES.ABOUT, },
    { title: t('menu.projects'), href: ROUTES.PROJECTS, },
    { title: t('menu.contact'), href: ROUTES.CONTACT, },
  ];

  const handleMenuItemClick = (href: string) => {
    navigate(href);
  };

  const isActive = (href: string) => {
    return location.pathname.startsWith(href) ? 'active' : '';
  };
  
  return (
    <HeaderWrapper>
      <div className="header__inner">
        <div className="logo" onClick={() => handleMenuItemClick(ROUTES.ROOT)}>
          <p>C</p>
        </div>

        <div className="menu-list">
          {
            menuList.map(menu => (
              <div key={menu.title} className={`menu-item ${isActive(menu.href)}`} onClick={() => handleMenuItemClick(menu.href)}>
                { menu.title }
              </div>
            ))
          }
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default TheHeader;
