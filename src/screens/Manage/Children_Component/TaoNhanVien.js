import React, { useState, useEffect } from 'react'

//import component react material
import { Paper, TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { Button,Modal ,Spinner } from 'react-bootstrap';

function TaoNhanVien() {
    const [sodienthoai,setSDT] = useState("");
    const [tenNV,setTenNV] = useState("");

    const [show, setShow] = useState(false);
    const [messLoading, setMessLoading] = useState(" Đang Đăng Ký Tài Khoản , Đợi Chút Nhé!");

    const [messResponse, setMessResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function Handle_ThemNhanVien()
    {
        var itemRequest = 
        {
            SDT:sodienthoai,
            Pass:"123456",
            Name:tenNV
        }
        handleShow();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify(itemRequest)
        };

        fetch("https://phutungserver.herokuapp.com/quanli/ThemNhanVien",requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose(); 
            setMessResponse(res.mess);
            setShowResponse(true);
            setTenNV("");
            setSDT("");
        }).catch(e=>
            {
                alert(e);
                handleClose();
            }
            );
    }
    return (
        <div
            style={{
                flex:1,
                
                justifyContent:'center',
                alignContent:'center',
                width: '100%',
                height: '100%',
                padding: '20px 30px',
            }}
        >
            <h1
                style={{
                    lineHeight: '60px',
                    textAlign: 'center',
                    paddingRight:200,
                    color:'blue'
                }}
            >
                Thêm Nhân Viên
            </h1>
           
              
                    <TextField
                    style={{
                        width:200,
                        marginLeft:200,
                    }}
                        onChange={e=>{setSDT(e.target.value)}}
                        value={sodienthoai}
                        id="standard-basic"
                        label="Số Điện Thoại"
                        type="number"
                    />
             
              
                    <TextField
                    style={{
                        width:200,
                        marginLeft:100,
                    }}
                        onChange={e=>{setTenNV(e.target.value)}}
                        value={tenNV}
                        id="standard-basic"
                        label="Tên Nhân Viên"
                    />
                    
             
           
           
                <Button
                onClick={e=>Handle_ThemNhanVien()}
                    variant="primary"
                    style={{
                        marginTop:100,
                        width: '200px',
                        marginLeft:200,
                        height: '50px',
                    }}
                >
                    Tạo Nhân Viên
                </Button>

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
                    show={showResponse} >
                    <Modal.Body >
                    <Modal.Title>
                        {messResponse}
                    </Modal.Title>
                    <Modal.Footer>
                        <Button
                        onClick={e=>{setShowResponse(false)}}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
           
        </div>
    )
}

export default TaoNhanVien
