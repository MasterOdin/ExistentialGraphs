import React from "react";
import clsx from "clsx";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  CssBaseline,
  Drawer,
  Divider,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";

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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
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
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 10
  }
}));

function App() {
  const classes = useStyles();
  //Holds the state of whether the sidebar is open
  const [open, setOpen] = React.useState(false);
  //Holds the current selected button state
  const [selectedButton, setSelectedButton] = React.useState(0);
  //Current Proposition
  const [selectedProp, setSelectedProp] = React.useState("P");

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
  function handlePropClick(event, letter) {
    setSelectedProp(letter);
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
        <div className={classes.drawerHeader}>
          <IconButton onClick={sidebarClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
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
        <Divider />
        <Grid item xs={12} md={6}>
          <Grid container spacing={1} direction="column" alignItems="center">
            <Grid item>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  disabled={selectedProp === "P"}
                  onClick={event => handlePropClick(event, "P")}
                >
                  P
                </Button>
                <Button
                  disabled={selectedProp === "Q"}
                  onClick={event => handlePropClick(event, "Q")}
                >
                  Q
                </Button>
                <Button
                  disabled={selectedProp === "R"}
                  onClick={event => handlePropClick(event, "R")}
                >
                  R
                </Button>
                <Button
                  disabled={selectedProp === "S"}
                  onClick={event => handlePropClick(event, "S")}
                >
                  S
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  disabled={selectedProp === "A"}
                  onClick={event => handlePropClick(event, "A")}
                >
                  A
                </Button>
                <Button
                  disabled={selectedProp === "B"}
                  onClick={event => handlePropClick(event, "B")}
                >
                  B
                </Button>
                <Button
                  disabled={selectedProp === "C"}
                  onClick={event => handlePropClick(event, "C")}
                >
                  C
                </Button>
                <Button
                  disabled={selectedProp === "D"}
                  onClick={event => handlePropClick(event, "D")}
                >
                  D
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  disabled={selectedProp === "Θ"}
                  onClick={event => handlePropClick(event, "Θ")}
                >
                  Θ
                </Button>
                <Button
                  disabled={selectedProp === "Φ"}
                  onClick={event => handlePropClick(event, "Φ")}
                >
                  Φ
                </Button>
                <Button
                  disabled={selectedProp === "Ψ"}
                  onClick={event => handlePropClick(event, "Ψ")}
                >
                  Ψ
                </Button>
                <Button
                  disabled={selectedProp === "Ω"}
                  onClick={event => handlePropClick(event, "Ω")}
                >
                  Ω
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
      <main className={clsx(classes.content)}>
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={sidebarOpen}
        >
          <MenuIcon />
        </Fab>
        <div id="workHolder" />
      </main>
    </div>
  );
}

export default App;
