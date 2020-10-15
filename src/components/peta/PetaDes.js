import React, { useState } from "react";

import ListItem from "./ListItem";
import AddItem from "./AddItem";
import PetaList from "./PetaListDes";

import Typography from "@material-ui/core/Typography";

const PetaDesPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  if (!user) {
    setUser("User");
  }

  return (
    <section>
      {user == "User" ? (
        <div>
          <Typography>List Peta Desa</Typography>
          <hr style={{marginBottom:20}}/>
          <PetaList />
        </div>
      ) : (
        <div>
          <AddItem />
          <ListItem />
        </div>
      )}
    </section>
  );
};

export default PetaDesPage;
