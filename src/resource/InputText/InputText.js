import React from 'react';
import './css/InputText.css';

function InputText(props) {
    return(
        <div 
        style={props.style}
          >
            <input

                style={{height:40,textAlign:'center'}}
             onChange={props.onChange} 
             value={props.value} 
              onBlur={props.onBlur} 
              placeholder={props.placeholder}></input>
            <span className='focus'></span>
        </div>
    );
}

export default InputText;