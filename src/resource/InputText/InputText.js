import React from 'react';
import './css/InputText.css';

function InputText(props) {
    return(
        <div className='input' style={{width:props.width}} >
            <input className='input-content'  onBlur={props.onBlur} placeholder={props.placeholder}/>
            <span className='focus'></span>
        </div>
    );
}

export default InputText;