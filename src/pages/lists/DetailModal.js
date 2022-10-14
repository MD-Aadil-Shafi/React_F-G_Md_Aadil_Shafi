import React from 'react'
import { Modal } from 'antd'

const DetailModal = ({modalData, showModal, setShowModal}) => {
  return (
    <Modal title="Review Details" open={showModal} onOk={()=>setShowModal(false)} onCancel={()=>setShowModal(false)}>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Cursomer name: </p>
            <p className='text-capitalize'>{modalData?.name}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Cursomer email: </p>
            <p>{modalData?.email}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Country: </p>
            <p>{modalData?.country}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Cursomer phone: </p>
            <p className='text-capitalize'>{modalData?.phone}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Rating on quality of service: </p>
            <p className='text-capitalize'>{modalData?.quality}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Rating on cleanliness: </p>
            <p className='text-capitalize'>{modalData?.clean}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Rating on quality of beverage: </p>
            <p className='text-capitalize'>{modalData?.beverage}</p>
        </div>
        <div className='d-flex justify-content-between mb-3'>
            <p className='fw-light'>Overall dining experience: </p>
            <p className='text-capitalize'>{modalData?.experience}</p>
        </div>
      </Modal>
  )
}

export default DetailModal