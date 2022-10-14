import React from 'react'
import {Routes, Route, useLocation } from "react-router-dom";
import Home from '../pages/home/Home';
import Thank from '../pages/thank/Thank';
import List from '../pages/lists/List';
import {AnimatePresence} from 'framer-motion'

const AnimRoutes = ({data, refresher}) => {
    const location = useLocation()
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route exact path='/' element={<Home data={data} refresher={refresher}/>}/>
        <Route exact path='/thank' element={<Thank/>}/>
        <Route exact path='/list' element={<List data={data} refresher={refresher}/>}/>
        <Route exact path='*' element={<Home/>}/>
    </Routes>
    </AnimatePresence>
  )
}

export default AnimRoutes