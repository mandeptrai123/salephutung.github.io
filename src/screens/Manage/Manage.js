
import React from 'react'

// import css
import './css/Manage.css';

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation';


function Manage() {
    return(
        <section className='manage-container'>
            <header className='manage-header'>
                <ButtonNavigation link='/' content='Quay về' bgColor='#E4A11C' boxShadow='1px 1px 5px'/> 
                <div className='title'>
                    <h1>Trang của quản lí</h1>
                </div>
            </header>

            <section className='container-content__manage'>
                <div className='content-left__nd'>
                    <nav className='list-button'>
                        <button type='button' className='btn'>Thêm Nhân Viên</button>
                        <button type='button' className='btn'>Hàng Thiếu Số Lượng</button>
                        <button type='button' className='btn'>Bán Hàng Trong Ngày</button>
                    </nav>
                </div>
                <div className='content-right__nd'>
                    <div className='content-right__show'>

                    </div>
                </div>
            </section>
        </section>
    );
}

export default Manage;