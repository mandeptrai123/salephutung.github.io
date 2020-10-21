
import React,{useState,useEffect} from 'react'


import {Modal,Button,Spinner} from 'react-bootstrap';

function DonHangTrongNgay()
{
    const [lstResult,setResult] = useState();
    const [totalBill,setTotalBill] = useState(30);

    var arr =[
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969",lstSanPham:[],TongTien:50000,ThanhTien:100000,Congno:40000},
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969",lstSanPham:[],TongTien:50000,ThanhTien:100000,Congno:40000},
    {Date:'2020/10/20',name:"Man",TenKhach:"Khach Dep Trai",SDTKhach:"0969",lstSanPham:[],TongTien:50000,ThanhTien:100000,Congno:40000}
]

    function ItemDonHang(props)
    {
       return <li  style={{display:'flex',height:100,width:'100%'}}>
                <h6 style={{marginLeft:10,marginRight:10,textAlign:'center',padding:10}}>
                    Thời Gian:  {props.Date}
                </h6>
                <h6 style={{marginLeft:10,marginRight:10,textAlign:'center',padding:10}}>
                    Tên Khách:  {props.TenKhach}
                </h6>
                <h6 style={{marginLeft:10,marginRight:10,textAlign:'center',padding:10}}>
                   Tổng Tiền {props.TongTien}
                </h6>
                <h6 style={{marginLeft:10,marginRight:10,textAlign:'center',padding:10}}>
                   Thành Tiền {props.ThanhTien}
                </h6>
                <button
                style={{borderRadius:20,backgroundColor:'orange',width:100,height:40,fontSize:10,color:'white'}}
                >Xem Chi Tiết</button>

            </li>
    }

    useEffect(()=>{
       const _result =  arr.map(e=>{
           return ItemDonHang(e);
       })
       
       setResult(_result);

    },[])


    return(
        <div>
        <h4 style={{color:'red',padding:10,textAlign:'center',width:'100%',alignSelf:'center'}}>
            Tổng Số Đơn:  {totalBill}
        </h4>
        <ul   style={{width:'100%',height:'100%',flex:1,flexDirection:'column'}}>
            {lstResult}
        </ul>
        </div>

    )
    
}

export default DonHangTrongNgay;