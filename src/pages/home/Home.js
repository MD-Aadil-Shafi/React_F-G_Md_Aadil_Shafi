import React,{useState} from 'react'
import CheckInput from '../../components/commonInput/CheckInput'
import './home.css'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import CountryCode from '../../components/countryCode/CountryCode'
import {motion} from 'framer-motion'

const Home = ({data,refresher}) => {

    const navigate = useNavigate()
    const [nameErr, setNameErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [emailErr, setEmailErr] = useState('')

    const [state, setState] = useState({
        name:'',
        email:'',
        country:'India (भारत)',
        phone:'',
        quality:'Good',
        beverage:'Good',
        clean:'Good',
        experience:'Good'
    })

    const handleChange = (e) =>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleCountry = (val) =>{
        setState({...state,['country']:val})
    }

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleSubmit = () =>{
        if(!state.name && !state.email && !state.phone){
            setNameErr('Name is required')
            setPhoneErr('Phone number is required')
            setEmailErr('Email is required')
        }else if(!state.name){
            setNameErr('Name is required')
            setPhoneErr('')
            setEmailErr('') 
        }else if(!state.email){
            setNameErr('')
            setPhoneErr('')
            setEmailErr('Email is required')
        }else if(!state.email.match(mailformat)){
            setNameErr('')
            setPhoneErr('')
            setEmailErr('Please enter valid email')
        }else if(!state.phone){
            setNameErr('')
            setPhoneErr('Phone number is required')
            setEmailErr('')
        }else if(state.phone.length !== 10){
            setNameErr('')
            setPhoneErr('Phone number must be of 10 digits')
            setEmailErr('')
        }else{
            let findEmail = data?.filter((x) => x.email === state.email)
            if(findEmail.length){
                return alert('Customer with this email alredy posted review.')
            }
            let findPhone = data?.filter((x) => x.phone === state.phone)
            if(findPhone.length){
                return alert('Customer with this phone number alredy posted review.')
            }
            let newData = [...data, state]
            localStorage.setItem('review-data', JSON.stringify(newData))
            refresher()
            navigate('/thank', {state:{filled:true}})
        }   
    }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    className='container-fluid m-0 p-0 bg-light minHeigh'>
    <Navbar/>
    <motion.div
    initial={{height: 0}}
    animate={{height: '100%'}}
    exit={{y: window.innerHeight, transition:{duration: 0.4}}}
    className='mx-3 shadow-sm rounded p-4 my-5 white'>
        <div className='row justify-content-between'>
            {/* form L.H.S content */}
            <div className='col-md-6 left-div'>
                <div className='mb-4'>
                    <label className='h5'>Customer Name<span className='text-danger'>*</span></label>
                    <input placeholder="E.g. John Snow" type='text' className='form-control w-100' name='name'
                    value={state.name} onChange={handleChange}
                    />
                    {nameErr && 
                <div className="alert alert-danger py-2 mt-2 text-danger fw-bold d-flex align-items-center" role="alert">
                <ExclamationCircleOutlined/>&nbsp;{nameErr}
                </div>
                }
                </div>
                <div className='mb-4'>
                    <label className='h5'>Phone<span className='text-danger'>*</span></label>
                    <div className='d-flex'>
                    <CountryCode handleCountry={handleCountry}/>
                    <input placeholder="9999999999" type='number' className='form-control phone-input' name='phone'
                    value={state.phone} onChange={handleChange}
                    />
                    </div>
                    
                    {phoneErr && 
                <div className="alert alert-danger py-2 mt-2 text-danger fw-bold d-flex align-items-center" role="alert">
                <ExclamationCircleOutlined/>&nbsp;{phoneErr}
                </div>
                }
                </div>
                <CheckInput question='Please rate the quality of service you received from your host' type='quality' handleChange={handleChange} state={state}/>
                <CheckInput question='Was our restaurant clean?' type='clean' handleChange={handleChange} state={state}/>

            </div>

            {/* form R.H.S content */}
            <div className='col-md-6 right-div'>
            <div className='mb-4'>
                <label className='h5'>Email<span className='text-danger'>*</span></label>
                <input placeholder="E.g. abc@gmail.com" type='email' className='form-control w-100' name='email'
                value={state.email} onChange={handleChange}
                />
                {emailErr && 
                <div className="alert alert-danger py-2 mt-2 text-danger fw-bold d-flex align-items-center" role="alert">
                <ExclamationCircleOutlined/>&nbsp;{emailErr}
                </div>
                }
            </div>
                <CheckInput question='Please rate the quality of your beverage' type='beverage' handleChange={handleChange} state={state}/>
                <CheckInput question='Please rate your overall dining experience' type='experience' handleChange={handleChange} state={state}/>
            </div>
        </div>
    </motion.div>
            <div className='d-flex justify-content-end mx-3'>
            <Button type="primary" size='large' className='bg-success'
            onClick={handleSubmit}
            >
            Submit Review
          </Button>
            </div>
            </motion.div>
  )
}

export default Home