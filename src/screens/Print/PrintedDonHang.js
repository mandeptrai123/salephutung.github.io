import React, { useEffect } from 'react'
import './css/PrintedDonHang.css'
import Table from 'react-bootstrap/Table'
var index = 0
class PrintDonHang extends React.Component {
    render() {
        return (
            // <div style={{ width: '100%', paddingTop: 60 }}>
            //     <h2
            //         style={{
            //             width: '100%',
            //             textAlign: 'center',
            //             fontWeight: 'bold',
            //             color: 'black',
            //         }}
            //     >
            //         Nhà Phân Phối Phụ Tùng Xe Gắn Máy Nam Thành
            //     </h2>
            //     <h5
            //         style={{
            //             width: '100%',
            //             textAlign: 'center',
            //             fontWeight: 'bold',
            //             color: 'black',
            //         }}
            //     >
            //         ĐC: Đức Hạnh - Đức Linh - Bình Thuận
            //     </h5>
            //     <h6
            //         style={{
            //             width: '100%',
            //             textAlign: 'center',
            //             fontWeight: 'bold',
            //             color: 'black',
            //         }}
            //     >
            //         Kế Toán Vân - Như : 0982330085 - 0915239702 - 0933212702 -
            //         0975801117
            //     </h6>
            //     <h2
            //         style={{
            //             width: '100%',
            //             textAlign: 'center',
            //             fontWeight: 'bold',
            //             color: 'black',
            //         }}
            //     >
            //         Phiếu Giao Hàng
            //     </h2>
            //     <div
            //         style={{
            //             display: 'flex',
            //             width: '100%',
            //             justifyContent: 'start',
            //         }}
            //     >
            //         <div
            //             style={{
            //                 marginLeft: 50,
            //                 alignSelf: 'flex-start',
            //                 padding: 5,
            //                 fontWeight: 'bold',
            //             }}
            //         >
            //             Tên Khách Hàng : {this.props.item.TenKhach}
            //         </div>
            //         <div
            //             style={{
            //                 alignSelf: 'flex-end',
            //                 marginLeft: 100,
            //                 padding: 5,
            //                 fontWeight: 'bold',
            //             }}
            //         >
            //             Ngày : {this.props.item.Date}
            //         </div>
            //     </div>

            //     <div style={{ display: 'flex', width: '100%' }}>
            //         <div
            //             style={{
            //                 marginLeft: 50,
            //                 alignSelf: 'flex-start',
            //                 padding: 5,
            //                 fontWeight: 'bold',
            //             }}
            //         >
            //             Địa Chỉ: {this.props.item.DiaChiKhach}
            //         </div>
            //         <div
            //             style={{
            //                 alignSelf: 'center',
            //                 padding: 5,
            //                 marginLeft: 100,
            //                 fontWeight: 'bold',
            //             }}
            //         >
            //             Số Điện Thoại: {this.props.item.SDTNV}
            //         </div>
            //         <div
            //             style={{
            //                 alignSelf: 'flex-end',
            //                 marginLeft: 100,
            //                 padding: 5,
            //                 fontWeight: 'bold',
            //             }}
            //         >
            //             Số Phiếu : 1
            //         </div>
            //     </div>

            //     <table
            //         style={{
            //             alignSelf: 'center',
            //             width: '90%',
            //             marginTop: 60,
            //             marginLeft: 30,
            //             marginRight: 20,
            //         }}
            //     >
            //         <thead>
            //             <th>STT</th>
            //             <th>Tên Phụ Tùng</th>
            //             <th>ĐVT</th>
            //             <th>SL</th>
            //             <th>Đơn Giá</th>
            //             <th>Thành Tiền</th>
            //             <th>Ghi Chú</th>
            //         </thead>
            //         <tbody>
            //             {this.props.item.lstSanPham.map((e) => {
            //                 index++
            //                 return (
            //                     <tr>
            //                         <td>{index}</td>
            //                         <td>{e.name}</td>
            //                         <td>{e.Donvi}</td>
            //                         <td>{e.soluongBan}</td>
            //                         <td>{e.price}</td>
            //                         <td>{e.pricesum}</td>
            //                         <td></td>
            //                     </tr>
            //                 )
            //             })}
            //         </tbody>
            //     </table>

            //     <table
            //         style={{
            //             alignSelf: 'center',
            //             width: '90%',
            //             marginTop: 2,
            //             marginLeft: 30,
            //             marginRight: 20,
            //         }}
            //     >
            //         <thead>
            //             <th></th>
            //             <th></th>
            //             <th></th>
            //         </thead>
            //         <tbody>
            //             <tr>
            //                 <td>Tổng Tiền</td>
            //                 <td>Chiết Khấu</td>
            //                 <td>Thành Tiền</td>
            //             </tr>
            //         </tbody>
            //     </table>

            //     <div
            //         style={{
            //             fontWeight: 'bold',
            //             fontSize: 18,
            //             color: 'black',
            //             textAlign: 'center',
            //             padding: 5,
            //             marginLeft: 40,
            //             marginRight: 40,
            //         }}
            //     >
            //         (Không hài lòng về chất lượng dịch vụ của nhân viên giao
            //         hàng và kế toán liên hệ: Nam Thành:
            //         0937952702-0968144702-0915151702)
            //     </div>

            //     <div
            //         style={{
            //             display: 'flex',
            //             width: '100%',
            //             justifyContent: 'start',
            //         }}
            //     >
            //         <div
            //             style={{
            //                 fontWeight: 'bold',
            //                 fontSize: 14,
            //                 alignSelf: 'flex-start',
            //                 marginLeft: 100,
            //             }}
            //         >
            //             Người Giao Hàng
            //         </div>
            //         <div
            //             style={{
            //                 fontWeight: 'bold',
            //                 fontSize: 14,
            //                 position: 'absolute',
            //                 right: 100,
            //             }}
            //         >
            //             Người Nhận Hàng
            //         </div>
            //     </div>
            // </div>

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
                    }}
                >
                    PHIẾU GIAO HÀNG
                </h1>
                <div className="bill-info-person">
                    <div className="bill-info-person__left">
                        <h3>TÊN KHÁCH HÀNG: {this.props.item.TenKhach}</h3>
                        <h3>ĐỊA CHỈ: {this.props.item.DiaChiKhach}</h3>
                        <h3>ĐIỆN THOẠI: {this.props.item.SDTNV}</h3>
                    </div>
                    <div className="bill-info-person__right">
                        <h3>
                            NGÀY:{' '}
                            <span
                                style={{
                                    borderBottom: '2px solid black',
                                }}
                            >
                                {this.props.item.Date}
                            </span>
                        </h3>
                        <h3>SỐ PHIẾU: 1</h3>
                    </div>
                </div>

                <Table bordered>
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
                                    <td></td>
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
                            fontSize: '18px',
                            width: '90%',
                        }}
                    >
                        <div>
                            ..................................................................................................................................................................................................................................................................................................................................................................................
                        </div>
                        <div>
                            ..................................................................................................................................................................................................................................................................................................................................................................................
                        </div>
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
