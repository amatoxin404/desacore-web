import React from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
});

export default function NotFound() {
  const classes = useStyles();
  let history = useHistory();

  const backOut = () => {
    history.push("/home");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container fixed>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          style={{ margin: 200 }}
        >
          {" "}
          HALAMAN TIDAK DI TEMUKAN!
        </Typography>
        <Button
          style={{ marginTop: 10 }}
          variant="outlined"
          color="secondary"
          onClick={backOut}
        >
          Kembali
        </Button>
      </Container>
    </div>
  );
}
