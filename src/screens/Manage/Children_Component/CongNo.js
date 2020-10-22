import React, { useState, useEffect } from 'react'

//import component
import { Modal, Button, Spinner } from 'react-bootstrap'
// import css
import '../css/Manage.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function CongNo() {
    const [lstResult, setResult] = useState()
    const [totalCongNo, setTotalCongNo] = useState(30)

    var arr = [
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
        {
            Date: '2020/10/20',
            name: 'Man',
            TenKhach: 'Khach Dep Trai',
            SDTKhach: '0969025915',
            LichSuMuaHang: [],
            DiaChi: '12 Nguyễn Văn Bảo',
            Congno: 40000,
        },
    ]

    var stt = 0
    function ItemCongNo(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.Date}</TableCell>
                <TableCell>{props.TenKhach}</TableCell>
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
            return ItemCongNo(e)
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
                Công Nợ Nè
            </h1>
            <h4
                style={{
                    color: 'red',
                    padding: '10px 0',
                    textAlign: 'center',
                    width: '100%',
                    alignSelf: 'center',
                }}
            >
                Tổng Số Đơn: {totalCongNo}
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

export default CongNo
