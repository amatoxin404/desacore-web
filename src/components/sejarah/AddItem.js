import React, { useState } from "react";
import WebdesServices from "../../services/services.des";
// import { useHistory } from "react-router-dom";

import { green, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UploadCloud from "@material-ui/icons/CloudUploadRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    marginTop: 20,
    marginRight: 20,
    position: "relative",
    backgroundColor: indigo[500],
    borderRadius: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  myForm: {
    marginTop: 20,
    marginRight: 10,
  },
  myButtonClear: {
    marginBottom: 20,
  },
}));

const AddItem = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [fileData, setFileData] = useState("");
  const [newSaveData, setNewSaveData] = useState("");
  const [rnid, setRnid] = useState("");
  const [keterangan, setKeterangan] = useState("");
  // let history = useHistory();

  const handleAdd = () => {
    if (openAdd === false) {
      const min = 1000;
      const max = 10000;
      var rand = Math.random() * (max - min) + min;
      setRnid(rand.toFixed(4));
      setOpenAdd(true);
    } else {
      setOpenAdd(false);
    }
  };

  const handleChange = (e) => {
    setFileData(e.target.files[0]);
    setNewSaveData(e.target.files[0].name);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (newSaveData && keterangan !== "") {
        if (!loading) {
          setLoading(true);
          const formData = new FormData();
          formData.append("rnid", rnid);
          formData.append("profilFile", fileData);
          formData.append("keterangan", keterangan);
          // const config = {
          //   headers: {
          //     "content-type": "multipart/form-data",
          //   },
          // };
          WebdesServices.postSejarah(formData)
            .then((response) => {
              setLoading(false);
              setNewSaveData("");
              setKeterangan("");
              setRnid("");
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
    <article style={{ marginBottom: 20 }}>
      <h2>Sejarah Desa</h2>
      <hr />
      {loading && <LinearProgress color="secondary" />}
      <Button
        style={{ marginRight: 10, marginTop:10 }}
        variant="outlined"
        color={!openAdd ? "primary" : "secondary"}
        onClick={handleAdd}
      >
        {!openAdd ? "Tambah Data" : "Batal"}
      </Button>
      {!openAdd ? null : (
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <input
                accept="application/msword, application/pdf"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={handleChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  style={{ color: "white" }}
                  aria-label="upload file"
                  component="span"
                >
                  <UploadCloud />
                </IconButton>
              </label>
            </div>
            <TextField
              disabled
              variant="outlined"
              id="outlined-error"
              label="Label File"
              size="small"
              value={newSaveData}
              className={classes.myForm}
            />
            <TextField
              disabled
              variant="outlined"
              id="outlined-error"
              label="RNID"
              size="small"
              value={rnid}
              className={classes.myForm}
            />
          </div>
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
            color="primary"
            className={classes.myForm}
          >
            Upload
          </Button>
        </form>
      )}
      <br />
    </article>
  );
};
export default AddItem;
