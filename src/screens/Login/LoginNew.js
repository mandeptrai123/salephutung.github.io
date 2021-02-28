import React, {useState, useEffect, useRef} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {LoginAction} from '../../Redux/ActionType'
import NetWorking from '../../networking/fetchWithTimeout'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import {Modal, Spinner} from 'react-bootstrap'
import resources from '../../resource/color/ColorApp'

import handleErr from '../../utils/handleError'

import icon from '../../assets/icons/png/1024.png'
const versionAppLocal = 3;
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Phụ Tùng Nam Thành
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignIn() {
    const classes = useStyles()

    const URL_API = 'http://engcouple.com:3000/SalePhuTung/'

    const dispatch = useDispatch()
    const history = useHistory()
    const [stateSnackbar, setStateSnackbar] = useState({
        openSnackbar: false,
        messSnackbar: '',
        isSuccess: false,
    })
    const {openSnackbar, messSnackbar, isSuccess} = stateSnackbar

    const [SDT, setSDT] = useState('')
    const [Pass, setPass] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const [versionApp, setVersionApp] = useState('')

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
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
        let _URL = URL_API + 'LoginBySDT?SDT=' + SDT + '&Pass=' + Pass
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
                handleErr('api login', 'LoginNew', '85')
                setShowLoading(false)
                setStateSnackbar({
                    ...stateSnackbar,
                    openSnackbar: true,
                    messSnackbar: 'Lỗi: ' + e + ' Từ Trang Login',
                })
            })
    }

    function getVersionApp() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }

        let _URL = URL_API + 'VersionApp'

        NetWorking(_URL, requestOptions)
            .then((res) => {
                if (res.success) {
                    setVersionApp(res.data.VersionApp);
                }
            })
            .catch((e) => {
                handleErr('api get version app', 'LoginNew', '135')
            })
    }

    useEffect(() => {
        getVersionApp();
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div
                    style={{
                        borderRadius: '50%',
                        width: '65px',
                        height: '65px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <img src={icon} alt="logo" style={{width: '50px'}} />
                </div>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Số Điện Thoại"
                        name="email"
                        value={SDT}
                        onChange={(e) => {
                            setSDT(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                LoginBySDT(SDT, Pass)
                            }
                        }}
                        autoComplete="phone"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật Khẩu"
                        value={Pass}
                        onChange={(e) => {
                            setPass(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                LoginBySDT(SDT, Pass)
                            }
                        }}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Nhớ Mật Khẩu"
                    />
                    <Button
                        onClick={(e) => {
                            LoginBySDT(SDT, Pass)
                        }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Đăng Nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                onClick={(e) => {
                                    alert(
                                        'Vui Lòng Liên Hệ Đội Ngũ Kỹ Thuật Để Lấy Lại Mật Khẩu !'
                                    )
                                }}
                                href="#"
                                variant="body2">
                                Quên Mật Khẩu ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2"></Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
                <p
                    style={{
                        textAlign: 'center',
                        color: 'rgba(0, 0, 0, 0.54)',
                    }}>
                    Version {versionAppLocal}
                </p>
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => {
                    setStateSnackbar({...stateSnackbar, openSnackbar: false})
                }}>
                <Alert
                    onClose={() => {
                        setStateSnackbar({
                            ...stateSnackbar,
                            openSnackbar: false,
                        })
                    }}
                    severity={isSuccess ? 'success' : 'error'}>
                    {messSnackbar}
                </Alert>
            </Snackbar>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="sm"
                backdrop="static"
                show={showLoading}>
                <Modal.Title
                    style={{
                        color: resources.colorPrimary,
                        padding: 20,
                        fontSize: 15,
                        textAlign: 'center',
                    }}>
                    "Đang Kiểm Tra Thông Tin Nhân Viên !"
                </Modal.Title>
                <Modal.Body>
                    <Spinner
                        style={{marginLeft: '40%', marginBottom: 100}}
                        animation="border"
                    />
                </Modal.Body>
            </Modal>
        </Container>
    )
}
