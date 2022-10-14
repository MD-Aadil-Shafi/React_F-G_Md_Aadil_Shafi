import { Button } from 'antd'
import React,{useEffect} from 'react'
import {CheckCircleFilled} from '@ant-design/icons'
import './thank.css'
import { useNavigate, useLocation } from 'react-router-dom';
import {motion} from 'framer-motion'

const Thank = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    if(location?.state === null){
      navigate('/')
    }
  },[])

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    className='container text-center p-5'>
        <CheckCircleFilled className='checked-icon'/>
        <h3>Thank you for providing the feedback</h3>
        <h5 className='text-secondary'>We will work towards improving your experience</h5>

        <Button type='primary' size='large' className='my-5 close-btn' onClick={()=>navigate('/list')}>Close</Button>
    </motion.div>
  )
}

export default Thank