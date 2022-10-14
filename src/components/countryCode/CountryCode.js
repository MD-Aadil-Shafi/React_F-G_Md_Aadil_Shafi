import React from 'react'
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import './cc.css'

const CountryCode = ({handleCountry}) => {

  return (
    
        <CountryDropdown className='flag-dropdown form-control' preferredCountries={['in']}  value="" handleChange={e => handleCountry(e.target.value)}></CountryDropdown>
  )
}

export default CountryCode