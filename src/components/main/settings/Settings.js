import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Routes, Route, Navigate, useMatch, useNavigate
} from 'react-router-dom';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Drafts, Inbox, Notifications } from '@mui/icons-material';
import KakaoNotify from './pages/KakaoNotify';
import NotFound from '../NotFound';
import Coupon from './pages/Coupon';
import { Colors } from '../../../lib/Сonstants';

const PREFIX = 'Settings';

const classes = {
  selectedItem: `${PREFIX}-selectedItem`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`& .${classes.selectedItem}`]: {
    backgroundColor: Colors.darkBlue,
    '&:hover': {
      backgroundColor: Colors.darkBlue,
    }
  }
}));

const Menu = [
  {
    id: 1,
    text: '카카오 알림',
    icon: Notifications,
    url: '/KakaoNotify'
  },
  {
    id: 2,
    text: '쿠폰',
    icon: Inbox,
    url: '/Coupon'
  },

];


function Settings(props) {
  const { setMenuIndicator } = props;
  const [selectedMenu, setSelectedMenu] = useState(1);
  const match = useMatch('/Settings/*');
  const navigate = useNavigate();


  useEffect(() => setMenuIndicator(7), []);

  const handleListItemClick = (item) => {
    setSelectedMenu(item.id);
    // build target using base path when available; fallback to absolute path
    const base = match ? '/Settings' : '';
    navigate(`${base}${item.url}`);
  };

  return (
    <StyledGrid container>
      <Grid item>
        <Box width={250} minHeight="100vh" borderRight="1px solid black">
          <List component="nav" disablePadding aria-label="main mailbox folders">
            {Menu.map((item) => {
              const IconTag = item.icon;
              return (
                <ListItem button key={item.text} classes={{ selected: classes.selectedItem }} selected={selectedMenu === item.id} onClick={() => handleListItemClick(item)}>
                  <ListItemIcon>
                    <IconTag />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Grid>
      <Grid item xs>
        <Routes>
          <Route path="KakaoNotify" element={<KakaoNotify {...props} />} />
          <Route path="Coupon" element={<Coupon {...props} />} />
          <Route path="/" element={<Navigate to={match ? '/Settings/KakaoNotify' : '/KakaoNotify'} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Grid>
    </StyledGrid>
  );
}

export default Settings;
