import React, { useState, useEffect } from 'react'
//import component
import { Modal, Spinner } from 'react-bootstrap'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import RefreshIcon from '@material-ui/icons/Refresh'
import resources from '../../../resource/color/ColorApp'
import NetWorking from '../../../networking/fetchWithTimeout'

function HangThieuSL() {
    const [lstResult, setResult] = useState()
    // const [totalBill, setTotalBill] = useState(30);

    const [messLoading, setMessLoading] = useState('')
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const URL_API = 'http://35.197.146.86:5000'

    var stt = 0
    const ItemHangThieuSL = (props) => {
        stt++
        return (
            <TableRow hover>
                <TableCell>{stt}</TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.amountAlert}</TableCell>
                <TableCell>{props.Donvi}</TableCell>
                <TableCell>{props.amount}</TableCell>
            </TableRow>
        )
    }

    const RenderMatHangHetSL = (arr) => {
        const _result = arr.map((e) => {
            return ItemHangThieuSL(e)
        })

        setResult(_result)
    }

    const OnFresh = () => {
        handleShow()
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        let _URL = URL_API + '/quanli/MatHangHetSL'
        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    RenderMatHangHetSL(res.data)
                }
            })
            .catch((e) => {
                alert('Có Lỗi Ở Hàng Thiếu SL! ')

                handleClose()
            })
    }

    useEffect(() => {
        setMessLoading(' Đang Lấy Thông Tin Sản Phẩm!')

        OnFresh()
    }, [])

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
            <div
                style={{
                    display: 'flex',
                }}
            >
                <h1
                    style={{
                        textAlign: 'center',
                        paddingRight: 200,
                        color: resources.colorPrimary,
                    }}
                >
                    Hàng Hết Số Lượng
                </h1>
                <RefreshIcon
                    style={{
                        cursor: 'pointer',
                        fontSize: '50px',
                        color: '#007bff',
                    }}
                    onClick={() => {
                        OnFresh()
                    }}
                />
            </div>

            <TableContainer
                style={{
                    maxHeight: '550px',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên Sản Phẩm</TableCell>
                            <TableCell>Số Lượng Báo Động</TableCell>
                            <TableCell>Đơn Vị</TableCell>
                            <TableCell>Số Lượng Hiện Tại</TableCell>
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
        </div>
    )
}

export default HangThieuSL
