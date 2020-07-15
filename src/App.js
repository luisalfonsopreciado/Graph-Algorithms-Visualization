import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import { CustomDialog } from "./components/UI/CustomDialog/CustomDialog";
import Paper from "@material-ui/core/Paper";
import styles from "./App.module.css";
import Footer from "./components/Footer/Footer";
import configureAlgorithmStore from "./hooks-store/algorithm";
import { useStore } from "./hooks-store/store";
import marked from "marked";
import ReactMarkdown from "react-markdown/with-html";
import { makeStyles } from "@material-ui/core";

configureAlgorithmStore();

const useStyles = makeStyles({
  paper: {
    padding: "5px",
    margin: "10px",
    width: "1200px"
  },
});

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [markdown, setMarkdown] = useState(null);
  const [state] = useStore();
  const classes = useStyles();

  useEffect(() => {
    const getMarkdown = async () => {
      const info = await import(`./info/${state.info}.md`);
      const res = await fetch(info.default);
      const text = await res.text();
      const markdown = marked(text);
      setMarkdown(markdown);
    };
    getMarkdown();
  }, [state.info]);

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
      <div className={styles.App}>
        <Board openDialog={handleDialogOpen} />
        <Paper className={classes.paper} elevation={10}>
          <ReactMarkdown source={markdown} escapeHtml={false} />
        </Paper>
      </div>

      <CustomDialog
        title=""
        isOpen={isOpen}
        handleClose={handleDialogClose}
        className={styles.customDialog}
      >
        <Paper>
          <h1>Welcome to The Graph Algorithms Visualizer!</h1>
          <br />
          <h4>
            This Project Helps CS Enthusiasts understand popular graph
            traversal/path-finding algorithms. To get Started, click on an
            algorithm located on the header and press Visualize!.
          </h4>
          <p>For a better Experience, set your browser to full width</p>
        </Paper>
      </CustomDialog>

      <Footer />
    </>
  );
}

export default App;
