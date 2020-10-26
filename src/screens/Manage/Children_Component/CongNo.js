import React, { useState, useEffect } from 'react';

//import component
import { Modal, Button, Spinner} from 'react-bootstrap';
import {TextField} from '@material-ui/core';
// import css
import '../css/Manage.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import resources from '../../../resource/color/ColorApp';

let SDTSelected;
let CongnoCu;
function CongNo() {
    const [lstResult, setResult] = useState();
    const [totalCongNo, setTotalCongNo] = useState(0);

    const [messLoading, setMessLoading] = useState(" Đang Lấy Thông Tin Khách Hàng!");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showDieuChinh, setShowDieuChinh] = useState(false);

    const handleCloseDieuChinh = () => setShowDieuChinh(false);
    const handleShowDieuChinh = () => setShowDieuChinh(true);

    const [messResponse, setMessResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);

    const [congnoMoi, setcongnoMoi] = useState();
   

    var stt = 0
    function ItemCongNo(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.SDT}</TableCell>
                <TableCell>{props.Name}</TableCell>
                <TableCell>{props.DiaChi}</TableCell>
                <TableCell>{props.Congno}</TableCell>
                <TableCell
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                    onClick={e=>{
                        SDTSelected = props.SDT;
                        setcongnoMoi(props.Congno);
                        setShowDieuChinh(true)}}
                        style={{
                            width: '120px',
                            height: '40px',
                            fontSize: '14px',
                            marginBottom: '0',
                            backgroundColor:resources.colorPrimary
                        }}
                    >
                       Điều Chỉnh
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
       OnFresh();
    }, [])


    function OnFresh()
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch("https://phutungserver.herokuapp.com/khachhang/ToanBoCongNo",requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
               RenderCongNo(res.data);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Công Nợ! ");

                handleClose();
            });

    }


    function RenderCongNo(arr)
    {
        var _congno = 0;
        const _result = arr.map((e) => {
            _congno += new Number(e.Congno);
            return ItemCongNo(e)
        })
        setTotalCongNo(TienVietNam(_congno));
        setResult(_result)
    }
    function TienVietNam(input)
    {

        var x = new Number(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
    }

    function CapNhatCongNoMoi()
    {
        handleCloseDieuChinh(false);
        
        setMessLoading("Đang Cập Nhật Công Nợ Mới !");
        handleShow();
        var itemRequest =
        {
            SDT:SDTSelected,
            Congno:new Number(congnoMoi)
        };
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body:JSON.stringify(itemRequest)
            };
    
        fetch("https://phutungserver.herokuapp.com/khachhang/CapNhatCongNo",requestOptions)
            .then(res => res.json())
            .then(res =>{
                handleClose();
                setMessResponse(res.mess);
                setShowResponse(true);
                
            }).catch(e=>
                {
                    alert("Có Lỗi Khi Cập Nhật Công Nợ! ");
                    handleClose();
                }
                ); 

    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                    paddingRight:200,
                    color:resources.colorPrimary
                }}
            >
                Toàn Bộ Công Nợ
            </h1>
           

            <TableContainer
                style={{
                    maxHeight: '550px',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Tổng Công Nợ</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{lstResult}</TableBody>
                </Table>
            </TableContainer>
            <div
            style={{paddingRight:200,marginTop:30}}
            >
                <h4
                style={{textAlign:'center'}}
                >
                    Tổng Công Nợ
                </h4>
                <h3
                style={{textAlign:'center',color:'red'}}
                >
                    {totalCongNo}
                </h3>
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


                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    show={showDieuChinh}
                    onHide={handleCloseDieuChinh} 
                    >
                    <Modal.Body >
                    <Modal.Title>
                        Cập Nhật Công Nợ Mới
                    </Modal.Title>
                    <Modal.Footer>
                        <div
                        style={{width:'100%'}}
                        >
                        <TextField
                            style={{width:'100%'}}
                            value={congnoMoi}
                            onChange={e=>{setcongnoMoi(e.target.value)}}
                        />
                        </div>
                       
                       <div
                       style={{marginTop:50}}
                       >
                       <Button
                       onClick={e=>{CapNhatCongNoMoi()}}
                       style={{width:100,marginRight:20}}
                       >
                            OK
                        </Button>

                        <Button
                         variant="danger"
                        style={{width:100,marginLeft:20}}
                        onClick={e=>{handleCloseDieuChinh()}}
                        >
                            Huỷ
                        </Button>
                       </div>
                       
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
        
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    show={showResponse} >
                    <Modal.Body >
                    <Modal.Title>
                        {messResponse}
                    </Modal.Title>
                    <Modal.Footer>
                        <Button
                        onClick={e=>{
                            setShowResponse(false)
                            OnFresh();
                        }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default CongNo
