import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Actors from "../Pages/Actors";
import Movies from "../Pages/Movies";
import AddActor from "../Pages/AddActor"
import MovieActor from "../Pages/AddMovie"


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
        <Route path="/actors" exact component={Actors} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/actors/add" exact component={AddActor} />
        <Route path="/movies/add" exact component={MovieActor} />

    </Switch>
  );
}
