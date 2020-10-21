import React, { useState, useEffect } from 'react'

// import css
import './css/Manage.css'

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation'
import DonHangTrongNgay from './Children_Component/DonHangTrongNgay'
import CongNo from './Children_Component/CongNo'
import BaoCaoDoanhThu from './Children_Component/BaoCaoDoanhThu/BaoCaoDoanhThu'

function Manage() {
    const [screenUI, setUI] = useState(<DonHangTrongNgay></DonHangTrongNgay>)
    useEffect(() => {})

    function Handle_ThemNhanVien() {}
    function Handle_HangThieuSL() {}
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
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <button
                    onClick={Handle_ThemNhanVien}
                    style={{ height: 50 }}
                    type="button"
                    className="btn"
                >
                    Thêm Nhân Viên
                </button>
                <button
                    onClick={Handle_HangThieuSL}
                    style={{ height: 50 }}
                    type="button"
                    className="btn"
                >
                    Hàng Thiếu Số Lượng
                </button>
                <button
                    onClick={Handle_DonHangTrongNgay}
                    style={{ height: 50 }}
                    type="button"
                    className="btn"
                >
                    Đơn Hàng Trong Ngày
                </button>
                <button
                    onClick={Handle_BaoCaoDoanhThu}
                    style={{ height: 50 }}
                    type="button"
                    className="btn"
                >
                    Báo Cáo Doanh Thu
                </button>
                <button
                    onClick={Handle_ToanBoCongNo}
                    style={{ height: 50 }}
                    type="button"
                    className="btn"
                >
                    Toàn Bộ Công Nợ
                </button>
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
