import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

import AuthService from "../../services/auth.service";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function AppBarU(props) {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  let history = useHistory();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowTitle("Admin Dashboard");
    } else {
      setShowTitle("Desa Cireundeu Cilograng");
    }
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const logOut = () => {
    AuthService.logout();
    refreshPage();
    history.push("/home");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Link
              onClick={() => {
                refreshPage();
                history.push("/home");
              }}
              style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            >
              {showTitle}
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            {showAdminBoard ? (
              <div>
                <IconButton size="small" onClick={logOut}>
                  <LogoutIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            ) : null}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
