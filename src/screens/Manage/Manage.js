import React, { useState, useEffect } from 'react'

// import css
import './css/Manage.css'

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation'
import DonHangTheoNgay from './Children_Component/DonHangTheoNgay'
import CongNo from './Children_Component/CongNo'
import BaoCaoDoanhThu from './Children_Component/BaoCaoDoanhThu/BaoCaoDoanhThu'
import TaoNhanVien from './Children_Component/TaoNhanVien'
import HangThieuSL from './Children_Component/HangThieuSL'

import { Button, ListGroup } from 'react-bootstrap'

function Manage() {
    const [screenUI, setUI] = useState(<DonHangTheoNgay></DonHangTheoNgay>)
    useEffect(() => {})

    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [active4, setActive4] = useState(false);
    const [active5, setActive5] = useState(false);


    function Handle_ThemNhanVien() {
        setUI(<TaoNhanVien />)
    }
    function Handle_HangThieuSL() {
        setUI(<HangThieuSL />)
    }
    function Handle_DonHangTrongNgay() {
        setUI(<DonHangTheoNgay></DonHangTheoNgay>)
    }
    function Handle_BaoCaoDoanhThu() {
        setUI(<BaoCaoDoanhThu />)
    }
    function Handle_ToanBoCongNo() {
        setUI(<CongNo></CongNo>)
    }

    function DisableActive()
    {
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);
        setActive5(false);
    }

    useEffect(()=>{
        Handle_ThemNhanVien();
    },[]);


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
                        active={active1}
                        as="li"
                        variant="primary"
                        action
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            color: 'white',
                        }}
                            
                        onClick={e=>{
                            DisableActive();
                            setActive1(true);
                            Handle_ThemNhanVien();
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
                        onClick={e=>{
                            DisableActive();
                            setActive2(true);
                            Handle_HangThieuSL();
                            }}
                    >
                        Hàng Thiếu Số Lượng
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
                        onClick={e=>{
                            DisableActive();
                            setActive3(true);
                            Handle_DonHangTrongNgay();
                            }}
                    >
                        Xem Đơn Hàng Theo Ngày
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
                        onClick={e=>{
                            DisableActive();
                            setActive4(true);
                            Handle_BaoCaoDoanhThu();
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
                        onClick={e=>{
                            DisableActive();
                            setActive5(true);
                            Handle_ToanBoCongNo();
                            }}
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
