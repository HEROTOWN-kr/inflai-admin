import React from 'react';
import {
  Box, Tabs, Tab
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HelpIcon from '@material-ui/icons/Help';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import AntTabs from './StyledTabs';
import AntTab from './StyledTab';


function NavbarLinks(props) {
  const menuLinks = [
    {
      name: '대시보드',
      link: '/Dashboard',
      icon: DashboardIcon
    },
    {
      name: '광고주',
      link: '/Advertiser',
      icon: AccessibilityNewIcon
    },
    {
      name: '인플루언서',
      link: '/Influencer',
      icon: YouTubeIcon
    },
    {
      name: '캠페인관리',
      link: '/Campaign',
      icon: MonetizationOnIcon
    },
    {
      name: '랭킹(순위)',
      link: '/Ranking',
      icon: EqualizerIcon
    },
    {
      name: '켐페인 요청',
      link: '/Request',
      icon: HelpIcon
    },
    {
      name: '설정',
      link: '/Settings',
      icon: SettingsIcon
    },
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="navbar-links">
      <AntTabs
        value={value}
        onChange={handleChange}
        /* indicatorColor="secondary"
        textColor="secondary" */
        centered
      >
        {menuLinks.map((item) => {
          const IconTag = item.icon;
          return (
            <AntTab
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
