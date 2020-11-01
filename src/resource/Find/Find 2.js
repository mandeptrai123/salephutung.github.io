import React from 'react'
import './css/Find.css'

//import component
import InputText from '../../resource/InputText/InputText';
import ButtonForm from '../../resource/ButtonForm/ButtonForm';

function Find(props) {
    return(
        <div className='find-name-product'>
            <InputText placeholder={props.placeholder} width='70%' marginBottom='0'/>
            <ButtonForm typeInput='button' btnText='Tìm' width='200px'/>
        </div>
    );
}

export default Find