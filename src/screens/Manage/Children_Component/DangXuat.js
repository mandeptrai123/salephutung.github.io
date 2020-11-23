import { useHistory } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

//import component
import { Modal, Button, Spinner} from 'react-bootstrap';
import {TextField} from '@material-ui/core';
function DangXuat(props)
{
    const history = useHistory();
    return (
        <div>
             <Button
                 onClick={history.push("/")}
                 style={{width:200,height:50}}
            />
        </div>
       )
}

export default DangXuat;