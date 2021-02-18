import React, { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    SaveObjectBill,
    DeleteItemBill,
    AddBill,
    UpdateItemBill,
    UpdateValueItemBill,
} from '../../../Redux/ActionType'

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

import ReactToPrint, { useReactToPrint } from 'react-to-print'
import PrintedDonHang from '../../Print/PrintedDonHang'
import { Autocomplete } from '@material-ui/lab'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

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
    const arrAllKhachHang = useSelector((state) => state.AllKhachHang)
    const arrAllSanPham = useSelector((state) => state.AllSanPham)
    const objectBill = useSelector((state) => state.objectBill)
    const dispatch = useDispatch()

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

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

    const [nameFilterSearch, setNameFilterSearch] = useState('Tìm tên sản phẩm')
    const [valueSearch, setValueSearch] = useState('')

    //checkbox xem theo ngày
    const [checkedView, setCheckedView] = useState(false)

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
                    <Button
                        variant="contained"
                        style={{
                            marginLeft: '4px',
                        }}
                        onClick={() => {
                            //Khi click chỉnh sửa 1 bill nào đó thì lưu obj đó vào store
                            dispatch({ type: SaveObjectBill, value: props })
                            setShowModalUpdateBill(true)
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    function RenderDonHangTrongNgay(arr) {
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
                handleClose()
                if (res.success) {
                    _arrDonHang = res.data
                    RenderDonHangTrongNgay(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                handleClose()
            })
    }

    function RenderUIUpdateBill(listSP) {
        setResultUpdateBill(
            listSP.map((e, index) => {
                return <ItemUpdateBill data={e} index={index} />
            })
        )
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
                handleClose()
                if (res.success) {
                    // Nếu cập nhật bill mới thành công thì cho refresh lại trang bill
                    OnRefresh()
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Đơn Hàng Trong Ngày ! ')
                handleClose()
            })
    }

    //Cho render lại giao diện bill mỗi khi thêm hay xóa item bill
    useEffect(() => {
        RenderUIUpdateBill(objectBill.lstSanPham)
    }, [objectBill])

    function ItemUpdateBill(props) {
        const [name, setName] = useState(props.data.name)
        const [soluongBan, setSoLuongBan] = useState(props.data.soluongBan)
        const [price, setPrice] = useState(props.data.price)
        const [priceSum, setPriceSum] = useState(
            formatNumber(props.data.pricesum)
        )
        const [ghiChu, setGhiChu] = useState(props.data.Ghichu)

        useEffect(() => {
            setPriceSum(formatNumber(soluongBan * price))
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
                        onInputChange={(event, newInputValue) => {
                            if (!boolsetName) {
                                boolsetName = true
                            } else {
                                setName(newInputValue)

                                var _itemNewAddBill

                                //Kiểm tra xem ng dùng có chọn sản phẩm
                                //trong danh sách sản phẩm hiện có hay ko ?
                                const lengthAllSanPham = arrAllSanPham.length
                                for (var i = 0; i < lengthAllSanPham; i++) {
                                    if (
                                        newInputValue.toLowerCase() ===
                                        arrAllSanPham[i].name.toLowerCase()
                                    ) {
                                        _itemNewAddBill = arrAllSanPham[i]
                                        break
                                    }
                                }

                                // Nếu ko thì thoát ra ngoài
                                if (!_itemNewAddBill) {
                                    return
                                }

                                // Nếu có thì tiếp tục check xem sản phẩm người
                                // dùng vừa chọn đã có trong list bill chưa
                                // Kiểm tra sản phẩm vừa thêm vào bill đã có chưa
                                var isHave = false
                                const len = objectBill.lstSanPham.length
                                for (var i = 0; i < len; i++) {
                                    if (
                                        _itemNewAddBill._id ===
                                        objectBill.lstSanPham[i]._id
                                    ) {
                                        isHave = true
                                        break
                                    }
                                }

                                if (isHave) {
                                    alert(
                                        'Đã có sản phẩm này trong bill, vui lòng chọn sản phẩm khác!'
                                    )
                                    setName('')
                                    setPrice(0)
                                    setSoLuongBan(0)
                                    return
                                } else {
                                    setPrice(_itemNewAddBill.price)
                                    setSoLuongBan(0)
                                    //Thêm 2 thuộc tính tổng tiền và số lượng bán
                                    _itemNewAddBill.pricesum = priceSum
                                    _itemNewAddBill.soluongBan = soluongBan
                                    dispatch({
                                        type: UpdateItemBill,
                                        value: {
                                            objBillUpdate: _itemNewAddBill,
                                            indexBill: props.index,
                                        },
                                    })
                                }
                            }
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
                        }}
                        onBlur={() => {
                            dispatch({
                                type: UpdateValueItemBill,
                                value: {
                                    soluongBan: soluongBan,
                                    price: price,
                                    pricesum: soluongBan * price,
                                    indexBill: props.index,
                                    Ghichu: ghiChu,
                                },
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
                        }}
                        onBlur={(e) => {
                            dispatch({
                                type: UpdateValueItemBill,
                                value: {
                                    soluongBan: soluongBan,
                                    price: price,
                                    pricesum: soluongBan * price,
                                    indexBill: props.index,
                                    Ghichu: ghiChu,
                                },
                            })
                        }}
                    />
                </TableCell>
                <TableCell>
                    <TextareaAutosize
                        placeholder="Ghi chú "
                        rowsMax={3}
                        rowsMin={3}
                        onChange={(e) => {
                            setGhiChu(e.target.value)
                        }}
                        onBlur={() => {
                            dispatch({
                                type: UpdateValueItemBill,
                                value: {
                                    soluongBan: soluongBan,
                                    price: price,
                                    pricesum: soluongBan * price,
                                    indexBill: props.index,
                                    Ghichu: ghiChu,
                                },
                            })
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
                            dispatch({
                                type: DeleteItemBill,
                                value: props.index,
                            })
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    function ModalUpdateBill() {
        const tenKhach = objectBill.TenKhach
        const sdt = objectBill.SDTKhach
        const diaChiKhach = objectBill.DiaChiKhach
        const [thanhTien, setThanhTien] = useState(
            `${formatNumber(objectBill.ThanhTien)} VNĐ`
        )

        // Tính thành tiền mỗi khi xóa hay thêm 1 bill
        // useEffect(() => {
        //     console.log(objectBill)
        //     var sum = 0
        //     objectBill.lstSanPham.forEach((e) => {
        //         sum += e.pricesum
        //     })
        //     setThanhTien(() => `${formatNumber(objectBill.ThanhTien)} VNĐ`)

        //     console.log(objectBill.ThanhTien)
        // }, [objectBill])

        return (
            <div
                style={{
                    display: showModalUpdateBill ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: '0',
                    bottom: '0',
                    right: '0',
                    left: '0',
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
                    <TableContainer
                        style={{
                            maxHeight: '500px',
                        }}
                    >
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Sản Phẩm</TableCell>
                                    <TableCell>Số Lượng</TableCell>
                                    <TableCell>Giá Tiền</TableCell>
                                    <TableCell>Ghi Chú</TableCell>
                                    <TableCell>Tổng Tiền</TableCell>
                                    <TableCell>Xóa Bill</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{resultUpdateBill}</TableBody>
                        </Table>
                    </TableContainer>
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
                                }

                                dispatch({
                                    type: AddBill,
                                    value: objectNewBill,
                                })
                            }}
                        />

                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    //Tính thành tiền trước khi bấm cập nhật
                                    var thanh_tien = 0
                                    objectBill.lstSanPham.map((e) => {
                                        thanh_tien += e.pricesum
                                    })
                                    console.log(thanh_tien)

                                    //Loại bỏ các thuộc tính ko cần thiết
                                    const objectNewBillPOST = {
                                        _id: objectBill._id,
                                        TenKhach: objectBill.TenKhach,
                                        DiaChiKhach: objectBill.DiaChiKhach,
                                        SDTKhach: objectBill.SDTKhach,
                                        ThanhTien: thanh_tien,
                                        lstSanPham: objectBill.lstSanPham,
                                    }

                                    setShowModalUpdateBill(false)
                                    updateBill(objectNewBillPOST)
                                    console.log(objectNewBillPOST)
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
                                    setShowModalUpdateBill(false)
                                    // reset store
                                    dispatch({
                                        type: SaveObjectBill,
                                        value: {
                                            Congno: 0,
                                            Date: '',
                                            DiaChiKhach: '',
                                            Ghichu: '',
                                            IDAction: 0,
                                            NameNV: '',
                                            SDTKhach: '',
                                            SDTNV: '',
                                            TenKhach: '',
                                            ThanhTien: 0,
                                            Time: '',
                                            TimeOfDay: '',
                                            TongTien: 0,
                                            TraNo: 0,
                                            doanhthu: 0,
                                            lstSanPham: [],
                                            _id: '',
                                        },
                                    })
                                    OnRefresh()
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
            RenderDonHangTrongNgay(_arrDonHang)
            return
        }

        const len = _arrDonHang.length
        var arrUI = []

        //Chuỗi text cần tìm
        const reg = new RegExp(valueSearch.toLowerCase())

        switch (nameFilter) {
            case 'Tìm tên khách hàng':
                for (var i = 0; i < len; ++i) {
                    if (reg.exec(_arrDonHang[i].TenKhach.toLowerCase())) {
                        arrUI.push(_arrDonHang[i])
                    }
                }

                RenderDonHangTrongNgay(arrUI)
                break
            case 'Tìm tên sản phẩm':
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
                        if (res.success) {
                            _arrDonHang = res.data
                            RenderDonHangTrongNgay(res.data)
                        }
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
                    console.log(res.data)
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
            <ModalUpdateBill />
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
                style={{ display: 'flex', width: '100%', alignItems: 'center' }}
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
                                setNameFilterSearch('Tìm tên khách hàng')
                            }}
                        >
                            Tìm tên khách hàng
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                setNameFilterSearch('Tìm tên sản phẩm')
                            }}
                        >
                            Tìm tên sản phẩm
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <FormControlLabel
                    style={{ marginLeft: '10px' }}
                    control={
                        <Checkbox
                            color="primary"
                            onChange={(e) => {
                                setCheckedView(e.target.checked)
                                if (!e.target.checked) OnRefresh()
                            }}
                        />
                    }
                    label="Xem theo ngày"
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
                        display: checkedView ? 'block' : 'none',
                    }}
                    onChange={(e) => {
                        setState({ ...state, DateTimKiem: e.target.value })
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setState({ ...state, DateTimKiem: e.target.value })
                            handleFilterDate(e.target.value)
                        }
                    }}
                    value={DateTimKiem}
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
    )
}

export default LichSuGiaoDich
