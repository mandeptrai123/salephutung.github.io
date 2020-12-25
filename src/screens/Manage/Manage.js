import React, { useState, useEffect } from 'react'

// import css
import './css/Manage.css'

//import component
import LichSuGiaoDich from './Children_Component/LichSuGiaoDich'
import CongNo from './Children_Component/CongNo'
import BaoCaoDoanhThu from './Children_Component/BaoCaoDoanhThu/BaoCaoDoanhThu'
import TaoNhanVien from './Children_Component/TaoNhanVien'
import HangHetSoLuong from './Children_Component/HangHetSoLuong'
import NhatKyCongNo from './Children_Component/NhatKyCongNo'
import DangXuat from './Children_Component/DangXuat'
import { Modal, Button, Spinner } from 'react-bootstrap'

import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Manage() {
    const isQuanLi = useSelector((state) => state.isQuanLi)
    const [screenUI, setUI] = useState(<div></div>)

    const [active0, setActive0] = useState(true)
    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [active3, setActive3] = useState(false)
    const [active4, setActive4] = useState(false)
    const [active5, setActive5] = useState(false)
    const [active6, setActive6] = useState(false)
    const [active7, setActive7] = useState(false)

    const [showBlockQuanLi, setShowBlockQuanLi] = useState(false)

    useEffect(() => {
        DisableActive()
        setActive0(true)
        Handle_MyAccount()
    }, [])
    function Handle_MyAccount() {
        setUI(<div></div>)
    }
    function Handle_ThemNhanVien() {
        setUI(<TaoNhanVien />)
    }
    function Handle_HangHetSoLuong() {
        setUI(<HangHetSoLuong />)
    }
    function Handle_DonHangTrongNgay() {
        setUI(<LichSuGiaoDich />)
    }
    function Handle_BaoCaoDoanhThu() {
        setUI(<BaoCaoDoanhThu />)
    }
    function Handle_ToanBoCongNo() {
        setUI(<CongNo></CongNo>)
    }
    function Handle_NhatKyCongNo() {
        setUI(<NhatKyCongNo></NhatKyCongNo>)
    }

    function Handle_DangXuat() {
        setUI(<DangXuat></DangXuat>)
    }

    function DisableActive() {
        setActive0(false)
        setActive1(false)
        setActive2(false)
        setActive3(false)
        setActive4(false)
        setActive5(false)
        setActive6(false)
        setActive7(false)
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100vh',
            }}
        >
            {/* Control */}
            <div
                style={{
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 10px',
                }}
            >
                <ListGroup
                    as="ul"
                    style={{
                        width: '100%',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    <ListGroup.Item
                        active={active0}
                        as="li"
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {}}
                    >
                        Tài Khoản Của Bạn
                    </ListGroup.Item>

                    <ListGroup.Item
                        active={active1}
                        as="li"
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive1(true)
                                Handle_ThemNhanVien()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Thêm Nhân Viên
                    </ListGroup.Item>

                    <ListGroup.Item
                        as="li"
                        active={active2}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive2(true)
                                Handle_HangHetSoLuong()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Hàng Hết Số Lượng
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        active={active3}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive3(true)
                                Handle_DonHangTrongNgay()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Lịch Sử Giao Dịch
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        active={active4}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive4(true)
                                Handle_BaoCaoDoanhThu()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Báo Cáo Doanh Thu
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        active={active5}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive5(true)
                                Handle_ToanBoCongNo()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Toàn Bộ Công Nợ
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        active={active7}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            if (isQuanLi) {
                                DisableActive()
                                setActive7(true)
                                Handle_NhatKyCongNo()
                            } else {
                                setShowBlockQuanLi(true)
                            }
                        }}
                    >
                        Nhật Ký Công Nợ
                    </ListGroup.Item>

                    <ListGroup.Item
                        as="li"
                        active={active6}
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                        onClick={(e) => {
                            DisableActive()
                            setActive6(true)
                            Handle_DangXuat()
                        }}
                    >
                        Đăng Xuất
                    </ListGroup.Item>
                </ListGroup>
            </div>

            {/* Màn Hình Chính */}
            <div
                className="display-show"
                style={{
                    width: '80%',
                    height: '100%',
                }}
            >
                {screenUI}
            </div>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
                backdrop="static"
                show={showBlockQuanLi}
            >
                <Modal.Title>{'Trang Này Chỉ Dành Cho Quản Lí'}</Modal.Title>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={(e) => {
                            setShowBlockQuanLi(false)
                        }}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Manage
