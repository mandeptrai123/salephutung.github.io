import React, { useState, useEffect } from 'react'
import './css/KhoHang.css'
//import component
import { Button, Modal, Spinner } from 'react-bootstrap'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Dropdown from 'react-bootstrap/Dropdown'
import TableRow from '@material-ui/core/TableRow'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

//icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import { makeStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import resources from '../../resource/color/ColorApp'

import NetWorking from '../../networking/fetchWithTimeout'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import _, { result } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

//Action
import { AllSanPham, DeleteSanPham } from '../../Redux/ActionType'

var ID = 0

function KhoHang() {
    const [lstSanPham, setLstSanPham] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [nameFilterSearch, setNameFilterSearch] = useState('Tìm tên sản phẩm')

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')
    const [lstResult, setLstResult] = useState()
    const [uiKhoHang, setUIKhoHang] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showDieuChinh, setDieuChinh] = useState(false)
    const [showModalDel, setShowModalDel] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    //id sản phẩm cần xóa
    const [idSanPhamDel, setIdSanPhamDel] = useState('')

    const [GiaTriMoi, setGiaTriMoi] = useState('')

    const TatCaSanPham = useSelector((state) => state.AllSanPham)
    const dispatch = useDispatch()

    const URL_API = 'http://35.197.146.86:5000'

    function RenderKhoSanPham(arr) {
        const result = arr.map((e, index) => {
            return <ItemSanPham data={e} soThuTu={index} />
        })

        setLstResult(result)
        setUIKhoHang(result)
    }

    function CapNhatSanPham(bodyRequest) {
        handleShow()
        setMessLoading('Đang cập nhật!')
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(bodyRequest),
        }
        const _URL = URL_API + '/sanpham/CapNhatSanPham'
        NetWorking(_URL, requestOptions)
            .then((response) => {
                handleClose()

                if (response.success) {
                    console.log('Cập nhật thành công')
                }
            })
            .catch((error) => {
                console.log(lỗi, error)
                alert('Có Lỗi Ở Kho Hàng! ')
                handleClose()
            })
    }

    function handleDeleteSanPham(id) {
        handleShow()
        setMessLoading('Đang xóa sản phẩm!')

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ _id: id }),
        }

        const _URL = URL_API + '/sanpham/XoaSanPham'
        NetWorking(_URL, requestOptions)
            .then((response) => {
                if (response.success) {
                    dispatch({ type: DeleteSanPham, value: id })
                }
                setShowMessage(true)
                handleClose()
            })
            .catch((error) => {
                console.log(lỗi, error)
                alert('Có Lỗi Ở Kho Hàng! ')
                handleClose()
            })
    }

    function ModalDeleteSanPham() {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalDel}
                onHide={() => setShowModalDel(false)}
            >
                <Modal.Header closeButton>
                    Bạn có muốn xóa sản phẩm này ?
                </Modal.Header>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleDeleteSanPham(idSanPhamDel)

                            setShowModalDel(false)
                        }}
                    >
                        Đồng ý
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            setShowModalDel(false)
                        }}
                    >
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ItemSanPham(props) {
        const e = props.data

        //Các trường dữ liệu cập nhật sản phẩm
        const [nameSanPham, setNameSanPham] = useState(e.name) //Name là key của object này, ko đc thay đổi
        const [priceSanPham, setPriceSanPham] = useState(e.price)
        const [amountSanPham, setAmountSanPham] = useState(e.amount)
        const [amountAlertSanPham, setAmountAlertSanPham] = useState(
            e.amountAlert
        )
        const [donviSanPham, setDonviSanPham] = useState(e.Donvi)
        const [nhaCCSanPham, setNhaCCSanPham] = useState(e.NhaCC)
        const [giaNhapSanPham, setGiaNhapSanPham] = useState(e.GiaNhap)
        const [timeSanPham, setTimeSanPham] = useState(e.Time)
        const [IDSpSanPham, setIDSpSanPham] = useState(e.IDSp)
        const [SDTNhaCCSanPham, setSDTNhaCCSanPham] = useState(e.SDTNhaCC)

        const bodyRequestAPIUpdateSP = {
            name: nameSanPham,
            price: +priceSanPham,
            amount: +amountSanPham,
            amountAlert: +amountAlertSanPham,
            Donvi: donviSanPham,
            NhaCC: nhaCCSanPham,
            GiaNhap: giaNhapSanPham,
            Time: timeSanPham,
            IDSp: +IDSpSanPham,
            SDTNhaCC: SDTNhaCCSanPham,
        }

        return (
            <TableRow hover>
                <TableCell>{props.soThuTu}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>
                    <input
                        value={donviSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setDonviSanPham(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={priceSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setPriceSanPham(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={amountSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setAmountSanPham(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={nhaCCSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setNhaCCSanPham(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={amountAlertSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid black',
                        }}
                        onChange={(e) => {
                            setAmountAlertSanPham(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        style={{ fontSize: '14px', width: '90px' }}
                        variant="danger"
                        onClick={() => {
                            setShowModalDel(true)
                            setIdSanPhamDel(e._id)
                        }}
                    >
                        Xóa
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function Refresh() {
        setMessLoading('Đang Tải Thông Tin Sản Phẩm !')
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + '/sanpham/ToanBoSanPham'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                console.log(res)
                if (res.success) {
                    //Thêm tất cả sp vào store
                    dispatch({ type: AllSanPham, dataSanPham: res.data })
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Kho Hàng! ')
                handleClose()
                console.log(e)
            })
    }

    function HanldGiaTriMoi() {
        if (ID == 1) {
            CapNhatGiaBanMoi(Name, GiaTriMoi)
        } else if (ID == 2) {
            CapNhatSLMoi(Name, GiaTriMoi)
        }
    }

    function CapNhatSLMoi(_name, _amount) {
        var _item = {
            name: _name,
            amount: _amount,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(_item),
        }
        let _URL = URL_API + '/sanpham/CapNhatSLSanPham'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                }
            })
            .catch((e) => {
                handleClose()
            })
    }

    function CapNhatGiaBanMoi(_name, _price) {
        var _item = {
            name: _name,
            price: _price,
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(_item),
        }
        let _URL = URL_API + '/sanpham/CapNhatGiaBanSanPham'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                }
            })
            .catch((e) => {
                handleClose()
            })
    }

    useEffect(() => {
        RenderKhoSanPham(TatCaSanPham)
    }, [TatCaSanPham])

    function handleSearch(value, nameFilterSearch = '') {
        // Nếu chuỗi tìm kiếm rỗng thì render lại toàn bộ
        if (!value) {
            setLstResult(uiKhoHang)
            return
        }

        const textSearch = value.toLowerCase()
        const regex = new RegExp(textSearch)

        switch (nameFilterSearch) {
            case 'Tìm tên nhà cung cấp':
                let arrUI = []
                const len = TatCaSanPham.length
                let maxLengthSearch = 0

                //cho render kết quả tìm kiếm tối đa là 20
                for (let i = 0; i < len; ++i) {
                    if (regex.exec(TatCaSanPham[i].NhaCC.toLowerCase())) {
                        maxLengthSearch++
                        if (maxLengthSearch < 21) {
                            arrUI.push(
                                <ItemSanPham
                                    data={TatCaSanPham[i]}
                                    soThuTu={maxLengthSearch}
                                />
                            )
                        } else {
                            break
                        }
                    }
                }
                setLstResult(arrUI)

                break
            case 'Tìm tên sản phẩm':
                let arrUIs = []
                const length = TatCaSanPham.length
                let maxLengthSearchs = 0

                //cho render kết quả tìm kiếm tối đa là 20
                for (let i = 0; i < length; ++i) {
                    if (regex.exec(TatCaSanPham[i].name.toLowerCase())) {
                        maxLengthSearchs++
                        if (maxLengthSearchs < 21) {
                            arrUIs.push(
                                <ItemSanPham
                                    data={TatCaSanPham[i]}
                                    soThuTu={maxLengthSearchs}
                                />
                            )
                        } else {
                            break
                        }
                    }
                }

                setLstResult(arrUIs)
                break

            default:
                break
        }
    }

    return (
        <section className="khohang-container">
            <ModalDeleteSanPham />

            <Snackbar
                open={showMessage}
                autoHideDuration={2500}
                onClose={() => {
                    setShowMessage(false)
                }}
            >
                <Alert
                    onClose={() => setShowMessage(false)}
                    severity={'success'}
                >
                    Xóa sản phẩm thành công
                </Alert>
            </Snackbar>

            <div className="khohang-container__content">
                <h2
                    style={{ color: resources.colorPrimary }}
                    className="header-title"
                >
                    Kho Hàng
                </h2>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            style={{
                                width: '450px',
                                marginRight: '30px',
                            }}
                            pattern="[A-Za-z]"
                            placeholder={nameFilterSearch}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSearch(
                                        event.target.value,
                                        nameFilterSearch
                                    )
                                }
                            }}
                            onChange={(e) => {
                                setValueSearch(e.target.value)
                            }}
                            value={valueSearch}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <CloseIcon
                                        onClick={(e) => {
                                            setValueSearch('')
                                            handleSearch('')
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            display: valueSearch
                                                ? 'block'
                                                : 'none',
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
                            <Dropdown.Toggle variant="primary">
                                {nameFilterSearch}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        setNameFilterSearch(
                                            'Tìm tên nhà cung cấp'
                                        )
                                    }}
                                >
                                    Tìm tên nhà cung cấp
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setNameFilterSearch('Tìm tên sản phẩm')
                                    }}
                                >
                                    Tìm tên sản phẩm
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <FontAwesomeIcon
                        style={{
                            marginRight: 40,
                            marginTop: 10,
                            cursor: 'pointer',
                        }}
                        onClick={(e) => {
                            Refresh()
                        }}
                        color={resources.colorPrimary}
                        size="3x"
                        icon={faSyncAlt}
                    />
                </div>

                <div>
                    <TableContainer
                        style={{
                            height: '600px',
                            width: '100%',
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow style={{ fontSize: 8 }}>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên Sản Phẩm</TableCell>
                                    <TableCell>Đơn Vị</TableCell>
                                    <TableCell>Giá Bán Lẻ</TableCell>
                                    <TableCell>Số Lượng Hiện Tại</TableCell>
                                    <TableCell>Nhà Cung Cấp</TableCell>
                                    <TableCell>SL Báo Động</TableCell>
                                    <TableCell>Điều Chỉnh</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{lstResult}</TableBody>
                        </Table>
                    </TableContainer>
                </div>
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
                show={showDieuChinh}
            >
                <Modal.Body>
                    <TextField
                        style={{ width: 200 }}
                        placeholder="Giá Trị Mới"
                        value={GiaTriMoi}
                        onChange={(e) => {
                            setGiaTriMoi(e.target.value)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onCLick={(e) => {
                            HanldGiaTriMoi()
                        }}
                    >
                        Thay Đổi
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}

export default KhoHang
