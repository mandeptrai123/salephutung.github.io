
import React,{useState,useEffect} from 'react'

// import css
import './css/NhapKho.css';

//import component
import InputText from '../../resource/InputText/InputText';
import {Modal,Button,Spinner} from 'react-bootstrap';

function NhapKho() {

    var arr =[{Action:"10:00 AM Thêm Cái Bố Thắng"},{Action:"10:00 AM Thêm Cái Bố Thắng"},{Action:"10:00 AM Thêm Cái Bố Thắng"}];


    const [loading,setShowLoading] = useState(false);
    const [mess,setMessLoading] = useState("Đang Thêm Sản Phẩm Vào Kho, Đợi Chút Nhé !");
    const [resultList,setNhatKy] = useState(<li  className='item__diary'><h3>{"ABC"}</h3></li>);


    const handleClose = () => setShowLoading(false);
    const handleShow = () => setShowLoading(true);


    function ThemVaoKho()
    {
        handleShow();
        UpdateNhatKy()
    }


    const ITemNhatKy=(props)=>{
        return <li className='item__diary'>
             <h3>{props.Action}</h3>
        </li>
            
    }
    function UpdateNhatKy()
    {
        const _lst =  arr.map((e)=>{
            return ITemNhatKy(e)
        })
        setNhatKy(_lst);
       
    }
    
    useEffect(()=>{
       
     
    },[])


    return(
        <section
        style={{marginTop:40,marginLeft:20}}
        className='nhapkho-container'>
            <div 
            className='nhapkho-container__product'>
                <ul className='list-items__input'>
                    <li className='item__input'>
                        <h6>Tên Sản Phẩm</h6>
                        <InputText placeholder='Tên Sản Phẩm'/>
                    </li>
                    <li className='item__input'>
                        <h6>Số Lượng</h6>
                        <InputText placeholder='Số Lượng'/>
                    </li>
                    <li className='item__input'>
                        <h6>Số Lượng Báo Động</h6>
                        <InputText placeholder='Số Lượng Báo Động'/>
                    </li>
                    <li className='item__input'>
                        <h6>Đơn Vị</h6>
                        <InputText placeholder='Đơn Vị'/>
                    </li>
                    <li className='item__input'>
                        <h6>Giá Bán</h6>
                        <InputText placeholder='Giá Bán'/>
                    </li>
                    <li className='item__input'>
                        <h6></h6>
                        <button   onClick={ThemVaoKho}  style={{borderRadius:30,marginTop:40,marginRight:20}} type='button' className='btn-nhapkho'>Cho vào kho</button>

                    </li>
                </ul>
            </div>  
            
            
            <div 
             style={{marginTop:40,marginRight:40,marginBottom:20}}
            className='nhapkho-container__diary'>
                <div className='diary__content'>
                    <h4>Nhập kí nhập hàng</h4>
                    <ul className='list-items__diary'>
                        {resultList}
                    </ul>
                </div>
            </div>
        
            <Modal show={loading} onHide={handleClose}>
                <Modal.Body >
                 <Modal.Title>
                 <Spinner animation="border" variant="success" role="status"></Spinner>
                     {mess}

                 </Modal.Title>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default NhapKho;

