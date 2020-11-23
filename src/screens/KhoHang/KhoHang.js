import React, { useState ,useEffect} from 'react'
import './css/KhoHang.css'
//import component
import { Button, Modal, Spinner } from 'react-bootstrap'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import resources from '../../resource/color/ColorApp';

import NetWorking from '../../networking/fetchWithTimeout';
import {TextField} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';
import _ from 'lodash';

var arr_KhoHang = [];

var ID = 0;

function KhoHang() {

     const [lstSanPham,setLstSanPham] = useState([]);
    const [searchContent,setsearchContent] = useState("");

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState("");
    const [lstResult, setLstResult] = useState()
    const [valueSearchContent, setvalueSearchContent] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showDieuChinh,setDieuChinh] = useState(false);

    const [GiaTriMoi,setGiaTriMoi] = useState("");

    function UpdateKhoSanPham(arr) {
        const _result = arr.map((e) => {
            return (
                <TableRow hover>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>{e.Donvi}</TableCell>
                    <TableCell>{e.price}</TableCell>
                    <TableCell>{e.amount}</TableCell>
                    <TableCell>{e.NhaCC}</TableCell>
                    <TableCell>{e.amountAlert}</TableCell>
                    <TableCell>
                        <Button
                        style={{fontSize:14}}
                        variant="success"
                        onClick={e=>{
                            ID = 2;
                            //setDieuChinh(true);
                        }}
                        >
                            Thêm SL
                        </Button>
                        <Button

                         onClick={e=>{
                            ID = 1;
                            //setDieuChinh(true);
                        }}
                        style={{fontSize:14,marginLeft:20}}
                        variant="success"
                        >
                            Sửa Giá Bán
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })

        setLstResult(_result)
    }

    function Refresh()
    {
        setMessLoading("Đang Tải Thông Tin Sản Phẩm !"); 

        handleShow();
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };
        let _URL = "https://phutungserver.herokuapp.com/sanpham/ToanBoSanPham";
        NetWorking(_URL,requestOptions,10000)
        .then(res =>{
            handleClose(); 
            if(res.success)
            {
                arr_KhoHang = res.data;
                setLstSanPham(res.data);
                UpdateKhoSanPham(res.data);
            }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Kho Hàng! ");
                handleClose();
            }
            );
    }

    function HanldGiaTriMoi()
    {
        if(ID == 1)
        {
            CapNhatGiaBanMoi(Name,GiaTriMoi);

        }else if(ID == 2)
        {
            CapNhatSLMoi(Name,GiaTriMoi);
        }
    }

    function CapNhatSLMoi(_name,_amount)
    {
        var _item = {
            name:_name,
            amount:_amount
        }
         
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:
            JSON.stringify(_item)               
            
        };
        let _URL = "https://phutungserver.herokuapp.com/sanpham/CapNhatSLSanPham";
        NetWorking(_URL,requestOptions,10000)
        .then(res =>{
            handleClose(); 
            if(res.success)
            {
               
            }
        }).catch(e=>
            {
                handleClose();
            });
    }

    function CapNhatGiaBanMoi(_name,_price)
    {
        var _item = {
            name:_name,
            price:_price
        }
         
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:
            JSON.stringify(_item)               
            
        };
        let _URL = "https://phutungserver.herokuapp.com/sanpham/CapNhatGiaBanSanPham";
        NetWorking(_URL,requestOptions,10000)
        .then(res =>{
            handleClose(); 
            if(res.success)
            {
               
            }
        }).catch(e=>
            {
                handleClose();
            });

    }

    function FindProductByName(nameSanPham)
    {
        var arr_result = [];
        _.filter(arr_KhoHang, function(o) { 
            if(o.name == nameSanPham)
                arr_result.push(o);
            })
       
        UpdateKhoSanPham(arr_result);
    }

    useEffect(()=>{Refresh()},[])

    return (
        <section className="khohang-container">
            <div className="khohang-container__content">
                <h2 
                style={{color:resources.colorPrimary}}
                className="header-title">Kho Hàng</h2>

                <div
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <div
                    style={{display:'flex'}}
                    >
                    <Autocomplete
                    
                    id="combo-box-sanpham"
                    freeSolo={true}
                    options={lstSanPham}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400,paddingLeft:5 ,marginLeft:40,marginTop:8}}
                    inputValue={valueSearchContent}
                    onInputChange={(event, newInputValue) => {
                        setvalueSearchContent(newInputValue);
                        setsearchContent(newInputValue);
                        FindProductByName(newInputValue);
                      }}
                    renderInput={(params) => 
                    <TextField {...params} 
                    label="Tên Sản Phẩm Cần Tìm"
                        text={searchContent}
                        onChange={e=>
                        {
                            setsearchContent(e.target.value);
                        }}  
                    variant="outlined" />
                    }
                    
                    />
                    <FontAwesomeIcon   
                    style={{marginLeft:40,alignContent:'center',alignSelf:'center',marginTop:10}}
                    onClick={e=>{Refresh()}} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
                    </div>

                  
                   
                </div>

                <div>
                    <TableContainer
                    style={{
                        height:500,
                        width: '93%',
                        marginTop:40,
                        marginLeft:30,
                        marginRight:30
                    }}
                >
                    <Table 
                    stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow
                            style={{fontSize:8}}
                            >
                                <TableCell>Tên Sản Phẩm</TableCell>
                                <TableCell>Đơn Vị</TableCell>
                                <TableCell>Giá Bán Lẻ</TableCell>
                                <TableCell>Số Lượng Hiện Tại</TableCell>
                                <TableCell>Nhà Cung Cấp</TableCell>
                                <TableCell>SL Báo Động</TableCell>
                                <TableCell>Điều Chỉnh</TableCell>
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


            <Modal 
             aria-labelledby="contained-modal-title-vcenter"
             centered
             show={showDieuChinh}
            >
                <Modal.Body>
                   <TextField
                   style={{width:200}}
                    placeholder="Giá Trị Mới"
                    value={GiaTriMoi}
                    onChange={e=>{
                        setGiaTriMoi(e.target.value);
                    }}
                   />

                </Modal.Body>
                <Modal.Footer>
                    <Button
                    onCLick={e=>{
                        HanldGiaTriMoi();
                    }}
                    >
                        Thay Đổi
                    </Button>
                </Modal.Footer>
            </Modal>


         
        </section>
        
       
    )
}

export default KhoHang
