import React, { useState, useEffect, useRef } from 'react'

import { Modal, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import resources from '../../../resource/color/ColorApp'
import { TextField } from '@material-ui/core'
import NetWorking from '../../../networking/fetchWithTimeout'
import Button from '@material-ui/core/Button'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PrintedDonHang from '../../Print/PrintedDonHang'
import { Autocomplete } from '@material-ui/lab'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

var _arrKhachHang = []
var _arrDonHang = []

function TienVietNam(input) {
    var x = parseInt(input)
    x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    return x
}

function LichSuGiaoDich() {
    const [lstResult, setResult] = useState()
    const [totalBill, setTotalBill] = useState(30)
    //const [startDate, setStartDate] = useState(new Date());
    const [messLoading, setMessLoading] = useState('')
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    var stt = 0

    const [state, setState] = useState({
        DateTimKiem: '',
        TenTimKiem: '',
        SanPhamTimKiem: '',
        ValueTen: '',
        ValueSanPham: '',
    })

    const {
        DateTimKiem,
        TenTimKiem,
        SanPhamTimKiem,
        ValueTen,
        ValueSanPham,
    } = state
    const [lstSuggestSanPham, SetlstSuggestSanPham] = useState([])
    const [lstSuggestTenKhach, SetlstSuggestTenKhach] = useState([])

    const componentRef = useRef(null)

    function FetchToanBoKhachHang() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL =
            'https://phutungserver.herokuapp.com/khachhang/ToanBoKhachHang'
        NetWorking(_URL, requestOptions, 10000)
            .then((res) => {
                if (res.success) {
                    _arrKhachHang = res.data
                    SetlstSuggestTenKhach(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày (Danh Sach SP)! :' + e)
            })
    }

    function OnStart() {
        FectchToanBoSanPham()
        FetchToanBoKhachHang()
    }

    function FectchToanBoSanPham() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL = 'https://phutungserver.herokuapp.com/sanpham/ToanBoSanPham'
        NetWorking(_URL, requestOptions, 10000)
            .then((res) => {
                if (res.success) {
                    SetlstSuggestSanPham(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày (Danh Sach SP)! :' + e)
            })
    }

    function FindItemBySanPham(nameSP) {
        var _arrResult = []
        for (var j = 0; j < _arrDonHang.length; j++) {
            if (_arrDonHang[j].lstSanPham == undefined) return

            for (var i = 0; i < _arrDonHang[j].lstSanPham.length; i++) {
                if (nameSP == _arrDonHang[j].lstSanPham[i].name) {
                    _arrResult.push(_arrDonHang[j])
                    break
                }
            }
        }
        return _arrResult
    }

    function FindItemByTenKhach(nameTenKhach) {
        var _arrResult = []
        for (var j = 0; j < _arrDonHang.length; j++) {
            if (_arrDonHang[j].TenKhach == undefined) return

            if (nameTenKhach == _arrDonHang[j].TenKhach)
                _arrResult.push(_arrDonHang[j])
        }
        return _arrResult
    }

    //const [date,setDateChoosee] = useState(new Date().getDay()+"-"+new Date().getMonth+"-"+new Date().getFullYear());
    useEffect(() => {
        setMessLoading(' Đang Tải Thông Tin Đơn Hàng!')
        var _date = new Date()
        var _dateDefault =
            _date.getFullYear() +
            '-' +
            (_date.getMonth() + 1 > 9
                ? _date.getMonth() + 1
                : '0' + (_date.getMonth() + 1)) +
            '-' +
            (_date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate())
        OnRefresh(_dateDefault)
        setState({ ...state, DateTimKiem: _dateDefault })
        OnStart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [stateModal, setStateModal] = useState({
        open: false,
        itemSelected: null,
    })

    function handleClickPrint(item) {
        setStateModal({ ...stateModal, open: true, itemSelected: item })
    }

    const RenderDonHangTrongNgay = (arr) => {
        var _total = 0
        const _result = arr.map((e) => {
            _total += 1
            return ItemDonHang(e, handleClickPrint)
        })
        setTotalBill(_total)
        setResult(_result)
    }

    const ItemDonHang = (props, action) => {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>
                    {props.Date} {props.TimeOfDay}
                </TableCell>
                <TableCell>{props.TenKhach}</TableCell>
                <TableCell>{TienVietNam(props.ThanhTien)}</TableCell>
                <TableCell>
                    <List
                        component="nav"
                        aria-label="secondary mailbox folders"
                    >
                        {props.lstSanPham.map((e) => {
                            return (
                                <ListItem onClick={(e) => {}} button>
                                    {e.name} x{e.soluongBan}
                                </ListItem>
                            )
                        })}
                    </List>
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() => {
                            action(props)
                        }}
                        variant="contained"
                        color="primary"
                    >
                        In Đơn Hàng Này
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function OnRefresh(dateCurrent) {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL =
            'https://phutungserver.herokuapp.com/donhang/DonHangTheoNgay?date=' +
            dateCurrent
        NetWorking(_URL, requestOptions, 10000)
            .then((res) => {
                handleClose()
                if (res.success) {
                    console.log(res)
                    _arrDonHang = res.data
                    RenderDonHangTrongNgay(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
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
            <div>
                <h1
                    style={{
                        textAlign: 'center',
                        paddingRight: 200,
                        color: resources.colorPrimary,
                    }}
                >
                    Lịch Sử Giao Dịch
                </h1>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <TextField
                    variant="outlined"
                    id="date"
                    label="Ngày Muốn Xem"
                    type="date"
                    style={{
                        width: 200,
                        marginLeft: 30,
                        height: 50,
                        color: resources.colorPrimary,
                        alignSelf: 'flex-start',
                    }}
                    onChange={(e) => {
                        setState({ ...state, DateTimKiem: e.target.value })
                        OnRefresh(e.target.value)
                    }}
                    value={DateTimKiem}
                />

                <Autocomplete
                    freeSolo={true}
                    id="box-TenKhach"
                    options={lstSuggestTenKhach}
                    getOptionLabel={(option) => option.Name}
                    style={{ width: 200 }}
                    inputValue={ValueTen}
                    onInputChange={(event, newInputValue) => {
                        setState({ ...state, ValueTen: newInputValue })
                        if (newInputValue !== null) {
                            var arr = FindItemByTenKhach(newInputValue)
                            RenderDonHangTrongNgay(arr)
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            value={TenTimKiem}
                            onChange={(e) => {
                                setState({
                                    ...state,
                                    TenTimKiem: e.target.value,
                                })
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                }
                            }}
                            style={{
                                height: 50,
                                width: 200,
                                marginLeft: 20,
                                fontSize: 14,
                                paddingLeft: 5,
                            }}
                            placeholder="Tên Khách"
                            variant="outlined"
                        />
                    )}
                />

                <Autocomplete
                    freeSolo={true}
                    id="box-SanPham"
                    options={lstSuggestSanPham}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 200 }}
                    inputValue={ValueSanPham}
                    onInputChange={(e, newValue) => {
                        setState({ ...state, ValueSanPham: newValue })
                        if (newValue != null)
                            var arr = FindItemBySanPham(newValue)
                        RenderDonHangTrongNgay(arr)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // value={ValueSanPham}
                            // onChange={e=>{
                            //     setState({...state,SanPhamTimKiem:e.target.value});
                            // }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                }
                            }}
                            style={{
                                height: 50,
                                width: 200,
                                marginLeft: 20,
                                fontSize: 14,
                                paddingLeft: 5,
                            }}
                            placeholder="Tên Sản Phẩm"
                            variant="outlined"
                        />
                    )}
                />
                {/* <Button
                style={{width:150,height:50,backgroundColor:resources.colorPrimary,marginLeft:40}}
                >
                    Tìm 
                </Button> */}
            </div>
            <h4
                style={{
                    color: 'red',
                    paddingRight: 20,
                    marginTop: 20,
                    textAlign: 'center',
                    width: '100%',
                    alignSelf: 'center',
                }}
            >
                Tổng Số Đơn: {totalBill}
            </h4>
            <TableContainer
                style={{
                    marginTop: 20,
                    maxHeight: '550px',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Thời Gian Giao Dịch</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Tổng Tiền</TableCell>
                            <TableCell>Danh Sách Sản Phẩm</TableCell>
                            <TableCell>Điều Chỉnh</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{lstResult}</TableBody>
                </Table>
            </TableContainer>

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
                size="lg"
                show={stateModal.open}
            >
                <Modal.Body>
                    <PrintedDonHang
                        ref={componentRef}
                        item={stateModal.itemSelected}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <ReactToPrint
                        trigger={() => <Button>In</Button>}
                        content={() => componentRef.current}
                    />
                    <Button
                        onClick={(e) => {
                            setStateModal({ ...stateModal, open: false })
                        }}
                    >
                        Huỷ Bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default LichSuGiaoDich
