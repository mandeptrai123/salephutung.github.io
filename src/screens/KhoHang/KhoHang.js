import React from 'react'
import './css/KhoHang.css';

//import component
import Find from '../../resource/Find/Find';
import Result_row_find from '../../resource/Result_row_find/Result_row_find';



function KhoHang() {

    const style_Dialog_KhoHang = {
        display: 'block'
    }

    return(
        <section className='khohang-container'>
            <div className='khohang-container__content'>
                <h2 className='header-title'>
                    Kho Hàng
                </h2>

                <Find placeholder='Nhập tên sản phẩm'/>


                <div className='list-product'>
                    <ul className='list-items__detail-product'> 
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>
                        <Result_row_find txtBtn='Chỉnh sửa' titleDialog='Cập Nhật Công Nợ' style_Dialog_KhoHang={style_Dialog_KhoHang}/>   
                        
                    </ul>
                </div>
                
            </div>
        </section>
    );
}

export default KhoHang;