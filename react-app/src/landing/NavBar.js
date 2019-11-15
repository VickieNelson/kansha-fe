import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Main from './Main';

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={5}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      // flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
    },
  }));
  
  export default function NavBar() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <div display="flex">
              <Tab label='Kansha' {...a11yProps(0)} />
            </div>
            <div display="flex" justifyContent="flex-end">          
              <Tab label="About Us" {...a11yProps(1)} />
              <Tab label="Features" {...a11yProps(2)} />
              <Tab label="Sign In" {...a11yProps(3)} />
              <Tab label="Log In" {...a11yProps(4)} />
            </div>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Header />
        <Main />
        </TabPanel>
        <TabPanel value={value} index={1}>
          About Us
        </TabPanel>
        <TabPanel value={value} index={2}>
          Features
        </TabPanel>
        <TabPanel value={value} index={3}>
          Sign In
        </TabPanel>
        <TabPanel value={value} index={4}>
            Log In
        </TabPanel>
      </div> 
    )}

