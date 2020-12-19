import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import './css/PrintedDonHang.css'
var index = 0
class PrintDonHang extends React.Component {
    render() {
        return (
            <div className="bill-container">
                <div className="bill-header">
                    <h1>NHÀ PHÂN PHỐI PHỤ TÙNG XE GẮN MÁY NAM THÀNH</h1>
                    <h3>ĐC: ĐỨC HẠNH - ĐỨC LINH - BÌNH THUẬN</h3>
                    <h3>
                        KẾ TOÁN VÂN - NHƯ: 0982330085 - 0915239702 - 0933212702
                        - 0975801117
                    </h3>
                </div>
                <h1
                    style={{
                        textAlign: 'center',
                        margin: '18px 0',
                        fontSize: '60px',
                    }}
                >
                    PHIẾU GIAO HÀNG
                </h1>
                <div className="bill-info-person">
                    <div className="bill-info-person__left">
                        <h3>TÊN KHÁCH HÀNG: {this.props.item.TenKhach}</h3>
                        <h3>ĐỊA CHỈ: {this.props.item.DiaChiKhach}</h3>
                        <h3>ĐIỆN THOẠI: {this.props.item.SDTKhach}</h3>
                    </div>
                    <div className="bill-info-person__right">
                        <h3>
                            NGÀY:{' '}
                            <span
                                style={{
                                    borderBottom: '2px solid black',
                                    fontSize: '40px',
                                }}
                            >
                                {this.props.item.Date}
                            </span>
                        </h3>
                        <h3>SỐ PHIẾU: 1</h3>
                    </div>
                </div>

                <Table
                    bordered
                    style={{
                        marginTop: '50px',
                    }}
                >
                    <thead>
                        <tr>
                            <th>
                                <h4 className="bill-table__text">STT</h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">
                                    TÊN PHỤ TÙNG
                                </h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">ĐVT</h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">SL</h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">ĐƠN GIÁ</h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">THÀNH TIỀN</h4>
                            </th>
                            <th>
                                <h4 className="bill-table__text">GHI CHÚ</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.item.lstSanPham.map((e) => {
                            index++
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{e.name}</td>
                                    <td>{e.Donvi}</td>
                                    <td>{e.soluongBan}</td>
                                    <td>{e.price}</td>
                                    <td>{e.pricesum}</td>
                                    <td>{e.Ghichu}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="5">
                                <h4 className="bill-table__text">TỔNG:</h4>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <h4 className="bill-table__text">
                                    CHIẾT KHẤU %:
                                </h4>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan="5">
                                <h4 className="bill-table__text">TỔNG CỘNG:</h4>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>

                <div className="bill-donate">
                    <span>TẶNG 5 ĐỮA THẮNG W1</span>
                    <span>TẶNG 2 ÁO THUN SIZE LỚN</span>
                    <div
                        style={{
                            fontSize: '25px',
                        }}
                    >
                        ..................................................................................................................................................................................................................................................................................................................................................................................
                        <br />
                        ..................................................................................................................................................................................................................................................................................................................................................................................
                    </div>
                </div>
                <div className="bill-numberphone">
                    <h4>
                        (Không hài lòng về chất lượng phục vụ của nhân viên giao
                        hàng và kế toán liên hệ:{' '}
                    </h4>
                    <h4>Nam Thành: 0937952702 - 0968144702 - 0915151702)</h4>
                </div>
                <div className="bill-doneOder">
                    <div className="nguoiGiaoHang">
                        <h5>Người giao hàng</h5>
                    </div>
                    <div className="nguoiNhanHang">
                        <h5>Người nhận hàng</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrintDonHang
