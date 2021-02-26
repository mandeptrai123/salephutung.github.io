import React, { useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import RefreshIcon from '@material-ui/icons/Refresh'

//import component
import { Modal, Button, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// xóa dấu
import removeTones from '../../../utils/removeTones'

// icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import NetWorking from '../../../networking/fetchWithTimeout'
import resources from '../../../resource/color/ColorApp'

//hook, action redux
import { useSelector, useDispatch } from 'react-redux'
import { UpdateKhachHang, GetAllKhachHang } from '../../../Redux/ActionType'

export default function KhachHang() {
    const [resultTableNhatKy, setResultTableNhatKy] = useState()
    const [uiNhatKy, setUiNhatKy] = useState()
    const [messLoading, setMessLoading] = useState('Đang load đợi tí nhé!')
    const [show, setShow] = useState(false)
    const [valueSearch, setValueSearch] = useState('')

    const allKhachHang = useSelector((state) => state.AllKhachHang)
    const dispatch = useDispatch()

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
                if (res.success) {
                    RenderUIKhachHang(res.data)

                    dispatch({
                        type: GetAllKhachHang,
                        dataKhachHang: res.data,
                    })
                }

                handleClose()
            })
            .catch((e) => {
                handleClose()
                console.log(e)
            })
    }

    function RenderUIKhachHang(data) {
        let maxRender = 0
        let result = []
        const lenData = data.length

        for (let i = 0; i < lenData; ++i) {
            maxRender++
            if (maxRender < 201)
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
            </TableRow>
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
        if (!value) {
            setResultTableNhatKy(uiNhatKy)
            return
        }

        const reg = new RegExp(removeTones(value.toLowerCase()))

        let maxRender = 0
        let result = []
        const len = allKhachHang.length

        for (let i = 0; i < len; ++i) {
            if (reg.exec(removeTones(allKhachHang[i].Name.toLowerCase()))) {
                maxRender++
                if (maxRender < 200) {
                    result.push(
                        <ItemKhachHang data={allKhachHang[i]} index={i} />
                    )
                } else {
                    break
                }
            }
        }

        setResultTableNhatKy(result)
    }

    return (
        <div>
            <ModalDialogMessage />
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
                    id="outlined-basic"
                    placeholder="Tìm kiếm theo tên khách hàng"
                    variant="outlined"
                    style={{
                        width: '80%',
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e.target.value)
                        }
                    }}
                    onChange={(e) => setValueSearch(e.target.value)}
                    value={valueSearch}
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
                            </TableRow>
                        </TableHead>

                        <TableBody>{resultTableNhatKy}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
