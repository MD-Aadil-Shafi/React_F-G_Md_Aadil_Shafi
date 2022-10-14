import React,{useState} from 'react'
import './common.css'

const CheckInput = ({question, type,handleChange,state}) => {

  return (
    <div className='mb-4'>
    <label className='h5'>{question}<span className='text-danger'>*</span></label>
    <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
        <input className="form-check-input checks" checked={state[type]=== 'Excellent' ? true : false} name={type} type="checkbox" value='Excellent' onChange={handleChange}/>
        <h5 className='fw-light mx-3 pt-3'>Excellent</h5>
        </div>
        <div className='d-flex align-items-center'>
        <input className="form-check-input checks" checked={state[type]=== 'Good' ? true : false} name={type} type="checkbox" value='Good' onChange={handleChange}/>
        <h5 className='fw-light mx-3 pt-3'>Good</h5>
        </div>
        <div className='d-flex align-items-center'>
        <input className="form-check-input checks" checked={state[type]=== 'Fair' ? true : false} name={type} type="checkbox" value='Fair' onChange={handleChange}/>
        <h5 className='fw-light mx-3 pt-3'>Fair</h5>
        </div>
        <div className='d-flex align-items-center'>
        <input className="form-check-input checks" checked={state[type]=== 'Bad' ? true : false} name={type} type="checkbox" value='Bad' onChange={handleChange}/>
        <h5 className='fw-light mx-3 pt-3'>Bad</h5>
        </div>
    
    </div>
    
    </div>
  )
}

export default CheckInput