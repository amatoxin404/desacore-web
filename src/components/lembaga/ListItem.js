import React, { useState, useEffect } from "react";
import WebdesServices from "../../services/services.des";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import { green, indigo } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import UploadCloud from "@material-ui/icons/CloudUploadRounded";

const useItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllLembaga().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  myBtnModal: {
    marginRight: 30,
  },
  myFormBtn: {
    marginRight: 10,
  },
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ListItem = () => {
  const classes = useStyles();
  const listItem = useItems();
  const [rnid, setRnid] = useState("");
  const [itemId, setItemId] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const [option, setOption] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState("");
  const [newSaveData, setNewSaveData] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    alert("Peringatan! jika melakukan update data pastikan upload ulang file");
    setOpenEdit(true);
  };

  const handleEditCan = () => {
    setOpenEdit(false);
  }

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
          WebdesServices.putLembaga(formData)
            .then((response) => {
              setLoading(false);
              setNewSaveData("");
              setKeterangan("");
              setRnid("");
              setOpenEdit(false);
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">PERINGATAN!</h2>
      <p id="simple-modal-description">
        Apakah anda yakin ingin menghapus file ini?
      </p>
      <Button
        className={classes.myBtnModal}
        variant="outlined"
        color="secondary"
        onClick={() => {
          WebdesServices.delLembaga(itemId).then((res) => {
            console.log(res.JSON);
          });
          setOpen(false);
          alert("Data berhasil di hapus");
          refreshPage();
        }}
      >
        Hapus
      </Button>
      <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
        Batal
      </Button>
    </div>
  );

  return (
    <section>
      {openEdit ? (
        <div>
          <h2>Update Data</h2>
          <hr />
          {loading && <LinearProgress color="secondary" />}
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
          <Button
              variant="outlined"
              color="secondary"
              style={{marginBottom: 10}}
              onClick={() => {
                setOption(false);
                handleEditCan();
              }}
            >
              Batal
            </Button>
          <br />
        </div>
      ) : null}

      {/* LIST ITEM DATA */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Keterangan</StyledTableCell>
              <StyledTableCell align="right">Option</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItem.length ? (
              listItem.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.fileData ? (
                      <button>
                        <Link
                          href={`http://localhost:8080${item.fileData}`}
                          target="download"
                        >
                          Download File
                        </Link>
                      </button>
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{item.keterangan}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user ? (
                      <div>
                        <button
                          disabled={option}
                          className={classes.myFormBtn}
                          onClick={() => {
                            WebdesServices.getLembaga(item.id).then((res) => {
                              setKeterangan(res.data.keterangan);
                              setRnid(res.data.rnid);
                              setNewSaveData(res.data.fileData);
                            });
                            setOption(true);
                            handleEdit();
                          }}
                        >
                          Update
                        </button>
                        <button
                          disabled={option}
                          onClick={() => {
                            setItemId(item.id);
                            handleOpen();
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <button disabled={true}>Konten Publik</button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Tidak Ada Data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
export default ListItem;
