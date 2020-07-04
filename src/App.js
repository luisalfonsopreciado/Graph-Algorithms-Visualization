import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { CustomDialog } from "./components/UI/CustomDialog/CustomDialog";
import Paper from "@material-ui/core/Paper";
import classes from "./App.module.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    handleDialogOpen();
  }, []);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={classes.App}>
        <Board openDialog={handleDialogOpen} />
        <CustomDialog
          title="Welcome"
          isOpen={isOpen}
          handleClose={handleDialogClose}
          className={classes.customDialog}
        >
          <Paper>
            <h1>Welcome to The Graph Algorithms Visualizer!</h1>
            <br />
            <h4>
              This Project Helps CS Enthusiasts visualize popular graph
              traversal/pathfinding algorithms. To get Started, click on an
              algorithm located on the header and press Visualize!.
            </h4>
            <p>For a better Experience, Use use browser to full width</p>
          </Paper>
        </CustomDialog>
      </div>
      <Footer />
    </>
  );
}

export default App;
