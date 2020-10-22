import React, { useState, useEffect } from 'react'

// import css
import './css/Manage.css'

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation'
import DonHangTrongNgay from './Children_Component/DonHangTrongNgay'
import CongNo from './Children_Component/CongNo'
import BaoCaoDoanhThu from './Children_Component/BaoCaoDoanhThu/BaoCaoDoanhThu'
import TaoNhanVien from './Children_Component/TaoNhanVien'
import HangThieuSL from './Children_Component/HangThieuSL'

import { Button, ListGroup } from 'react-bootstrap'

function Manage() {
    const [screenUI, setUI] = useState(<DonHangTrongNgay></DonHangTrongNgay>)
    useEffect(() => {})

    function Handle_ThemNhanVien() {
        setUI(<TaoNhanVien />)
    }
    function Handle_HangThieuSL() {
        setUI(<HangThieuSL />)
    }
    function Handle_DonHangTrongNgay() {
        setUI(<DonHangTrongNgay></DonHangTrongNgay>)
    }
    function Handle_BaoCaoDoanhThu() {
        setUI(<BaoCaoDoanhThu />)
    }
    function Handle_ToanBoCongNo() {
        setUI(<CongNo></CongNo>)
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
                    <ListGroup.Item as="li" variant="danger">
                        Bảng Điều Khiển
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        variant="light"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'black',
                        }}
                        onClick={Handle_ThemNhanVien}
                    >
                        Thêm Nhân Viên
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        variant="light"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'black',
                        }}
                        onClick={Handle_HangThieuSL}
                    >
                        Hàng Thiếu Số Lượng
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        variant="light"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'black',
                        }}
                        onClick={Handle_DonHangTrongNgay}
                    >
                        Đơn Hàng Trong Ngày
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        variant="light"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'black',
                        }}
                        onClick={Handle_BaoCaoDoanhThu}
                    >
                        Báo Cáo Doanh Thu
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        variant="light"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'black',
                        }}
                        onClick={Handle_ToanBoCongNo}
                    >
                        Toàn Bộ Công Nợ
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
        </div>
    )
}

export default Manage
