import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/UserContext";
import HTTPRequester from "./utility/Requester";
import NavigationBar from "./components/layout/NavigationBar";
import AppRoutes from "./components/layout/Routes";
import LoaderSpinner from "./components/util/LoaderSpinner";

function App() {
  const appStatus = HTTPRequester();
  const loginStatus = HTTPRequester();
  const [authState, setAuthState] = useContext(AuthContext);
  const [isOffline, setOffline] = useState(true);

  useEffect(() => {
    if (appStatus.dataFeed?.results === "online") {
      setOffline(false);
    } else {
      appStatus.submitRequest("checkonline", "GET");
    }
  }, [appStatus.dataFeed, appStatus.errorFeed]);

  useEffect(() => {
    if (loginStatus.dataFeed && !loginStatus.errorFeed) {
      setAuthState({
        userLoggedIn: true,
        userData: loginStatus.dataFeed.results,
      });
    } else {
      if (localStorage.getItem("user_token")) {
        loginStatus.submitRequest("user/check_logged_in", "GET");
      }
    }
  }, [loginStatus.dataFeed, loginStatus.errorFeed]);

  return (
    <>
      <NavigationBar />
      <article>
        <p className="content">
          {!appStatus.loading ? (
            <>
              {isOffline === false ? (
                <AppRoutes authState={authState} />
              ) : (
                <p className="content" align="center">
                  <h3>Application Offline - Could Not Connect to API</h3>
                </p>
              )}
            </>
          ) : (
            <div className="loading-container">
              <LoaderSpinner />
            </div>
          )}
        </p>
      </article>
    </>
  );
}

export default App;
