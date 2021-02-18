import React, { useState, useEffect, useFocus, useRef } from 'react'
// import css
import './css/NhapKho.css'
//import component
import InputText from '../../resource/InputText/InputText'
import { Modal, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import resources from '../../resource/color/ColorApp'
import NetWorking from '../../networking/fetchWithTimeout'
import { Autocomplete } from '@material-ui/lab'

//icon
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

import { TextField } from '@material-ui/core'

import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { AddNewSanPham } from '../../Redux/ActionType'
import _ from 'lodash'

var arr_NhatKy = []
var arr_NhaCC = []
function NhapKho() {
    const [loading, setShowLoading] = useState(false)
    const [mess, setMessLoading] = useState(
        'Đang Thêm Sản Phẩm Vào Kho, Đợi Chút Nhé !'
    )

    const [resultList, setNhatKy] = useState([])

    const [nameSanPham, setNameSanPham] = useState('')
    const [soluong, setSL] = useState('')
    const [soluongbaodong, setSLBaoDong] = useState('')
    const [donvi, setDonVi] = useState('')
    const [dongia, setGiaNhap] = useState('')
    const [dongiaUI, setGiaNhapUI] = useState('')
    const [giaban, setGiaBan] = useState('')
    const [nhacc, setNhaCC] = useState('')
    const [sdtnhacc, setSDTNhaCC] = useState('')
    const [lstnhaCC, setLstNhaCC] = useState([])

    const handleClose = () => setShowLoading(false)
    const handleShow = () => setShowLoading(true)

    const dispatch = useDispatch()

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    const [stateSnackbar, setStateSnackbar] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
        messSnackbar: 'Không Tìm Thấy !',
        isSuccess: false,
    })

    const [valueNhatKy, setTimKiemNhatKy] = useState()
    const [valueNhaCungCap, SelectorNhaCC] = useState('')

    const {
        vertical,
        horizontal,
        open,
        messSnackbar,
        isSuccess,
    } = stateSnackbar

    const NameRef = useRef()
    const DonViRef = useRef()
    const SLRef = useRef()
    const SLBaoDongRef = useRef()
    const DonGiaRef = useRef()
    const GiaBanRef = useRef()
    const NhaCCRef = useRef()
    const SDTNhaCCRef = useRef()

    //valid emptry Tên Sản Phẩm , Số Lượng , Đơn Vị, Giá nhập Sỉ , Giá Bán Lẻ, sl báo động
    const [validEmptyTenSP, setValidEmptyTenSP] = useState(false)
    const [validEmptyDonVi, setValidEmptyDonVi] = useState(false)

    async function isValidInput() {
        // Tránh Rò Rỉ Dữ Liệu Nên Không Gán Trực Tiếp
        var _nameSanPham = nameSanPham
        var _donvi = donvi

        if (_nameSanPham === '') {
            setStateSnackbar({
                ...stateSnackbar,
                open: true,
                messSnackbar: 'Vui Lòng Điền Tên Sản Phẩm !',
            })
            return false
        }

        if (_donvi === '') {
            setStateSnackbar({
                ...stateSnackbar,
                open: true,
                messSnackbar: 'Vui Lòng Điền Đơn Vị !',
            })
            return false
        }

        return true
    }

    async function ThemVaoKho() {
        handleShow()
        var isCheck = await isValidInput()
        if (isCheck) {
            // Tránh Rò Rỉ Dữ Liệu Nên Không Gán Trực Tiếp
            var _nameSanPham = nameSanPham
            var _amount = soluong
            var _amountAlert = soluongbaodong
            var _donvi = donvi
            var _giaban = giaban

            // create object request
            var object_request = {
                name: _nameSanPham,
                price: _giaban,
                amount: new Number(_amount),
                amountAlert: _amountAlert,
                Donvi: _donvi,
                NhaCC: nhacc,
                GiaNhap: dongia,
                SDTNhaCC: sdtnhacc,
            }

            var _index = _.findIndex(arr_NhaCC, function (o) {
                return o.NameNhaCC == nhacc
            })
            if (_index == -1) {
                object_request.isNhaCCMoi = true
                arr_NhaCC.push({ NameNhaCC: nhacc })
            } else {
                object_request.isNhaCCMoi = false
            }

            ThemSanPham(object_request)
        } else {
            handleClose()
        }
    }

    const ITemNhatKy = (props) => {
        return (
            <TableRow hover>
                <TableCell>{props.Time}</TableCell>
                <TableCell>{props.Detail}</TableCell>
            </TableRow>
        )
    }
    function UpdateNhatKy(arr) {
        let maxRender = 0

        const _lst = arr.reverse().map((e) => {
            maxRender++
            if (maxRender < 101) {
                return ITemNhatKy(e)
            }
        })

        setNhatKy(_lst)
    }
    // NetWord
    function LoadingNhatKy() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + 'NhatKySanPham'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    arr_NhatKy = res.data
                    UpdateNhatKy(arr_NhatKy)
                }

                handleClose()
            })
            .catch((e) => {
                setStateSnackbar({
                    ...stateSnackbar,
                    open: true,
                    messSnackbar: 'Lỗi Khi Load Nhật Ký Kho Hàng',
                })
                handleClose()
            })
    }

    useEffect(() => {
        LoadingNhatKy()
        FetchToanBoNhaCC()
    }, [])

    function ThemSanPham(item) {
        //Thoi Gian Them San Pham
        var _date = new Date()

        var _time =
            (_date.getHours() > 9 ? _date.getHours() : '0' + _date.getHours()) +
            ':' +
            (_date.getMinutes() > 9
                ? _date.getMinutes()
                : '0' + _date.getMinutes()) +
            ' ' +
            _date.getDate() +
            '/' +
            _date.getMonth() +
            '/' +
            _date.getFullYear()

        item.Time = _time

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(item),
        }
        let _URL = URL_API + 'ThemSanPham'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    // Reset Field Input
                    setNameSanPham('')
                    setNhaCC('')
                    setSDTNhaCC('')
                    setGiaNhap('')
                    setGiaNhapUI('')
                    setDonVi('')
                    setSL('')
                    setSLBaoDong('')
                    setGiaBan('')

                    setValidEmptyTenSP(false)
                    setValidEmptyDonVi(false)

                    arr_NhatKy = arr_NhatKy.reverse()
                    arr_NhatKy.push({
                        Detail:
                            'Bạn Vừa Thêm ' +
                            item.amount +
                            ' ' +
                            item.Donvi +
                            ' ' +
                            item.name +
                            ' (' +
                            item.NhaCC +
                            ')',
                        Time: item.Time,
                    })
                    UpdateNhatKy(arr_NhatKy)

                    setStateSnackbar({
                        ...stateSnackbar,
                        messSnackbar:
                            'Thêm Sản Phẩm: ' + item.name + ' Thành Công !',
                        isSuccess: true,
                        open: true,
                    })
                }
                handleClose()
            })
            .catch((e) => {
                setStateSnackbar({
                    ...stateSnackbar,
                    messSnackbar: 'Lỗi: ' + e,
                    isSuccess: false,
                    open: true,
                })
                handleClose()
            })
    }
    function Refresh() {
        setMessLoading('Đang Làm Mới Nhật Ký !')
        handleShow()
        LoadingNhatKy()
    }

    function TienVietNam(input) {
        var _input = parseInt(input)
        _input = _input.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
        })
        return _input
    }

    function FetchToanBoNhaCC() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + 'ToanBoNhaCC'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    arr_NhaCC = res.data
                    setLstNhaCC(res.data)
                }

                handleClose()
            })
            .catch((e) => {
                alert('Có Lỗi Ở Nhập Kho! ')

                handleClose()
            })
    }

    function handleSearch(value) {
        const textSearch = value.toLowerCase()
        const reg = new RegExp(textSearch)

        // Nếu chuỗi tìm kiếm trống -> render toàn bộ sản phẩm
        if (!textSearch) {
            UpdateNhatKy(arr_NhatKy)
            return
        }

        //Do dữ liệu nhiều nên render 50 sản phẩm khi search
        var maxSearchResult = 0
        var arrUI = []
        const len = arr_NhatKy.length

        for (var i = 0; i < len; ++i) {
            if (reg.exec(arr_NhatKy[i].TenSP.toLowerCase())) {
                maxSearchResult++
                if (maxSearchResult < 200) {
                    arrUI.push(arr_NhatKy[i])
                } else {
                    break
                }
            }
        }

        UpdateNhatKy(arrUI)
    }

    return (
        <section
            style={{ marginTop: 40, marginLeft: 20 }}
            className="nhapkho-container"
        >
            <div className="nhapkho-container__product">
                <ul className="list-items__input">
                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Tên Sản Phẩm
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <span style={{ color: 'red' }}>
                                {validEmptyTenSP
                                    ? ''
                                    : '* Vui lòng điền vào tên sản phẩm'}
                            </span>
                            <input
                                style={{ height: 50 }}
                                variant="outlined"
                                ref={NameRef}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        SLRef.current.focus()
                                    }
                                }}
                                onChange={(e) => {
                                    setNameSanPham(e.target.value)
                                }}
                                onBlur={() => {
                                    if (nameSanPham) {
                                        setValidEmptyTenSP(true)
                                    } else {
                                        setValidEmptyTenSP(false)
                                    }
                                }}
                                value={nameSanPham}
                                placeholder="Tên Sản Phẩm"
                                width={300}
                            />
                        </div>
                    </li>
                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Số Lượng
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <input
                                style={{ height: 50 }}
                                variant="outlined"
                                value={soluong}
                                onChange={(e) => {
                                    setSL(e.target.value)
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        DonViRef.current.focus()
                                    }
                                }}
                                ref={SLRef}
                                type={Number}
                                width={300}
                                placeholder="Số Lượng"
                            />
                        </div>
                    </li>
                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Đơn Vị
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <span style={{ color: 'red' }}>
                                {validEmptyDonVi
                                    ? ''
                                    : '* Vui lòng điền vào đơn vị'}
                            </span>
                            <input
                                style={{ height: 50 }}
                                variant="outlined"
                                ref={DonViRef}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        SLBaoDongRef.current.focus()
                                    }
                                }}
                                onBlur={() => {
                                    if (donvi) {
                                        setValidEmptyDonVi(true)
                                    } else {
                                        setValidEmptyDonVi(false)
                                    }
                                }}
                                onChange={(e) => {
                                    setDonVi(e.target.value)
                                }}
                                value={donvi}
                                width={300}
                                placeholder="Đơn Vị"
                            />
                        </div>
                    </li>
                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Số Lượng Báo Động
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <input
                                style={{ height: 50, width: '250px' }}
                                variant="outlined"
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        DonGiaRef.current.focus()
                                    }
                                }}
                                ref={SLBaoDongRef}
                                onChange={(e) => {
                                    setSLBaoDong(e.target.value)
                                }}
                                value={soluongbaodong}
                                width={300}
                                placeholder="Số Lượng Báo Động"
                            />
                        </div>
                    </li>

                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Giá Nhập Sỉ
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <input
                                style={{ height: 50 }}
                                variant="outlined"
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        GiaBanRef.current.focus()
                                    }
                                }}
                                ref={DonGiaRef}
                                onChange={(e) => {
                                    setGiaNhap(e.target.value)
                                }}
                                value={dongia}
                                width={300}
                                placeholder="Giá Nhập"
                            />
                            {soluong && dongia ? (
                                <div>
                                    Giá nhập : {TienVietNam(dongia)}
                                    <p>
                                        Giá vốn: {TienVietNam(dongia / soluong)}{' '}
                                        / sản phẩm
                                    </p>
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </li>

                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Giá Bán Lẻ
                        </h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '250px',
                            }}
                        >
                            <input
                                style={{ height: 50 }}
                                variant="outlined"
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        NhaCCRef.current.focus()
                                    }
                                }}
                                ref={GiaBanRef}
                                onChange={(e) => {
                                    setGiaBan(e.target.value)
                                }}
                                value={giaban}
                                width={300}
                                placeholder="Giá Bán Lẻ"
                            />
                            {giaban && (
                                <p>
                                    Giá Bán Lẻ: {TienVietNam(giaban)} / sản phẩm
                                </p>
                            )}
                        </div>
                    </li>

                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            SDT Cung Cấp
                        </h6>
                        <Autocomplete
                            id="combo-box-sdtnhacc"
                            freeSolo={true}
                            options={lstnhaCC}
                            getOptionLabel={(option) => option.SDTNhaCC}
                            style={{
                                width: 255,
                                height: 50,
                                paddingLeft: 5,
                                marginTop: 5,
                            }}
                            inputValue={sdtnhacc}
                            onInputChange={(event, newInputValue) => {
                                setSDTNhaCC(newInputValue)
                            }}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                if (newValue) {
                                    setNhaCC(newValue.NameNhaCC)
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="SDT Nhà CC"
                                    text={sdtnhacc}
                                    onChange={(e) => {
                                        setSDTNhaCC(e.target.value)
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            SDTNhaCCRef.current.focus()
                                        }
                                    }}
                                    inputRef={NhaCCRef}
                                    variant="outlined"
                                />
                            )}
                        />
                    </li>

                    <li className="item__input">
                        <h6 style={{ color: resources.colorPrimary }}>
                            Tên Nhà Cung Cấp
                        </h6>
                        <Autocomplete
                            id="combo-box-nhacc"
                            freeSolo={true}
                            options={lstnhaCC}
                            getOptionLabel={(option) => option.NameNhaCC}
                            style={{
                                width: 255,
                                height: 50,
                                paddingLeft: 5,
                                marginTop: 10,
                            }}
                            inputValue={nhacc}
                            onInputChange={(event, newInputValue) => {
                                setNhaCC(newInputValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nhà Cung Cấp"
                                    text={nhacc}
                                    onChange={(e) => {
                                        setNhaCC(e.target.value)
                                    }}
                                    inputRef={SDTNhaCCRef}
                                    variant="outlined"
                                />
                            )}
                        />
                    </li>

                    <li className="item__input">
                        <h6></h6>
                        <button
                            style={{
                                color: resources.colorText,
                                backgroundColor: resources.colorPrimary,
                                borderRadius: 30,
                                marginTop: 10,
                                marginRight: 20,
                            }}
                            onClick={ThemVaoKho}
                            type="button"
                            className="btn-nhapkho"
                        >
                            Cho vào kho
                        </button>
                    </li>
                </ul>
            </div>

            <div
                style={{ marginTop: 40, marginRight: 40, marginBottom: 20 }}
                className="nhapkho-container__diary"
            >
                <div className="diary__content">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 10,
                        }}
                    >
                        <h4
                            style={{
                                color: resources.colorPrimary,
                                marginLeft: 20,
                            }}
                        >
                            Nhật kí nhập hàng
                        </h4>

                        <TextField
                            variant="outlined"
                            style={{ width: '300px' }}
                            value={valueNhatKy}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch(e.target.value)
                                }
                            }}
                            onChange={(e) => {
                                setTimKiemNhatKy(e.target.value)
                            }}
                            placeholder="Tìm kiếm theo tên sản phẩm"
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon
                                        style={{
                                            marginRight: '11px',
                                        }}
                                    />
                                ),
                                endAdornment: (
                                    <CloseIcon
                                        onClick={(e) => {
                                            setTimKiemNhatKy('')
                                            handleSearch('')
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            display: valueNhatKy
                                                ? 'block'
                                                : 'none',
                                        }}
                                    />
                                ),
                            }}
                        />
                        <FontAwesomeIcon
                            onClick={(e) => {
                                Refresh()
                            }}
                            color={resources.colorPrimary}
                            style={{
                                cursor: 'pointer',
                            }}
                            size="2x"
                            icon={faSyncAlt}
                        />
                    </div>

                    <TableContainer
                        style={{
                            height: '80%',
                            width: '93%',
                            marginTop: 10,
                        }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Thời Gian</TableCell>
                                    <TableCell>Nội Dung</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{resultList}</TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={loading}
                onHide={handleClose}
            >
                <Modal.Body>
                    <Modal.Title>
                        <Spinner
                            animation="border"
                            variant="success"
                            role="status"
                        ></Spinner>
                        {mess}
                    </Modal.Title>
                </Modal.Body>
            </Modal>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => {
                    setStateSnackbar({ ...stateSnackbar, open: false })
                }}
            >
                <Alert
                    onClose={() => {
                        setStateSnackbar({ ...stateSnackbar, open: false })
                    }}
                    severity={isSuccess ? 'success' : 'error'}
                >
                    {messSnackbar}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default NhapKho
