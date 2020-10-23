import React from 'react';
import './css/InputText.css';

function InputText(props) {
    return(
        <div className='input' style={{width:props.width}} >
            <input onChange={props.onChange} value={props.text} className='input-content'  onBlur={props.onBlur} placeholder={props.placeholder}></input>
            <span className='focus'></span>
        </div>
    );
}

export default InputText;