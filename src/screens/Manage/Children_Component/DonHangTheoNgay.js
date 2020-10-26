import React, { useState, useEffect } from 'react'

import { Modal, Button, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import resources from '../../../resource/color/ColorApp';
import {TextField, unstable_createMuiStrictModeTheme} from '@material-ui/core';


function TienVietNam(input)
    {

        var x = new Number(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
    }


function DonHangTheoNgay() {
    const [lstResult, setResult] = useState()
    const [totalBill, setTotalBill] = useState(30)
    const [startDate, setStartDate] = useState(new Date());
    const [messLoading, setMessLoading] = useState(" Đang Tải Thông Tin Đơn Hàng!");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [date,setDateChoosee] = useState(new Date().getDay()+"-"+new Date().getMonth+"-"+new Date().getFullYear());

    var stt = 0;
    function ItemDonHang(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.Date} {props.TimeOfDay}</TableCell>
                <TableCell>{props.TenKhach}</TableCell>
                <TableCell>{TienVietNam(props.TongTien)}</TableCell>
                <TableCell>{TienVietNam(props.ThanhTien)}</TableCell>
                <TableCell>{TienVietNam(props.Congno)}</TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
        var _date = new Date();
        OnRefresh(_date.getFullYear()+"-"+_date.getMonth()>9?_date.getMonth():"0"+_date.getMonth()+"-"+_date.getDate()>9?_date.getDate():"0"+_date.getDate());

    },[]);
    function RenderDonHangTrongNgay(arr)
    {
        var _total = 0;
        const _result = arr.map((e) => {
            _total +=1;
            return ItemDonHang(e)
        })
        setTotalBill(_total);
        setResult(_result)
    }


    function OnRefresh(dateCurrent)
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?date="+dateCurrent,requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
           if(res.success)
           {
            RenderDonHangTrongNgay(res.data);
           }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Đơn Hàng Trong Ngày ! ");
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
            <div>
            <h1
                style={{
                    textAlign: 'center',
                    paddingRight:200,
                    color:resources.colorPrimary
                }}
            >
                Xem Đơn Hàng Theo Ngày
            </h1>

            
            </div>
            <TextField
                    id="date"
                    label="Ngày Muốn Xem"
                    type="date"
                    style={{
                        color: resources.colorPrimary,
                        paddingRight:200,margin:20,marginBottom:20}}
                    onChange={e=>{
                        OnRefresh(e.target.value);
                    }}
                    InputLabelProps={{
                    shrink: true,
                    }}
  />
            <h4
                style={{
                    color: 'red',
                    paddingRight:200,
                    textAlign: 'center',
                    width: '100%',
                    alignSelf: 'center',
                }}
            >
                Tổng Số Đơn: {totalBill}
            </h4>

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
                            <TableCell>Thời Gian</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Tổng Tiền</TableCell>
                            <TableCell>Thành Tiền</TableCell>
                            <TableCell>Còn Nợ</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{lstResult}</TableBody>
                </Table>
            </TableContainer>

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
                
        </div>
    )
}

export default DonHangTheoNgay;
