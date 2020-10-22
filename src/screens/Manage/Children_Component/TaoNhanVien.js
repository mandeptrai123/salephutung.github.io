import React, { useState, useEffect } from 'react'

//import component react material
import { Paper, TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Button from 'react-bootstrap/Button'

const useStyles = makeStyles({
    FormTextField: {
        display: 'flex',
        width: '100%',
        height: '70%',
        borderRadius: '5px',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    txtField: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
    },
    tf: {
        margin: '30px 0',
    },
})

function TaoNhanVien() {
    const classes = useStyles()
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '20px 30px',
            }}
        >
            <h1
                style={{
                    lineHeight: '60px',
                    textAlign: 'center',
                }}
            >
                Thêm Nhân Viên
            </h1>
            <form
                className={classes.FormTextField}
                noValidate
                autoComplete="off"
            >
                <div className={classes.txtField}>
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Số Điện Thoại"
                        type="number"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Password"
                        type="password"
                        value="123456"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                </div>
                <div className={classes.txtField}>
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                    <TextField
                        className={classes.tf}
                        id="standard-basic"
                        label="Thông tin nhân viên"
                    />
                </div>
            </form>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="primary"
                    style={{
                        width: '300px',
                        height: '50px',
                    }}
                >
                    Thêm
                </Button>
            </div>
        </div>
    )
}

export default TaoNhanVien
