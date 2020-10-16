import React from 'react'
import '../FormStyle/FormStyle.css'


// import components
import TitleForm from '../resource/TitleForm/TitleForm'
import InputText from '../resource/InputText/InputText'
import ButtonForm from '../resource/ButtonForm/ButtonForm'
import TextForm from '../resource/TextForm/TextForm'


function Login() {
    const styleFlex = {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 0,
    }

    return(
        <div className='container'>
            <div className='form'>
                <TitleForm title='Sale Phụ Tùng'/>
                <form className='form-content'>
                    <InputText placeholder='Số Điện Thoại'/>   
                    <InputText placeholder='Mật Khẩu'/>  
                    <ButtonForm btnText='Đăng Nhập'/>
                </form>
            </div>
        </div>
    );
}

export default Login;