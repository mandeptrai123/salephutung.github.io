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

import NetWorking from '../../../networking/fetchWithTimeout'

import resources from '../../../resource/color/ColorApp'

export default function NhatKyCongNo() {
    const [resultTableNhatKy, setResultTableNhatKy] = useState()
    const [messLoading, setMessLoading] = useState('Đang load đợi tí nhé!')
    const [show, setShow] = useState(false)
    const [dataNhatKyCongNo, setDataNhatKyCongNo] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const URL_API = 'http://35.197.146.86:5000'

    function GetAllNhatKyCongNo() {
        //Show message dialog
        handleShow()
        setMessLoading('Đang làm mới dữ liệu!')

        const _url = URL_API + '/khachhang/NhatKyCongNo'
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        NetWorking(_url, requestOptions)
            .then((res) => {
                if (res.success) {
                    setDataNhatKyCongNo(res.data)
                    RenderUINhatKy(res.data)
                }
                handleClose()
            })
            .catch((e) => {
                handleClose()
                alert('Có Lỗi Ở Công Nợ!')
            })
    }

    function RenderUINhatKy(data) {
        setResultTableNhatKy(
            data.map((e, index) => {
                return <ItemNhatKy data={e} index={index} />
            })
        )
    }

    function ItemNhatKy(props) {
        return (
            <TableRow>
                <TableCell>{props.index}</TableCell>
                <TableCell>{props.data.NameKhach}</TableCell>
                <TableCell>{props.data.NoiDung}</TableCell>
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
        GetAllNhatKyCongNo()
    }, [])

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
                Nhật Ký Công Nợ
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
                    label="Tìm kiếm"
                    variant="outlined"
                    style={{
                        width: '80%',
                    }}
                    onChange={(e) => {
                        const textSearch = e.target.value.toLowerCase()
                        const reg = new RegExp(textSearch)

                        setResultTableNhatKy(
                            dataNhatKyCongNo.map((e, index) => {
                                if (reg.exec(e.NameKhach.toLowerCase())) {
                                    return <ItemNhatKy data={e} index={index} />
                                }
                            })
                        )
                    }}
                />
                <RefreshIcon
                    style={{
                        fontSize: '55px',
                        cursor: 'pointer',
                        color: 'rgb(0, 123, 255)',
                    }}
                    onClick={() => {
                        GetAllNhatKyCongNo()
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
                                <TableCell>Nội Dung</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{resultTableNhatKy}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
