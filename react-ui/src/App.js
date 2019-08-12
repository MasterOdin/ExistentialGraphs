import React from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const drawerWidth = 240;

//Styles for use in the application
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function App() {
  const classes = useStyles();
  //Holds the state of whether the sidebar is open
  const [open, setOpen] = React.useState(true);
  //Holds the current selected button state
  const [selectedButton, setSelectedButton] = React.useState(0);
  //Current Proposition
  const [selectedProp, setSelectedProp] = React.useState(0);
  //Current Cut
  const [selectedCut, setSelectedCut] = React.useState(0);

  //Opening sidebar
  function sidebarOpen() {
    setOpen(true);
  }

  //Closing sidebar
  function sidebarClose() {
    setOpen(false);
  }

  //Changing edit mode
  function handleModeClick(event, index) {
    setSelectedButton(index);
  }

  //Changing current proposition
  function handlePropClick(event, index) {
    setSelectedProp(index);
  }

  //Changing current cut type
  function handleCutClick(event, index) {
    setSelectedCut(index);
  }

  return (
    <div className="App">
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav" aria-label="Add To Graph">
          <ListItem
            button
            selected={selectedButton === 0}
            onClick={event => handleModeClick(event, 0)}
          >
            <ListItemText primary="Proposition" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 1}
            onClick={event => handleModeClick(event, 1)}
          >
            <ListItemText primary="Cut" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="Operations On Graph">
          <ListItem
            button
            selected={selectedButton === 2}
            onClick={event => handleModeClick(event, 2)}
          >
            <ListItemText primary="Copy" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 3}
            onClick={event => handleModeClick(event, 3)}
          >
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 4}
            onClick={event => handleModeClick(event, 4)}
          >
            <ListItemText primary="Delete (Including Children)" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="Prove Graph">
          <ListItem
            button
            selected={selectedButton === 5}
            onClick={event => handleModeClick(event, 5)}
          >
            <ListItemText primary="Erase DC" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 6}
            onClick={event => handleModeClick(event, 6)}
          >
            <ListItemText primary="Insertion" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 7}
            onClick={event => handleModeClick(event, 7)}
          >
            <ListItemText primary="Erasure" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 8}
            onClick={event => handleModeClick(event, 8)}
          >
            <ListItemText primary="Iteration" />
          </ListItem>
          <ListItem
            button
            selected={selectedButton === 9}
            onClick={event => handleModeClick(event, 9)}
          >
            <ListItemText primary="Deiteration" />
          </ListItem>
        </List>
      </Drawer>
      //Main Context
      <main className={clsx(classes.content, {})}>
        <div id="workHolder" />
      </main>
    </div>
  );
}

export default App;
