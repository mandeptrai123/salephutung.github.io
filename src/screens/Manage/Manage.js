
import React,{useState,useEffect} from 'react'

// import css
import './css/Manage.css';

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation';
import DonHangTrongNgay from './Children_Component/DonHangTrongNgay';
import CongNo from './Children_Component/CongNo';

function Manage() {

    const [screenUI,setUI] = useState(<DonHangTrongNgay></DonHangTrongNgay>);
    useEffect(()=>{


    })

    function Handle_ThemNhanVien()
    {
        
        
    }
    function Handle_HangThieuSL()
    {

        
    }
    function Handle_DonHangTrongNgay()
    {

        setUI(<DonHangTrongNgay></DonHangTrongNgay>);
    }
    function Handle_BaoCaoDoanhThu()
    {

        
    }
    function Handle_ToanBoCongNo()
    {

        setUI(<CongNo></CongNo>);
    }

    return(
        <div style={{justifyContent:'center',alignItems:'center',flex:1,position:'relative'}}>
            <div style={{height:50,alignSelf:'center'}}>
                 <h1
                 style={{height:50,alignSelf:'center',textAlign:'center'}}
                 >Trang của quản lí</h1>
            </div>
            
                {/* Control */}
                <div
                style={{height:500,width:100,position:'absolute',left:20,top:100}}
                >
                <button   onClick={Handle_ThemNhanVien}  style={{height:50}} type='button' className='btn'>Thêm Nhân Viên</button>
                <button  onClick={Handle_HangThieuSL}   style={{height:50}} type='button' className='btn'>Hàng Thiếu Số Lượng</button>
                <button onClick={Handle_DonHangTrongNgay}    style={{height:50}} type='button' className='btn'>Đơn Hàng Trong Ngày</button>
                <button  onClick={Handle_BaoCaoDoanhThu}   style={{height:50}} type='button' className='btn'>Báo Cáo Doanh Thu</button>
                <button  onClick={Handle_ToanBoCongNo}   style={{height:50}} type='button' className='btn'>Toàn Bộ Công Nợ</button>
                </div>

                {/* Màn Hình Chính */}
                <div
                className="display-show"
                style={{position:'absolute',top:100,left:320,height:600,right:130}}
                >
                    {screenUI}
                </div>

           
           
        </div>
      
    );
}

export default Manage;