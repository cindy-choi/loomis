import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ROUTES from '@/constants/routes';
import { useNavigate, useLocation } from 'react-router';

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100px;
  overflow: hidden;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;

  .header__inner {
    width: 100%;
    max-width: 1024px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    img { width: 175px; height: 33px; }
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
    color: var(--black-50);

    font-size: 14px;
    line-height: 20px;
    font-weight: 400;

    &:hover { color: var(--black-80); }
    &.active, &:active { color: var(--primary); }
    &.current { color: var(--primary); }
    &.disabled { color: var(--black-15); }
  }
`;

export const TheHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuList = [
    { title: t('menu.main'), href: ROUTES.ROOT, },
    { title: t('menu.about'), href: ROUTES.ABOUT, },
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
          <p>Sample</p>
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
