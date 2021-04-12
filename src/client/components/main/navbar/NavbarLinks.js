import React from 'react';
import {
  Box, Tabs, Tab
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  AccountBalanceWallet, Settings, Dashboard, Help,
  Equalizer, MonetizationOn, YouTube, AccessibilityNew
} from '@material-ui/icons';
import AntTabs from './StyledTabs';
import AntTab from './StyledTab';


function NavbarLinks(props) {
  const { pageIndicator, setMenuIndicator } = props;
  const menuLinks = [
    {
      name: '대시보드',
      link: '/Dashboard',
      icon: Dashboard
    },
    {
      name: '광고주',
      link: '/Advertiser',
      icon: AccessibilityNew
    },
    {
      name: '인플루언서',
      link: '/Influencer',
      icon: YouTube
    },
    {
      name: '캠페인관리',
      link: '/Campaign',
      icon: MonetizationOn
    },
    {
      name: '랭킹(순위)',
      link: '/Ranking',
      icon: Equalizer
    },
    /* {
      name: '켐페인 요청',
      link: '/Request',
      icon: Help
    }, */
    {
      name: '서브스크립션',
      link: '/Subscription',
      icon: MonetizationOn
    },
    {
      name: '결제',
      link: '/Payment',
      icon: AccountBalanceWallet
    },
    {
      name: '설정',
      link: '/Settings',
      icon: Settings
    },
  ];

  const handleChange = (event, newValue) => {
    setMenuIndicator(newValue);
  };

  return (
    <Box className="navbar-links">
      <AntTabs
        value={pageIndicator}
        onChange={handleChange}
        /* indicatorColor="secondary"
        textColor="secondary" */
        centered
      >
        {menuLinks.map((item) => {
          const IconTag = item.icon;
          return (
            <AntTab
              key={item.link}
              icon={<IconTag />}
              label={item.name}
              component={Link}
              to={item.link}
            />
          );
        })}
      </AntTabs>
    </Box>
  );
}

export default NavbarLinks;
