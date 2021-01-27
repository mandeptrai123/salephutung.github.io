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

function CongNo() {
    const SDTNV = useSelector((state) => state.SDTNV)
    const PassLogin = useSelector((state) => state.Pass)
    const isUpdateCN = useSelector((state) => state.isUpdateCongNo)
    const dispatch = useDispatch()

    const URL_API = 'http://35.197.146.86:5000'

    const [lstResult, setResult] = useState()

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

    const [showDieuChinh, setShowDieuChinh] = useState(false)

    const handleCloseDieuChinh = () => setShowDieuChinh(false)
    //const handleShowDieuChinh = () => setShowDieuChinh(true);

    const [messResponse, setMessResponse] = useState('')
    const [showResponse, setShowResponse] = useState(false)

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
        const [isDisableUpdate, setIsDisableUpdate] = useState(false)
        //State update công nợ
        const [diaChi, setDiaChi] = useState(props.DiaChi)
        const [congNo, setCongNo] = useState(props.Congno)
        const [sdt, setSDT] = useState(props.SDT)

        //Lấy thời gian hiện tại
        var _d = new Date()
        var _time =
            _d.getHours() + ':' + _d.getMinutes() + ':' + _d.getSeconds()

        bodyRequestUpdateCongNo.SDTKhach = sdt
        bodyRequestUpdateCongNo.NameKhach = props.Name
        bodyRequestUpdateCongNo.SDTNV = SDTNV
        bodyRequestUpdateCongNo.Congno = +congNo
        bodyRequestUpdateCongNo.Time = _time
        bodyRequestUpdateCongNo.DiaChi = diaChi

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
                        value={congNo}
                        style={{
                            color: congNo > 0 ? '#239B56' : 'red',
                            border: 'none ',
                            outline: 'none',

                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setCongNo(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatCongNoMoi(bodyRequestUpdateCongNo)
                            }
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    useEffect(() => {
        OnFresh()
    }, [])

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

        const result = arr.map((e, index) => {
            _congno += parseInt(e.Congno)

            return <ItemCongNo data={e} soThuTu={index} />
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
        handleCloseDieuChinh(false)
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
                setMessResponse(res.mess)
                setStateModalDieuChinh({
                    openDieuChinh: false,
                    Pass: '',
                })
                setShowResponse(true)
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
                        if (maxItemSearch < 21) {
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
                        if (maxItemSearch < 21) {
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
                    OnFresh()
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
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Khách</TableCell>
                            <TableCell>Số Điện Thoại</TableCell>
                            <TableCell>Địa Chỉ</TableCell>
                            <TableCell>Tổng Công Nợ</TableCell>
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
                            OnFresh()
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
