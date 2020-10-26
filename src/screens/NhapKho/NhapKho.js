
import React,{useState,useEffect} from 'react'

// import css
import './css/NhapKho.css';

//import component
import InputText from '../../resource/InputText/InputText';
import {Modal,Button,Spinner} from 'react-bootstrap';


import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import resources from '../../resource/color/ColorApp';

var arr_NhatKy = [];
var _giaban = 0;
function NhapKho() {


    const [loading,setShowLoading] = useState(false);
    const [mess,setMessLoading] = useState("Đang Thêm Sản Phẩm Vào Kho, Đợi Chút Nhé !");
    const [resultList,setNhatKy] = useState([]);

    const [nameSanPham,setNameSanPham] = useState("");
    const [soluong,setSL] = useState("");
    const [soluongbaodong,setSLBaoDong] = useState("");
    const [donvi,setDonVi] = useState("");
    const [giaban,setGiaBan] = useState("");

    const handleClose = () => setShowLoading(false);
    const handleShow = () => setShowLoading(true);


    async function isValidInput()
    {
        // Tránh Rò Rỉ Dữ Liệu Nên Không Gán Trực Tiếp
        var _nameSanPham   = nameSanPham;
        var _price = giaban;
        var _amount = soluong;
        var _amountAlert = soluongbaodong
        var _donvi = donvi;

        if(_nameSanPham == "")
            return false;
        if(_price == "")
            return false;
        if(_amount == "")
            return false;
        if(_amountAlert == "")
            return false;
        if(_donvi == "")
            return false;

        return true;
    }

    async function ThemVaoKho()
    {
        handleShow();
        var isCheck = await isValidInput();
        if(isCheck)
        {

        // Tránh Rò Rỉ Dữ Liệu Nên Không Gán Trực Tiếp
        var _nameSanPham   = nameSanPham;
        var _price = giaban;
        var _amount = soluong;
        var _amountAlert = soluongbaodong
        var _donvi = donvi;

        // create object request
        var object_request = 
        {
        name:_nameSanPham,
        price:_giaban,
        amount:_amount,
        amountAlert:_amountAlert,
        Donvi:_donvi,
        }

        ThemSanPham(object_request);
        }else
        {
            handleClose();
        }
        
        

    }


    const ITemNhatKy=(props)=>{
        return  <TableRow hover>
        <TableCell>{props.Detail}</TableCell>
    </TableRow>
            
    }
    function UpdateNhatKy(arr)
    {
        const _lst =  arr.reverse().map((e)=>{
            return ITemNhatKy(e)
        })
        setNhatKy(_lst);
       
    }
    
    useEffect(()=>{
        LoadingNhatKy();
     
    },[])

    // NetWord
    function LoadingNhatKy()
    {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        fetch("https://phutungserver.herokuapp.com/sanpham/NhatKySanPham",requestOptions)
        .then(res => res.json())
        .then(res =>{
            if(res.success)
            {
                arr_NhatKy = res.data;
                UpdateNhatKy(arr_NhatKy);
            }

            handleClose();
        }).catch(e=>{
            alert(e);
            handleClose();
        })
    
    
    
    }

    function ThemSanPham(item)
    {
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        };

        fetch("https://phutungserver.herokuapp.com/sanpham/ThemSanPham",requestOptions)
        .then(res => res.json())
        .then(res =>{
            if(res.success)
            {
               arr_NhatKy.push({Detail:"Bạn Vừa Thêm "+item.amount+" "+item.Donvi+" "+item.name});
               UpdateNhatKy(arr_NhatKy);
            }

            handleClose();
        }).catch(e=>{
            alert("Có Lỗi Ở Nhập Kho! ");

            handleClose();
        })
    }
    function Refresh(){
        setMessLoading("Đang Làm Mới Nhật Ký !");
        handleShow();
        LoadingNhatKy();
    }

    function TienVietNam(input)
    {
        var input = new Number(input);
        input = input.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return input;
    }

  
    function onBlurSoTien(input)
    {
        var _a = new Number(input);
        if(_a%1000 != 0)
            {
                setGiaBan("");
                alert("Vui Lòng Nhập Giá Bán Tối Thiểu Là 1000 !")
                return;
            }
            _giaban = _a;
            setGiaBan(TienVietNam(input))
    }
    return(
        <section
        style={{marginTop:40,marginLeft:20}}
        className='nhapkho-container'>
            <div 
            className='nhapkho-container__product'>
                <ul className='list-items__input'>
                    <li className='item__input'>
                        <h6
                        style={{color:resources.colorPrimary}}
                        >Tên Sản Phẩm</h6>
                        <InputText    onChange={e=>{setNameSanPham(e.target.value)}}  text={nameSanPham} width={300} placeholder='Tên Sản Phẩm'/>
                    </li>
                    <li className='item__input'>
                        <h6
                        style={{color:resources.colorPrimary}}
                        >Số Lượng</h6>
                        <InputText  onChange={e=>{setSL(e.target.value)}} text={soluong}   width={300} placeholder='Số Lượng'/>
                    </li>
                    <li className='item__input'>
                        <h6
                        style={{color:resources.colorPrimary}}
                        >Số Lượng Báo Động</h6>
                        <InputText onChange={e=>{setSLBaoDong(e.target.value)}}  text={soluongbaodong}    width={300} placeholder='Số Lượng Báo Động'/>
                    </li>
                    <li className='item__input'>
                        <h6
                        style={{color:resources.colorPrimary}}
                        >Đơn Vị</h6>
                        <InputText 
                        
                        onChange={e=>{setDonVi(e.target.value)}} text={donvi} width={300} placeholder='Đơn Vị'/>
                    </li>
                    <li className='item__input'>
                        <h6

                        style={{color:resources.colorPrimary}}
                        >Giá Bán</h6>
                        <InputText
                        onBlur={e=>{onBlurSoTien(e.target.value)}}
                        onChange={e=>{setGiaBan(e.target.value)}} text={giaban} width={300} placeholder='Giá Bán'/>
                    </li>
                    <li className='item__input'>
                        <h6></h6>
                        <button  
                        style={{color:resources.colorText,backgroundColor:resources.colorPrimary,borderRadius:30,marginTop:40,marginRight:20}}
                        onClick={ThemVaoKho} type='button' className='btn-nhapkho'>Cho vào kho</button>

                    </li>
                </ul>
            </div>  
            
            
            <div 
             style={{marginTop:40,marginRight:40,marginBottom:20}}
            className='nhapkho-container__diary'>
                <div className='diary__content'>
                    <h4
                    style={{color:resources.colorPrimary}}
                    >Nhật kí nhập hàng</h4>
                    <FontAwesomeIcon   onClick={e=>{Refresh()}} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
            <TableContainer
                style={{
                    height:'80%',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nội Dung</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>{resultList}</TableBody>
                </Table>
            </TableContainer>
                </div>
            </div>
        
            <Modal 
             aria-labelledby="contained-modal-title-vcenter"
             centered
            show={loading} onHide={handleClose}>
                <Modal.Body >
                 <Modal.Title>
                 <Spinner animation="border" variant="success" role="status"></Spinner>
                     {mess}

                 </Modal.Title>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default NhapKho;

