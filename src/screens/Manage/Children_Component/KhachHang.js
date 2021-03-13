import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import RefreshIcon from '@material-ui/icons/Refresh'
import AddIcon from '@material-ui/icons/Add'

//import component
import { Modal, Button, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { debounce } from 'lodash'

// xóa dấu
import removeTones from '../../../utils/removeTones'

//log
import handleErr from '../../../utils/handleError'

// icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import NetWorking from '../../../networking/fetchWithTimeout'
import resources from '../../../resource/color/ColorApp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//hook, action redux
import { useSelector, useDispatch } from 'react-redux'
import { UpdateKhachHang, GetAllKhachHang } from '../../../Redux/ActionType'
import CheckDaoTu from '../../../utils/CheckDaoTu'

export default function KhachHang() {
    const [resultTableNhatKy, setResultTableNhatKy] = useState()
    const [uiNhatKy, setUiNhatKy] = useState()
    const [messLoading, setMessLoading] = useState('Đang load đợi tí nhé!')
    const [show, setShow] = useState(false)
    const [valueSearch, setValueSearch] = useState('')

    const allKhachHang = useSelector((state) => state.AllKhachHang)
    const dispatch = useDispatch()

    const [showModalThemKhachHang, setShowModalThemKhachHang] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //message
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const handleCloseMessage = () => setShowMessage(false)

    //id khách hàng xóa
    const [idDelKhachHang, setIdDelKhachHang] = useState('')

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    function GetAllKH() {
        setMessLoading('Đang tải!')
        handleShow()

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        let _URL = URL_API + 'ToanBoKhachHang'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    dispatch({
                        type: GetAllKhachHang,
                        dataKhachHang: res.data,
                    })
                    RenderUIKhachHang(res.data)
                }
            })
            .catch((e) => {
                handleClose()
                handleErr('api lấy toàn bộ khách hàng', 'KhachHang', '47')
            })
    }

    function RenderUIKhachHang(data) {
        let maxRender = 0
        let result = []
        const lenData = data.length

        for (let i = 0; i < lenData; ++i) {
            maxRender++
            if (maxRender < 101)
                result.push(<ItemKhachHang data={data[i]} index={i} />)
            else break
        }

        setResultTableNhatKy(result)
        setUiNhatKy(result)
    }

    function updateKhachHang(objectKhachHang, index) {
        setMessLoading('Đang cập nhật')
        handleShow()

        const _url = URL_API + 'UpdateKhachHang'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectKhachHang),
        }

        NetWorking(_url, requestOptions)
            .then((res) => {
                if (res.success) {
                    console.log(res)
                    setMessLoading(res.mess)

                    //cập nhật khách hàng trên redux store
                    dispatch({
                        type: UpdateKhachHang,
                        value: { objectKhachHang, index },
                    })

                    setTimeout(() => {
                        handleClose()
                    }, 1000)
                } else {
                    setMessLoading(res.mess)

                    RenderUIKhachHang(allKhachHang)

                    setTimeout(() => {
                        handleClose()
                    }, 1000)
                }
            })
            .catch((e) => {
                handleClose()
                alert('Có Lỗi Ở Công Nợ!')
                handleErr('api cập nhật khách hàng', 'KhachHang', '96')
            })
    }

    function ItemKhachHang(props) {
        //object update khách hàng
        const [name, setName] = useState(props.data.Name ? props.data.Name : '')
        const [diaChi, setDiaChi] = useState(
            props.data.DiaChi ? props.data.DiaChi : ''
        )
        const [sdt, setSdt] = useState(props.data.SDT ? props.data.SDT : '')
        const [congNo, setCongNo] = useState(props.data.Congno)
        const [thoiQuen, setThoiQuen] = useState(
            props.data.ThoiQuen ? props.data.ThoiQuen : ''
        )
        const [soHangDaMua, setSoHangDaMua] = useState(
            props.data.SoHangDaMua ? props.data.SoHangDaMua : ''
        )
        const [loaiKhach, setLoaiKhach] = useState(
            props.data.LoaiKhach ? props.data.LoaiKhach : ''
        )

        const objectUpdate = {
            id: props.data._id,
            Name: name,
            DiaChi: diaChi,
            SDT: sdt,
            Congno: congNo,
            ThoiQuen: thoiQuen,
            SoHangDaMua: soHangDaMua,
            LoaiKhach: loaiKhach,
        }

        return (
            <TableRow>
                <TableCell>{props.index}</TableCell>
                <TableCell>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={sdt}
                        onChange={(e) => setSdt(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={congNo}
                        onChange={(e) => setCongNo(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={thoiQuen}
                        onChange={(e) => setThoiQuen(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={soHangDaMua}
                        onChange={(e) => setSoHangDaMua(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        value={loaiKhach}
                        onChange={(e) => setLoaiKhach(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                updateKhachHang(objectUpdate, props.index)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        color={resources.colorPrimary}
                        size={'2x'}
                        icon={faTrash}
                        onClick={(e) => {
                            setIdDelKhachHang(props.data._id)
                            setShowModalConfirm(true)
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    function xoaKhachHang(id) {
        setMessLoading('Đang xóa khách hàng')
        handleShow()

        const _url = URL_API + 'XoaKhachHang'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id }),
        }

        NetWorking(_url, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    setShowMessage(true)
                    setMessage('Xóa khách hàng thành công')
                    GetAllKH()
                } else {
                    setShowMessage(true)
                    setMessage(res.mess ? res.mess : '')
                }
            })
            .catch((e) => {
                handleClose()
                handleErr('api xóa khách hàng', 'xoaKhachHang', '258')
            })
    }

    function themKhachHang(body) {
        setMessLoading('Đang thêm khách hàng')
        handleShow()

        const _url = URL_API + 'ThemKhachHang'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        NetWorking(_url, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    setShowMessage(true)
                    setMessage('Thêm khách hàng thành công')
                    GetAllKH()
                } else {
                    setShowMessage(true)
                    setMessage(res.mess ? res.mess : '')
                }
            })
            .catch((e) => {
                handleClose()
                handleErr('api thêm khách hàng', 'themKhachHang', '289')
            })
    }

    function ModalThemKhachHang() {
        const [khachHang, setKhachHang] = useState({
            Name: '',
            DiaChi: '',
            SDT: '',
            Congno: '',
            LichSuMuaHang: [],
            LoaiKhach: '',
            SoHangDaMua: '',
            ThoiQuen: '',
        })
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                show={showModalThemKhachHang}
                onHide={() => {
                    setShowModalThemKhachHang(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Khách Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <TextField
                                style={{ marginTop: '40px', width: '550px' }}
                                variant="outlined"
                                label="Tên Khách Hàng"
                                value={khachHang.Name}
                                onChange={(e) => {
                                    setKhachHang({
                                        ...khachHang,
                                        Name: e.target.value,
                                    })
                                }}
                            />
                            <p
                                style={{
                                    color: 'red',
                                    display: khachHang.Name ? 'none' : 'block',
                                }}
                            >
                                * Bắt buộc điền tên khách hàng
                            </p>
                        </div>

                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Địa Chỉ"
                            value={khachHang.DiaChi}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    DiaChi: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Số Điện Thoại"
                            value={khachHang.SDT}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    SDT: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Công Nợ"
                            value={khachHang.Congno}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    Congno: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Loại Khách"
                            value={khachHang.LoaiKhach}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    LoaiKhach: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Thói Quen"
                            value={khachHang.ThoiQuen}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    ThoiQuen: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: '40px', width: '550px' }}
                            variant="outlined"
                            label="Số Hàng Đã Mua"
                            value={khachHang.SoHangDaMua}
                            onChange={(e) => {
                                setKhachHang({
                                    ...khachHang,
                                    SoHangDaMua: e.target.value,
                                })
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setShowModalThemKhachHang(false)
                                    themKhachHang(khachHang)
                                }
                            }}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setShowModalThemKhachHang(false)
                        }}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="primary"
                        style={{
                            pointerEvents: khachHang.Name ? 'auto' : 'none',
                            opacity: khachHang.Name ? '1' : '0.5',
                        }}
                        onClick={() => {
                            setShowModalThemKhachHang(false)
                            themKhachHang(khachHang)
                        }}
                    >
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalConfirm() {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalConfirm}
                onHide={() => setShowModalConfirm(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Bạn có muốn xóa khách hàng này?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModalConfirm(false)}
                    >
                        Từ chối
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShowModalConfirm(false)
                            xoaKhachHang(idDelKhachHang)
                        }}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalDialogMessage() {
        return (
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
        )
    }

    useEffect(() => {
        GetAllKH()
    }, [])

    function handleSearch(value) {
        setValueSearch(value)
        try {
            if (!value) {
                setResultTableNhatKy(uiNhatKy)
                return
            }

            const reg = new RegExp(removeTones(value.toLowerCase()))

            let maxRender = 0
            let result = []
            const len = allKhachHang.length

            for (let i = 0; i < len; ++i) {
                if (
                    reg.exec(removeTones(allKhachHang[i].Name.toLowerCase())) ||
                    CheckDaoTu(
                        value,
                        removeTones(allKhachHang[i].Name.toLowerCase())
                    )
                ) {
                    maxRender++
                    if (maxRender < 100) {
                        result.push(
                            <ItemKhachHang
                                data={allKhachHang[i]}
                                index={maxRender}
                            />
                        )
                    } else {
                        break
                    }
                }
            }

            setResultTableNhatKy(result)
        } catch (err) {
            handleErr('Lỗi handlSearch', 'KhachHang', '277')
        }
    }

    const searchDebounce = debounce((value) => handleSearch(value), 500)

    return (
        <div>
            <ModalDialogMessage />
            <ModalThemKhachHang />
            <ModalConfirm />

            <Snackbar
                open={showMessage}
                autoHideDuration={3000}
                onClose={handleCloseMessage}
            >
                <Alert onClose={handleCloseMessage} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <h1
                style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    color: resources.colorPrimary,
                }}
            >
                Khách Hàng
            </h1>
            <div
                style={{
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <TextField
                    id="search-kh"
                    placeholder="Tìm kiếm theo tên khách hàng"
                    variant="outlined"
                    style={{
                        width: '80%',
                    }}
                    onChange={(e) => searchDebounce(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <CloseIcon
                                onClick={(e) => {
                                    document.getElementById('search-kh').value =
                                        ''
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
                <AddIcon
                    style={{
                        fontSize: '55px',
                        cursor: 'pointer',
                        color: 'rgb(0, 123, 255)',
                    }}
                    onClick={() => {
                        setShowModalThemKhachHang(true)
                    }}
                />
                <RefreshIcon
                    style={{
                        fontSize: '55px',
                        cursor: 'pointer',
                        color: 'rgb(0, 123, 255)',
                    }}
                    onClick={() => {
                        GetAllKH()
                    }}
                />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <TableContainer
                    style={{
                        maxHeight: '550px',
                        width: '95%',
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Tên Khách</TableCell>
                                <TableCell>Địa Chỉ</TableCell>
                                <TableCell>Số Điện Thoại</TableCell>
                                <TableCell>Công Nợ</TableCell>
                                <TableCell>Thói Quen</TableCell>
                                <TableCell>Số Hàng Đã Mua</TableCell>
                                <TableCell>Loại Khách</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{resultTableNhatKy}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
