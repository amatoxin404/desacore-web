import React from "react";

import ListItem from "./CountDes";
import AddItem from "./SaranDes";
import SaranList from "./SaranList";

const DasboardDesPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section>
      <ListItem />
      {!user ? <AddItem /> : null}
      <SaranList />
    </section>
  );
};

export default DasboardDesPage;
