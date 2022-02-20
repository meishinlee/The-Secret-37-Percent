import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
import { Link, Redirect, Route, Routes } from 'react-router-dom';
import Drawer from './components/drawer/drawer';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { logout } from './reducers/loginReducer';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function App() {
  var isLoggedIn = useSelector(state => state.login.login)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      {/* <Home /> */}
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed

            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box align="center" pl= {42}>
            <Typography>
              <h2 style={{color: "white"}}
 pt = {20}>Let's Improve Planet Health Together! <a href = "https://hansbdejong.github.io/graph/graph.html" target="_blank" style={{color: '#9cd4db'}}>(The Science)</a>
 <span role="img" aria-label="plant">🌿</span></h2>
              {/* <img src={StonksLogo} width="40px" height="40px" /> */}
            </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{!isLoggedIn ? <div>
            {/* {mainListItems} */}
            <Link to='/'>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home Page" />
              </ListItem>
            </Link>

            <Link to='/signup'>
              <ListItem button>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>

            <Link to='/signin'>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            </Link>
          </div> : <div>
            {/* {mainListItems} */}


            <Link to='/'>
              <ListItem button onClick={() => {
                dispatch(logout())
                isLoggedIn = false
              }}>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItem>
            </Link>
          </div>}</List>
          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: '64px',
            padding: '32px'
          }}
        >
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/signin' element={<Signin />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
