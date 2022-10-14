import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='mx-3 sticky-top shadow-sm rounded p-4 my-4 white d-flex justify-content-between'>
        <h2>Aromatic bar</h2>
        <Link to='/list'>
        <button className='btn btn-outline-dark btn-sm'>View Reviews</button>
        </Link>
    </div>
  )
}

export default Navbar