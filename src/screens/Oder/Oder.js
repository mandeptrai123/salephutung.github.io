import React, { useState, useEffect, useRef } from 'react'
// import css
import './css/Oder.css'
//import component
import InputText from '../../resource/InputText/InputText'
import { Modal, Button, Spinner } from 'react-bootstrap'
import resources from '../../resource/color/ColorApp'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import NetWorking from '../../networking/fetchWithTimeout'
import { Autocomplete } from '@material-ui/lab'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useSelector, useDispatch } from 'react-redux'

//Action
import {
    AllSanPham,
    GetAllKhachHang,
    AddNewKhachHang,
} from '../../Redux/ActionType'

//import component in bill
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PrintedDonHang from '../Print/PrintedDonHang'

import _ from 'lodash'

var itemSelected
let arr_Cart = []
var _tienkhachno = 0
var _tongtien = 0
var _thanhtien = 0

function TienVietNam(input) {
    var x = parseInt(input)
    x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    return x
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}
function Oder() {
    //redux hook
    const dispatch = useDispatch()
    const HoTenNV = useSelector((state) => state.HoTen)
    const arrAllSP = useSelector((state) => state.AllSanPham)
    const arrAllKhachHang = useSelector((state) => state.AllKhachHang)
    //Modal Loading
    const [show, setShow] = useState(false)
    const [txtButtonNegative, settxtButtonNegative] = useState('OK')
    // Hiệu Chỉnh
    const [showHieuChinh, setShowHieuChinh] = useState(false)
    const [soluongBan, setsoluongBan] = useState('')
    const [ghichuDonHang, setghichuDonHang] = useState('')
    // Thong Bao Sau Khi Dat Hang
    //const [showResultOrder, setShowResultOrder] = useState(false);
    // Khách Lẻ
    const [isCheck, setChecked] = useState(false)

    const [messLoading, setMessLoading] = useState(
        '   Đang Tải Thông Tin Khách, Đợi Chút Nhé'
    )

    const [contentSearch, setContentSearch] = useState('')
    const [sodienthoai, setSoDienThoai] = useState('')
    const [diachi, setDiaChi] = useState('')
    const [tenkhach, setTenKhach] = useState('')
    // List Này Dành Cho Bảng Tìm Kiếm
    const [resultList, setResultSearch] = useState([])
    // List Này Dành Cho Bảng Giỏ Hàng
    const [resultCart, setResultCart] = useState([])
    const [thanhtien, setThanhTien] = useState(0)
    const [ghichu, setGhiChu] = useState('')

    //Response
    const [messResponse, setMessResponse] = useState('')
    const [showResponse, setShowResponse] = useState(false)

    const [ValueName, setValueName] = useState('')
    const [ValueSDT, setValueSDT] = useState('')
    const [ValueDiaChi, setValueDiaChi] = useState('')
    const [dateOrder, setDateOrder] = useState(
        new Date().getFullYear() +
            '-' +
            (parseInt(new Date().getMonth()) + 1) +
            '-' +
            new Date().getDate()
    )

    //state modal điền số lượng sản phầm
    const [showModalDienSoLuongSP, setShowModalDienSoLuongSP] = useState()

    //Lưu _id sản phẩm khi nhấn chọn
    const [idSanPham, setIdSanPham] = useState()

    //Lưu obj sản phẩm khi nhấn chọn
    const [objSanPham, setObjSanPham] = useState()

    const [_responseSanPham, set_responseSanPham] = useState([])

    //state chứa toàn bộ component ItemSanPham
    const [UIAllSanPham, setUIAllSanPham] = useState()

    //Su li in bill
    const componentRef = useRef(null)
    const [stateModal, setStateModal] = useState({
        open: false,
        itemSelected: null,
    })

    // Input Nhap So Luong Da Chon
    const inputSoluongDaChon = useRef()

    //Thêm thuộc tính cho api đặt hàng
    //Hoàng code
    const [doanhThu, setDoanhThu] = useState(0)

    function handleClickPrint(item) {
        setStateModal({ ...stateModal, open: true, itemSelected: item })
    }

    function ItemCart(props) {
        return (
            <TableRow hover>
                <TableCell style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {props.name}
                </TableCell>
                <TableCell>
                    <TextField
                        style={{ width: 30, fontSize: 16, fontWeight: 'bold' }}
                        onChange={(e) => {
                            var _index = arr_Cart.findIndex(
                                (i) => i._id == props._id
                            )
                            arr_Cart[_index].soluongBan = +e.target.value
                            RenderKetQuaGioHang(arr_Cart)
                        }}
                        value={props.soluongBan}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        style={{ width: 80, fontSize: 16, fontWeight: 'bold' }}
                        onChange={(e) => {
                            var _index = arr_Cart.findIndex(
                                (i) => i._id === props._id
                            )
                            arr_Cart[_index].price = e.target.value
                            RenderKetQuaGioHang(arr_Cart)
                        }}
                        onBlur={(e) => {}}
                        value={
                            parseInt(props.price) % 1 === 0 ? props.price : ''
                        }
                    />
                </TableCell>
                <TableCell style={{ fontSize: 16, fontWeight: 'bold' }}>
                    {parseInt(
                        TienVietNam(
                            parseInt(props.price) * parseInt(props.soluongBan)
                        )
                    ) %
                        1 ===
                    0
                        ? TienVietNam(
                              parseInt(props.price) * parseInt(props.soluongBan)
                          )
                        : 0}
                </TableCell>
                <TableCell style={{ padding: '0' }}>
                    <TextareaAutosize
                        placeholder="Ghi chú sản phẩm"
                        rowsMax={3}
                        rowsMin={3}
                        onChange={(e) => {
                            var _index = arr_Cart.findIndex(
                                (i) => i._id == props._id
                            )
                            //Điền ghi chú trong 1 sản phẩm
                            arr_Cart[_index].Ghichu = e.target.value
                            RenderKetQuaGioHang(arr_Cart)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <FontAwesomeIcon
                        style={{
                            alignSelf: 'center',
                            width: 50,
                            marginLeft: 20,
                            marginTop: 20,
                        }}
                        color={resources.colorPrimary}
                        size={'2x'}
                        icon={faTrash}
                        onClick={(e) => {
                            _.remove(arr_Cart, function (e) {
                                return e._id === props._id
                            })
                            RenderKetQuaGioHang(arr_Cart)
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    function GetAllSanPham() {
        setShow(true)
        setMessLoading('Đang Tải Sản Phẩm Đợi Chút Nhé!')

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const _URL = 'https://phutungserver.herokuapp.com/sanpham/ToanBoSanPham'
        NetWorking(_URL, requestOptions)
            .then(async (result) => {
                setShow(false)

                //fetch đc api get all sp thành công
                if (result.success) {
                    //Thêm tất cả sp vào store
                    await dispatch({
                        type: AllSanPham,
                        dataSanPham: result.data,
                    })

                    RenderUIToanBoSanPham(result.data)
                }
            })
            .catch((error) => {
                console.log('lỗi', error)

                setShow(false)
            })
    }

    function RenderUIToanBoSanPham(data) {
        var soLuongSanPhamCanRender = 0
        setUIAllSanPham(
            data.map((e) => {
                soLuongSanPhamCanRender++
                if (soLuongSanPhamCanRender < 21) {
                    return ItemSanPham(e)
                }
            })
        )
    }

    function ItemSanPham(props) {
        return (
            <TableRow hover>
                <TableCell width={40} style={{ fontSize: 12 }}>
                    {props.name}
                </TableCell>
                <TableCell width={40} style={{ fontSize: 12 }}>
                    {props.amount}
                </TableCell>
                <TableCell width={40} style={{ fontSize: 12 }}>
                    {TienVietNam(props.price)}
                </TableCell>
                <TableCell width={40} style={{ fontSize: 12 }}>
                    <Button
                        onClick={(e) => {
                            if (props.amount > 0) {
                                // Lưu state id sản phẩm vừa đc nhấn chọn
                                setIdSanPham(props._id)

                                //Lưu obj sản phẩm khi click vào mỗi một item sản phẩm
                                setObjSanPham(props)

                                // Show modal điền số lượng sản phẩm khi nhấn chọn sản phẩm
                                setShowModalDienSoLuongSP(true);
                                //inputSoluongDaChon.current.autoFocus = true;
                            } else {
                                setStateSnackbar({
                                    ...stateSnackbar,
                                    openSnackbar: true,
                                    isSuccess: false,
                                    messSnackbar: 'Số Lượng Hiện Tại Nhỏ Hơn 1',
                                })
                            }
                        }}
                    >
                        Chọn
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function Handle_AddToCart(_id) {
        //Tìm sản phẩm có id vừa đc nhấn chọn
        var _item
        arrAllSP.forEach((e) => {
            if (e._id == _id) {
                _item = { ...e }
                return
            }
        })

        if (_item.amount < soluongBan) {
            setShowHieuChinh(false)
            setMessResponse('Số Lượng Trong Kho Không Đủ !')
            setShowResponse(true)
            return false
        }

        // Tìm Xem Trong Giỏ Hàng Đã Có Sản Phẩm Này Chưa
        var indexAlready = arr_Cart.findIndex((e) => e._id === _id)
        if (indexAlready > -1) {
            setMessLoading('Đã Thêm Sản Phẩm Này Rồi !')
            setShow(true)
            return false
        } else {
            arr_Cart.push(_item)
        }
        TinhToanThanhTien()
        RenderKetQuaGioHang(arr_Cart)
        handleHideHieuChinh()
    }

    function TinhToanThanhTien() {
        // Tính Toán Thành Tiền
        var _sum = 0

        arr_Cart.map((e) => {
            _sum += e.price * e.soluongBan //Tính tổng tiền tất cả sản phẩm
            e.pricesum = e.price * e.soluongBan // tính tổng tiền trên mỗi sản phẩm
            return _sum
        })

        _tongtien = _sum

        _thanhtien = _tongtien - _tienkhachno
        setThanhTien(TienVietNam(_thanhtien))
    }

    function RenderKetQuaGioHang(arr) {
        setResultCart(
            arr.map((e) => {
                return ItemCart(e)
            })
        )
        TinhToanThanhTien()
    }

    // Kiểm Tra Thông Tin Khách Hàng .
    async function isValidData() {
        if (tenkhach == '' && ValueName == '') {
            setStateSnackbar({
                ...stateSnackbar,
                isSuccess: false,
                messSnackbar: 'Vui Lòng Điền Tên !',
                openSnackbar: true,
            })
            return false
        }

        // if (sodienthoai == '' && ValueSDT == '') {
        //     setStateSnackbar({
        //         ...stateSnackbar,
        //         openSnackbar: true,
        //         isSuccess: false,
        //         messSnackbar: 'Vui Lòng Điền Số Điện Thoại !',
        //     })
        //     return false
        // }

        // if (diachi == '' && ValueDiaChi == '') {
        //     setStateSnackbar({
        //         ...stateSnackbar,
        //         openSnackbar: true,
        //         isSuccess: false,
        //         messSnackbar: 'Vui Lòng Điền Địa Chỉ !',
        //     })
        //     return false
        // }

        if (dateOrder == null) {
            setStateSnackbar({
                ...stateSnackbar,
                openSnackbar: true,
                isSuccess: false,
                messSnackbar: 'Vui Lòng Điền Ngày Đặt Hàng !',
            })
            return false
        }

        return true
    }

    function XuLiThongTinKhach() {
        var d = new Date();

        var _itemRq = {
            SDTNV: '0969025915',
            NameNV: 'Man',
            TenKhach: tenkhach,
            DiaChiKhach: diachi,
            SDTKhach: sodienthoai,
            TongTien: _tongtien,
            ThanhTien: _thanhtien,
            Congno: _tienkhachno,
            TimeOfDay: d.getHours() + ':' + d.getMinutes(),
            TraNo: 0,
            lstSanPham: arr_Cart,

            /*Hoàng code, các thuộc tính cần thêm vào api đặt hàng */
            doanhthu: doanhThu,
        }

        return _itemRq
    }

    async function DatHang() {
        settxtButtonNegative('OK')
        setMessLoading('    Đang Tiến Hành Đặt Hàng, Đợi Chút Nhé')
        handleShow()

        // Kiem Tra Data Truoc Khi Gui
        var isValid = await isValidData()
        if (!isValid) {
            handleClose()
            return
        }
        var _d = new Date()
        // Xem object request từ document của back-
        var itemRequest = XuLiThongTinKhach()
        itemRequest.Ghichu = ghichu

        var month =
            _d.getMonth() + 1 > 9
                ? _d.getMonth() + 1
                : '0' + (_d.getMonth() + 1)
        var date = _d.getDate() > 9 ? _d.getDate() : '0' + _d.getDate()

        itemRequest.Date = dateOrder

        var hours = _d.getHours() > 9 ? _d.getHours() : '0' + _d.getHours()
        var minutes =
            _d.getMinutes() > 9 ? _d.getMinutes() : '0' + _d.getMinutes()
        var milis =
            _d.getMilliseconds() > 9
                ? _d.getMilliseconds()
                : '0' + _d.getMilliseconds()

        itemRequest.Time = hours + ':' + minutes + ':' + milis
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemRequest),
        }
        let _URL = 'https://phutungserver.herokuapp.com/donhang/ThemDonHang'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()

                if (res.success) {
                    // Khi đặt hàng thành công thì thực hiện in bill
                    // Tạo obj bill để in bill
                    const objBill = {
                        TenKhach: tenkhach,
                        DiaChiKhach: diachi,
                        SDTKhach: sodienthoai,
                        lstSanPham: arr_Cart,
                        Date: itemRequest.Date,
                    }
                    handleClickPrint(objBill)

                    // Kiểm tra có p là khách hàng mới không, thêm vào store
                    const sdtK = sodienthoai
                    const dcK = diachi
                    const tenK = tenkhach
                    if (arrAllKhachHang.findIndex((e) => e.Name === objBill.TenKhach) < 0) {
                        dispatch({
                            type: AddNewKhachHang,
                            dataNewKhachHang: {
                                SDT: sdtK,
                                DiaChi: dcK,
                                Name: tenK,
                                Congno: 0,
                                LichSuMuaHang: [],
                            },
                        })
                    }else
                    {

                    }

                    setResultCart([])
                    setGhiChu('')
                    setThanhTien(0)
                    setResultSearch([])
                    setChecked(false)
                    setTenKhach('')
                    setDiaChi('')
                    setSoDienThoai('')

                    setValueSDT('')
                    setValueDiaChi('')
                    setValueName('')

                    _tienkhachno = 0
                    _thanhtien = 0
                    _tongtien = 0
                } else {
                    setStateSnackbar({
                        ...stateSnackbar,
                        messSnackbar:
                            'Có Sự Cố , Vui Lòng Liên Hệ Bên Kỹ Thuật !',
                        isSuccess: false,
                        openSnackbar: true,
                    })
                }
            })
            .catch((e) => {
                handleClose()
                setMessResponse(
                    'Có Vấn Đề Về Internet ! Vui Lòng Thử Lại !: ' + e
                )
                setShowResponse(true)
            })
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleHideHieuChinh = () => setShowHieuChinh(false)
    const handleOpenHieuChinh = () => setShowHieuChinh(true)

    function GetAllKhachHang() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL =
            'https://phutungserver.herokuapp.com/khachhang/ToanBoKhachHang'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    dispatch({
                        type: 'GetAllKhachHang',
                        dataKhachHang: res.data,
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }

    useEffect(() => {
        GetAllSanPham()
        GetAllKhachHang()
    }, [])

    // Handle Popup Snackbar + Manage State
    //#region
    function handleCloseSnackbar() {}

    const [stateSnackbar, setStateSnackbar] = useState({
        messSnackbar: '',
        openSnackbar: false,
        isSuccess: false,
    })
    //#endregion

    function TimKhachHang(sdt) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL =
            'https://phutungserver.herokuapp.com/khachhang/TimKhachHang?SDT=' +
            sdt

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    if (res.data != null) {
                        setDiaChi(res.data.DiaChi)
                        setTenKhach(res.data.Name)
                    } else {
                        setDiaChi('')
                        setTenKhach('')
                    }
                    handleClose()
                }
            })
            .catch((e) => {
                alert(e)
                handleClose()
            })
    }

    function ModalDienSoLuongSP() {
        const [soLuongSanPhamDaChon, setSoLuongSanPhamDaChon] = useState(1)
        return (
            <Modal
                show={showModalDienSoLuongSP}
                onHide={() => setShowModalDienSoLuongSP(false)}
            >
                <Modal.Header closeButton>
                    <h5>Điền số lượng sản phẩm</h5>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        
                        id="outlined-basic"
                        label="Số lượng"
                        margin="normal"
                        autoFocus={true}
                        type="number"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={(e) => {
                            setSoLuongSanPhamDaChon(e.target.value)
                        }}
                        autoFocus
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleClickThemSanPham(soLuongSanPhamDaChon)
                            }
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClickThemSanPham(soLuongSanPhamDaChon)
                        }}
                    >
                        Thêm sản phẩm
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function ModalShowBill() {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                show={stateModal.open}
            >
                <Modal.Body
                    style={{
                        overflow: 'hidden',
                        padding: '0',
                    }}
                >
                   {false && <PrintedDonHang
                    
                        ref={componentRef}
                        item={stateModal.itemSelected}
                    />}
                </Modal.Body>
                <Modal.Footer>
                    <ReactToPrint
                        trigger={() => <Button>In</Button>}
                        content={() => componentRef.current}
                    />
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            setStateModal({ ...stateModal, open: false })
                        }}
                    >
                        Hủy Bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function handleClickThemSanPham(soLuongSanPhamDaChon) {
        setShowModalDienSoLuongSP(false)

        //sau khi điền sl sp thì thêm vào giỏ hàng
        if (idSanPham) {
            //Kiểm tra số lượng nhập vào có nhỏ hơn số lượg đang có hay k
            //Kiểm tra số lượng > 0
            if (
                objSanPham.amount < soLuongSanPhamDaChon ||
                soLuongSanPhamDaChon < 0
            ) {
                setStateSnackbar({
                    ...stateSnackbar,
                    messSnackbar:
                        soLuongSanPhamDaChon < 0
                            ? 'Số lượng phải lớn hơn 0'
                            : 'Số lượng hiện tại không đủ !',
                    isSuccess: false,
                    openSnackbar: true,
                })
                return
            }
            //Kiểm tra đã thêm sản phẩm này vào giỏ hàng hay chưa,
            //hoặc kiểm tra số lượng hàng có đủ hay không
            if (Handle_AddToCart(idSanPham) == false) {
                return
            }
            var _index = arr_Cart.findIndex((i) => i._id == idSanPham)
            arr_Cart[_index].soluongBan = +soLuongSanPhamDaChon
            setsoluongBan(arr_Cart[_index].soluongBan)
            RenderKetQuaGioHang(arr_Cart)
        }
    }

    return (
        <section
            style={{ marginLeft: 20, marginRight: 40 }}
            className="oder-container"
        >
            <ModalDienSoLuongSP />
            <ModalShowBill />

            <header className="oder-header">
                <div style={{ color: resources.colorPrimary, margin: 10 }}>
                    Thông Tin Khách Hàng
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginRight: 10,
                        marginLeft: 10,
                        padding: 10,
                    }}
                    className="container-input"
                >
                    <div className="input-content">
                        <Autocomplete
                            id="combo-box-khach"
                            freeSolo={true}
                            options={arrAllKhachHang}
                            getOptionLabel={(option) => option.Name}
                            style={{ width: 200 }}
                            inputValue={tenkhach}
                            onInputChange={(event, newInputValue) => {
                                setTenKhach(newInputValue)
                                //     setValueName(newInputValue)
                                //     if (newInputValue != null) {
                                //         for (
                                //             var i = 0;
                                //             i < arrAllKhachHang.length;
                                //             i++
                                //         ) {
                                //             if (
                                //                 arrAllKhachHang[i].Name ==
                                //                 newInputValue
                                //             ) {
                                //                 setSoDienThoai(arrAllKhachHang[i].SDT)
                                //                 setValueSDT(arrAllKhachHang[i].SDT)

                                //                 setDiaChi(arrAllKhachHang[i].DiaChi)
                                //                 setValueDiaChi(
                                //                     arrAllKhachHang[i].DiaChi
                                //                 )
                                //                 break
                                //             }
                                //         }
                                //     }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tên Khách"
                                    value={tenkhach}
                                    onChange={(e) => {
                                        setTenKhach(e.target.value)
                                        // if (ValueName != null) {
                                        //     var obj = _.find(
                                        //         arrAllKhachHang,
                                        //         function (e) {
                                        //             return e.Name == ValueName
                                        //         }
                                        //     )
                                        //     if (obj != null) {
                                        //         setValueSDT(obj.SDTKhach)
                                        //         setValueDiaChi(obj.DiaChiKhach)
                                        //     } else {
                                        //         setValueSDT('')
                                        //         setValueDiaChi('')
                                        //     }
                                        // }
                                    }}
                                    variant="outlined"
                                />
                            )}
                        />
                    </div>

                    <div className="input-content">
                        {/* <Autocomplete
                            freeSolo={true}
                            id="combo-box-sdt"
                            // arrAllKhachHang.slice(0, 20)  
                            options={[1, 2, 3]}
                            inputValue={ValueSDT}
                            // getOptionLabel={(option) => option.SDT}
                            style={{ width: 200, marginLeft: 50 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ height: 50, marginRight: 30 }}
                                    onChange={(e) => {
                                        setValueSDT(e.target.value)
                                    }}
                                    label="Số Điện Thoại"
                                    variant="outlined"
                                    value={ValueSDT}
                                />
                            )}
                        /> */}
                        <TextField
                            style={{ height: 50, marginRight: 30 }}
                            onChange={(e) => {
                                setSoDienThoai(e.target.value)
                            }}
                            label="Số Điện Thoại"
                            variant="outlined"
                            value={sodienthoai}
                        />
                    </div>

                    <div className="input-content">
                        {/* <Autocomplete
                            freeSolo={true}
                            id="combo-box-diachi"
                            // onInputChange={(event, newInputValue) => {
                            //     setDiaChi(newInputValue)
                            // }}
                            inputValue={ValueDiaChi}
                            // options={arrAllKhachHang.slice(0, 20)}
                            options={[1, 2, 3, 4]}
                            // getOptionLabel={(option) => option.DiaChi}
                            style={{ width: 200, marginLeft: 50 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    style={{ height: 50, marginRight: 30 }}
                                    onChange={(e) => {
                                        setValueDiaChi(e.target.value)
                                    }}
                                    value={ValueDiaChi}
                                    variant="outlined"
                                    label="Địa Chỉ"
                                />
                            )}
                        /> */}
                        <TextField
                            style={{ height: 50, marginRight: 30 }}
                            onChange={(e) => {
                                setDiaChi(e.target.value)
                            }}
                            value={diachi}
                            variant="outlined"
                            label="Địa Chỉ"
                        />
                    </div>

                    <TextField
                        id="date"
                        required={true}
                        label="Ngày Đặt Hàng"
                        type="date"
                        defaultValue={dateOrder}
                        style={{
                            marginLeft: 30,
                            marginTop: 5,
                            color: resources.colorPrimary,
                        }}
                        onChange={(e) => {
                            var _d = new Date(e.target.value)
                            setDateOrder(
                                _d.getFullYear() +
                                    '-' +
                                    (parseInt(_d.getMonth()) + 1) +
                                    '-' +
                                    _d.getDate()
                            )
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />

                    <div
                        style={{
                            marginLeft: 30,
                            paddingLeft: 20,
                            fontWeight: 'bold',
                            color: resources.colorPrimary,
                        }}
                    >
                        Tên Nhân Viên: {HoTenNV}
                    </div>
                </div>

                <div style={{ margin: 20, display: 'flex' }}>
                    {/* <FontAwesomeIcon
                style={{position:'absolute',right:420}}   
                onClick={e=>{
                    setResultCart("");
                    setThanhTien(0);
                    setTienKhachNo(0);
                    arr_Cart  = [];
                    }} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
                <div
                 style={{color:resources.colorPrimary,padding:5,position:'absolute',right:270}}
                >
                    Làm mới giỏ hàng !
                </div> */}
                </div>
            </header>

            <div className="find-product">
                <input
                    onChange={(e) => {
                        var textSearch = e.target.value
                        const reg = new RegExp(textSearch.toLowerCase())

                        var max20SanPhamSearch = 0
                        setUIAllSanPham(
                            arrAllSP.map((e) => {
                                if (reg.test(e.name.toLowerCase())) {
                                    //Do dữ liệu nhiều nên render 20 sản phẩm khi search
                                    max20SanPhamSearch++
                                    if (max20SanPhamSearch < 21) {
                                        return ItemSanPham(e)
                                    }
                                }
                            })
                        )
                    }}
                    style={{
                        color: resources.colorPrimary,
                        width: 300,
                        position: 'absolute',
                        left: 35,
                        marginTop: 15,
                        height: 50,
                        top: 140,
                        paddingLeft: 20,
                    }}
                    type="text"
                    placeholder="Nhập sản phẩm cần tìm"
                />
            </div>

            <section className="container-content">
                <div
                    className="content-left"
                >
                    <div className="content-left__find-product">

                        <TableContainer
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                fontSize: 10,
                                                maxWidth: '30',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Tên Sản Phẩm
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 10,
                                                maxWidth: '30',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Số Lượng Đang Có
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 10,
                                                maxWidth: '30',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Giá Bán
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 10,
                                                maxWidth: '30',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Điều Chỉnh
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{UIAllSanPham}</TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

                <div style={{ height: 800, width: '60%', margin: 10 }}>
                    <div
                        style={{ height:"70%",width: '100%' }}
                        className="content-right__price"
                    >
                        <TableContainer
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                fontSize: 12,
                                                maxWidth: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Tên Sản Phẩm
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 12,
                                                maxWidth: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Số Lượng
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 12,
                                                maxWidth: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Đơn Giá
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 12,
                                                maxWidth: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Tổng Tiền
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontSize: 12,
                                                maxWidth: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Ghi Chú
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>{resultCart}</TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div style={{ width: 200 }}>
                    <div
                        style={{
                            width: '100%',
                            marginLeft: 20,
                            fontSize: 20,
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 20,
                        }}
                        className="total-price"
                    >
                        Thành tiền
                    </div>
                    <div
                        style={{
                            marginLeft: 20,
                            textAlign: 'center',
                            fontSize: 24,
                            color: 'red',
                            paddingLeft: 10,
                        }}
                        className="price"
                    >
                        {parseInt(thanhtien) % 1 === 0 ? thanhtien : 0}
                    </div>
                    <TextField
                        value={ghichu}
                        onChange={(e) => {
                            setGhiChu(e.target.value)
                        }}
                        variant="outlined"
                        style={{
                            width: 250,
                            height: 200,
                            paddingLeft: 15,
                            marginTop: 40,
                            alignSelf: 'center',
                            marginLeft: 15,
                        }}
                        placeholder={'Ghi Chú Đơn Hàng'}
                    />
                    <div className="content-right__submit">
                        <button
                            style={{
                                backgroundColor: resources.colorPrimary,
                                color: 'white',
                            }}
                            onClick={(e) => DatHang()}
                            type="button"
                            className="btn-submit"
                        >
                            Đặt Hàng
                        </button>
                    </div>
                </div>
            </section>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
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
                show={showHieuChinh}
                onHide={handleHideHieuChinh}
            >
                <Modal.Body>
                    <Modal.Title>
                        <h4>Số Lượng Bán</h4>
                        <TextField
                            value={soluongBan}
                            onChange={(e) => {
                                try {
                                    let _num = parseInt(e.target.value)
                                    if (isNaN(_num)) {
                                        setsoluongBan('')
                                    } else {
                                        setsoluongBan(e.target.value)
                                    }
                                } catch (e) {
                                    alert('Vui Lòng Ghi Đúng Số Lượng !')
                                }
                            }}
                            variant="outlined"
                        />
                        <h4>Ghi Chú</h4>
                        <TextField
                            onChange={(e) => setghichuDonHang(e.target.value)}
                            value={ghichuDonHang}
                            variant="outlined"
                        />
                    </Modal.Title>
                    <Modal.Footer>
                        <Button onClick={(e) => Handle_AddToCart()}>
                            Thêm Giỏ Hàng
                        </Button>
                        <Button onClick={(e) => handleHideHieuChinh()}>
                            Huỷ
                        </Button>
                    </Modal.Footer>
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
                            }}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            <Snackbar
                open={stateSnackbar.openSnackbar}
                autoHideDuration={2000}
                onClose={() => {
                    setStateSnackbar({ ...stateSnackbar, openSnackbar: false })
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={stateSnackbar.isSuccess ? 'success' : 'error'}
                >
                    {stateSnackbar.messSnackbar}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default Oder
