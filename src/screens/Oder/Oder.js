
import React from 'react'

// import css
import './css/Oder.css';

//import component
import InputText from '../../resource/InputText/InputText';

function Oder() {
    return(
        <section className='oder-container'>
            <header className='oder-header'>
                <div className='container-input'>
                    <div className='input-content'>
                        <h3>Số điện thoại: </h3>
                        <InputText placeholder='Số Điện Thoại'/>
                    </div>
                    <div className='input-content'>
                        <h3>Tên Khách: </h3>
                        <InputText placeholder='Tên Khách'/>
                    </div>
                    <div className='input-content'>
                        <h3>Địa Chỉ: </h3>
                        <InputText placeholder='Địa Chỉ'/>
                    </div>
                </div>

                <div className='check-box'>
                    <label for='check-box__custormer'>Khách Lẻ</label>
                    <input type='checkbox' id='check-box__custormer'/>
                </div>
            </header>

            <section className='container-content'>
                <div className='content-left'>
                    <div className='content-left__find-product'>
                        <div className='find-product'>
                            <input type='text' placeholder='Nhập sản phẩm cần tìm' className='input-find'/>
                            <button type='button' className='btn-find'>Tìm</button>
                        </div>
                        <ul className='list-items-product'>
                            <li className='item-product'>
                                <div className='item-product__content'>
                                    Demo Nội Dụng
                                </div>
                                <button type='button' className='btn-choose'>Chọn</button>
                            </li>
                            <li className='item-product'>
                                <div className='item-product__content'>
                                    Demo Nội Dụng
                                </div>
                                <button type='button' className='btn-choose'>Chọn</button>
                            </li>
                            <li className='item-product'>
                                <div className='item-product__content'>
                                    Demo Nội Dụng
                                </div>
                                <button type='button' className='btn-choose'>Chọn</button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='content-right'>
                    <div className='content-right__price'>
                        <ul className='content-right__price-list'>
                            <li class="price-list__item">
                                Sản phẩm: 
                                <span class="price">10000</span>
                            </li>
                            <li class="price-list__item">
                                Sản phẩm: 
                                <span class="price">10000</span>
                            </li>
                        </ul>
                        <totalPrice />
                    </div>

                    <div className='content-right__submit'>
                        <button type='button' className='btn-submit'>Đặt Hàng</button>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Oder;

function totalPrice() {
    return(
        <div className='total-price'>
            Thành tiền: 
            <span className='price'>20000</span>
        </div>
    );
}