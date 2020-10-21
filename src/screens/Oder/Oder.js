import React,{useState} from 'react'

// import css
import './css/Oder.css';

//import component
import InputText from '../../resource/InputText/InputText';

import {Modal,Button,Spinner} from 'react-bootstrap';

function Oder() {

    const [show, setShow] = useState(false);
    const [messLoading, setMessLoading] = useState("   Đang Tải Thông Tin Khách, Đợi Chút Nhé");

    function  LoadKhach(){
        setMessLoading("    Đang Tải Thông Tin Khách, Đợi Chút Nhé")
        handleShow();
    }

    function  TimSanPham(){
        setMessLoading("    Đang Tìm Sản Phẩm, Đợi Chút Nhé")
        handleShow();
    }

    function  DatHang(){
        setMessLoading("    Đang Tiến Hành Đặt Hàng, Đợi Chút Nhé")
        handleShow();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <section style={{marginLeft:20,marginRight:20}} className='oder-container'>
            
            <header className='oder-header'>
                <div className='container-input'>
                    <div className='input-content'>
                        <h5>Số điện thoại: </h5>
                        <InputText onBlur={e=>LoadKhach()} placeholder='Số Điện Thoại'/>
                    </div>
                    <div className='input-content'>
                        <h5>Tên Khách: </h5>
                        <InputText placeholder='Tên Khách'/>
                    </div>
                    <div className='input-content'>
                        <h5>Địa Chỉ: </h5>
                        <InputText placeholder='Địa Chỉ'/>
                    </div>
                </div>

                <div className='check-box'>
                    <label for='check-box__custormer'>Khách Lẻ</label>
                    <input type='checkbox' id='check-box__custormer' style={{width:40,height:40}}/>
                </div>
            </header>

            <section className='container-content'>
                <div className='content-left'>
                    <div className='content-left__find-product'>
                        <div className='find-product'>
                            <input type='text' placeholder='Nhập sản phẩm cần tìm' className='input-find'/>
                            <button type='button' onClick={TimSanPham} className='btn-find'>Tìm</button>
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
                        <button onClick={DatHang} type='button' className='btn-submit'>Đặt Hàng</button>
                    </div>
                </div>
            </section>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Body >
                 <Modal.Title>
                 <Spinner animation="border" variant="success" role="status"></Spinner>
                     {messLoading}

                 </Modal.Title>
                </Modal.Body>
            </Modal>
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