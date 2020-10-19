
import React from 'react'

// import css
import './css/NhapKho.css';

//import component
import InputText from '../../resource/InputText/InputText';


function NhapKho() {
    return(
        <section className='nhapkho-container'>
            <div className='nhapkho-container__product'>
                <ul className='list-items__input'>
                    <li className='item__input'>
                        <h3>Tên Sản Phẩm</h3>
                        <InputText placeholder='Tên Sản Phẩm'/>
                    </li>
                    <li className='item__input'>
                        <h3>Số Lượng</h3>
                        <InputText placeholder='Số Lượng'/>
                    </li>
                    <li className='item__input'>
                        <h3>Số Lượng Báo Động</h3>
                        <InputText placeholder='Số Lượng Báo Động'/>
                    </li>
                    <li className='item__input'>
                        <h3>Giá Bán</h3>
                        <InputText placeholder='Giá Bán'/>
                    </li>
                </ul>
                <button type='button' className='btn-nhapkho'>Cho vào kho</button>
            </div>  
            <div className='nhapkho-container__diary'>
                <div className='diary__content'>
                    <h4>Nhập kí nhập hàng</h4>

                    <ul className='list-items__diary'>
                        <li className='item__diary'>
                            <h3>10:04 AM Thêm 100 bánh xe</h3>
                        </li>
                        <li className='item__diary'>
                            <h3>10:04 AM Thêm 100 bánh xe</h3>
                        </li>
                        <li className='item__diary'>
                            <h3>10:04 AM Thêm 100 bánh xe</h3>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default NhapKho;

