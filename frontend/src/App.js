import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import AllSpots from './components/Spots/AllSpots/AllSpots'
import SpotsDetails from "./components/Spots/SpotsDetails/SpotsDetails";
import CreateASpotForm from "./components/Spots/CreateASpot/CreateASpot"
import CurrentSpot from "./components/Spots/CurrentSpot/CurrentSpot";
import EditASpot from "./components/Spots/EditASpot/EditASpot";

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

          <Route excat path='/spots/new'>
            <CreateASpotForm />
          </Route>

          <Route exact path='/spots/current'>
            <CurrentSpot />
          </Route>

          <Route path='/spots/:id/edit'>
            <EditASpot />
          </Route>

          <Route path='/spots/:id'>
            <SpotsDetails />
          </Route>

          <Route exact path='/'>
            <AllSpots />
          </Route>

          <Route>Page Not Found</Route>

        </Switch>
      )}
    </>
  );
}

export default App;
