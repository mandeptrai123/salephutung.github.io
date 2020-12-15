import React, { useState, useEffect } from 'react'
import './css/KhoHang.css'
//import component
import { Button, Modal, Spinner } from 'react-bootstrap'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

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
import { AllSanPham } from '../../Redux/ActionType'

var ID = 0

function KhoHang() {
    const [lstSanPham, setLstSanPham] = useState([])
    const [searchContent, setsearchContent] = useState('')

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')
    const [lstResult, setLstResult] = useState()
    const [valueSearchContent, setvalueSearchContent] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [showDieuChinh, setDieuChinh] = useState(false)

    const [GiaTriMoi, setGiaTriMoi] = useState('')

    const TatCaSanPham = useSelector((state) => state.AllSanPham)
    const dispatch = useDispatch()

    function RenderKhoSanPham(arr) {
        var stt = 0
        console.log('render: ')
        setLstResult(
            arr.map((e) => {
                stt++
                //Do dữ liệu nhiều lấy 20 sản phẩm
                if (stt < 21) {
                    return <ItemSanPham data={e} soThuTu={stt} />
                }
            })
        )
    }

    function CapNhatSanPham(bodyRequest) {
        handleShow()
        setMessLoading('Đang cập nhật!')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyRequest),
        }
        const _URL =
            'https://phutungserver.herokuapp.com/sanpham/CapNhatSanPham'
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

    function ItemSanPham(props) {
        const e = props.data

        //State trạng thái của button cập nhật
        const [boolUpdateSanPham, setBoolUpdateSanPham] = useState(false)

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
                            pointerEvents: boolUpdateSanPham ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: boolUpdateSanPham
                                ? '1px solid black'
                                : 'none',
                        }}
                        onChange={(e) => {
                            setDonviSanPham(e.target.value)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={priceSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: boolUpdateSanPham ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: boolUpdateSanPham
                                ? '1px solid black'
                                : 'none',
                        }}
                        onChange={(e) => {
                            setPriceSanPham(e.target.value)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={amountSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: boolUpdateSanPham ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: boolUpdateSanPham
                                ? '1px solid black'
                                : 'none',
                        }}
                        onChange={(e) => {
                            setAmountSanPham(e.target.value)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={nhaCCSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: boolUpdateSanPham ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: boolUpdateSanPham
                                ? '1px solid black'
                                : 'none',
                        }}
                        onChange={(e) => {
                            setNhaCCSanPham(e.target.value)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <input
                        value={amountAlertSanPham}
                        style={{
                            border: 'none ',
                            outline: 'none',
                            pointerEvents: boolUpdateSanPham ? 'auto' : 'none',
                            backgroundColor: 'transparent',
                            borderBottom: boolUpdateSanPham
                                ? '1px solid black'
                                : 'none',
                        }}
                        onChange={(e) => {
                            setAmountAlertSanPham(e.target.value)
                        }}
                    />
                </TableCell>
                <TableCell>
                    <Button
                        variant={boolUpdateSanPham ? 'success' : 'primary'}
                        style={{ fontSize: '14px', width: '120px' }}
                        onClick={(e) => {
                            /*Code của Mẫn*/
                            // ID = 2
                            // setDieuChinh(true)

                            /*Code của Hoàng*/
                            //Cho phép cập nhật giá trị của các trường
                            setBoolUpdateSanPham(!boolUpdateSanPham)

                            //Kiểm tra button đang ở trạng thái đang cập nhật ?
                            if (boolUpdateSanPham) {
                                CapNhatSanPham(bodyRequestAPIUpdateSP)
                            }
                        }}
                    >
                        {boolUpdateSanPham ? 'Xong' : 'Cập nhật'}
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
            headers: { 'Content-Type': 'application/json' },
        }
        let _URL = 'https://phutungserver.herokuapp.com/sanpham/ToanBoSanPham'
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_item),
        }
        let _URL =
            'https://phutungserver.herokuapp.com/sanpham/CapNhatSLSanPham'
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(_item),
        }
        let _URL =
            'https://phutungserver.herokuapp.com/sanpham/CapNhatGiaBanSanPham'
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

    return (
        <section className="khohang-container">
            <div className="khohang-container__content">
                <h2
                    style={{ color: resources.colorPrimary }}
                    className="header-title"
                >
                    Kho Hàng
                </h2>

                <div
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <div style={{ display: 'flex', width: '500px' }}>
                        <TextField
                            style={{
                                width: '100%',
                            }}
                            pattern="[A-Za-z]"
                            label="Nhập tên sản phẩm hoặc nhà cung cấp cần tìm"
                            onChange={(event) => {
                                const textSearch = event.target.value.toLowerCase()
                                const regex = new RegExp(textSearch)
                                var stt = 0
                                setLstResult(
                                    TatCaSanPham.map((e) => {
                                        if (
                                            regex.exec(e.name.toLowerCase()) ||
                                            regex.exec(e.NhaCC.toLowerCase())
                                        ) {
                                            stt++
                                            //Do dữ liệu nhiều nên render 20 sản phẩm
                                            if (stt < 21) {
                                                return (
                                                    <ItemSanPham
                                                        data={e}
                                                        soThuTu={stt}
                                                    />
                                                )
                                            }
                                        }
                                    })
                                )
                            }}
                            variant="outlined"
                        />

                        <FontAwesomeIcon
                            style={{
                                marginLeft: 40,
                                alignContent: 'center',
                                alignSelf: 'center',
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
