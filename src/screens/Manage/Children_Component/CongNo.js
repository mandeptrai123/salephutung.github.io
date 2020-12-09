import React, { useState, useEffect } from 'react'

//import component
import { Modal, Button, Spinner } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
// import css
import '../css/Manage.css'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import resources from '../../../resource/color/ColorApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'

let SDTSelected
var arr_KhachHang = []

function CongNo() {
    const SDTNV = useSelector((state) => state.SDTNV)
    const PassLogin = useSelector((state) => state.Pass)

    const [lstResult, setResult] = useState()
    const [totalCongNo, setTotalCongNo] = useState(0)

    const [messLoading, setMessLoading] = useState(
        ' Đang Lấy Thông Tin Khách Hàng!'
    )
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showDieuChinh, setShowDieuChinh] = useState(false)

    const handleCloseDieuChinh = () => setShowDieuChinh(false)
    //const handleShowDieuChinh = () => setShowDieuChinh(true);

    const [messResponse, setMessResponse] = useState('')
    const [showResponse, setShowResponse] = useState(false)

    const [stateModalDieuChinh, setStateModalDieuChinh] = useState({
        openDieuChinh: false,
        CongNoCu: 0,
        CongNoMoi: '',
        Pass: '',
    })
    const { openDieuChinh, CongNoCu, CongNoMoi, Pass } = stateModalDieuChinh

    const [congnoMoi, setcongnoMoi] = useState()

    const [showModalXemGiaoDich, setShowModalXemGiaoDich] = useState(false)

    // const [disableUpdate, setDisableUpdate] = useState(false)

    function ItemCongNo(e) {
        var props = e.data
        const [isDisableUpdate, setIsDisableUpdate] = useState(false)
        return (
            <TableRow>
                <TableCell>{e.soThuTu}</TableCell>
                <TableCell>{props.SDT}</TableCell>
                <TableCell>{props.Name}</TableCell>
                <TableCell>
                    <input
                        value={props.DiaChi}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: isDisableUpdate ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: isDisableUpdate
                                ? '1px solid black'
                                : 'none',
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={props.Congno}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: isDisableUpdate ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: isDisableUpdate
                                ? '1px solid black'
                                : 'none',
                        }}
                    />
                </TableCell>
                <TableCell
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        variant={isDisableUpdate ? 'success' : 'primary'}
                        onClick={(e) => {
                            // SDTSelected = props.SDT
                            // setStateModalDieuChinh({
                            //     ...stateModalDieuChinh,
                            //     openDieuChinh: true,
                            // })
                            setIsDisableUpdate(!isDisableUpdate)
                        }}
                        style={{
                            width: '120px',
                            height: '40px',
                            fontSize: '14px',
                            marginBottom: '0',
                            marginRight: '5px',
                            // backgroundColor: resources.colorPrimary,
                        }}
                    >
                        {isDisableUpdate ? 'Xong' : 'Cập nhật'}
                    </Button>
                    <Button
                        variant="info"
                        onClick={() => {
                            setShowModalXemGiaoDich(true)
                        }}
                    >
                        Xem Lịch Sử
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function ModalXemGiaoDich() {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalXemGiaoDich}
                onHide={() => setShowModalXemGiaoDich(false)}
            >
                <Modal.Header closeButton>
                    <h5>Lịch Sử Giao Dịch</h5>
                </Modal.Header>
                <Modal.Body>
                    <TableContainer
                        style={{
                            maxHeight: '500px',
                            width: '100%',
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ngày</TableCell>
                                    <TableCell>Thời Gian Trong Ngày</TableCell>
                                    <TableCell>Tổng Tiền</TableCell>
                                    <TableCell>Danh Sách Sản Phẩm</TableCell>
                                    <TableCell>Công Nợ Hoá Đơn </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody></TableBody>
                        </Table>
                    </TableContainer>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowModalXemGiaoDich(false)
                        }}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    useEffect(() => {
        OnFresh()
    }, [])

    function OnFresh() {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(
            'https://phutungserver.herokuapp.com/khachhang/ToanBoKhachHang',
            requestOptions
        )
            .then((res) => res.json())
            .then((res) => {
                handleClose()
                if (res.success) {
                    arr_KhachHang = res.data
                    RenderCongNo(res.data)
                } else {
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Công Nợ! ')
                handleClose()
            })
    }

    function RenderCongNo(arr) {
        var _congno = 0
        var stt = 0
        setResult(
            arr.map((e) => {
                _congno += parseInt(e.Congno)
                stt++
                return <ItemCongNo data={e} soThuTu={stt} />
            })
        )
        setTotalCongNo(TienVietNam(_congno))
    }
    function TienVietNam(input) {
        var x = parseInt(input)
        x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        return x
    }

    function CapNhatCongNoMoi() {
        if (PassLogin != Pass) {
            setMessLoading('Mật Khẩu Không Chính Xác !')
            handleShow()
            return
        }

        handleCloseDieuChinh(false)
        setMessLoading('Đang Cập Nhật Công Nợ Mới !')
        handleShow()
        var _d = new Date()
        var _time = _d.getHours() + ':' + _d.getMinutes()
        var itemRequest = {
            SDTKhach: SDTSelected,
            SDTNV: SDTNV,
            Congno: parseInt(CongNoMoi),
            Pass: Pass,
            Time: _time,
        }
        console.log(JSON.stringify(itemRequest))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemRequest),
        }

        fetch(
            'https://phutungserver.herokuapp.com/khachhang/CapNhatCongNo',
            requestOptions
        )
            .then((res) => res.json())
            .then((res) => {
                handleClose()
                setMessResponse(res.mess)

                setStateModalDieuChinh({
                    ...stateModalDieuChinh,
                    openDieuChinh: false,
                    CongNoMoi: '',
                    Pass: '',
                })
                setShowResponse(true)
            })
            .catch((e) => {
                alert('Có Lỗi Khi Cập Nhật Công Nợ! ')
                handleClose()
            })
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
            <ModalXemGiaoDich />
            <h1
                style={{
                    textAlign: 'center',
                    paddingRight: 200,
                    color: resources.colorPrimary,
                }}
            >
                Toàn Bộ Công Nợ
            </h1>
            <FontAwesomeIcon
                style={{ position: 'absolute', right: 100, top: 10 }}
                onClick={(e) => {
                    OnFresh()
                }}
                color={resources.colorPrimary}
                size="3x"
                icon={faSyncAlt}
            />
            <TextField
                style={{
                    width: '100%',
                    margin: '10px 0',
                }}
                id="outlined-basic"
                label="Tìm kiếm theo tên khách hàng"
                variant="outlined"
                onChange={(event) => {
                    const textSearch = event.target.value.toLowerCase()
                    const regex = new RegExp(textSearch)

                    var stt = 0
                    setResult(
                        arr_KhachHang.map((e) => {
                            if (regex.test(e.Name.toLowerCase())) {
                                stt++
                                return <ItemCongNo data={e} soThuTu={stt} />
                            }
                        })
                    )
                }}
            />

            <TableContainer
                style={{
                    marginTop: 20,
                    maxHeight: '500px',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Tổng Công Nợ</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{lstResult}</TableBody>
                </Table>
            </TableContainer>
            <div style={{ paddingRight: 200, marginTop: 30 }}>
                <h4 style={{ textAlign: 'center' }}>Tổng Công Nợ</h4>
                <h3 style={{ textAlign: 'center', color: 'red' }}>
                    {totalCongNo}
                </h3>
            </div>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
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
                backdrop="static"
                show={showResponse}
            >
                <Modal.Body>
                    <Modal.Title>{messResponse}</Modal.Title>
                    <Modal.Footer>
                        <Button
                            onClick={(e) => {
                                setShowResponse(false)
                                OnFresh()
                            }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                show={openDieuChinh}
            >
                <Modal.Title
                    style={{
                        color: 'red',
                        fontWeight: 'bold',
                        padding: 10,
                        fontSize: 15,
                    }}
                >
                    "Lưu Ý: Hoạt Động Này Sẽ Được Ghi Vào Nhật Ký !"
                </Modal.Title>

                <Modal.Body>
                    <div style={{ width: '50%' }}>
                        <TextField
                            variant="outlined"
                            placeholder="Công Nợ Mới"
                            style={{
                                width: 200,
                                height: 50,
                                marginLeft: 40,
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                            value={CongNoMoi}
                            onChange={(e) => {
                                setStateModalDieuChinh({
                                    ...stateModalDieuChinh,
                                    CongNoMoi: e.target.value,
                                })
                            }}
                        />
                        <TextField
                            type="password"
                            variant="outlined"
                            placeholder="Mật Khẩu Đăng Nhập"
                            onChange={(e) => {
                                setStateModalDieuChinh({
                                    ...stateModalDieuChinh,
                                    Pass: e.target.value,
                                })
                            }}
                            style={{
                                width: 200,
                                height: 50,
                                marginLeft: 40,
                                marginTop: 5,
                            }}
                            value={Pass}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={(e) => {
                            CapNhatCongNoMoi()
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={(e) => {
                            setStateModalDieuChinh({
                                ...stateModalDieuChinh,
                                openDieuChinh: false,
                            })
                        }}
                    >
                        Huỷ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CongNo
