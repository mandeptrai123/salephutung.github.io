import React, { useState, useEffect } from 'react'

//import component react material
import { TextField } from '@material-ui/core'
import { Button, Modal, Spinner } from 'react-bootstrap'
import resources from '../../../resource/color/ColorApp'
import '../css/Manage.css'
import NetWorking from '../../../networking/fetchWithTimeout'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function TaoNhanVien() {
    const [sodienthoai, setSDT] = useState('')
    const [tenNV, setTenNV] = useState('')
    const [matkhau, setPassword] = useState('')

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')

    const [messResponse, setMessResponse] = useState('')
    const [showResponse, setShowResponse] = useState(false)

    const [stateSnackbar, setStateSnackbar] = useState({
        openSnackbar: false,
        messSnackbar: '',
        isSuccess: true,
    })
    const { openSnackbar, messSnackbar, isSuccess } = stateSnackbar

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const URL_API = 'http://35.197.146.86:5000'

    function handleCloseSnackbar() {
        setStateSnackbar({ ...stateSnackbar, openSnackbar: false })
    }

    useEffect(() => {
        setMessLoading(' Đang Đăng Ký Tài Khoản , Đợi Chút Nhé!')
    }, [])
    function Handle_ThemNhanVien() {
        var itemRequest = {
            SDT: sodienthoai,
            Pass: matkhau,
            Name: tenNV,
            isQuanLi: false,
        }
        handleShow()
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(itemRequest),
        }

        let _URL = URL_API + '/quanli/ThemNhanVien'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                handleClose()
                if (res.success) {
                    setStateSnackbar({
                        ...stateSnackbar,
                        openSnackbar: true,
                        isSuccess: true,
                        messSnackbar: res.mess,
                    })

                    setTenNV('')
                    setSDT('')
                    setPassword('')
                } else {
                    setStateSnackbar({
                        ...stateSnackbar,
                        openSnackbar: true,
                        isSuccess: false,
                        messSnackbar: res.mess,
                    })
                }
            })
            .catch((e) => {
                alert('Xảy Ra Sự Cố ,Kiểm Tra Lại Internet !')
                handleClose()
            })
    }
    return (
        <div
            style={{
                flex: 1,

                justifyContent: 'center',
                alignContent: 'center',
                width: '50%',
                height: '100%',
            }}
        >
            <h1
                style={{
                    lineHeight: '60px',
                    textAlign: 'center',
                    paddingRight: 200,
                    color: resources.colorPrimary,
                }}
            >
                Thêm Nhân Viên
            </h1>
            <div style={{ padding: 50 }} className="borderW">
                <TextField
                    variant="outlined"
                    style={{
                        width: 200,
                        marginBottom: 10,
                        marginLeft: 200,
                    }}
                    onChange={(e) => {
                        setSDT(e.target.value)
                    }}
                    value={sodienthoai}
                    id="standard-basic"
                    label="Số Điện Thoại"
                />
                <TextField
                    variant="outlined"
                    style={{
                        width: 200,
                        marginTop: 10,
                        marginLeft: 200,
                    }}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={matkhau}
                    id="standard-basic"
                    label="Mật Khẩu"
                    type="password"
                />

                <TextField
                    variant="outlined"
                    style={{
                        width: 200,
                        marginTop: 10,
                        marginLeft: 200,
                    }}
                    onChange={(e) => {
                        setTenNV(e.target.value)
                    }}
                    value={tenNV}
                    id="standard-basic"
                    label="Tên Nhân Viên"
                />

                <Button
                    onClick={(e) => Handle_ThemNhanVien()}
                    variant="primary"
                    style={{
                        marginTop: 100,
                        width: '200px',
                        marginLeft: 200,
                        height: '50px',
                    }}
                >
                    Tạo Nhân Viên
                </Button>
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
        </div>
    )
}

export default TaoNhanVien
