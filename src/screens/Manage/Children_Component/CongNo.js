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
import Dropdown from 'react-bootstrap/Dropdown'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

import resources from '../../../resource/color/ColorApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import NetWorking from '../../../networking/fetchWithTimeout'
import { useSelector, useDispatch } from 'react-redux'

//icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

//import redux
import { IsUpdateCongNo } from '../../../Redux/ActionType'

let SDTSelected
var arr_KhachHang = []

function formatNumber(num) {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return num
}

function CongNo() {
    const SDTNV = useSelector((state) => state.SDTNV)
    const PassLogin = useSelector((state) => state.Pass)
    const isUpdateCN = useSelector((state) => state.isUpdateCongNo)
    const dispatch = useDispatch()

    const URL_API = 'http://35.197.146.86:5000'

    const [lstResult, setResult] = useState()

    const [lstUIXemLichSuCapNhat, setLstUIXemLichSuCapNhat] = useState()

    // Lưu lại ui ban đầu
    const [lstUI, setLstUI] = useState()
    const [totalCongNo, setTotalCongNo] = useState(0)

    const [messLoading, setMessLoading] = useState(
        ' Đang Lấy Thông Tin Khách Hàng!'
    )
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [nameFilterSearch, setNameFilterSearch] = useState(
        'Tìm tên khách hàng'
    )
    const [valueSearch, setValueSearch] = useState('')

    //show lịch sử cập nhật công nợ
    const [showLichSuCapNhat, setShowLichSuCapNhat] = useState(false)

    // message snackbar
    const [showMessage, setShowMessage] = useState(false)

    //item dependencies call back useEffect
    const [refresh, setRefresh] = useState(false)

    const [stateModalDieuChinh, setStateModalDieuChinh] = useState({
        openDieuChinh: false,
        Pass: '',
    })
    const { openDieuChinh, CongNoCu, CongNoMoi, Pass } = stateModalDieuChinh

    const [congnoMoi, setcongnoMoi] = useState()

    const [bodyRequestUpdateCongNo, setBodyRequestUpdateCongNo] = useState({})

    // const [disableUpdate, setDisableUpdate] = useState(false)

    function ItemCongNo(e) {
        var props = e.data

        //State update công nợ
        const [diaChi, setDiaChi] = useState(props.DiaChi)
        const congNoCu = props.Congno
        const [traNo, setTraNo] = useState('')
        const [themNo, setThemNo] = useState('')
        const [congNoMoi, setCongNoMoi] = useState(0)
        const [sdt, setSDT] = useState(props.SDT)

        //Lấy thời gian hiện tại
        var _d = new Date()
        var _time =
            _d.getHours() + ':' + _d.getMinutes() + ':' + _d.getSeconds()

        bodyRequestUpdateCongNo.SDTKhach = sdt
        bodyRequestUpdateCongNo.NameKhach = props.Name
        bodyRequestUpdateCongNo.SDTNV = SDTNV
        bodyRequestUpdateCongNo.Time = _time
        bodyRequestUpdateCongNo.DiaChi = diaChi
        bodyRequestUpdateCongNo.CongnoCu = +congNoCu
        bodyRequestUpdateCongNo.CongnoMoi = +congNoMoi

        return (
            <TableRow>
                <TableCell>{e.soThuTu}</TableCell>
                <TableCell>{props.Name}</TableCell>
                <TableCell>
                    <input
                        value={sdt}
                        style={{
                            border: 'none ',
                            outline: 'none',

                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setSDT(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={diaChi}
                        style={{
                            border: 'none ',
                            outline: 'none',

                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setDiaChi(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={`${formatNumber(congNoCu)} VNĐ`}
                        style={{
                            color: 'black',
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            pointerEvents: 'none',
                        }}
                    />
                </TableCell>
                <TableCell>
                    <div>
                        <input
                            type="number"
                            value={traNo}
                            style={{
                                color: 'green',
                                border: 'none ',
                                outline: 'none',
                                borderBottom: '1px solid green',
                                backgroundColor: 'transparent',
                            }}
                            placeholder="Trả nợ"
                            onChange={(e) => {
                                setTraNo(e.target.value)
                                setCongNoMoi(congNoCu - +e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                                }
                            }}
                        />
                        <input
                            type="number"
                            value={themNo}
                            placeholder="Nợ Thêm"
                            style={{
                                color: 'red',
                                border: 'none ',
                                outline: 'none',
                                borderBottom: '1px solid red',
                                backgroundColor: 'transparent',
                                marginTop: '20px',
                            }}
                            onChange={(e) => {
                                setThemNo(e.target.value)
                                setCongNoMoi(congNoCu + +e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                                }
                            }}
                        />
                    </div>
                </TableCell>
                <TableCell>
                    {traNo || themNo ? (
                        `${formatNumber(congNoMoi)} VNĐ`
                    ) : (
                        <Button
                            style={{ width: '120px' }}
                            onClick={() => GetLichSuCapNhat(sdt)}
                        >
                            Xem Lịch Sử
                        </Button>
                    )}
                </TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
        OnFresh()
        console.log('useEffect')
    }, [refresh])

    function OnFresh() {
        handleShow()
        setMessLoading('Đang làm mới dữ liệu')
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        const _URL = URL_API + '/khachhang/ToanBoKhachHang'
        NetWorking(_URL, requestOptions)
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
        let maxRender = 0
        const result = arr.map((e, index) => {
            _congno += parseInt(e.Congno)
            maxRender++
            if (maxRender < 101) {
                return <ItemCongNo data={e} soThuTu={index} />
            }
        })

        setResult(result)
        setLstUI(result)

        setTotalCongNo(TienVietNam(_congno))
    }

    function TienVietNam(input) {
        var x = parseInt(input)
        x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        return x
    }

    function CapNhatCongNoMoi(itemRequest) {
        setMessLoading('Đang Cập Nhật Công Nợ Mới !')
        handleShow()

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(itemRequest),
        }

        const _URL = URL_API + '/khachhang/CapNhatCongNo'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    setRefresh(!refresh) //call lại api lấy toàn bộ công nợ khi cập nhật thành công
                    setShowMessage(true)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Khi Cập Nhật Công Nợ! ')
                handleClose()
            })
    }

    function handleSearch(value, nameFilter) {
        // Nếu chuỗi tìm kiếm rỗng thì cho render toàn bộ
        if (!value) {
            setResult(lstUI)
            return
        }

        const textSearch = value.toLowerCase()
        const regex = new RegExp(textSearch)
        var maxItemSearch = 0
        const len = arr_KhachHang.length
        var arrUI = []
        switch (nameFilter) {
            case 'Tìm tên khách hàng':
                //render 20 kết quả tìm đc
                for (var i = 0; i < len; ++i) {
                    if (regex.exec(arr_KhachHang[i].Name.toLowerCase())) {
                        maxItemSearch++
                        if (maxItemSearch < 51) {
                            arrUI.push(
                                <ItemCongNo
                                    data={arr_KhachHang[i]}
                                    soThuTu={maxItemSearch}
                                />
                            )
                        } else {
                            break
                        }
                    }
                }

                setResult(arrUI)

                break
            case 'Tìm địa chỉ':
                //render 20 kết quả tìm đc
                for (var i = 0; i < len; ++i) {
                    if (regex.exec(arr_KhachHang[i].DiaChi.toLowerCase())) {
                        maxItemSearch++
                        if (maxItemSearch < 51) {
                            arrUI.push(
                                <ItemCongNo
                                    data={arr_KhachHang[i]}
                                    soThuTu={maxItemSearch}
                                />
                            )
                        } else {
                            break
                        }
                    }
                }

                setResult(arrUI)

                break
            default:
                break
        }
    }

    function GetLichSuCapNhat(sdt) {
        const _URL = URL_API + '/khachhang/NhatKyCongNoBySDT?SDTKhach=' + sdt
        NetWorking(_URL)
            .then((res) => {
                if (res.success) {
                    RenderUILichSuCapNhat(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Khi Xem Lịch Sử Cập Nhật! ')
                handleClose()
            })
    }

    function RenderUILichSuCapNhat(data) {
        const result = data.map((e, index) => {
            return ItemLichSuCapNhat(e, index)
        })

        setLstUIXemLichSuCapNhat(result)

        //Sau khi get api lịch sử cập nhật và render ui thì cho hiện thị modal
        setShowLichSuCapNhat(true)
    }

    function ItemLichSuCapNhat(props, stt) {
        return (
            <TableRow>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.NameKhach}</TableCell>
                <TableCell>{props.SDTKhach}</TableCell>
                <TableCell>{props.CongnoCu}</TableCell>
                <TableCell>{props.CongnoMoi}</TableCell>
                <TableCell>{props.Date}</TableCell>
                <TableCell>{props.NoiDung}</TableCell>
            </TableRow>
        )
    }

    function XemLichSuCapNhat() {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="xl"
                show={showLichSuCapNhat}
                onHide={() => setShowLichSuCapNhat(false)}
            >
                <Modal.Header closeButton>
                    <h5>Lịch sử cập nhật công nợ</h5>
                </Modal.Header>
                <Modal.Body>
                    <TableContainer
                        style={{
                            maxHeight: '570px',
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên Khách</TableCell>
                                    <TableCell>Số Điện Thoại</TableCell>
                                    <TableCell>Công Nợ Củ</TableCell>
                                    <TableCell>Công Nợ Mới</TableCell>
                                    <TableCell>Ngày Cập Nhật</TableCell>
                                    <TableCell>Nội Dung</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{lstUIXemLichSuCapNhat}</TableBody>
                        </Table>
                    </TableContainer>
                </Modal.Body>
            </Modal>
        )
    }

    function MessageUpdateCongNo() {
        return (
            <Snackbar
                open={showMessage}
                autoHideDuration={2000}
                onClose={() => {
                    setShowMessage(false)
                }}
            >
                <Alert
                    onClose={() => setShowMessage(false)}
                    severity={'success'}
                >
                    Cập nhật thành công
                </Alert>
            </Snackbar>
        )
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
            <XemLichSuCapNhat />
            <MessageUpdateCongNo />
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
                style={{
                    position: 'absolute',
                    right: 100,
                    top: 10,
                    cursor: 'pointer',
                }}
                onClick={(e) => {
                    setRefresh(!refresh)
                }}
                color={resources.colorPrimary}
                size="3x"
                icon={faSyncAlt}
            />
            <div
                style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <TextField
                    style={{
                        width: 450,
                        marginRight: 35,
                        marginLeft: 35,
                    }}
                    id="outlined-basic"
                    placeholder={nameFilterSearch}
                    variant="outlined"
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch(event.target.value, nameFilterSearch)
                        }
                    }}
                    value={valueSearch}
                    onChange={(e) => {
                        setValueSearch(e.target.value)
                    }}
                    InputProps={{
                        endAdornment: (
                            <CloseIcon
                                onClick={(e) => {
                                    setValueSearch('')
                                    handleSearch('')
                                }}
                                style={{
                                    cursor: 'pointer',
                                    display: valueSearch ? 'block' : 'none',
                                }}
                            />
                        ),
                        startAdornment: (
                            <SearchIcon
                                style={{
                                    marginRight: '11px',
                                }}
                            />
                        ),
                    }}
                />

                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {nameFilterSearch}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            onClick={(e) => {
                                setNameFilterSearch('Tìm tên khách hàng')
                            }}
                        >
                            Tìm tên khách hàng
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                setNameFilterSearch('Tìm địa chỉ')
                            }}
                        >
                            Tìm địa chỉ
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <TableContainer
                style={{
                    marginTop: 20,
                    maxHeight: '500px',
                    width: '97%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Công Nợ Hiện Tại</TableCell>
                            <TableCell>Điều Chỉnh</TableCell>
                            <TableCell>Kết Quả</TableCell>
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
                            style={{
                                width: 200,
                                height: 50,
                                marginLeft: 40,
                                marginTop: 5,
                                marginBottom: 5,
                                userSelect: 'none',
                            }}
                            value={SDTNV}
                            label="Số điện thoại nhân viên"
                        />
                        <TextField
                            type="password"
                            variant="outlined"
                            label="Mật Khẩu Đăng Nhập"
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
                            if (bodyRequestUpdateCongNo) {
                                CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                            }
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={(e) => {
                            setStateModalDieuChinh({
                                Pass: '',
                                openDieuChinh: false,
                            })

                            //Cho tải lại dữ liệu để trở về như củ khi cập nhật thất bại
                            setRefresh(!refresh)
                        }}
                    >
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CongNo
