import React, { useState } from 'react'
import './css/KhoHang.css'

//import component
import Find from '../../resource/Find/Find'
import Result_row_find from '../../resource/Result_row_find/Result_row_find'
import InputText from '../../resource/InputText/InputText'
import { Button, Modal, Spinner } from 'react-bootstrap'

import TextField from '@material-ui/core/Button'

function KhoHang() {
    var arr = [
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
        { Name: 'Oc Vit', DonVi: 'Cai', GiaBan: '25000', SoLuong: 4 },
    ]

    const [show, setShow] = useState(false)
    const [messLoading, setMessLoading] = useState(
        '   Đang Tải Thông Tin Khách, Đợi Chút Nhé'
    )

    const [lstResult, setLstResult] = useState()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const style_Dialog_KhoHang = {
        display: 'block',
    }
    function Hanlde_TimSanPham() {
        setMessLoading('  Đang Tìm Sản Phẩm, Vui Lòng Chờ')
        handleShow(true)

        const _result = arr.map((e) => {
            return (
                <Result_row_find
                    name={e.Name}
                    donvi={e.DonVi}
                    giaban={e.GiaBan}
                    soluong={e.SoLuong}
                    txtBtn="Chỉnh sửa"
                    titleDialog="Cập Nhật Công Nợ"
                    style_Dialog_KhoHang={style_Dialog_KhoHang}
                />
            )
        })

        setLstResult(_result)
    }

    return (
        <section className="khohang-container">
            <div className="khohang-container__content">
                <h2 className="header-title">Kho Hàng</h2>

                <div
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <input
                        style={{
                            width: 400,
                            height: 50,
                            marginLeft: 100,
                            padding: 10,
                        }}
                        type="text"
                        name="name"
                        placeholder="Nhập Tên Sản Phẩm"
                    />
                    <Button
                        onClick={(e) => Hanlde_TimSanPham()}
                        variant="primary"
                        style={{
                            width: '250px',
                        }}
                    >
                        Tìm
                    </Button>
                </div>

                <div className="list-product">
                    <ul className="list-items__detail-product">{lstResult}</ul>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
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

export default KhoHang
