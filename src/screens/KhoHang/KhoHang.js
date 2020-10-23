import React, { useState ,useEffect} from 'react'
import './css/KhoHang.css'

//import component
import Find from '../../resource/Find/Find'
import Result_row_find from '../../resource/Result_row_find/Result_row_find'
import InputText from '../../resource/InputText/InputText'
import { Button, Modal, Spinner } from 'react-bootstrap'



import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'


import TextField from '@material-ui/core/Button'

function KhoHang() {
    var arr = [
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
    ]

    const [lstKhoHang,setLstKhoHang] = useState([]);
    const [searchContent,setsearchContent] = useState("");

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState(
        '   Đang Tải Thông Tin Khách, Đợi Chút Nhé'
    )

    const [lstResult, setLstResult] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const style_Dialog_KhoHang = {
        display: 'block',
    }
    

    function UpdateKhoSanPham(arr) {
        const _result = arr.map((e) => {
            return (
                <TableRow hover>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.Donvi}</TableCell>
                    <TableCell>{e.price}</TableCell>
                    <TableCell>{e.amount}</TableCell>
                </TableRow>
            )
        })

        setLstResult(_result)
    }

    function Hanlde_TimSanPham()
    {
        if(setsearchContent == "")
            return;
        
        
        handleShow();
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            };
    
            fetch("https://phutungserver.herokuapp.com/sanpham/TimKiemSanPham?name="+searchContent,requestOptions)
            .then(res => res.json())
            .then(res =>{
                if(res.success)
                {
                    UpdateKhoSanPham(res.data.reverse());
                    handleClose();   
                }else
                {
                    handleClose();  
                }
            }).catch(e=>
                {
                    alert(e);
                    handleClose();
                }
                );
    }

    function Refresh()
    {
        handleShow();
        setMessLoading("Đang Tải Thông Tin Sản Phẩm !"); 
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        fetch("https://phutungserver.herokuapp.com/sanpham/ToanBoSanPham",requestOptions)
        .then(res => res.json())
        .then(res =>{
            if(res.success)
            {
                UpdateKhoSanPham(res.data);
                handleClose();   
            }else
            {
                handleClose();  
            }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Kho Hàng! ");

                handleClose();
            }
            );
    }

    useEffect(()=>{
       Refresh();
    },[])

    return (
        <section className="khohang-container">
            <div className="khohang-container__content">
                <h2 className="header-title">Kho Hàng</h2>

                <div
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <input
                    value={searchContent}
                    onChange={e=>{setsearchContent(e.target.value)}}
                        style={{
                            width: 400,
                            height: 50,
                            marginLeft: 100,
                            padding: 10,
                        }}
                        type="text"
                        name="name"
                        placeholder="Nhập Tên Sản Phẩm"
                    />
                    <Button
                        onClick={(e) => Hanlde_TimSanPham()}
                        variant="primary"
                        style={{
                            width: 200,
                            marginLeft:30,
                            height:50,
                            padding:10
                        }}
                    >
                        Tìm
                    </Button>
                    <FontAwesomeIcon   
                    style={{marginLeft:40,alignContent:'center',alignSelf:'center',marginTop:60}}
                    onClick={e=>{Refresh()}} color={'green'} size="3x" icon={faSyncAlt}/>
                </div>

                <div className="list-product">
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
                                <TableCell>Đơn Vị</TableCell>
                                <TableCell>Giá Bán</TableCell>
                                <TableCell>Số Lượng</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{lstResult}</TableBody>
                    </Table>
                </TableContainer>
                </div>
            </div>

            <Modal 
             aria-labelledby="contained-modal-title-vcenter"
             centered
            show={show} onHide={handleClose}>
                <Modal.Body>
                    <Modal.Title>
                        <Spinner
                            animation="border"
                            variant="success"
                            role="status"
                        ></Spinner>
                        {messLoading}
                    </Modal.Title>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default KhoHang
