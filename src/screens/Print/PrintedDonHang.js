import React, { useEffect } from "react";
import './Print.css';
var index = 0;
class PrintDonHang extends React.Component{
    
   render(){
    return (
        <div
        style={{width:'100%',paddingTop:60}}>
            <h2
            style={{width:'100%',textAlign:'center',fontWeight:'bold',color:'black'}}
            >
                Nhà Phân Phối Phụ Tùng Xe Gắn Máy Nam Thành
            </h2>
            <h5
                          style={{width:'100%',textAlign:'center',fontWeight:'bold',color:'black'}}

            >
                ĐC: Đức Hạnh - Đức Linh - Bình Thuận
            </h5>
            <h6
                          style={{width:'100%',textAlign:'center',fontWeight:'bold',color:'black'}}

            >
                Kế Toán Vân - Như : 0982330085 - 0915239702 - 0933212702 - 0975801117
            </h6>
            <h2
            style={{width:'100%',textAlign:'center',fontWeight:'bold',color:'black'}}
            >
              Phiếu Giao Hàng
            </h2>
            <div
            style={{display:'flex',width:'100%',justifyContent:'start'}}
            >
              <div
              style={{marginLeft:50,alignSelf:'flex-start',padding:5,fontWeight:'bold'}}
              >
                  Tên Khách Hàng : {this.props.item.TenKhach}
              </div>
              <div
              style={{alignSelf:'flex-end',marginLeft:100,padding:5,fontWeight:'bold'}}
              >
                  Ngày : {this.props.item.Date}
              </div>
            </div>

            <div
            style={{display:'flex',width:'100%'}}
            >
              <div
               style={{marginLeft:50,alignSelf:'flex-start',padding:5,fontWeight:'bold'}}
              >
                  Địa Chỉ: {this.props.item.DiaChiKhach}
              </div>
              <div
               style={{alignSelf:'center',padding:5,marginLeft:100,fontWeight:'bold'}}
              >
                  Số Điện Thoại: {this.props.item.SDTNV}
              </div>
              <div
               style={{alignSelf:'flex-end',marginLeft:100,padding:5,fontWeight:'bold'}}

              >
                  Số Phiếu : 1
              </div>
            </div>



            <table
            style={{alignSelf:'center',width:'90%',marginTop:60,marginLeft:30,marginRight:20}}
            >
                  <thead>
                      <th>STT</th>
                      <th>Tên Phụ Tùng</th>
                      <th>ĐVT</th>
                      <th>SL</th>
                      <th>Đơn Giá</th>
                      <th>Thành Tiền</th>
                      <th>Ghi Chú</th>
                  </thead>
                  <tbody>
                      {this.props.item.lstSanPham.map(e=>{
                          index ++;
                          return <tr>
                          <td>{index}</td>
                          <td>{e.name}</td>
                          <td>{e.Donvi}</td>
                          <td>{e.soluongBan}</td>
                          <td>{e.price}</td>
                          <td>{e.pricesum}</td>
                          <td></td>
                        </tr>
                      })}
                  </tbody>
        
      </table>
     
      <table
            style={{alignSelf:'center',width:'90%',marginTop:2,marginLeft:30,marginRight:20}}
            >
                  <thead>
                      <th></th>
                      <th></th>
                      <th></th>
                     
                  </thead>
                  <tbody>
                      
                        <tr>
                          <td>Tổng Tiền</td>
                          <td>Chiết Khấu</td>
                          <td>Thành Tiền</td>
                        </tr>
                 
                  </tbody>
        
      </table>

        <div    style={{fontWeight:'bold',fontSize:18,color:'black',textAlign:'center',padding:5,marginLeft:40,marginRight:40}}>
            (Không hài lòng về chất lượng dịch vụ của nhân viên giao hàng và kế toán liên hệ:
             Nam Thành: 0937952702-0968144702-0915151702)
        </div>  

        <div style={{display:'flex',width:'100%',justifyContent:'start'}}>
                <div
                style={{fontWeight:'bold',fontSize:14,alignSelf:'flex-start',marginLeft:100}}
                >
                    Người Giao Hàng
                </div>
                <div
                style={{fontWeight:'bold',fontSize:14,position:'absolute',right:100}}
                    
                >
                    Người Nhận Hàng
                </div>
        </div>  
       </div>
      
    )
   }
 }
  
  export default PrintDonHang;