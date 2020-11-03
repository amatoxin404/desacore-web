import React, { useState, useEffect } from "react";
import WebdesServices from "../../services/services.des";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { green } from "@material-ui/core/colors";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Link from "@material-ui/core/Link";

const useItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllPeta().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginBottom: 20,
  },
  ketBtn: {
    color: "blue",
    borderColor: "blue",
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  formControl: {
    marginRight: 10,
    marginBottom: 20,
    minWidth: 120,
  },
}));

const ListPeta = () => {
  const classes = useStyles();
  const listItem = useItems();
  const [kategori, setKategori] = useState("");
  const [jenis, setJenis] = useState("");
  const [petaList, setPetaList] = useState([]);
  // const [listItem, setItems] = useState([]);

  const petaKategori = [
    "Administrasi",
    "Kondisi Fisik Wilayah",
    "Kondisi Jaringan/Prasarana Desa",
    "Sebaran Fasilitas/Sarana Desa",
    "Penggunaan Lahan Desa",
    "Peta Analisis",
  ];

  const petaJenis = [
    "Peta Adminitrasi Desa",
    "Peta Adminitrasi Sppt/Kedusunan",
    "Peta Administrasi RW 1",
    "Peta Administrasi RW 2",
    "Peta Administrasi RW 3",
    "Peta Administrasi RW 4",
    "Peta Administrasi RW 5",
    "Peta Jenis Tanah",
    "Peta Kelerengan",
    "Peta Topografi",
    "Peta Zona Rawan Gempa",
    "Peta Curah Hujan",
    "Peta Jaringan Sungai",
    "Peta Jaringan Drainase",
    "Peta Jaringan Irigasi",
    "Peta Jaringan Air Bersih",
    "Peta Jaringan Jalan Desa",
    "Peta Nama Jaringan Jalan",
    "Peta Status Jaringan Jalan",
    "Peta Status Jaringan Jalan RW 01",
    "Peta Status Jaringan Jalan RW 02",
    "Peta Status Jaringan Jalan RW 03",
    "Peta Status Jaringan Jalan RW 04",
    "Peta Status Jaringan Jalan RW 05",
    "Peta Perkerasan Jalan",
    "Peta Perkerasan Jalan RW 01",
    "Peta Perkerasan Jalan RW 02",
    "Peta Perkerasan Jalan RW 03",
    "Peta Perkerasan Jalan RW 04",
    "Peta Perkerasan Jalan RW 05",
    "Peta Lebar Jalan",
    "Peta Lebar Jalan RW 01",
    "Peta Lebar Jalan RW 02",
    "Peta Lebar Jalan RW 03",
    "Peta Lebar Jalan RW 04",
    "Peta Lebar Jalan RW 05",
    "Peta Jaringan Listrik",
    "Peta Sebaran Fasilitas",
    "Peta Sebaran Fasilitas Pendidikan",
    "Peta Sebaran Fasilitas Kesehatan",
    "Peta Sebaran Fasilitas Peribadatan",
    "Peta Sebaran Fasilitas Perjas",
    "Peta Sebaran Fasilitas Umum",
    "Peta Sebaran Fasilitas RTH",
    "Peta Sebaran Fasilitas Industri",
    "Peta Sebaran Fasilitas Transportasi",
    "Peta Sebaran Fasilitas Kelistrikan Desa Cihanjawar",
    "Peta Sebaran Pertanian Desa Cihanjawar",
    "Peta Sebaran Perairan Desa Cihanjawar",
    "Peta Sebaran Fasilitas RW 01",
    "Peta Sebaran Fasilitas RW 02",
    "Peta Sebaran Fasilitas RW 03",
    "Peta Sebaran Fasilitas RW 04",
    "Peta Sebaran Fasilitas RW 05",
    "Peta Sebaran Perkantoran",
    "Peta Sebaran Fasilitas Pertahanan Dan Keamanan",
    "Peta Penggunaan Lahan",
    "Peta Penggunaan Lahan RW 01",
    "Peta Penggunaan Lahan RW 02",
    "Peta Penggunaan Lahan RW 03",
    "Peta Penggunaan Lahan RW 04",
    "Peta Penggunaan Lahan RW 05",
    "Peta Skl Erosi",
    "Peta Skl Drainase",
    "Peta Skl Kebencanaan",
    "Peta Kesetabilan Lereng",
    "Peta Ketersediaan Air",
    "Peta Skl Limbah",
    "Peta Skl Morfologi",
    "Peta Kesetabilan Pondasi",
    "Peta Radius Pelayanan Fasilitas Kesehatan Posyandu",
    "Peta Radius Pelayanan Fasilitas Kesehatan Bidan Dan Klinik",
    "Peta Radius Pelayanan Fasilitas Kesehatan Puskesdes",
    "Peta Radius Pelayanan Fasilitas Pendidikan SD",
    "Peta Radius Pelayanan Fasilitas Pendidikan SMP",
    "Peta Radius Pelayanan Peribdatan Masjid",
    "Peta Radius Pelayanan Peribdatan Mushola",
    "Peta Radius Pelayanan Peribdatan Majelis",
    "Peta Radius Pelayanan Perdagangan Toko/Warung",
  ];

  const handleKategori = (event) => {
    setKategori(event.target.value);
  };

  const handleJenis = (event) => {
    setJenis(event.target.value);
  };

  const btnFilter = () => {
    if (kategori === "") {
      setPetaList(listItem.filter((it) => it.jenis === jenis));
    } else if (jenis === "") {
      setPetaList(listItem.filter((ti) => ti.kategori === kategori));
    } else {
      setPetaList(
        listItem.filter(
          (it) => it.jenis === jenis,
          (ti) => ti.kategori === kategori
        )
      );
    }
  };

  return (
    <section>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel id="demo-simple-select-error-label">Kategori</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={kategori}
          onChange={handleKategori}
          label="Kategori"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {petaKategori.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        variant="outlined"
        className={classes.formControl}
      >
        <InputLabel id="demo-simple-select-error-label">Jenis</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={jenis}
          onChange={handleJenis}
          label="Jenis"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {petaJenis.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={btnFilter} variant="outlined" color="primary">
        Terapkan
      </Button>
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {petaList.length ? (
              petaList.map((item) => (
                <Grid key={item.id} item xs={4}>
                  <Card className={classes.root}>
                    <CardActionArea disabled>
                      <CardMedia
                        component="img"
                        alt="Mohon Tunggu..."
                        height="200"
                        image={`http://traz.desacireundeucilograng.web.id/${item.fileData}`}
                        title="Peta Shape"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.jenis}
                        </Typography>
                        <Grid>
                          <Grid container wrap="nowrap" item xs={6}>
                            <Box
                              border={1}
                              className={classes.ketBtn}
                              component="span"
                            >
                              {item.kategori}
                            </Box>
                          </Grid>
                          <Grid container wrap="nowrap" item xs={6}>
                            <Box
                              mt={1}
                              border={1}
                              className={classes.ketBtn}
                              component="span"
                            >
                              {item.jenis}
                            </Box>
                          </Grid>
                        </Grid>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          color="textSecondary"
                          style={{ marginTop: 10 }}
                        >
                          {item.keterangan}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ backgroundColor: green[500] }}>
                      <Button size="small">
                        <Link
                          style={{ color: "white", textTransform: "none" }}
                          href={`http://traz.desacireundeucilograng.web.id/${item.fileData}`}
                          target="download"
                        >
                          Fullscreen
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h4" style={{color:"red", margin:10}}>TIDAK ADA DATA!</Typography>
            )}
          </Grid>
        </Grid>
      </div>
    </section>
  );
};
export default ListPeta;
