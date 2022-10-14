import React,{useState, useEffect} from 'react'
import './list.css'
import { Button, Select, Table, Input, message} from 'antd';
import {ReloadOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import DetailModal from './DetailModal';
import { getDifference } from '../../utils/getDifference';
import { motion } from 'framer-motion';

const { Search } = Input;

const List = ({data, refresher}) => {

    const [tableData, setTableData] = useState([])
    const [serachedData, setSearchedData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [modalData, setModalData] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [selectedData, setSelectedData] = useState([]);

    const navigate = useNavigate()

    useEffect(()=>{
        setTableData(data)
    },[data])

    const handleShowDetails = (val)=>{
      setModalData(val)
      setShowModal(true)
    }

    const handleReload = () =>{
      setSearchTerm("")
    }

    const handleDelete = () =>{
      if(!selectedData.length){
        return alert('Nothing to delete, please click on checkbox to delete review')
      }
      if(selectedData.length === data.length){
        let confirm = window.confirm('Are you sure you want to delete all reviews')
        if(!confirm) return;
        let newData = []
        localStorage.setItem('review-data', JSON.stringify(newData))
        refresher()
        setSelectedData([])
        message.success('Deleted successfully');
      }else{
        let confirm = window.confirm('Are you sure you want the selected reviews')
        if(!confirm) return;
        const difference = [
          ...getDifference(selectedData, data),
          ...getDifference(data, selectedData)
        ];
        console.log(difference)
        localStorage.setItem('review-data', JSON.stringify(difference))
        refresher()
        setSelectedData([])
        message.success('Deleted successfully');
      }
    }

    // console.log('tabledata',tableData)
    //column for table
    const columns = [
        {
          title: 'Form details',
          dataIndex: 'details',
          key: 'details',
          width:'120px',
          render: (details) => <p className="text-capitalize wrap-text mb-0 text-primary cursor-pointer" onClick={()=>handleShowDetails(details)}><u>details</u></p>
        },
        {
          title: 'Customer Name',
          dataIndex: 'name',
          key: 'name',
          width:'200px',
          render: (name) => <p className="text-capitalize wrap-text mb-0">{name}</p>,
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
            title: 'Please rate the quality of service you received from your host',
            dataIndex: 'quality',
            key: 'quality',
            width:'440px',
            sorter: (a, b) => a.quality.localeCompare(b.quality),
          },
        {
          title: 'Was our restaurant clean?',
          dataIndex: 'clean',
          key: 'clean',
          width:'220px',
          sorter: (a, b) => a.clean.localeCompare(b.clean),
        },
        {
          title: 'Please rate the quality of your beverage',
          dataIndex: 'beverage',
          key: 'beverage',
          width:'310px',
          sorter: (a, b) => a.beverage.localeCompare(b.beverage),
        },
        {
          title: 'Please rate your overall dining experience',
          dataIndex: 'experience',
          key: 'experience',
          width:'340px',
          sorter: (a, b) => a.experience.localeCompare(b.experience),
        },
      ];
      
      useEffect(()=>{
        let newData = []
        let sno = 1;
        data?.map(({name, email,country, phone, quality, clean, beverage, experience,id }) => {
          newData.push({details:{name, email, country, phone, quality, clean, beverage, experience},
             name, email, phone, quality, clean, beverage, experience,id, key:sno});
            sno += 1;
      })
      setTableData(newData)
      },[selectedData])

    //console.log('data',data)
    // console.log('td data',tableData)

      const handleSearch = (term) =>{
        let prevData = tableData;
        setSearchTerm(term?.toLowerCase())
        let newData = prevData.filter((item)=>item.name?.toLowerCase().includes(searchTerm) || 
        item.phone?.toLowerCase().includes(searchTerm) || item.email?.toLowerCase().includes(searchTerm))
        if(newData.length){
            setSearchedData(newData)
        }else{
            setSearchedData([])
        }
      }

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectedData(selectedRows)
        },
        getCheckboxProps: (record) => ({
          name: record.name,
        }),
      };

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    className='container-fluid m-0 px-4 py-5 bg-light minHeigh'>
        <div className='d-flex justify-content-between'>
            <div>
                <h5>Aromatic bar</h5>
                <p>{searchTerm.length ? serachedData.length : tableData.length} records found. {searchTerm.length ? '1' : '0'} filters applied</p>
            </div>
            <div>
            <Search placeholder="Search" allowClear value={searchTerm} onSearch={(value)=>handleSearch(value)} onChange={(e)=>handleSearch(e.target.value)} style={{ width: 180 }} />
            <Button icon={<ReloadOutlined/>} className='mx-2' onClick={handleReload}/>
            <Button className='bg-success rounded text-light' onClick={()=>navigate('/')}>Add New</Button>
            </div>
        </div>
         {/* table starts.................................... */}
         <div className='table-div'>
            <div className='table'>
         <Table 
         rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
         columns={columns} 
         dataSource={searchTerm ? serachedData : tableData}/>
         </div>
         </div>
        {/* table ends.................................... */}

<div className='d-flex justify-content-end'>
<Button className='del-btn' size='large' onClick={handleDelete}>Delete</Button>
</div>

{/* detail modal...................... */}
<DetailModal modalData={modalData} showModal={showModal} setShowModal={setShowModal}/>
{/* detail modal ends................. */}
    </motion.div>
  )
}

export default List