import React, { useEffect, useState } from 'react'
import '../FormStyle/css/FormStyle.css'
import { useHistory } from 'react-router-dom'
import { LoginAction } from '../../Redux/ActionType'
// import components
import { TextField } from '@material-ui/core'
import { Modal, Button, Spinner } from 'react-bootstrap'
import NetWorking from '../../networking/fetchWithTimeout'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useDispatch } from 'react-redux'

import resources from '../../resource/color/ColorApp'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [stateSnackbar, setStateSnackbar] = useState({
        openSnackbar: false,
        messSnackbar: '',
        isSuccess: false,
    })
    const { openSnackbar, messSnackbar, isSuccess } = stateSnackbar

    const [SDT, setSDT] = useState('')
    const [Pass, setPass] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const styleFlex = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 0,
    }

    function LoginBySDT(SDT, Pass) {
        if (SDT == '' || Pass == '') {
            setStateSnackbar({
                ...stateSnackbar,
                openSnackbar: true,
                messSnackbar: 'Vui Lòng Điền Đầy Đủ Thông Tin Đăng Nhập !',
                isSuccess: false,
            })
            return
        }
        setShowLoading(true)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        let _URL =
            'https://phutungserver.herokuapp.com/nhanvien/LoginBySDT?SDT=' +
            SDT +
            '&Pass=' +
            Pass

        NetWorking(_URL, requestOptions)
            .then((res) => {
                setShowLoading(false)
                if (res.success) {
                    dispatch({
                        type: LoginAction,
                        SDTNV: res.data.SDT,
                        isQuanLi: res.data.isQuanLi,
                        HoTen: res.data.Name,
                        Pass: res.data.Pass,
                    })
                    history.push('/DashBoard')
                } else {
                    setStateSnackbar({
                        ...stateSnackbar,
                        openSnackbar: true,
                        messSnackbar: res.mess,
                    })
                }
            })
            .catch((e) => {
                setShowLoading(false)
                setStateSnackbar({
                    ...stateSnackbar,
                    openSnackbar: true,
                    messSnackbar: 'Lỗi: ' + e + ' Từ Trang Login',
                })
            })
    }
    useEffect(() => {}, [])

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form>
                        <p
                            style={{ width: 300 }}
                            className="h4 text-center mb-4"
                        >
                            Ứng Dụng Quản Lí Hàng Hoá{' '}
                        </p>
                        <label
                            style={{ padding: 5 }}
                            htmlFor="defaultFormLoginEmailEx"
                            className="grey-text"
                        >
                            Số Điện Thoại
                        </label>
                        <TextField
                            value={SDT}
                            onChange={(e) => {
                                setSDT(e.target.value)
                            }}
                            variant="outlined"
                            style={{ width: 300 }}
                            className="form-control"
                        />
                        <br />
                        <label
                            style={{ padding: 5, marginTop: 20 }}
                            className="grey-text"
                        >
                            Mật Khẩu
                        </label>
                        <TextField
                            value={Pass}
                            onChange={(e) => {
                                setPass(e.target.value)
                            }}
                            style={{ width: 300 }}
                            variant="outlined"
                            type="password"
                            className="form-control"
                        />
                        <div className="text-center mt-4">
                            <Button
                                onClick={(e) => {
                                    LoginBySDT(SDT, Pass)
                                }}
                                style={{
                                    width: 300,
                                    height: 50,
                                    marginTop: 10,
                                }}
                                color="indigo"
                            >
                                Đăng Nhập
                            </Button>
                        </div>
                    </form>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={() => {
                            setStateSnackbar({
                                ...stateSnackbar,
                                openSnackbar: false,
                            })
                        }}
                    >
                        <Alert
                            onClose={() => {
                                setStateSnackbar({
                                    ...stateSnackbar,
                                    openSnackbar: false,
                                })
                            }}
                            severity={isSuccess ? 'success' : 'error'}
                        >
                            {messSnackbar}
                        </Alert>
                    </Snackbar>

                    <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        size="sm"
                        backdrop="static"
                        show={showLoading}
                    >
                        <Modal.Title
                            style={{
                                color: resources.colorPrimary,
                                padding: 20,
                                fontSize: 15,
                                textAlign: 'center',
                            }}
                        >
                            "Đang Kiểm Tra Thông Tin Nhân Viên !"
                        </Modal.Title>
                        <Modal.Body>
                            <Spinner
                                style={{ marginLeft: '40%', marginBottom: 100 }}
                                animation="border"
                            />
                        </Modal.Body>
                    </Modal>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login
