import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WebdesServices from "../../services/services.des";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    flexGrow: 1,
    marginBottom:20
  },
  myForm: {
    marginTop: 20,
    marginRight: 10,
  },
  formControl: {
    marginTop: 20,
    marginRight: 10,
    minWidth: 120,
  },
}));

export default function DashboardDesPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  const handleKategori = (event) => {
    setKategori(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (kategori && keterangan !== "") {
        if (!loading) {
          setLoading(true);
          const formData = new FormData();
          formData.append("kategori", kategori);
          formData.append("proses", "Sedang Di Proses")
          formData.append("keterangan", keterangan);
          WebdesServices.postSaran(formData)
            .then((response) => {
              console.log(formData);
              console.log(response.data);
              setLoading(false);
              setKategori("");
              setKeterangan("");
              alert("Upload data berhasil");
              refreshPage();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert("Silahkan periksa kembali inputan anda!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={classes.rootGrid}>
      <form
        style={{ marginLeft: 10, marginTop: 20 }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Typography>Keluhan dan Saran</Typography>
        <hr />
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
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Keluhan">Keluhan</MenuItem>
            <MenuItem value="Saran">Saran</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ width: 415, marginBottom: 10 }}
          id="outlined-multiline-static"
          multiline
          rows={3}
          value={keterangan}
          name="keterangan"
          onChange={(e) => {
            setKeterangan(e.currentTarget.value);
          }}
          type="text"
          label="Keterangan"
          variant="outlined"
          size="small"
          className={classes.myForm}
        />
        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#4caf50", color: "white" }}
          className={classes.myForm}
        >
          Kirim
        </Button>
      </form>
    </div>
  );
}
