import React, { useState, useEffect } from 'react'

import { Modal, Button, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function DonHangTrongNgay() {
    const [lstResult, setResult] = useState()
    const [totalBill, setTotalBill] = useState(30)

    var arr = [
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969',
            lstSanPham: [],
            TongTien: 50000,
            ThanhTien: 100000,
            Congno: 40000,
        },
    ]
    var stt = 0
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
                    <Button
                        variant="danger"
                        style={{
                            width: '150px',
                            height: '50px',
                            fontSize: '14px',
                            marginBottom: '0',
                        }}
                    >
                        Xem Chi Tiết
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
        const _result = arr.map((e) => {
            return ItemDonHang(e)
        })

        setResult(_result)
    }, [])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1
                style={{
                    textAlign: 'center',
                }}
            >
                Đơn Hàng Trong Ngày
            </h1>
            <h4
                style={{
                    color: 'red',
                    padding: 10,
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
        </div>
    )
}

export default DonHangTrongNgay
