
import React,{useState,useEffect} from 'react'

//import component

import {Modal,Button,Spinner} from 'react-bootstrap';
// import css
import '../css/Manage.css';

function CongNo()
{

    const [lstResult,setResult] = useState();
    const [totalCongNo,setTotalCongNo] = useState(30);

    var arr =[
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969025915",LichSuMuaHang:[],DiaChi:"12 Nguyễn Văn Bảo",Congno:40000},
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969025915",LichSuMuaHang:[],DiaChi:"12 Nguyễn Văn Bảo",Congno:40000},
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969025915",LichSuMuaHang:[],DiaChi:"12 Nguyễn Văn Bảo",Congno:40000}
]

    function ItemCongNo(props)
    {
       return <li className="item-li" style={{display:'flex',height:100,width:'100%'}}>
                <h6 style={{alignSelf:'center',marginLeft:10,marginRight:10,textAlign:'center',padding:10,fontSize:10}}>
                    Tên Khách:  {props.TenKhach}
                </h6>
                <h6 style={{alignSelf:'center',marginLeft:10,marginRight:10,textAlign:'center',padding:10,fontSize:10}}>
                    SĐT:  {props.SDTKhach}
                </h6>
                <h6 style={{alignSelf:'center',marginLeft:10,marginRight:10,textAlign:'center',padding:10,fontSize:10}}>
                   Địa Chỉ: {props.DiaChi}
                </h6>
                <h6 style={{alignSelf:'center',marginLeft:10,marginRight:10,textAlign:'center',padding:10,fontSize:12,color:'red'}}>
                   Tổng Công Nợ: {props.Congno}
                </h6>
                <button
                style={{margin:40,alignSelf:'center',borderRadius:20,backgroundColor:'orange',width:100,height:40,fontSize:10,color:'white'}}
                >Chỉnh Sửa</button>

            </li>
    }

    useEffect(()=>{
       const _result =  arr.map(e=>{
           return ItemCongNo(e);
       })

       setResult(_result);

    },[])


    return(
        <div>
        <h4 style={{color:'green',padding:10,textAlign:'center',width:'100%',alignSelf:'center'}}>
            Toàn Bộ Công Nợ:  {totalCongNo}
        </h4>
        <ul   style={{width:'100%',height:'100%',flex:1,flexDirection:'column'}}>
            {lstResult}
        </ul>
        </div>

    )
}

export default CongNo;