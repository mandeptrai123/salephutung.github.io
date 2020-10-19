
import React from 'react'

// import css
import './css/BottomNavigation.css';

//import component
import ButtonNavigation from '../../resource/ButtonNavigation/ButtonNavigation';

function BottomNavigation() {
    return(
        <section className='bottomNavigation-container'>

            <div className='btn-ql'>
                <ButtonNavigation link='/quanli' content='Quản lí' bgColor='#E4A11C'/>
            </div>

            <footer>
                <nav>
                    <ButtonNavigation link='/oder' content='Bán Hàng' bgColor='#E43F1C'/>
                    <ButtonNavigation content='Nhập Hàng' bgColor='#E4A11C'/>
                    <ButtonNavigation content='Thông Báo' bgColor='#E43F1C'/>
                </nav>
            </footer>
        </section>
    );
}

export default BottomNavigation;