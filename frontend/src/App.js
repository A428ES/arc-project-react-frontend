import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/user_context";
import HTTPRequester from "./utility/requester";
import NavigationBar from "./components/navigationbar";
import AppRoutes from "./components/routes";
import LoaderSpinner from "./components/util/loader";

function App() {
  const appStatus = HTTPRequester();
  const loginStatus = HTTPRequester();
  const [authState, setAuthState] = useContext(AuthContext);
  const [processingLoad, setLoading] = useState(["app_status"]);
  const [isOffline, setOffline] = useState(true);

  let removeStatus = (status) => {
    let newLoad = processingLoad.filter((item) => item !== status);
    setLoading(newLoad);
  };

  useEffect(() => {
    if (appStatus.errorFeed) {
      removeStatus("app_status");
    }
    if (appStatus.dataFeed && appStatus.dataFeed.results === "online") {
      setOffline(false);
      removeStatus("app_status");
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
          {processingLoad.length === 0 ? (
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
