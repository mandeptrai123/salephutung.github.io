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

// icon
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import NetWorking from '../../../networking/fetchWithTimeout'

import resources from '../../../resource/color/ColorApp'

export default function NhatKyCongNo() {
    const [resultTableNhatKy, setResultTableNhatKy] = useState()
    const [uiNhatKy, setUiNhatKy] = useState()
    const [messLoading, setMessLoading] = useState('Đang load đợi tí nhé!')
    const [show, setShow] = useState(false)
    const [dataNhatKyCongNo, setDataNhatKyCongNo] = useState()
    const [valueSearch, setValueSearch] = useState('')

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
                    console.log(res.data)
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
        let maxRender = 0
        const result = data.map((e, index) => {
            maxRender++
            if (maxRender < 101) {
                return <ItemNhatKy data={e} index={index} />
            }
        })
        setResultTableNhatKy(result)
        setUiNhatKy(result)
    }

    function ItemNhatKy(props) {
        return (
            <TableRow>
                <TableCell>{props.index}</TableCell>
                <TableCell>{props.data.NameKhach}</TableCell>
                <TableCell>
                    <p
                        style={{
                            color:
                                props.data.NoiDung == 'Trả Nợ'
                                    ? 'green'
                                    : 'red',
                        }}
                    >
                        {props.data.NoiDung}
                    </p>
                </TableCell>
                <TableCell>{props.data.CongnoCu}</TableCell>
                <TableCell>{props.data.CongnoMoi}</TableCell>
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

    function handleSearch(value) {
        if (!value) {
            setResultTableNhatKy(uiNhatKy)
            return
        }

        const textSearch = value.toLowerCase()
        const reg = new RegExp(textSearch)

        let maxRender = 0
        let result = []
        const len = dataNhatKyCongNo.length

        for (let i = 0; i < len; ++i) {
            if (reg.exec(dataNhatKyCongNo[i].NameKhach.toLowerCase())) {
                maxRender++
                if (maxRender < 50) {
                    result.push(
                        <ItemNhatKy
                            data={dataNhatKyCongNo[i]}
                            index={maxRender}
                        />
                    )
                } else {
                    break
                }
            }
        }

        setResultTableNhatKy(result)
    }

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
                    placeholder="Tìm kiếm theo tên khách hàng"
                    variant="outlined"
                    style={{
                        width: '80%',
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e.target.value)
                        }
                    }}
                    onChange={(e) => setValueSearch(e.target.value)}
                    value={valueSearch}
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
                                <TableCell>Công Nợ Củ</TableCell>
                                <TableCell>Công Nợ Mới</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>{resultTableNhatKy}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
