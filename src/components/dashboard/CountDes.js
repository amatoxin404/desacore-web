import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WebdesServices from "../../services/services.des";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useItemsPeta = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllPeta().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useItemsIdenti = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllIdentifikasi().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useItemsLembaga = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllLembaga().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useItemsProfil = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllProfil().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useItemsSejarah = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllSejarah().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useItemsStruktur = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllStruktur().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    margin: 20,
    backgroundColor: "#4caf50",
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  rootGrid: {
    flexGrow: 1,
    marginBottom: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
  customWidth: {
    maxWidth: 500,
  },
  noMaxWidth: {
    maxWidth: "none",
  },
}));

export default function CountDes() {
  const classes = useStyles();
  const Sejarah = useItemsSejarah();
  const Struktur = useItemsStruktur();
  const Lembaga = useItemsLembaga();
  const Profil = useItemsProfil();
  const Identi = useItemsIdenti();
  const Peta = useItemsPeta();

  return (
    <div className={classes.rootGrid}>
      <Typography>Semua Data Yang Tersedia</Typography>
      <hr />
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>Sejarah Desa</Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Sejarah.length ? Sejarah.length : "0"}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>Struktur Desa</Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Struktur.length ? Struktur.length : "0"}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>Lembaga Desa</Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Lembaga.length ? Lembaga.length : "0"}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>Profil Desa</Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Profil.length ? Profil.length : "0"}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>
                Hasil Identifikasi
              </Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Identi.length ? Identi.length : "0"}
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title}>Peta Desa</Typography>
              <hr style={{ color: "white" }} />
            </CardContent>
            <CardActions>
              <Button size="small" style={{ color: "white" }} disabled>
                Jumlah Data :
              </Button>
              <Button size="small" style={{ color: "white" }} disabled>
                {Peta.length ? Peta.length : "0"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
