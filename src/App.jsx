import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyCalendar from './pages/Calendar';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './style/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';
import Kanban from './pages/Kanban';

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Calendar', path: '/calendar' },
    { text: 'Roadmap', path: '/roadmap' },
    { text: 'Kanban', path: '/kanban'}
  ];

  return (<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <CssBaseline /> 
    <Router>
    <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Harmonia Manager
              </Typography>

              <Typography component="div">
                {theme === 'light' ? 'Light' : 'Dark'} Mode
              </Typography>
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                color="default"
              />

          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/kanban" element={<Kanban/>} />
      </Routes>
    </Router>
  </ThemeProvider>

  );
}

export default App;
