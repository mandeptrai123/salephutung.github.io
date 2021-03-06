import React, {useState, useEffect} from 'react'

//import component react material
import {TextField} from '@material-ui/core'
import {Button, Modal, Spinner} from 'react-bootstrap'
import resources from '../../../resource/color/ColorApp'
import '../css/Manage.css'
import NetWorking from '../../../networking/fetchWithTimeout'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

//log
import handleErr from '../../../utils/handleError'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function TaoNhanVien() {
    //object tạo nhân viên
    const [sodienthoai, setSDT] = useState('')
    const [tenNV, setTenNV] = useState('')
    const [matkhau, setPassword] = useState('')
    const [phanQuyen, setPhanQuyen] = useState('1')

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState('')

    const [messResponse, setMessResponse] = useState('')
    const [showResponse, setShowResponse] = useState(false)

    const [stateSnackbar, setStateSnackbar] = useState({
        openSnackbar: false,
        messSnackbar: '',
        isSuccess: true,
    })
    const {openSnackbar, messSnackbar, isSuccess} = stateSnackbar

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    function handleCloseSnackbar() {
        setStateSnackbar({...stateSnackbar, openSnackbar: false})
    }
    useEffect(() => {
        setMessLoading(' Đang Đăng Ký Tài Khoản , Đợi Chút Nhé!')
    }, [])
    function Handle_ThemNhanVien() {
        var itemRequest = {
            SDT: sodienthoai,
            Pass: matkhau,
            Name: tenNV,
            isQuanLi: +phanQuyen,
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

        let _URL = URL_API + 'ThemNhanVien'

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
                handleErr('api them nhan vien', 'TaoNhanVien', '52')
                alert('Xảy Ra Sự Cố ,Kiểm Tra Lại Internet !')
                handleClose()
            })
    }
    return (
        <div
            style={{
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
            }}>
            <h1
                style={{
                    lineHeight: '60px',
                    textAlign: 'center',
                    color: resources.colorPrimary,
                }}>
                Thêm Nhân Viên
            </h1>
            <div
                style={{
                    padding: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                className="borderW">
                <TextField
                    variant="outlined"
                    style={{
                        width: 300,
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
                        width: 300,
                        marginTop: '10px',
                        marginBottom: '10px',
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
                        width: 300,
                        marginBottom: '20px',
                    }}
                    onChange={(e) => {
                        setTenNV(e.target.value)
                    }}
                    value={tenNV}
                    id="standard-basic"
                    label="Tên Nhân Viên"
                />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Phân quyền</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        onChange={(e) => {
                            setPhanQuyen(e.target.value)
                        }}>
                        <FormControlLabel
                            value="1"
                            control={<Radio color="primary" />}
                            label="Nhân viên"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio color="primary" />}
                            label="Quản Lí"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="Boss"
                        />
                    </RadioGroup>
                </FormControl>

                <Button
                    onClick={(e) => Handle_ThemNhanVien()}
                    variant="primary"
                    style={{
                        marginTop: 100,
                        width: '200px',
                        height: '50px',
                    }}>
                    Tạo Nhân Viên
                </Button>
            </div>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}>
                <Modal.Body>
                    <Modal.Title>
                        <Spinner
                            animation="border"
                            variant="success"
                            role="status"></Spinner>
                        {messLoading}
                    </Modal.Title>
                </Modal.Body>
            </Modal>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                show={showResponse}>
                <Modal.Body>
                    <Modal.Title>{messResponse}</Modal.Title>
                    <Modal.Footer>
                        <Button
                            onClick={(e) => {
                                setShowResponse(false)
                            }}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>

            <Snackbar
                open={stateSnackbar.openSnackbar}
                autoHideDuration={2000}
                onClose={() => {
                    setStateSnackbar({...stateSnackbar, openSnackbar: false})
                }}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={stateSnackbar.isSuccess ? 'success' : 'error'}>
                    {stateSnackbar.messSnackbar}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TaoNhanVien
