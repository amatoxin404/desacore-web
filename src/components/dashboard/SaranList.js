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
import Typography from "@material-ui/core/Typography";

const useItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    WebdesServices.getAllSaran().then((res) => {
      setItems(res.data);
    });
    // return () => unsubscribe();
  }, []);
  return items;
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.success.main,
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
  rootGrid: {
    flexGrow: 1,
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

const SaranList = () => {
  const classes = useStyles();
  const saranList = useItems();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState("");
  const [kategori, setKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const onSubmit = () => {
    try {
      if (!loading) {
        setLoading(true);
        const formData = new FormData();
        formData.append("id", itemId);
        formData.append("kategoir", kategori);
        formData.append("keterangan", keterangan);
        formData.append("proses", "Selesai");
        WebdesServices.putSaran(formData)
          .then((response) => {
            setLoading(false);
            setKategori("");
            setKeterangan("");
            setOpen(false);
            alert("Upload data berhasil");
            refreshPage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">PERINGATAN!</h2>
      <p id="simple-modal-description">
        Apakah anda ingin memperbaharui status untuk data ini?
      </p>
      <Button
        className={classes.myBtnModal}
        variant="outlined"
        color="secondary"
        onClick={() => {
          onSubmit();
        }}
      >
        Ya
      </Button>
      <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
        Tidak
      </Button>
    </div>
  );

  return (
    <section className={classes.rootGrid}>
      {/* LIST ITEM DATA */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Typography>Daftar Keluhan dan Saran</Typography>
      <hr />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Keterangan</StyledTableCell>
              <StyledTableCell align="right">Option</StyledTableCell>
            </TableRow>
          </TableHead>
          {user ? (
            <TableBody>
              {saranList.length ? (
                saranList.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>{item.kategori}</StyledTableCell>
                    <StyledTableCell>{item.keterangan}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.proses !== "Selesai" ? (
                        <button
                          onClick={() => {
                            WebdesServices.getSaran(item.id).then((res) => {
                              setItemId(res.data.id);
                              setKeterangan(res.data.keterangan);
                              setKategori(res.data.kategori);
                            });
                            handleOpen();
                          }}
                        >
                          Update
                        </button>
                      ) : (
                        <button style={{color:"#4caf50"}} disabled={true}>Selesai</button>
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
          ) : (
            <TableBody>
              {saranList.length ? (
                saranList.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>{item.kategori}</StyledTableCell>
                    <StyledTableCell>{item.keterangan}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.proses !== "Selesai" ? (
                        <button style={{color:"#4caf50"}} disabled={true}>Sedang Di Proses</button>
                      ) : (
                        <button style={{color:"#4caf50"}} disabled={true}>Selesai</button>
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
          )}
        </Table>
      </TableContainer>
    </section>
  );
};
export default SaranList;
