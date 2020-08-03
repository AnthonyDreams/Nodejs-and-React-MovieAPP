import React from "react";
import { Router } from "react-router-dom";

import Routes from "./Routes";
import { createBrowserHistory } from "history";
import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import FilterProvider from "./Context/Filter";
import RequestProvider from "./Context/Request";
import AlertMessageProvider from "./Context/AlertMessage";

const history = createBrowserHistory();
function App() {
  const [showSide, setShowSide] = React.useState(false);
  const toggleSideNav = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowSide((prev) => !prev);
  };
  return (
    <Router history={history}>
      <AlertMessageProvider>
        <RequestProvider>
          <FilterProvider>
            <Header showSideNav={toggleSideNav} />

            <div style={{ display: "flex", flexGrow: "1" }}>
              <SideNav show={showSide} onClose={toggleSideNav} />
              <Routes />
            </div>
          </FilterProvider>
        </RequestProvider>
      </AlertMessageProvider>
    </Router>
  );
}

export default App;
