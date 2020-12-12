import React, { useState, useEffect } from 'react'
import './css/BaoCaoDoanhThu.css'

//import component react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { Row, Col, Modal, Spinner } from 'react-bootstrap'
// import Table from 'react-bootstrap/Table'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import resources from '../../../../resource/color/ColorApp'
import NetWorking from '../../../../networking/fetchWithTimeout'

import { Snackbar, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function BaoCaoDoanhThu(props) {
    const [lstResult, setResult] = useState()
    const [viewModeDropdown, setviewModelDropdown] = useState(
        'Doanh Thu 7 Ngày Gần Đây'
    )

    // const [messLoading, setMessLoading] = useState(" Đang Lấy Thông Tin Khách Hàng!");
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [stateSnackbar, setStateSnackbar] = useState({
        openSnackbar: false,
        messSnackbar: '',
        isSuccess: false,
    })

    const { openSnackbar, messSnackbar, isSuccess } = stateSnackbar

    const [dateViewProduct, setDateViewProduct] = useState()

    const URL_GET_DOANHTHU = 'https://phutungserver.herokuapp.com/doanhthu/'

    //State để hiện thị ngày thàng năm của doanh thu đang xem trên UI
    const [viewDoanhThuMonthYear, setViewDoanhThuMonthYear] = useState('')

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
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.name}</TableCell>
            </TableRow>
        )
    }

    function RenderBaoCaoDoanhThu(arr) {
        const _result = arr.map((e) => {
            return ItemDonHang(e)
        })
        setResult(_result)
    }

    // function handleDropDown(stt) {
    //     switch (stt) {
    //         case 0:
    //             setviewModelDropdown('Doanh Thu Ngày Hôm Nay')
    //             LoadDoanhThuHomNay()
    //             break
    //         case 1:
    //             setviewModelDropdown('Doanh Thu 7 Ngày Gần Đây')
    //             // LoadDoanhThuTheoTuan()
    //             break
    //         case 2:
    //             setviewModelDropdown('Doanh Thu Tháng Này')
    //             LoadDoanhThuThangNay()
    //             break
    //         case 3:
    //             setviewModelDropdown('Doanh Thu Tháng Trước')
    //             LoadDoanhThuThangTruoc()
    //             break
    //         case 4:
    //             setviewModelDropdown('Doanh Thu Năm Nay')
    //             LoadDoanhThuNamNay()
    //             break
    //         default:
    //             break
    //     }
    // }

    // function XuLyDuHoaDonThanhSanPham(arr) {
    //      var arrSanPham = [];
    //     arr.map(e=>{
    //         e.lstSanPham.map(i=>{
    //             if(arrSanPham.findIndex(item=>{item._id == i._id}) > -1 )
    //             {
    //                 arrSanPham[arrSanPham.findIndex(item=>{item._id == i._id})].soluongMua += new Number(i.SoLuongBan);
    //             }else
    //             {
    //                 arrSanPham.push(
    //                     {
    //                         _id:i.id,
    //                         TenSanPham:i.name,
    //                         soluongMua:i.soluongBan
    //                     })
    //             }
    //         })
    //     })
    //     return arrSanPham;
    // }

    // function LoadDoanhThuNamNay() {
    //     var _d = new Date()
    //     handleShow()
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }

    //     fetch(
    //         'https://phutungserver.herokuapp.com/donhang/DonHangTheoNam?Year=' +
    //             _d.getFullYear(),
    //         requestOptions
    //     )
    //         .then((res) => res.json())
    //         .then((res) => {
    //             handleClose()
    //             if (res.success) {
    //                 RenderBaoCaoDoanhThu(res.data)
    //             }
    //         })
    //         .catch((e) => {
    //             alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')

    //             handleClose()
    //         })
    // }

    // function LoadDoanhThuThangNay() {
    //     var _d = new Date()
    //     handleShow()
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }

    //     fetch(
    //         'https://phutungserver.herokuapp.com/donhang/DonHangTheoThang?Month=' +
    //             _d.getMonth(),
    //         requestOptions
    //     )
    //         .then((res) => res.json())
    //         .then((res) => {
    //             handleClose()
    //             if (res.success) {
    //                 var arrSP = XuLyDuHoaDonThanhSanPham(res.data)
    //                 RenderBaoCaoDoanhThu(arrSP)
    //             }
    //         })
    //         .catch((e) => {
    //             alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')

    //             handleClose()
    //         })
    // }

    // function LoadDoanhThuThangTruoc() {
    //     handleShow()
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }
    //     var _d = new Date().getMonth()
    //     _d -= 1
    //     if (_d === -1) _d = 11

    //     fetch(
    //         'https://phutungserver.herokuapp.com/donhang/DonHangTheoThang?Month=' +
    //             _d,
    //         requestOptions
    //     )
    //         .then((res) => res.json())
    //         .then((res) => {
    //             handleClose()
    //             if (res.success) {
    //                 RenderBaoCaoDoanhThu(res.data)
    //             }
    //         })
    //         .catch((e) => {
    //             alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')

    //             handleClose()
    //         })
    // }

    // function LoadDoanhThuHomNay() {
    //     var _d = new Date()
    //     handleShow()
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }

    //     fetch(
    //         'https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?dateofMonth=' +
    //             _d.getDate(),
    //         requestOptions
    //     )
    //         .then((res) => res.json())
    //         .then((res) => {
    //             handleClose()
    //             if (res.success) {
    //                 RenderBaoCaoDoanhThu(res.data)
    //                 setStateSnackbar({
    //                     ...stateSnackbar,
    //                     openSnackbar: true,
    //                     messSnackbar: 'Bạn Đang Xem Doanh Thu Hôm Nay !',
    //                     isSuccess: true,
    //                 })
    //             }
    //         })
    //         .catch((e) => {
    //             setStateSnackbar({
    //                 ...stateSnackbar,
    //                 isSuccess: false,
    //                 messSnackbar: 'Có Lỗi Ở Báo Cáo Doanh Thu! ' + e,
    //                 openSnackbar: true,
    //             })
    //             handleClose()
    //         })
    // }

    function LoadDoanhThuTheoNgayHoacTuan(date, PAYLOAD) {
        const _itemRequest = {
            Date: date,
        }

        setViewDoanhThuMonthYear(date)

        const optionsRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_itemRequest),
        }
        handleShow()
        NetWorking(URL_GET_DOANHTHU + PAYLOAD, optionsRequest)
            .then((result) => {
                if (result.success) {
                    RenderBaoCaoDoanhThu(result.data)
                }
                handleClose()
            })
            .catch((error) => {
                console.log('Lỗi', error)
                alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')
                handleClose()
            })
    }

    function LoadDoanhThuTheoThang(month) {
        const _itemRequest = {
            Month: month,
        }
        setViewDoanhThuMonthYear(month)

        const optionsRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_itemRequest),
        }
        handleShow()
        NetWorking(URL_GET_DOANHTHU + 'BaoCaoTheoThang', optionsRequest)
            .then((result) => {
                if (result.success) {
                    RenderBaoCaoDoanhThu(result.data)
                }
                handleClose()
            })
            .catch((error) => {
                console.log('Lỗi', error)
                alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')
                handleClose()
            })
    }

    function LoadDoanhThuTheoNam(year) {
        const _itemRequest = {
            Year: year,
        }
        setViewDoanhThuMonthYear(year)

        const optionsRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_itemRequest),
        }
        handleShow()
        NetWorking(URL_GET_DOANHTHU + 'BaoCaoTheoNam', optionsRequest)
            .then((result) => {
                if (result.success) {
                    RenderBaoCaoDoanhThu(result.data)
                }
                handleClose()
            })
            .catch((error) => {
                console.log('Lỗi', error)
                alert('Có Lỗi Ở Báo Cáo Doanh Thu! ')
                handleClose()
            })
    }

    useEffect(() => {
        //Khi vào lịch sử giao dịch thì mặc định cho xem doanh thu hôm nay
        var dateNow = new Date()
        setviewModelDropdown('Doanh Thu Ngày Hôm Nay')
        LoadDoanhThuTheoNgayHoacTuan(
            `${dateNow.getFullYear()}-${
                dateNow.getMonth() + 1
            }-${dateNow.getDate()}`,
            'BaoCaoTheoNgay'
        )
    }, [])

    return (
        <section className="baocao-container">
            <header className="baocao-header">
                <h1
                    style={{ paddingRight: 200, color: resources.colorPrimary }}
                    className="title-baocao"
                >
                    Báo Cáo Doanh Thu
                </h1>
            </header>
            <Row md={12} className="baocao-container__content">
                <Col md={9} className="baocao-container__content-left">
                    <TextField
                        type="date"
                        variant="outlined"
                        label="Xem doanh thu theo ngày"
                        style={{
                            width: '350px',
                        }}
                        onChange={(e) => {
                            var d = new Date(e.target.value)
                            setDateViewProduct(
                                `${d.getFullYear()}-${
                                    d.getMonth + 1
                                }-${d.getDate()}`
                            )
                        }}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                                if (dateViewProduct) {
                                    setviewModelDropdown('Doanh Thu Theo Ngày')
                                    LoadDoanhThuTheoNgayHoacTuan(
                                        dateViewProduct,
                                        'BaoCaoTheoNgay'
                                    )
                                }
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        style={{
                            margin: '0 5px',
                            width: '270px',
                        }}
                        variant="outlined"
                        label="Nhập tháng cần xem doanh thu"
                        // onBlur={(e) => {
                        //     LoadDoanhThuTheoThang(e.target.value)
                        // }}
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                                LoadDoanhThuTheoThang(e.target.value)
                            }
                        }}
                    />
                    <TextField
                        style={{
                            width: '250px',
                        }}
                        variant="outlined"
                        label="Nhập năm cần xem doanh thu"
                        onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                                LoadDoanhThuTheoNam(e.target.value)
                            }
                        }}
                    />
                </Col>
                <Col md={3}>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="info"
                            id="dropdown-basic"
                            style={{
                                width: '230px',
                                dislay: 'flex',
                                alignItems: 'center',
                                height: '50px',
                                backgroundColor: resources.colorPrimary,
                            }}
                        >
                            {viewModeDropdown}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={(e) => {
                                    var dateNow = new Date()
                                    setviewModelDropdown(
                                        'Doanh Thu Ngày Hôm Nay'
                                    )
                                    LoadDoanhThuTheoNgayHoacTuan(
                                        `${dateNow.getFullYear()}-${
                                            dateNow.getMonth() + 1
                                        }-${dateNow.getDate()}`,
                                        'BaoCaoTheoNgay'
                                    )
                                }}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                Doanh thu ngày hôm nay
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(e) => {
                                    var dateNow = new Date()
                                    const milisecondsDay7BeforeDateNow =
                                        dateNow.getTime() - 604800000
                                    //7 ngày trước của ngày hiện tại
                                    const day7BeforeDateNow = new Date(
                                        milisecondsDay7BeforeDateNow
                                    )
                                    console.log(day7BeforeDateNow)
                                    setviewModelDropdown(
                                        'Doanh Thu 7 Ngày Gần Đây'
                                    )
                                    LoadDoanhThuTheoNgayHoacTuan(
                                        `${day7BeforeDateNow.getFullYear()}-${
                                            day7BeforeDateNow.getMonth() + 1
                                        }-${day7BeforeDateNow.getDate()}`,
                                        'BaoCaoTuanNay'
                                    )
                                }}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                Doanh thu 7 ngày gần đây
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(e) => {
                                    setviewModelDropdown('Doanh Thu Tháng Này')
                                    const _d = new Date()
                                    const month = _d.getMonth() //Tháng này
                                    LoadDoanhThuTheoThang(month + 1)
                                }}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                Doanh thu tháng này
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(e) => {
                                    setviewModelDropdown(
                                        'Doanh Thu Tháng Trước'
                                    )
                                    const _d = new Date()
                                    const month = _d.getMonth() //Tháng trước
                                    LoadDoanhThuTheoThang(month)
                                }}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                Doanh thu tháng trước
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(e) => {
                                    setviewModelDropdown('Doanh Thu Năm Nay')
                                    const _d = new Date()
                                    const years = _d.getFullYear() // Năm nay
                                    LoadDoanhThuTheoNam(years)
                                }}
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                            >
                                Doanh thu năm nay
                            </Dropdown.Item>
                            <Dropdown.Item
                                style={{
                                    fontSize: '15px',
                                    width: '230px',
                                    dislay: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                }}
                                onClick={() => {
                                    var dateNow = new Date()
                                    setviewModelDropdown('Doanh Thu Tuần Này')
                                    LoadDoanhThuTheoNgayHoacTuan(
                                        `${dateNow.getFullYear()}-${
                                            dateNow.getMonth() + 1
                                        }-${dateNow.getDate()}`,
                                        'BaoCaoTuanNay'
                                    )
                                }}
                            >
                                Doanh thu tuần này
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <section className="table-content">
                <h4
                    style={{
                        color: 'red',
                        textAlign: 'left',
                    }}
                >
                    Bạn đang xem doanh thu ngày/tháng/năm{' '}
                    {viewDoanhThuMonthYear} , Số Đơn Hàng Tăng : 10
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
                                <TableCell>Chi Phí</TableCell>
                                <TableCell>Doanh Thu</TableCell>
                                <TableCell>Khấu Trừ</TableCell>
                                <TableCell>Lợi Nhuận</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{lstResult}</TableBody>
                    </Table>
                </TableContainer>
            </section>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Body>
                    <Modal.Title style={{ display: 'flex' }}>
                        <Spinner
                            animation="border"
                            variant="success"
                            role="status"
                        ></Spinner>
                        <h3>Đang tải</h3>
                    </Modal.Title>
                </Modal.Body>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => {
                    setStateSnackbar({ ...stateSnackbar, openSnackbar: false })
                }}
            >
                <Alert
                    onClose={() =>
                        setStateSnackbar({
                            ...stateSnackbar,
                            openSnackbar: false,
                        })
                    }
                    severity={isSuccess ? 'success' : 'error'}
                >
                    {messSnackbar}
                </Alert>
            </Snackbar>
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
                onChange={props.onChange}
                onClick={props.onClick}
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
