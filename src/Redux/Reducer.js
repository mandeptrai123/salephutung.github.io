import {LoginAction} from './ActionType';
import { useState } from 'react';
// File Xu Li Logic ( Quan Li State)

const defineState= 
{
    SDTNV:"",
    Pass:"",
    HoTen:"Chưa Có",
    isQuanLi:false,
};

const Reducer =(state = defineState,action)=>
{
      switch(action.type)
      {
         case LoginAction:
             console.log(action.SDTNV);
                return ({...defineState,SDTNV:action.SDTNV,isQuanLi:action.isQuanLi,HoTen:action.HoTen,Pass:action.Pass});
             break;

        default:
            return state;
             break;
      }

}

export default Reducer;