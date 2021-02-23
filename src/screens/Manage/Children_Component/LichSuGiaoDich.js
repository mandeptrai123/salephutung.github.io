import React, { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    SaveObjectBill,
    UpdateThanhTienDonHang,
} from '../../../Redux/ActionType'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import { Modal, Spinner } from 'react-bootstrap'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Dropdown from 'react-bootstrap/Dropdown'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import resources from '../../../resource/color/ColorApp'
import { TextField } from '@material-ui/core'
import NetWorking from '../../../networking/fetchWithTimeout'
import Button from '@material-ui/core/Button'

//icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { Alert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar'

import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PrintedDonHang from '../../Print/PrintedDonHang'
import { Autocomplete } from '@material-ui/lab'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

// xóa dấu
import removeTones from '../../../utils/removeTones'
import { set } from 'lodash'
import { CallReceived } from '@material-ui/icons'

var _arrDonHang = []

function TienVietNam(input) {
    var x = parseInt(input)
    x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    return x
}

function formatNumber(num) {
    if (num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return num
}

function LichSuGiaoDich() {
    //react redux hook, lấy toàn state all sp và khách hàng từ store
    const arrAllSanPham = useSelector((state) => state.AllSanPham)
    const objectBill = useSelector((state) => state.objectBill)
    const thanh_tien = useSelector((state) => state.objectBill.ThanhTien)
    const dispatch = useDispatch()

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    //Cập nhật list SP của mỗi đơn hàng
    const [indexBill, setIndexBill] = useState(0)

    const [lstResult, setResult] = useState()
    const [totalBill, setTotalBill] = useState(30)

    //const [startDate, setStartDate] = useState(new Date());
    const [messLoading, setMessLoading] = useState('')
    const [show, setShow] = useState(false)

    //Show/hidden modal cập nhật bill
    const [showModalUpdateBill, setShowModalUpdateBill] = useState(false)
    const [resultUpdateBill, setResultUpdateBill] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [nameFilterSearch, setNameFilterSearch] = useState(
        'Theo tên sản phẩm'
    )
    const [valueSearch, setValueSearch] = useState('')

    // show message
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')

    //checkbox xem toàn bộ
    const [checkedView, setCheckedView] = useState(true)

    //state object update bill

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

    const componentRef = useRef(null)

    //const [date,setDateChoosee] = useState(new Date().getDay()+"-"+new Date().getMonth+"-"+new Date().getFullYear());
    useEffect(() => {
        setMessLoading(' Đang Tải Thông Tin Đơn Hàng!')
        OnRefresh()
    }, [])

    const [stateModal, setStateModal] = useState({
        open: false,
        itemSelected: null,
    })

    function handleClickPrint(item) {
        setStateModal({ ...stateModal, open: true, itemSelected: item })
    }

    const ItemDonHang = (props, action, index) => {
        const formatDate = new Date(props.Date)
        return (
            <TableRow hover>
                <TableCell>{index}</TableCell>
                <TableCell>
                    {props.TimeOfDay}{' '}
                    {`${formatDate.getDate()}/${
                        formatDate.getMonth() + 1
                    }/${formatDate.getFullYear()}`}
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
                                <ListItem button>
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
                    <Button
                        variant="contained"
                        style={{
                            marginLeft: '4px',
                        }}
                        onClick={() => {
                            //Khi click chỉnh sửa 1 bill thì lưu index bill của đơn hàng
                            setIndexBill(index)

                            dispatch({ type: SaveObjectBill, value: props })
                            setShowModalUpdateBill(true)

                            RenderUIUpdateBill(props.lstSanPham)
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function RenderUIAllDonHang(arr) {
        let _total = 0
        var maxRender = 0
        const lenArr = arr.length
        let _result = []

        for (var i = 0; i < lenArr; i++) {
            // Kiểm tra xem khách hàng này có lịch sử đơn hàng nào ko
            if (arr[i].lstSanPham.length != 0) {
                _total += 1
                maxRender++
                if (maxRender < 101)
                    _result.push(ItemDonHang(arr[i], handleClickPrint, i))
                else break
            }
        }

        setTotalBill(_total)
        setResult(_result)
    }

    function OnRefresh() {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + 'ToanBoDonHang'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    _arrDonHang = res.data
                    RenderUIAllDonHang(res.data)
                }
                handleClose()
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                handleClose()
            })
    }

    function RenderUIUpdateBill(listSP) {
        let _thanhtien = 0
        setResultUpdateBill(
            listSP.map((e, index) => {
                _thanhtien += e.price * e.soluongBan
                return <ItemUpdateBill data={e} index={index} />
            })
        )
        dispatch({ type: UpdateThanhTienDonHang, value: _thanhtien })
    }

    function updateBill(bodyRequest) {
        handleShow()
        setMessLoading('Đang cập nhật bill!')

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(bodyRequest),
        }
        let _URL = URL_API + 'CapNhatDonHang'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    // Nếu cập nhật bill mới thành công thì cho refresh lại trang bill
                    OnRefresh()

                    setShowMessage(true)
                    setTextMessage('Cập nhật thành công!')
                }
                handleClose()
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                setShowMessage(true)
                setTextMessage('Cập nhật có lỗi!')
                handleClose()
            })
    }

    function ItemUpdateBill(props) {
        const [name, setName] = useState(
            _arrDonHang[indexBill].lstSanPham
                ? _arrDonHang[indexBill].lstSanPham[props.index].name
                : ''
        )
        const [soluongBan, setSoLuongBan] = useState(
            _arrDonHang[indexBill].lstSanPham
                ? _arrDonHang[indexBill].lstSanPham[props.index].soluongBan
                : ''
        )
        const [price, setPrice] = useState(
            _arrDonHang[indexBill].lstSanPham
                ? _arrDonHang[indexBill].lstSanPham[props.index].price
                : ''
        )
        const [priceSum, setPriceSum] = useState(
            formatNumber(
                _arrDonHang[indexBill].lstSanPham
                    ? _arrDonHang[indexBill].lstSanPham[props.index].pricesum
                    : ''
            )
        )
        const [ghiChu, setGhiChu] = useState(
            _arrDonHang[indexBill].lstSanPham
                ? _arrDonHang[indexBill].lstSanPham[props.index].Ghichu
                : ''
        )

        const [thanhTien, setThanhTien] = useState(
            _arrDonHang[indexBill].lstSanPham
                ? _arrDonHang[indexBill].lstSanPham[props.index].ThanhTien
                : ''
        )

        useEffect(() => {
            setPriceSum(formatNumber(soluongBan * price))
            var thanh_tien = 0
            _arrDonHang[indexBill].lstSanPham.map((e) => {
                thanh_tien += e.pricesum
            })
            _arrDonHang[indexBill].ThanhTien = thanh_tien

            setThanhTien(thanh_tien)
        }, [soluongBan, price])

        //Xử lí lỗi setName rỗng
        var boolsetName = false

        return (
            <TableRow>
                <TableCell>{props.index}</TableCell>
                <TableCell>
                    <Autocomplete
                        style={{ width: '280px' }}
                        freeSolo={true}
                        options={arrAllSanPham}
                        getOptionLabel={(option) => option.name}
                        inputValue={name}
                        value={name}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                // Kiểm tra sản phẩm vừa thêm vào bill đã có chưa
                                var isHave = false
                                const len =
                                    _arrDonHang[indexBill].lstSanPham.length

                                for (var i = 0; i < len; i++) {
                                    if (
                                        newValue._id ==
                                        _arrDonHang[indexBill].lstSanPham[i]._id
                                    ) {
                                        isHave = true
                                        break
                                    }
                                }

                                if (isHave) {
                                    setShowMessage(true)
                                    setTextMessage(
                                        'Đã có sản phẩm này rồi, vui lòng chọn sản phẩm khác!'
                                    )

                                    return
                                } else {
                                    setName(newValue.name)
                                    setPrice(newValue.price)
                                    setSoLuongBan(0)

                                    newValue.pricesum = priceSum
                                    newValue.soluongBan = soluongBan

                                    _arrDonHang[indexBill].lstSanPham[
                                        props.index
                                    ] = newValue
                                }
                            } else setName('')
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Sản Phẩm"
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        )}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        placeholder="Số lượng"
                        value={soluongBan}
                        style={{ width: '70px' }}
                        onChange={(e) => {
                            setSoLuongBan(e.target.value)

                            _arrDonHang[indexBill].lstSanPham[
                                props.index
                            ].soluongBan = e.target.value

                            _arrDonHang[indexBill].lstSanPham[
                                props.index
                            ].pricesum =
                                e.target.value *
                                _arrDonHang[indexBill].lstSanPham[props.index]
                                    .price
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                dispatch({
                                    type: UpdateThanhTienDonHang,
                                    value: thanhTien,
                                })
                            }
                        }}
                        onBlur={(e) => {
                            dispatch({
                                type: UpdateThanhTienDonHang,
                                value: thanhTien,
                            })
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        placeholder="Giá tiền"
                        value={price}
                        style={{ width: '180px' }}
                        onChange={(e) => {
                            setPrice(e.target.value)

                            _arrDonHang[indexBill].lstSanPham[
                                props.index
                            ].price = e.target.value

                            _arrDonHang[indexBill].lstSanPham[
                                props.index
                            ].pricesum =
                                e.target.value *
                                _arrDonHang[indexBill].lstSanPham[props.index]
                                    .soluongBan
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                dispatch({
                                    type: UpdateThanhTienDonHang,
                                    value: thanhTien,
                                })
                            }
                        }}
                        onBlur={(e) => {
                            dispatch({
                                type: UpdateThanhTienDonHang,
                                value: thanhTien,
                            })
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextareaAutosize
                        placeholder="Ghi chú sản phẩm"
                        rowsMax={3}
                        rowsMin={3}
                        onChange={(e) => {
                            setGhiChu(e.target.value)

                            _arrDonHang[indexBill].lstSanPham[
                                props.index
                            ].Ghichu = e.target.value
                        }}
                        value={ghiChu}
                    />
                </TableCell>
                <TableCell
                    style={{
                        width: '150px',
                    }}
                >{`${priceSum} VNĐ`}</TableCell>
                <TableCell>
                    <DeleteIcon
                        style={{
                            fontSize: '30px',
                            color: ' blue',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            // xóa phần tử trong danh sách bill

                            _arrDonHang[indexBill].lstSanPham.splice(
                                props.index,
                                1
                            )
                            RenderUIUpdateBill(
                                _arrDonHang[indexBill].lstSanPham
                            )
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    const [addHeightScroll, setAddHeightScroll] = useState(0)
    function ModalUpdateBill() {
        const tenKhach =
            _arrDonHang.length != 0 ? _arrDonHang[indexBill].TenKhach : ''

        const sdt =
            _arrDonHang.length != 0 ? _arrDonHang[indexBill].SDTKhach : ''

        const diaChiKhach =
            _arrDonHang.length != 0 ? _arrDonHang[indexBill].DiaChiKhach : ''

        const [thanhTien, setThanhTien] = useState(
            `${formatNumber(
                _arrDonHang.length != 0 ? _arrDonHang[indexBill].ThanhTien : ''
            )} VNĐ`
        )

        const [ghiChu, setGhiChu] = useState(
            _arrDonHang.length != 0 ? _arrDonHang[indexBill].Ghichu : ''
        )

        useEffect(() => {
            setThanhTien(`${formatNumber(thanh_tien)} VNĐ`)
        }, [thanh_tien])

        return (
            <div
                style={{
                    display: showModalUpdateBill ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '0',
                    left: '0',
                    height: `calc(100vh + ${addHeightScroll}vh)`,
                    backgroundColor: 'rgba(0, 0, 0, .5)',
                    zIndex: '50',
                }}
            >
                <div
                    style={{
                        width: '1150px',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        position: 'absolute',
                        top: '30px',
                    }}
                >
                    <h4>Chỉnh sửa bill</h4>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <TextField
                            label="Tên Khách"
                            variant="outlined"
                            value={tenKhach}
                            style={{
                                pointerEvents: 'none',
                            }}
                        />
                        <TextField
                            label="Số Điện Thoại"
                            variant="outlined"
                            value={sdt}
                            style={{
                                pointerEvents: 'none',
                            }}
                        />
                        <TextField
                            label="Địa Chỉ"
                            value={diaChiKhach}
                            style={{
                                pointerEvents: 'none',
                            }}
                            variant="outlined"
                        />
                    </div>
                    <TableContainer>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Sản Phẩm</TableCell>
                                    <TableCell>Số Lượng</TableCell>
                                    <TableCell>Giá Tiền</TableCell>
                                    <TableCell>Ghi Chú SP</TableCell>
                                    <TableCell>Tổng Tiền SP</TableCell>
                                    <TableCell>Xóa Bill</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{resultUpdateBill}</TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label
                            for="ghiChu"
                            style={{
                                fontSize: '17px',
                                marginBottom: '0px',
                                fontWeight: '600',
                            }}
                        >
                            Ghi chú đơn hàng
                        </label>
                        <TextareaAutosize
                            placeholder="Ghi chú đơn hàng"
                            rowsMax={3}
                            rowsMin={3}
                            id="ghiChu"
                            value={ghiChu}
                            onChange={(e) => {
                                setGhiChu(e.target.value)

                                _arrDonHang[indexBill].Ghichu = e.target.value
                            }}
                            style={{
                                paddingLeft: '7px',
                                paddingTop: '5px',
                                fontSize: '17px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <h5 style={{ marginBottom: '0' }}>Thành Tiền: </h5>
                        <input
                            type="text"
                            style={{
                                border: 'none',
                                outline: 'none',
                                fontSize: '20px',
                                margin: '0 10px',
                                borderBottom: '1px solid gray',
                            }}
                            placeholder="Thành tiền"
                            value={thanhTien}
                            onChange={(e) => {
                                setThanhTien(e.target.value)
                                _arrDonHang[indexBill].ThanhTien = +e.target
                                    .value
                            }}
                            onBlur={(e) =>
                                setThanhTien(
                                    `${formatNumber(e.target.value)} VNĐ`
                                )
                            }
                            onFocus={(e) => {
                                setThanhTien(
                                    e.target.value.replace(/VNĐ|,| /gi, '')
                                )
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                    >
                        <AddCircleOutlineIcon
                            style={{ fontSize: '40px', cursor: 'pointer' }}
                            onClick={() => {
                                setAddHeightScroll(addHeightScroll + 12)

                                // khởi tạo 1 object bill mới
                                // là sản phẩm đầu tiên của danh sách sản phẩm hiện tại
                                const objectNewBill = {
                                    _id: '',
                                    name: '',
                                    price: 0,
                                    amount: 0,
                                    amountAlert: 0,
                                    Donvi: '',
                                    NhaCC: '',
                                    GiaNhap: 0,
                                    Time: '',
                                    IDSp: 0,
                                    SDTNhaCC: '',
                                    pricesum: 0,
                                    soluongBan: 0,
                                    Ghichu: '',
                                }

                                // dispatch({
                                //     type: AddBill,
                                //     value: objectNewBill,
                                // })

                                _arrDonHang[indexBill].lstSanPham.push(
                                    objectNewBill
                                )

                                RenderUIUpdateBill(
                                    _arrDonHang[indexBill].lstSanPham
                                )
                            }}
                        />

                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    //Loại bỏ các thuộc tính ko cần thiết
                                    const objectNewBillPOST = {
                                        _id: _arrDonHang[indexBill]._id,
                                        TenKhach:
                                            _arrDonHang[indexBill].TenKhach,
                                        DiaChiKhach:
                                            _arrDonHang[indexBill].DiaChiKhach,
                                        SDTKhach:
                                            _arrDonHang[indexBill].SDTKhach,
                                        ThanhTien:
                                            _arrDonHang[indexBill].ThanhTien,
                                        Ghichu: ghiChu,
                                        lstSanPham:
                                            _arrDonHang[indexBill].lstSanPham,
                                    }

                                    updateBill(objectNewBillPOST)
                                    setShowModalUpdateBill(false)
                                }}
                            >
                                Cập Nhật
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    marginLeft: '8px',
                                }}
                                onClick={() => {
                                    OnRefresh()
                                    setShowModalUpdateBill(false)
                                }}
                            >
                                Hủy Bỏ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function handleSearch(valueSearch, nameFilter) {
        // Nếu chuỗi tìm kiếm rỗng thì trả về toàn bộ ds
        if (!valueSearch) {
            RenderUIAllDonHang(_arrDonHang)
            return
        }

        const len = _arrDonHang.length
        var arrUI = []

        //Chuỗi text cần tìm
        const reg = new RegExp(removeTones(valueSearch.toLowerCase()))

        switch (nameFilter) {
            case 'Theo tên khách hàng':
                for (var i = 0; i < len; ++i) {
                    if (
                        reg.exec(
                            removeTones(_arrDonHang[i].TenKhach.toLowerCase())
                        )
                    ) {
                        arrUI.push(_arrDonHang[i])
                    }
                }

                RenderUIAllDonHang(arrUI)
                break
            case 'Theo tên sản phẩm':
                handleShow()
                setMessLoading('Đang tìm kiếm!')

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }

                let _URL = URL_API + 'DonHangTheoTenSP?input=' + valueSearch

                NetWorking(_URL, requestOptions)
                    .then((res) => {
                        handleClose()
                        if (res.success) RenderUIAllDonHang(res.data)
                    })
                    .catch((e) => {
                        alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                        handleClose()
                    })

                break
            default:
                break
        }
    }

    function handleFilterDate(date) {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + '/DonHangTheoNgay?date=' + date
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    _arrDonHang = res.data
                    RenderUIAllDonHang(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                handleClose()
            })
    }

    return (
        <>
            <ModalUpdateBill />
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
                        {textMessage}
                    </Alert>
                </Snackbar>

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

                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        onChange={(e) => {
                            setValueSearch(e.target.value)
                        }}
                        value={valueSearch}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e.target.value, nameFilterSearch)
                            }
                        }}
                        style={{
                            height: 50,
                            marginLeft: '30px',
                            marginRight: '30px',
                            width: 350,
                        }}
                        placeholder={nameFilterSearch}
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
                                    setNameFilterSearch('Theo tên khách hàng')
                                }}
                            >
                                Theo tên khách hàng
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={(e) => {
                                    setNameFilterSearch('Theo tên sản phẩm')
                                }}
                            >
                                Theo tên sản phẩm
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <FormControlLabel
                        style={{ marginLeft: '10px' }}
                        control={
                            <Checkbox
                                color="primary"
                                defaultChecked={true}
                                onChange={(e) => {
                                    setCheckedView(e.target.checked)
                                    if (e.target.checked) OnRefresh()
                                }}
                                checked={checkedView}
                            />
                        }
                        label="Xem toàn bộ"
                    />

                    <TextField
                        variant="outlined"
                        id="date"
                        label="Ngày Muốn Xem"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{
                            width: 200,
                            marginLeft: 30,
                            height: 50,
                            color: resources.colorPrimary,
                            alignSelf: 'flex-start',
                            display: checkedView ? 'none' : 'block',
                            pointerEvents: 'none',
                        }}
                        onChange={(e) => {
                            setState({ ...state, DateTimKiem: e.target.value })
                            handleFilterDate(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                setState({
                                    ...state,
                                    DateTimKiem: e.target.value,
                                })
                                handleFilterDate(e.target.value)
                            }
                        }}
                        defaultValue="2017-05-24"
                        value={DateTimKiem}
                    />

                    <FontAwesomeIcon
                        style={{ marginLeft: 30, cursor: 'pointer' }}
                        onClick={(e) => {
                            setMessLoading(' Đang Tải Thông Tin Đơn Hàng!')
                            OnRefresh()
                            setCheckedView(true)
                        }}
                        color={resources.colorPrimary}
                        size="3x"
                        icon={faSyncAlt}
                    />
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
                        maxHeight: '450px',
                        width: '93%',
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Thời Gian Giao Dịch</TableCell>
                                <TableCell>Tên Khách</TableCell>
                                <TableCell>Thành Tiền</TableCell>
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
                    size="xl"
                    show={stateModal.open}
                    onHide={() => setStateModal({ ...stateModal, open: false })}
                >
                    <Modal.Body
                        style={{
                            overflow: 'hidden',
                            padding: '0',
                        }}
                    >
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
                            onClick={(e) =>
                                setStateModal({ ...stateModal, open: false })
                            }
                        >
                            Huỷ Bỏ
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default LichSuGiaoDich
