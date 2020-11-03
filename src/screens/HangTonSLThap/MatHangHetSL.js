
import React,{useState,useEffect} from 'react'

// import css
import './css/HangTonSLThap.css';

//import component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal ,Spinner } from 'react-bootstrap';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import resources from '../../resource/color/ColorApp';
import NetWorking from '../../networking/fetchWithTimeout';


function MatHangHetSL() {

    const [show, setShow] = useState(false);
    const [messLoading, setMessLoading] = useState("");

    const [resultLst, setResultLst] = useState();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


   

    function ItemNoiDung(props)
    {
        return <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>Số Lượng Đã Thấp Hơn {props.amountAlert}</TableCell>
        </TableRow>
    }

    useEffect(()=>{
        
        setMessLoading("   Đang Làm Mới Kho Hàng!");
        Refresh();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function Refresh()
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        let _URL ="https://phutungserver.herokuapp.com/quanli/MatHangHetSL";
        NetWorking(_URL,requestOptions,5000) 
        .then(res =>{
            handleClose();  
            if(res.success)
            {
                UpdateHangThieuSL(res.data.reverse());
                 
            }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Mặt Hàng Hết SL ! ");

                handleClose();
            }
            );
    }

    function UpdateHangThieuSL(arr){
        const result = arr.map(e=>{
            return ItemNoiDung(e);
        })
        setResultLst(result);

    }
    
    return(
        <section className='hang-container'>
            <div className='hang-container__content'>
             
            <h3 
            style={{color:resources.colorPrimary,textAlign:'center'}}
            className='title'>Sản Phẩm Hết Số Lượng</h3>
            <FontAwesomeIcon   onClick={e=>{Refresh()}} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
            <TableContainer
                style={{
                    height:'80%',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Sản Phẩm</TableCell>
                            <TableCell>Số Lượng Hiện Tại</TableCell>
                            <TableCell>Nội Dung</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{resultLst}</TableBody>
                </Table>
            </TableContainer>
            
            </div>


            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}>
                <Modal.Body >
                 <Modal.Title>
                 <Spinner animation="border" variant="success" role="status"></Spinner>
                     {messLoading}

                 </Modal.Title>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default MatHangHetSL;

