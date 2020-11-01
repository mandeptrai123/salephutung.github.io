import React, { useState, useEffect } from 'react'
import './css/BaoCaoDoanhThu.css'

//import component react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
// import Table from 'react-bootstrap/Table'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import resources from '../../../../resource/color/ColorApp';

//import component



function TienVietNam(input)
    {

        var x = new Number(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
    }



function BaoCaoDoanhThu(props) {
   
    const [lstResult, setResult] = useState()
    const [viewModeDropdown, setviewModelDropdown] = useState("Doanh Thu 7 Ngày Gần Đây");


    const [messLoading, setMessLoading] = useState(" Đang Lấy Thông Tin Khách Hàng!");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
       
    }, [])

    var stt = 0
    function ItemDonHang(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.TenKhach}</TableCell>
                <TableCell>{props.ThanhTien}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.name}</TableCell>
            </TableRow>
        )
    }

    function RenderBaoCaoDoanhThu(arr)
    {
        const _result = arr.map((e) => {
            return ItemDonHang(e)
        })
        setResult(_result)
    }

    function handleDropDown(stt)
    {
        switch(stt)
        {
            case 0:
                setviewModelDropdown("Doanh Thu Ngày Hôm Nay");
                LoadDoanhThuHomNay();
                break;
            case 1:
                setviewModelDropdown("Doanh Thu 7 Ngày Gần Đây");
                LoadDoanhThuTheoTuan();
                break;
            case 2:
                setviewModelDropdown("Doanh Thu Tháng Này");
                LoadDoanhThuThangNay();
                break;
            case 3:
                setviewModelDropdown("Doanh Thu Tháng Trước");
                LoadDoanhThuThangTruoc();
                break;
            case 4:
                setviewModelDropdown("Doanh Thu Năm Nay");
                LoadDoanhThuNamNay();
                break;
        }
    }

    function XuLyDuHoaDonThanhSanPham(arr)
    {
         var arrSanPham = [];
        // arr.map(e=>{
        //     e.lstSanPham.map(i=>{
        //         if(arrSanPham.findIndex(item=>{item._id == i._id}) > -1 )
        //         {
        //             arrSanPham[arrSanPham.findIndex(item=>{item._id == i._id})].soluongMua += new Number(i.SoLuongBan);
        //         }else
        //         {
        //             arrSanPham.push(
        //                 {
        //                     _id:i.id,
        //                     TenSanPham:i.name,
        //                     soluongMua:i.soluongBan
        //                 }) 
        //         }
        //     })
        // })
        // return arrSanPham;

    }

    function LoadDoanhThuNamNay()
    {
        var _d = new Date();
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoNam?Year="+_d.getFullYear(),requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
               RenderBaoCaoDoanhThu(res.data);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Báo Cáo Doanh Thu! ");

                handleClose();
            });
    }

    function LoadDoanhThuThangNay()
    {
        var _d = new Date();
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoThang?Month="+_d.getMonth(),requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
               var arrSP = XuLyDuHoaDonThanhSanPham(res.data);
               RenderBaoCaoDoanhThu(arrSP);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Báo Cáo Doanh Thu! ");

                handleClose();
            });
    }
    function LoadDoanhThuThangTruoc()
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        var _d = new Date().getMonth();
        _d-=1;
        if(_d == -1)
            _d = 11;

        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoThang?Month="+_d,requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
               RenderBaoCaoDoanhThu(res.data);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Báo Cáo Doanh Thu! ");

                handleClose();
            });
    }

    function LoadDoanhThuTheoTuan()
    {
        // handleShow();
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json'}
        // };

        // fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?dateofMonth="+_d.getDate(),requestOptions)
        // .then(res => res.json())
        // .then(res =>{
        //     handleClose();
        //    if(res.success)
        //    {
        //        RenderCongNo(res.data);
        //    }
        // }).catch(e=>
        //     {
        //         alert("Có Lỗi Ở Báo Cáo Doanh Thu! ");

        //         handleClose();
        //     });
    }

    function LoadDoanhThuHomNay()
    {
        var _d = new Date();
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };
        alert(_d.getDate())
        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?dateofMonth="+_d.getDate(),requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
               RenderBaoCaoDoanhThu(res.data);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Báo Cáo Doanh Thu! "+e);
                handleClose();
            });
    }

    return (
        <section className="baocao-container">
            <header className="baocao-header">
                <h1
                style={{paddingRight:200,color:resources.colorPrimary}}
                className="title-baocao">Báo Cáo Doanh Thu</h1>
            </header>
            <Row md={12} className="baocao-container__content">
                <Col md={6} className="baocao-container__content-left">
                    <Checkbox
                        txtLabel="Xếp Theo Số Lượng Bán Nhiều Nhất"
                        idCheck="mathang"
                    />
                    <Checkbox
                        txtLabel="Xếp Theo Mặt Hàng Có Doanh Thu Cao Nhất"
                        idCheck="soluong"
                    />
                </Col>
                <Col
                    md={6}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="info"
                            id="dropdown-basic"
                            style={{
                                width: '230px',
                                height: '50px',
                                backgroundColor:resources.colorPrimary
                            }}
                        >
                            {viewModeDropdown}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                        <Dropdown.Item
                                onClick={e=>handleDropDown(0)}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu ngày hôm nay
                            </Dropdown.Item>
                        <Dropdown.Item
                                onClick={e=>handleDropDown(1)}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu 7 ngày gần đây
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={e=>handleDropDown(2)}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu tháng này
                            </Dropdown.Item>
                            <Dropdown.Item
                             onClick={e=>handleDropDown(3)}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu tháng trước
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={e=>handleDropDown(4)}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu năm nay
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        variant="outline-info"
                        style={{
                            fontSize: '20px',
                            width: '150px',
                            height: '50px',
                            backgroundColor:resources.colorPrimary,
                            color:resources.colorText
                        }}
                    >
                        Xem
                    </Button>
                </Col>
            </Row>
            <section className="table-content">
                <h4
                    style={{
                        color: 'red',
                        textAlign: 'left',
                    }}
                >
                    Bạn đang xem doanh thu tháng 9/2020
                </h4>
                <TableContainer
                    style={{
                        maxHeight: '470px',
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Top</TableCell>
                                <TableCell>Tên Sản Phẩm</TableCell>
                                <TableCell>Số Lượng Bán Được</TableCell>
                                <TableCell>Số Lượng Khách Mua</TableCell>
                                <TableCell>Doanh Thu</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{lstResult}</TableBody>
                    </Table>
                </TableContainer>
            </section>
        </section>
    )
}

export default BaoCaoDoanhThu

function Checkbox(props) {
    return (
        <div className="input-chekbox">
            <label
                for={props.idCheck}
                style={{
                    fontSize: '18px',
                    margin: '5px 0',
                    textAlign: 'center',
                }}
            >
                {props.txtLabel}
            </label>
            <input
                type="checkbox"
                id={props.idCheck}
                style={{
                    width: '20px',
                    height: '20px',
                    marginLeft: '20px',
                }}
            />
        </div>
    )
}