import React, { useState } from "react";

import ListItem from "./ListItem";
import AddItem from "./AddItem";

import Typography from "@material-ui/core/Typography";

const IdentifikasiDesPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  if (!user) {
    setUser("User");
  }

  return (
    <section>
      {user !== "User" ? (
        <AddItem />
      ) : (
        <div>
          <Typography>Hasil Identifikasi Desa</Typography>
          <hr style={{ marginBottom: 20 }} />
        </div>
      )}
      {/* <AddItem /> */}
      <ListItem />
    </section>
  );
};

export default IdentifikasiDesPage;
