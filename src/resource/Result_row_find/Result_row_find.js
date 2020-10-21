import React from 'react'
import './css/Result_row_find.css'

//import component
import Dialog from '../Dialog/Dialog';

function Result_row_find(props) {
    return(
        <li 
        className='item__detail-product'>
            <div className='item__detail-product-content'>
                {props.name}
            </div>
            <div className='item__detail-product-content'>
                {props.donvi}
            </div>
            <div className='item__detail-product-content'>
                {props.giaban}
            </div>
            <div className='item__detail-product-content'>
                {props.soluong}
            </div>
            <label for='btn-show-dialog' className='btn-show'>{props.txtBtn}</label>
            <input type='checkbox' id='btn-show-dialog' hidden/>
            <label for='btn-show-dialog' className='overlay-dialog'>
                <Dialog titleDialog={props.titleDialog} style_Dialog_CongNo={props.style_Dialog_CongNo} style_Dialog_KhoHang={props.style_Dialog_KhoHang}/>
            </label>
        </li>
    );
}

export default Result_row_find