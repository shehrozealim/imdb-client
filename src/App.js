import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/homePage/homePage";
import { MovieInfo } from "./components/movieInfo/movieInfo";
import { TVInfo } from "./components/tvInfo/tvInfo";
import { PersonInfo } from "./components/searchInfo/personInfo.jsx";

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/movie/:movie_id" element={<MovieInfo />}/>
        <Route exact path="/series/:series_id" element={<TVInfo />}/>
        <Route path="/search/person/:person_id" element={<PersonInfo />}/>
        <Route path="/search/movie/:movie_id" element={<MovieInfo />}/>
      </Routes>
    </div>
  );
}
