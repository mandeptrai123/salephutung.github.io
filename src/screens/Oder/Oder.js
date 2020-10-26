import React,{useState,useEffect} from 'react'

// import css
import './css/Oder.css';

//import component
import InputText from '../../resource/InputText/InputText';

import {Modal,Button,Spinner,Toast} from 'react-bootstrap';

import resources from '../../resource/color/ColorApp';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TextField, unstable_createMuiStrictModeTheme} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'

var itemSelected;
let arr_Cart=[];
var _tienkhachno = 0;
var _tongtien = 0;
var _thanhtien = 0;
function TienVietNam(input)
    {

        var x = new Number(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
    }
function ItemCart(props){
   

    return <TableRow hover>
        <TableCell>{props.name}</TableCell>
        <TableCell>{props.soluongBan}</TableCell>
        <TableCell>X</TableCell>
        <TableCell>{TienVietNam(props.price)}</TableCell>
        <TableCell>{TienVietNam(props.pricesum)}</TableCell>
    </TableRow>
}


function Oder() {

    //Modal Loading
    const [show, setShow] = useState(false);
    const [txtButtonNegative, settxtButtonNegative] = useState("OK");
    // Hiệu Chỉnh 
    const [showHieuChinh, setShowHieuChinh] = useState(false);
    const [soluongBan, setsoluongBan] = useState("");
    const [ghichuDonHang, setghichuDonHang] = useState("");
    // Thong Bao Sau Khi Dat Hang
    const [showResultOrder, setShowResultOrder] = useState(false);



    // Khách Lẻ
    const [isCheck, setChecked] = useState(false);


    const [messLoading, setMessLoading] = useState("   Đang Tải Thông Tin Khách, Đợi Chút Nhé");
    
    const [contentSearch, setContentSearch] = useState("");
    const [sodienthoai, setSoDienThoai] = useState("");
    const [diachi, setDiaChi] = useState("");
    const [tenkhach, setTenKhach] = useState("");
    // List Này Dành Cho Bảng Tìm Kiếm
    const [resultList, setResultSearch] = useState([]);
    // List Này Dành Cho Bảng Giỏ Hàng
    const [resultCart, setResultCart] = useState([]);
    const [thanhtien, setThanhTien] = useState(0);
    const [tienkhachno, setTienKhachNo] = useState(0);

    //Response
    const [messResponse, setMessResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);

    var _responseSanPham = [];


    // Có giá trị khi nhấn nút Chọn
    var IDSelected;

    function ItemSanPham(props){
        return <TableRow hover>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.amount}</TableCell>
            <TableCell>{TienVietNam(props.price)}</TableCell>
            <TableCell><Button  onClick={e=>ShowHieuChinhSoLuong(props._id)} >Chọn</Button></TableCell>
        </TableRow>
    }

   
    function ShowHieuChinhSoLuong(id)
    {
        setsoluongBan("");
        setghichuDonHang("");
        // Show Modal 
        var _item = _responseSanPham.find(e=>e._id==id);
        itemSelected = _item;
        handleOpenHieuChinh();
        IDSelected = id;
    }
    function Handle_AddToCart()
    {
        if(itemSelected.amount < soluongBan)
        {
            setShowHieuChinh(false);
            setMessResponse("Số Lượng Trong Kho Không Đủ !");
            setShowResponse(true);
            return;
        }

        // Tìm Xem Trong Giỏ Hàng Đã Có Sản Phẩm Này Chưa
        var indexAlready = arr_Cart.findIndex(e=>e._id==itemSelected._id);
        if(indexAlready > -1)
        {
            var soluongThem = new Number(arr_Cart[indexAlready].soluongBan) + new Number(soluongBan);
            if(soluongThem > itemSelected.amount)
            {
                setShowHieuChinh(false);
                setMessResponse("Số Lượng Trong Kho Không Đủ !");
                setShowResponse(true);
                return;
            }else
            {
                arr_Cart[indexAlready].soluongBan = soluongThem;
                arr_Cart[indexAlready].pricesum = new Number(arr_Cart[indexAlready].pricesum)+ (new Number(itemSelected.price) * new Number(soluongBan));
            }
           
        }else
        {
            itemSelected.soluongBan = soluongBan;
            itemSelected.pricesum = new Number(itemSelected.price) * soluongBan;
            arr_Cart.push(itemSelected);
        }
        TinhToanThanhTien();

        RenderKetQuaGioHang(arr_Cart);
        handleHideHieuChinh();
    }

    function TinhToanThanhTien()
    {
        // Tính Toán Thành Tiền
        var _sum = 0;
        arr_Cart.map(e=>{
            _sum += e.pricesum;
        });
     
      
        _tongtien = _sum;
        if(_tienkhachno > 0
            && _tienkhachno% 1000 == 0)
            {
                setTienKhachNo(TienVietNam(tienkhachno));
            }else
            {
                _tienkhachno = 0 ;
            }
           
        

        _thanhtien = _tongtien - _tienkhachno;
        setThanhTien(TienVietNam(_thanhtien));

    }

    function RenderKetQuaGioHang(arr)
    {
        const result =  arr.map(e=>{
            return ItemCart(e);
        })
        setResultCart(result);
    }
    function totalPrice() {
        return(
            <div className='total-price'>
                Thành tiền: 
                <span className='price'>20000</span>
            </div>
        );
    }

    function RenderKetQuaTimKiem(arr)
    {
        const result =  arr.map(e=>{
            return ItemSanPham(e);
        })
        setResultSearch(result);
    }

    function  LoadKhach(){
        setMessLoading("    Đang Tải Thông Tin Khách, Đợi Chút Nhé")
        handleShow();
        TimKhachHang(sodienthoai);
        TinhToanThanhTien();
    }

    function  Handle_TimSP(){
        setMessLoading("    Đang Tìm Sản Phẩm, Đợi Chút Nhé")
        handleShow();
        TimSanPham(contentSearch);

    }

    // Kiểm Tra Thông Tin Khách Hàng .
    async function isValidData()
    {
        if(isCheck)
        {
         return true;   
        }else
        {
            if(sodienthoai == "")
                return false;
            if(diachi == "")
                return false;
            if(tenkhach == "")
                return false;
        }
        return true;
    }


    function XuLiThongTinKhach()
    {
        var d = new Date();
        if(isCheck)
        {
            var _itemRequest = 
            {
                SDTNV:"0969025915",
                name:"Man",
                TenKhach:"Khách Lẻ",
                DiaChiKhach:"",
                SDTKhach:"111",
                TongTien:_tongtien,
                ThanhTien:_thanhtien,
                Congno:0,
                TraNo:0,
                TimeOfDay:d.getHours()+":"+d.getMinutes(),
                lstSanPham:arr_Cart
                
            }
            return _itemRequest;
        }else
        {
            var _itemRequest = 
            {
                SDTNV:"0969025915",
                name:"Man",
                TenKhach:tenkhach,
                DiaChiKhach:diachi,
                SDTKhach:sodienthoai,
                TongTien:_tongtien,
                ThanhTien:_thanhtien,
                Congno:_tienkhachno,
                TimeOfDay:d.getHours()+":"+d.getMinutes(),
                TraNo:0,
                lstSanPham:arr_Cart
    
            }
            return _itemRequest;
        }
    }

    async function  DatHang(){
        if(tienkhachno > 0 && isCheck)
            {
                settxtButtonNegative("OK");
                setMessLoading("   Khách lẻ không thể ghi nợ !")
                handleShow();
                return;
            }

        settxtButtonNegative("OK");
        setMessLoading("    Đang Tiến Hành Đặt Hàng, Đợi Chút Nhé")
        handleShow();

        var isValid = await isValidData();
        if(!isValid)
        {
            setMessLoading("  Vui Lòng Điền Thông Tin Khách !")
            //handleClose();
            return;
        }
        // Xem object request từ document của back-
       
        var itemRequest = XuLiThongTinKhach();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify(itemRequest)
        };

        fetch("https://phutungserver.herokuapp.com/donhang/ThemDonHang",requestOptions)
        .then(res => res.json())
        .then(res =>{
            handleClose();
            if(res.success)
            {
                setResultCart("");
                setTienKhachNo(0);
                setThanhTien(0);
                setResultSearch("");
                setChecked(false);
                setTenKhach("");
                setDiaChi("");
                setSoDienThoai("");
                setMessResponse("Đặt Hàng Thành Công !");
                setShowResponse(true);
                _tienkhachno = 0;
                _thanhtien = 0;
                _tongtien = 0;
                
            }else
            {
                alert('Có Sự Cố , Vui Lòng Liên Hệ Bên Kỹ Thuật !')
            }
            
        }
            )
        .catch(e=>{
                handleClose();
                setMessResponse("Có Vấn Đề Về Internet ! Vui Lòng Thử Lại !");
                setShowResponse(true);
           
        })

       
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHideHieuChinh =()=> setShowHieuChinh(false); 
    const handleOpenHieuChinh =()=> setShowHieuChinh(true); 

    useEffect(()=>{
       
    },[])
    
    function TimKhachHang(sdt)
    {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        fetch("https://phutungserver.herokuapp.com/khachhang/TimKhachHang?SDT="+sdt,requestOptions)
        .then(res => res.json())
        .then(res =>{
            if(res.success)
            {
                if(res.data != null)
                {
                    setDiaChi(res.data.DiaChi);
                    setTenKhach(res.data.Name);
                }else
                {
                    setDiaChi("");
                    setTenKhach("");
                }
                handleClose();
            }
        }).catch(e=>{
            alert(e);
            handleClose();
        })
   

    }
    

    function TimSanPham(name)
    {
        if(name == "")
        {
            handleClose();
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        fetch("https://phutungserver.herokuapp.com/sanpham/TimKiemSanPham?name="+name,requestOptions)
        .then(res => res.json())
        .then(res =>{
            setContentSearch("");
            if(res.success)
            {
                _responseSanPham = res.data;
                RenderKetQuaTimKiem(res.data);
                handleClose();
            }else
            {
                handleClose();
            }
        }).catch(e=>{
            alert(e);
            handleClose();

        });

    }

    

    return(
        <section style={{marginLeft:20,marginRight:20}} className='oder-container'>
            
            <header className='oder-header'>
                <div 
                style={{marginRight:20,marginLeft:20}}
                className='container-input'>
                    <div className='input-content'>
                        <h5 
                        style={{padding:20,color:resources.colorSecondary}}
                        >Số điện thoại: </h5>
                        <InputText  onChange={e=>setSoDienThoai(e.target.value)}    text={sodienthoai}  onBlur={e=>LoadKhach()} placeholder='Số Điện Thoại'/>
                    </div>
                    <div className='input-content'>
                        <h5 
                         style={{padding:20,color:resources.colorSecondary}}
                     >Tên Khách: </h5>
                        <InputText 
                        onChange={e=>setTenKhach(e.target.value)}   text={tenkhach} placeholder='Tên Khách'/>
                    </div>
                    <div className='input-content'>
                        <h5 
                         style={{padding:20,color:resources.colorSecondary}}
                       >Địa Chỉ: </h5>
                        <InputText onChange={e=>setDiaChi(e.target.value)}  text={diachi}    placeholder='Địa Chỉ'/>
                    </div>
                    
                </div>

                <div className='check-box'>
                    <label 
                    style={{color:resources.colorPrimary}}
                    for='check-box__custormer'>Khách Lẻ</label>
                    <input onClick={e=>{
                        if(_tienkhachno > 0)
                        {
                            alert("Khách Lẻ Không Thể Ghi Nợ !")
                        }else
                        {
                            setChecked(!isCheck)
                        }
                    }
                        } checked={isCheck}  type='checkbox' id='check-box__custormer' style={{width:40,height:40}}/>
                </div>
                <div
               
                >
                <FontAwesomeIcon   
                style={{right:50,position:'absolute',top:160}}
                onClick={e=>{
                    setResultCart("");
                    setThanhTien(0);
                    setTienKhachNo(0);
                    arr_Cart  = [];
                    }} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
                <h5
                 style={{padding:25,textAlign:'center',right:100,position:'absolute',top:150,color:resources.colorPrimary}}
                >
                    Làm mới giỏ hàng !
                </h5>

                </div>

            </header>

            <section className='container-content'>
                <div 
                style={{height:400}}
                className='content-left'>
                    <div className='content-left__find-product'>
                        <div className='find-product'>
                            <input onChange={e=>setContentSearch(e.target.value)} value={contentSearch}
                            color={resources.colorText}
                            type='text' placeholder='Nhập sản phẩm cần tìm' className='input-find'/>
                            <button
                            style={{backgroundColor:resources.colorPrimary,
                                color:resources.colorText,fontStyle:'inherit'}}
                            type='button' onClick={Handle_TimSP} className='btn-find'>Tìm</button>
                        </div>
                        <TableContainer
                            style={{
                                height:'80%',
                                width: '93%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên Sản Phẩm</TableCell>
                                        <TableCell>Số Lượng Đang Có</TableCell>
                                        <TableCell>Giá Bán</TableCell>
                                        <TableCell>Điều Chỉnh</TableCell>
                                    </TableRow>
                                   
                                </TableHead>

                                <TableBody>{resultList}</TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    
                </div>

                <div   style={{width:400,height:300,marginLeft:50}} className='content-right'>
                    <div style={{width:'100%',padding:0,margin:2}}  className='content-right__price'>
                       <TableContainer
                            style={{
                                height:'100%',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên Sản Phẩm</TableCell>
                                        <TableCell>Số Lượng</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>Đơn Giá</TableCell>
                                        <TableCell>Tổng Tiền</TableCell>
                                    </TableRow>
                                   
                                </TableHead>

                                <TableBody>{resultCart}</TableBody>
                            </Table>
                            
                        </TableContainer>
                       
                      
                    </div>
                    <div className='input-content'>
                        <h5 style={{padding:20}}>Khách Nợ: </h5>
                        <InputText  text={tienkhachno} 
                        onBlur={TinhToanThanhTien}
                        onChange={e=>{
                            _tienkhachno = new Number(e.target.value);
                            setTienKhachNo((e.target.value))}}
                        placeholder='Tiền Khách Nợ'/>
                    </div>
                    <div  style={{width:'100%',justifyContent:'center',textAlign:'center',marginTop:20}}  className='total-price'>
                     <span  style={{fontSize:20}} >
                     Thành tiền
                     <span> &nbsp; </span>
                     <span> &nbsp; </span>
                     <span> &nbsp; </span>
                     </span>
                  
                        <span  style={{alignContent:'flex-end',fontSize:20,color:'red'}} className='price'>{thanhtien}</span>
                    </div>

                    <div className='content-right__submit'>
                        <button 
                        style={{backgroundColor:resources.colorPrimary}}
                        onClick={e=>DatHang()} type='button' className='btn-submit'>Đặt Hàng</button>
                    </div>
                </div>
            </section>
        
            <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
             backdrop="static"
             show={show} onHide={handleClose}>
                <Modal.Body>
                 <Modal.Title>
                 <Spinner
               
                 animation="border" variant="success" role="status"></Spinner>
                     {messLoading}
                 </Modal.Title>
                 <Modal.Footer>
                     <Button
                     onClick={e=>handleClose()}
                     >
                         {txtButtonNegative}
                     </Button>
                 </Modal.Footer>
                </Modal.Body>
            </Modal>


            <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
             backdrop="static"
             show={showHieuChinh} onHide={handleHideHieuChinh}>
                <Modal.Body>
                 <Modal.Title>
                     <h4>
                     Số Lượng Bán
                     </h4>
                        <TextField
                        value={soluongBan}
                        onChange={e=>
                            {
                                try
                                {
                                    let _num = new Number(e.target.value);
                                    if(isNaN(_num))
                                    {
                                        setsoluongBan("");
                                    }else
                                    {
                                        setsoluongBan(e.target.value);
                                    }
                                    
                                      
                                }catch(e)
                                {
                                    alert("Vui Lòng Ghi Đúng Số Lượng !")
                                }
                            }}
                        variant="outlined"
                        />
                        <h4
                        
                        >
                            Ghi Chú
                        </h4>
                         <TextField
                         onChange={e=>setghichuDonHang(e.target.value)}
                         value={ghichuDonHang}
                        variant="outlined"
                        />  
                 </Modal.Title>
                 <Modal.Footer>
                            <Button
                            onClick={e=>Handle_AddToCart()}
                            >
                                Thêm Giỏ Hàng
                            </Button>
                            <Button
                            onClick={e=>handleHideHieuChinh()}
                            >
                                Huỷ
                            </Button>
                 </Modal.Footer>
                </Modal.Body>
            </Modal>

            
            <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    show={showResponse} >
                    <Modal.Body >
                    <Modal.Title>
                        {messResponse}
                    </Modal.Title>
                    <Modal.Footer>
                        <Button
                        onClick={e=>{setShowResponse(false)}}
                        >
                            OK
                        </Button>
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
        </section>
    );
}

export default Oder;

