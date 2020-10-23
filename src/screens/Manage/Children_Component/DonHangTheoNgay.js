import React, { useState, useEffect } from 'react'

import { Modal, Button, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function DonHangTheoNgay() {
    const [lstResult, setResult] = useState()
    const [totalBill, setTotalBill] = useState(30)

    const [messLoading, setMessLoading] = useState(" Đang Tải Thông Tin Đơn Hàng!");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var stt = 0;
    function ItemDonHang(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.Date}</TableCell>
                <TableCell>{props.TenKhach}</TableCell>
                <TableCell>{props.TongTien}</TableCell>
                <TableCell>{props.ThanhTien}</TableCell>
                <TableCell
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                </TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
        var _date = new Date();
        OnRefresh(_date.getDate());

    },[]);
    function RenderDonHangTrongNgay(arr)
    {
        const _result = arr.map((e) => {
            return ItemDonHang(e)
        })

        setResult(_result)
    }

    function OnRefresh(dateCurrent)
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        fetch("https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?dateofMonth="+dateCurrent,requestOptions)
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
            <h1
                style={{
                    textAlign: 'center',
                    paddingRight:200,
                    color:'blue'
                }}
            >
                Xem Đơn Hàng Theo Ngày
            </h1>
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
                            <TableCell></TableCell>
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
