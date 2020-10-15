import React, { useState } from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Footer from "./costum/Footer";
import ProdesPage from "./profil/Prodes";
import SejarahDesPage from "./sejarah/SejarahDes";
import StrukturDesPage from "./struktur/StrukturDes";
import VMDesPage from "./visimisi/VMDes";
import LembagaDesPage from "./lembaga/LembagaDes";
import IdentifikasiDesPage from "./identifikasi/IdentifikasiDes";
import PetaDesPage from "./peta/PetaDes";

import AppBarU from "../components/costum/AppBarU";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBarU />
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Sejarah" {...a11yProps(0)} />
          <Tab label="Struktur" {...a11yProps(1)} />
          <Tab label="Visi Misi" {...a11yProps(2)} />
          <Tab label="Lembaga" {...a11yProps(3)} />
          <Tab label="Profil" {...a11yProps(4)} />
          <Tab label="Identifikasi" {...a11yProps(5)} />
          <Tab label="Peta" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SejarahDesPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StrukturDesPage />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VMDesPage />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <LembagaDesPage />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ProdesPage />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <IdentifikasiDesPage />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <PetaDesPage />
      </TabPanel>
      <Footer />
    </div>
  );
}
