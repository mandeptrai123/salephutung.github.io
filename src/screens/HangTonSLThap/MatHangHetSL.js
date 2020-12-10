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
import _ from 'lodash'
import EmailIcon from '@material-ui/icons/Email'
import disableScroll from 'disable-scroll'
import Dropdown from 'react-bootstrap/Dropdown'

function MatHangHetSL() {
    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')

    //set state show/hidden modal
    const [showModalSendEmailGhiChu, setShowModalSendEmailGhiChu] = useState(
        false
    )

    //Tạo list lưu ghi chú mỗi sản phẩm
    const [listGhiChu, setListGhiChu] = useState([])
    const [resultLst, setResultLst] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    var stt = -1
    function ItemNoiDung(props) {
        var indexItemNoiDung = ++stt
        var props = props.data
        const [textToggleDropdown, setTextToggleDropdown] = useState(
            props.DanhSachSP[0].Name
        )
        const [amount, setAmount] = useState(0)
        // console.log(props)

        return (
            <TableRow>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.NhaCC}</TableCell>
                <TableCell>{props.SDTNhaCC}</TableCell>
                <TableCell>
                    <Dropdown
                        style={{
                            width: '150px',
                        }}
                    >
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            style={{
                                width: '100%',
                                color: 'black',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            {textToggleDropdown}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {props.DanhSachSP.map((e) => {
                                return (
                                    <Dropdown.Item
                                        onClick={() => {
                                            setTextToggleDropdown(e.Name)
                                            setAmount(e.amount)
                                        }}
                                    >
                                        {e.Name}
                                    </Dropdown.Item>
                                )
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </TableCell>
                <TableCell>{amount}</TableCell>
                <TableCell>
                    <TextareaAutosize
                        rowsMin={3}
                        style={{
                            height: '60px',
                        }}
                        placeholder="Ghi chú"
                        rowsMax={3}
                        onBlur={(event) => {
                            const objGhiChu = {
                                TenNhaCC: props.NhaCC,
                                NoiDungGhiChu: event.target.value,
                            }
                            // Lưu ghi chú và tên nhà cc vào arr
                            listGhiChu[indexItemNoiDung] = objGhiChu
                        }}
                    />
                </TableCell>
            </TableRow>
        )
    }

    function ModalSendEmailGhiChu() {
        return (
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalSendEmailGhiChu}
                onHide={() => {
                    setShowModalSendEmailGhiChu(false)
                }}
            >
                <Modal.Header closeButton>
                    <h3>Gửi email cho nhà cung cấp</h3>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '15px' }}>
                    Chúng tôi cần đặt hàng từ các nhà cung cấp thêm 1 số mặt
                    hàng sau:
                    {listGhiChu.map((e) => {
                        return (
                            <p style={{ marginBottom: '0' }}>
                                - Nhà cung cấp {e.TenNhaCC}: {e.NoiDungGhiChu}
                            </p>
                        )
                    })}
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
        setMessLoading('   Đang Làm Mới Kho Hàng!')
        Refresh()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Refresh() {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        let _URL = 'https://phutungserver.herokuapp.com/quanli/MatHangHetSL'
        NetWorking(_URL, requestOptions, 10000)
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
                                Name: e.name,
                                amount: e.amount,
                                amountAlert: e.amountAlert,
                            })
                        }
                    })

                    UpdateHangThieuSL(arr.reverse())
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Mặt Hàng Hết SL ! : ' + e)
                handleClose()
            })
    }

    function UpdateHangThieuSL(arr) {
        const result = arr.map((e) => {
            return <ItemNoiDung data={e} />
        })
        setResultLst(result)
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
                        onClick={() => {
                            setShowModalSendEmailGhiChu(true)

                            listGhiChu.forEach((e) => {
                                console.log(e)
                            })
                        }}
                    />
                </div>
                <TableContainer
                    style={{
                        height: '80%',
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
