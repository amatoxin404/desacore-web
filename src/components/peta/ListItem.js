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
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  formControl: {
    marginTop: 20,
    marginRight: 10,
    minWidth: 120,
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
  const [kategori, setKategori] = useState("");
  const [jenis, setJenis] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
          formData.append("ptid", rnid);
          formData.append("profilFile", fileData);
          formData.append("kategori", kategori);
          formData.append("jenis", jenis);
          formData.append("keterangan", keterangan);
          // const config = {
          //   headers: {
          //     "content-type": "multipart/form-data",
          //   },
          // };
          WebdesServices.putPeta(formData)
            .then((response) => {
              setLoading(false);
              setNewSaveData("");
              setKeterangan("");
              setRnid("");
              setJenis("");
              setKategori("");
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
          WebdesServices.delPeta(itemId).then((res) => {
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
                  accept="image/*"
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
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-error-label">
                  Kategori
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={kategori}
                  onChange={handleKategori}
                  label="Kategori"
                >
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
                <InputLabel id="demo-simple-select-error-label">
                  Jenis
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={jenis}
                  onChange={handleJenis}
                  label="Jenis"
                >
                  {petaJenis.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            style={{ marginBottom: 10 }}
            onClick={() => {
              handleEditCan();
              setOption(false);
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
              <StyledTableCell>Kategori</StyledTableCell>
              <StyledTableCell>Jenis</StyledTableCell>
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
                          href={`http://traz.desacireundeucilograng.web.id/${item.fileData}`}
                          target="download"
                        >
                          Download File
                        </Link>
                      </button>
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                  <StyledTableCell>{item.kategori}</StyledTableCell>
                  <StyledTableCell>{item.jenis}</StyledTableCell>
                  <StyledTableCell>{item.keterangan}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user ? (
                      <div>
                        <button
                          disabled={option}
                          className={classes.myFormBtn}
                          onClick={() => {
                            WebdesServices.getPeta(item.id).then((res) => {
                              setKeterangan(res.data.keterangan);
                              setRnid(res.data.ptid);
                              setJenis(res.data.jenis);
                              setKategori(res.data.kategori);
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
                      <button style={{color:"#4caf50"}} disabled={true}>Konten Publik</button>
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
