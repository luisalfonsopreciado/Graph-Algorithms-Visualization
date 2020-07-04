import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { CustomDialog } from "./components/UI/CustomDialog/CustomDialog";
import Paper from "@material-ui/core/Paper";
import classes from "./App.module.css";
import Footer from "./components/Footer/Footer";
import configureAlgorithmStore from "./hooks-store/algorithm";
import { useStore } from "./hooks-store/store";
import marked from "marked";
configureAlgorithmStore();

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [markdown, setMarkdown] = useState(null);
  const [state] = useStore();

  console.log(state);
  useEffect(() => {
    const getMarkdown = async () => {
      const info = await import(`./info/${state.algorithm}.md`);
      const res = await fetch(info.default);
      const text = await res.text();
      const markdown = marked(text);
      setMarkdown(markdown);
    };
    getMarkdown();
  }, [state.algorithm]);

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
      <div>
        <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
      </div>
      <Footer />
    </>
  );
}

export default App;
