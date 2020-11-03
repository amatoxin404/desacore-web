import React from "react";

import ListItem from "./ListItem";
import AddItem from "./AddItem";

import Typography from "@material-ui/core/Typography";

const StrukturDesPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section>
    {user ? (
      <AddItem />
    ) : (
      <div>
        <Typography>Struktur Pemerintahan Desa</Typography>
        <hr style={{ marginBottom: 20 }} />
      </div>
    )}
    {/* <AddItem /> */}
    <ListItem />
  </section>
  );
};

export default StrukturDesPage;
