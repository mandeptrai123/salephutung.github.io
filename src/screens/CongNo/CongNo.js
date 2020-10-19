import React from 'react'
import './css/CongNo.css'

//import component
import Find from '../../resource/Find/Find';
import Result_row_find from '../../resource/Result_row_find/Result_row_find';

function CongNo(props) {

    const style_Dialog_CongNo = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0'
    }
    
    return(
        <section className='congno-container'>
            <div className='congno-container__content'>
                <h2 className='header-title'>
                    Trang Cong No
                </h2>
                
                <Find placeholder='Số điện thoại'/>

                <div className='list-product'>
                    <ul className='list-items__detail-product'> 
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>
                        <Result_row_find txtBtn='Chọn' titleDialog='Cập Nhật Công Nợ' style_Dialog_CongNo={style_Dialog_CongNo}/>   
                    </ul>
                </div>

            </div>
        </section>
    );
}

export default CongNo;