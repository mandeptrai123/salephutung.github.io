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

//import component

function BaoCaoDoanhThu(props) {
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

    const [lstResult, setResult] = useState()

    useEffect(() => {
        const _result = arr.map((e) => {
            return ItemDonHang(e)
        })

        setResult(_result)
    }, [])

    var stt = 0
    function ItemDonHang(props) {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.name}</TableCell>
            </TableRow>
        )
    }

    return (
        <section className="baocao-container">
            <header className="baocao-header">
                <h1 className="title-baocao">Báo Cáo Doanh Thu</h1>
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
                                height: '60px',
                            }}
                        >
                            Doanh thu tháng này
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                href="#/action-1"
                                style={{
                                    fontSize: '20px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu tháng này
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#/action-1"
                                style={{
                                    fontSize: '20px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu tháng này
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#/action-1"
                                style={{
                                    fontSize: '20px',
                                    width: '230px',
                                    height: '60px',
                                }}
                            >
                                Doanh thu tháng này
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button
                        variant="outline-info"
                        style={{
                            fontSize: '20px',
                            width: '150px',
                            height: '60px',
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
                        textAlign: 'center',
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
