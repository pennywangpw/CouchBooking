import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import AllSpots from './components/Spots/AllSpots'
import SpotsDetails from "./components/Spots/SpotsDetails/SpotsDetails.js";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          {/* exact can avoid directing to all of routes */}
          <Route exact path = '/'>
            <AllSpots/>
          </Route>

          <Route path= '/spots/:id'>
            <SpotsDetails/>
          </Route>

          {/* <Route path= '/spots/current'>
            <CurrentDetails/>
          </Route>

          <Route path= '/spots/:id/edit'>
            <EditDetails/>
          </Route> */}

        </Switch>
      )}
    </>
  );
}

export default App;
