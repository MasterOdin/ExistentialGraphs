//DEPRECATED, EVERYTHING MOVED INTO APP.JS

import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedButton, setSelectedButton] = React.useState(0);
  const [selectedProp, setSelectedProp] = React.useState(0);
  const [selectedCut, setSelectedCut] = React.useState(0);

  function handleModeClick(event, index) {
    setSelectedButton(index);
  }

  function handlePropClick(event, index) {
    setSelectedProp(index);
  }

  function handleCutClick(event, index) {
    setSelectedCut(index);
  }

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.toolbar }}
        anchor="left"
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
            <ListItemText primary="Delete-Children" />
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
    </div>
  );
}
