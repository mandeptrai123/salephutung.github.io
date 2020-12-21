import React, { useState, useEffect } from 'react'

// import css
import './css/HangTonSLThap.css'

//import component
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal, Spinner } from 'react-bootstrap'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import resources from '../../resource/color/ColorApp'
import NetWorking from '../../networking/fetchWithTimeout'
import { Button } from 'react-bootstrap'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import _, { indexOf } from 'lodash'
import EmailIcon from '@material-ui/icons/Email'
import disableScroll from 'disable-scroll'
import Dropdown from 'react-bootstrap/Dropdown'
import TextField from '@material-ui/core/TextField'

//import redux
import {
    SaveListSPThieuSL,
    UpdateGhiChuNewSpThieuSl,
} from '../../Redux/ActionType'
import { useDispatch, useSelector } from 'react-redux'

function MatHangHetSL() {
    const dispatch = useDispatch()
    const listSPThieuSL = useSelector((state) => state.ListSPThieuSL)

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')

    //set state show/hidden modal
    const [showModalSendEmailGhiChu, setShowModalSendEmailGhiChu] = useState(
        false
    )

    //Tạo list lưu ghi chú mỗi sản phẩm
    const [resultLst, setResultLst] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function ItemNoiDung(props) {
        const objSP = { ...props.data }
        const [valueGhiChuEachSP, setValueGhiChuEachSP] = useState(objSP.Ghichu)

        return (
            <TableRow>
                <TableCell>{props.indexItem}</TableCell>
                <TableCell>{objSP.NhaCC}</TableCell>
                <TableCell>{objSP.SDTNhaCC}</TableCell>
                <TableCell>{objSP.Name}</TableCell>
                <TableCell>{objSP.amount}</TableCell>
                <TableCell>
                    <TextareaAutosize
                        rowsMin={3}
                        style={{
                            height: '60px',
                        }}
                        value={valueGhiChuEachSP}
                        placeholder="Ghi chú"
                        rowsMax={3}
                        onBlur={(event) => {
                            dispatch({
                                type: UpdateGhiChuNewSpThieuSl,
                                value: {
                                    index: props.indexItem,
                                    ghiChuNew: event.target.value,
                                },
                            })
                        }}
                        onChange={(event) => {
                            setValueGhiChuEachSP(event.target.value)
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    function ModalSendEmailGhiChu() {
        const listGhiChu = _.chain(listSPThieuSL)
            .groupBy('NhaCC')
            .map((value, key) => {
                return {
                    NhaCC: key,
                    Ghichu: value.map((e) => {
                        return { ghichu: e.Ghichu, tenSP: e.Name }
                    }),
                }
            })
            .value()

        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                show={showModalSendEmailGhiChu}
                onHide={() => {
                    setShowModalSendEmailGhiChu(false)
                }}
            >
                <Modal.Header closeButton>
                    <h3>Gửi email cho nhà cung cấp</h3>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '17px' }}>
                    Chúng tôi cần đặt hàng từ các nhà cung cấp thêm 1 số mặt
                    hàng sau:
                    {listGhiChu.map((item) => {
                        return (
                            <p style={{ marginBottom: '0' }}>
                                - Nhà cung cấp {item.NhaCC}:{' '}
                                {item.Ghichu.map((e) => {
                                    if (e.ghichu) {
                                        return `${e.ghichu} ${e.tenSP}, `
                                    }
                                })}
                            </p>
                        )
                    })}
                    <br />
                    Mong các nhà cung cấp sớm cung cấp cho bên chúng tôi
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log('gửi')
                            setShowModalSendEmailGhiChu(false)
                        }}
                    >
                        Gửi
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            setShowModalSendEmailGhiChu(false)
                        }}
                    >
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    useEffect(() => {
        setMessLoading('Đang Làm Mới Kho Hàng!')
        Refresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Refresh() {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL = 'https://phutungserver.herokuapp.com/sanpham/SanPhamSLThap'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    var arr = []
                    //Gôm các sản phẩm cùng nhà cung cấp
                    _.forEach(res.data, function (e) {
                        e.DanhSachSP = [
                            {
                                Name: e.name,
                                amount: e.amount,
                                amountAlert: e.amountAlert,
                                Ghichu: '',
                            },
                        ]
                        var isAlready = _.some(arr, { NhaCC: e.NhaCC })
                        if (!isAlready) {
                            arr.push(e)
                        } else {
                            var index = _.findIndex(arr, function (o) {
                                return o.NhaCC == e.NhaCC
                            })
                            arr[index].DanhSachSP.push({
                                Ghichu: '',
                                Name: e.name,
                                amount: e.amount,
                                amountAlert: e.amountAlert,
                            })
                        }
                    })

                    var ds = []
                    arr.reverse().map((item) => {
                        item.DanhSachSP.map((element) => {
                            element.NhaCC = item.NhaCC
                            element.SDTNhaCC = item.SDTNhaCC

                            ds.push(element)
                        })
                    })
                    //Lưu list sản phẩm thiếu số lượng vào store
                    dispatch({ type: SaveListSPThieuSL, value: ds })

                    UpdateHangThieuSL(ds)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Mặt Hàng Hết SL ! : ' + e)
                handleClose()
            })
    }

    function UpdateHangThieuSL(arr) {
        setResultLst(
            arr.map((e, index) => {
                return <ItemNoiDung data={e} indexItem={index} />
            })
        )
    }

    return (
        <section className="hang-container">
            <ModalSendEmailGhiChu />
            <div className="hang-container__content">
                <h3
                    style={{
                        color: resources.colorPrimary,
                        textAlign: 'center',
                    }}
                    className="title"
                >
                    Sản Phẩm Có Số Lượng Thấp
                </h3>
                <div>
                    <TextField
                        label="Tìm kiếm theo nhà cung cấp"
                        variant="outlined"
                        style={{ width: '70%' }}
                        onChange={(event) => {
                            const textSearch = event.target.value.toLowerCase()
                            const reg = new RegExp(textSearch)

                            //Xử lí tìm kiếm
                            setResultLst(
                                listSPThieuSL.map((e, index) => {
                                    if (reg.exec(e.NhaCC.toLowerCase())) {
                                        return (
                                            <ItemNoiDung
                                                data={e}
                                                indexItem={index}
                                            />
                                        )
                                    }
                                })
                            )
                        }}
                    />
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <FontAwesomeIcon
                        style={{ marginBottom: 10, cursor: 'pointer' }}
                        onClick={(e) => {
                            Refresh()
                        }}
                        color={resources.colorPrimary}
                        size="3x"
                        icon={faSyncAlt}
                    />
                    <EmailIcon
                        style={{
                            fontSize: '45px',
                            color: 'red',
                            cursor: 'pointer',
                        }}
                        onClick={() => setShowModalSendEmailGhiChu(true)}
                    />
                </div>
                <TableContainer
                    style={{
                        height: '67vh',
                        width: '100%',
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Nhà Cung Cấp</TableCell>
                                <TableCell>SDT Nhà Cung Cấp</TableCell>
                                <TableCell>Danh Sách Sản Phẩm Hết</TableCell>
                                <TableCell>Số Lượng Hiện Tại</TableCell>
                                <TableCell>Ghi Chú</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{resultLst}</TableBody>
                    </Table>
                </TableContainer>
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
        </section>
    )
}

export default MatHangHetSL
