import React from 'react'
import './css/Dialog.css'

//import component
import InputText from '../InputText/InputText';
import ButtonForm from '../ButtonForm/ButtonForm';


function Dialog(props) {

    return(
        <div className='dialog-container'>
            <div className='dialog-container__content'>
                <h3 className='title-dialog'>{props.titleDialog}</h3>
                <div className='row-input' style={props.style_Dialog_KhoHang}>
                    <RowInputDialog txtInput='Tên Sản Phẩm'/>
                    <RowInputDialog txtInput='Số Lượng'/>
                    <RowInputDialog txtInput='Đơn vị'/>
                </div>
                <div className='row-input' style={props.style_Dialog_CongNo}>
                    <h3>Công nợ củ:</h3>
                    <span className='price-congno'>{formatNumber(1000010)}</span>
                    <button type='button' className='btn-add'>Công Nợ Mới</button>
                </div>
                <ButtonForm typeInput='button' btnText='OK'/>
            </div>
        </div>
    );
}

export default Dialog

function RowInputDialog(props) {
    return(
        <div className='row-dialog'>
           <span className='txt-input'>{props.txtInput} </span>
            <InputText placeholder={props.txtInput} width='63%'/>
        </div>
    );
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ';
  }