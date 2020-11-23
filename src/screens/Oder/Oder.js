import React,{useState,useEffect} from 'react';
// import css
import './css/Oder.css';
//import component
import InputText from '../../resource/InputText/InputText';
import {Modal,Button,Spinner} from 'react-bootstrap';
import resources from '../../resource/color/ColorApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TextField} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt,faTrash} from '@fortawesome/free-solid-svg-icons';
import NetWorking from '../../networking/fetchWithTimeout';
import {Autocomplete} from '@material-ui/lab';
import {useSelector} from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import _ from 'lodash';


var itemSelected;
let arr_Cart=[];
var _tienkhachno = 0;
var _tongtien = 0;
var _thanhtien = 0;
var arr_KhachHang = [];

function TienVietNam(input)
    {

        var x = parseInt(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
    }


function Alert(props) 
{
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Oder() {
    const HoTenNV = useSelector(state => state.HoTen);
    //Modal Loading
    const [show, setShow] = useState(false);
    const [txtButtonNegative, settxtButtonNegative] = useState("OK");
    // Hiệu Chỉnh 
    const [showHieuChinh, setShowHieuChinh] = useState(false);
    const [soluongBan, setsoluongBan] = useState("");
    const [ghichuDonHang, setghichuDonHang] = useState("");
    // Thong Bao Sau Khi Dat Hang
    //const [showResultOrder, setShowResultOrder] = useState(false);
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
    const [ghichu, setGhiChu] = useState("");

    //Response
    const [messResponse, setMessResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);

    const [ValueName, setValueName] = useState("");
    const [ValueSDT, setValueSDT] = useState("");
    const [ValueDiaChi, setValueDiaChi] = useState("");
    const [dateOrder, setDateOrder] = useState(new Date().getFullYear()+"-"+(parseInt(new Date().getMonth())+1)+"-"+new Date().getDate());


    const [lstSuggest,setlstSuggest] = useState([]);




    var _responseSanPham = [];
  

    function ItemCart(props){
    
        return <TableRow hover>
            <TableCell
             style={{fontSize:16,fontWeight:'bold'}}
            >{props.name}</TableCell>
            <TableCell
            >
                <TextField
                style={{width:30,fontSize:16,fontWeight:'bold'}}
                onChange={e=>{
                  var _index =  arr_Cart.findIndex(i=>i._id==props._id);
                  arr_Cart[_index].soluongBan = e.target.value;
                  RenderKetQuaGioHang(arr_Cart);
                }}
                value={props.soluongBan}
                />
               </TableCell>
            <TableCell
            >
                <TextField
                style={{width:80,fontSize:16,fontWeight:'bold'}}
                onChange={e=>
                    {
                        var _index = arr_Cart.findIndex(i=>i._id===props._id);
                        arr_Cart[_index].price = e.target.value;
                        RenderKetQuaGioHang(arr_Cart);
                    }}
                value={parseInt(props.price)%1===0?props.price:""}
                />
                </TableCell>
            <TableCell
              style={{fontSize:16,fontWeight:'bold'}}
            >{
            parseInt(TienVietNam(parseInt(props.price)*parseInt(props.soluongBan)))%1===0?
            TienVietNam(parseInt(props.price)*parseInt(props.soluongBan)):0}
            </TableCell>
            <TableCell>
            <FontAwesomeIcon
            style={{alignSelf:'center',width:50,marginLeft:20,marginTop:20}}
            color={resources.colorPrimary}
            size={'2x'}
            icon={faTrash}
            onClick={e=>{
                _.remove(arr_Cart, function(e) {
                    return e._id === props._id;
                });
                RenderKetQuaGioHang(arr_Cart)
            }}
            />
            </TableCell>
           
        </TableRow>
    }

    function ItemSanPham(props){
        return <TableRow hover>
            <TableCell
            width={40}
            style={{fontSize:12}}
            >{props.name}</TableCell>
            <TableCell
            width={40}
            style={{fontSize:12}}
            >
                {props.amount}
                </TableCell>
            <TableCell
            width={40}
            style={{fontSize:12}}
            >
                {TienVietNam(props.price)}</TableCell>
            <TableCell
            width={40}
            style={{fontSize:12}}
            ><Button  onClick={e=>
                {
                    if(props.amount > 0)
                    {
                        Handle_AddToCart(props._id)
                    }else
                    {
                        setStateSnackbar({...stateSnackbar,openSnackbar:true,isSuccess:false,messSnackbar:"Số Lượng Hiện Tại Nhỏ Hơn 1"});
                    }
                }
            }
            >Chọn</Button></TableCell>
        </TableRow>
    }

   
    function ShowHieuChinhSoLuong(id)
    {
        
        // setsoluongBan("");
        // setghichuDonHang("");
        // // Show Modal 
        // var _item = _responseSanPham.find(e=>e._id===id);
        // itemSelected = _item;
        // handleOpenHieuChinh();
    }
    function Handle_AddToCart(_id)
    {
        var _item = _responseSanPham.find(e=>e._id===_id);
        if(_item.amount < soluongBan)
        {
            setShowHieuChinh(false);
            setMessResponse("Số Lượng Trong Kho Không Đủ !");
            setShowResponse(true);
            return;
        }

        // Tìm Xem Trong Giỏ Hàng Đã Có Sản Phẩm Này Chưa
        var indexAlready = arr_Cart.findIndex(e=>e._id===_id);
        if(indexAlready > -1)
        {
           setMessLoading("Đã Thêm Sản Phẩm Này Rồi !")
           setShow(true);
           
        }else
        {
            _item.soluongBan = 1;
            _item.pricesum = parseInt( _item.price);
            arr_Cart.push(_item);
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
            _sum += (e.price*e.soluongBan);
            return _sum;
        });
     
      
        _tongtien = _sum;
      
           
        

        _thanhtien = _tongtien - _tienkhachno;
        setThanhTien(TienVietNam(_thanhtien));

    }

    function RenderKetQuaGioHang(arr)
    {
        const result =  arr.map(e=>{
            return ItemCart(e);
        })
        setResultCart(result);
        TinhToanThanhTien();
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
       
            if(tenkhach == "" &&
            ValueName == "")
                {
                    setStateSnackbar({...stateSnackbar,isSuccess:false,messSnackbar:"Vui Lòng Điền Tên !",openSnackbar:true})
                    return false;
                }

            if(sodienthoai == "" &&
            ValueSDT == "")
            {
                setStateSnackbar({...stateSnackbar,openSnackbar:true,isSuccess:false,messSnackbar:"Vui Lòng Điền Số Điện Thoại !"})
                return false;
            }
               
            if(diachi == "" &&
            ValueDiaChi == "")
            {
                setStateSnackbar({...stateSnackbar,openSnackbar:true,isSuccess:false,messSnackbar:"Vui Lòng Điền Địa Chỉ !"})
                return false;
            }
        
            if(dateOrder == null)
            {
                setStateSnackbar({...stateSnackbar,openSnackbar:true,isSuccess:false,messSnackbar:"Vui Lòng Điền Ngày Đặt Hàng !"})
                return false;
            }
        



            return true;
    }
    function XuLiThongTinKhach()
    {
        var d = new Date();
            var _itemRq = 
            {
                SDTNV:"0969025915",
                NameNV:"Man",
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
           return _itemRq;
        
        
    }

    async function  DatHang(){

        settxtButtonNegative("OK");
        setMessLoading("    Đang Tiến Hành Đặt Hàng, Đợi Chút Nhé")
        handleShow();


        // Kiem Tra Data Truoc Khi Gui

        var isValid = await isValidData();
        if(!isValid)
        {
            handleClose();
            return;
        }
        var _d = new Date();
        // Xem object request từ document của back-
       
        var itemRequest = XuLiThongTinKhach();
        itemRequest.Ghichu = ghichu;

        var month = ((_d.getMonth()+1)>9)?(_d.getMonth()+1):("0"+(_d.getMonth()+1));
        var date = (_d.getDate()>9)?(_d.getDate()):("0"+_d.getDate());

        itemRequest.Date = dateOrder;

        var hours = (_d.getHours()>9)?(_d.getHours()):("0"+_d.getHours());
        var minutes = (_d.getMinutes()>9)?(_d.getMinutes()):("0"+_d.getMinutes());
        var milis = (_d.getMilliseconds()>9)?(_d.getMilliseconds()):("0"+_d.getMilliseconds());

        itemRequest.Time = hours+":"+minutes+":"+milis;
        console.log(JSON.stringify(itemRequest));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify(itemRequest)
        };
        let _URL = "https://phutungserver.herokuapp.com/donhang/ThemDonHang";
        
        NetWorking(_URL,requestOptions,5000)
        .then(res =>{
            handleClose();
            if(res.success)
            {
                setResultCart([]);
                setGhiChu("");
                setThanhTien(0);
                setResultSearch([]);
                setChecked(false);
                setTenKhach("");
                setDiaChi("");
                setSoDienThoai("");

                setValueSDT("");
                setValueDiaChi("");
                setValueName("");

                setStateSnackbar({...stateSnackbar,isSuccess:true,messSnackbar:"Đặt Hàng Thành Công !",openSnackbar:true})

                _tienkhachno = 0;
                _thanhtien = 0;
                _tongtien = 0;
                
            }else
            {
                setStateSnackbar({...stateSnackbar,
                    messSnackbar:"Có Sự Cố , Vui Lòng Liên Hệ Bên Kỹ Thuật !",
                    isSuccess:false,
                    openSnackbar:true
            })
                
            }
            
        })
        .catch(e=>{
                handleClose();
                setMessResponse("Có Vấn Đề Về Internet ! Vui Lòng Thử Lại !: "+e);
                setShowResponse(true);
           
        })

       
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHideHieuChinh =()=> setShowHieuChinh(false); 
    const handleOpenHieuChinh =()=> setShowHieuChinh(true); 

    useEffect(()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        let _URL = "https://phutungserver.herokuapp.com/khachhang/ToanBoKhachHang";
        
        NetWorking(_URL,requestOptions,5000)
        .then(res =>{
            if(res.success)
            {
                arr_KhachHang = res.data;
                setlstSuggest(res.data);
            }
                
        })
        .catch(e=>{})

    },[])

    // Handle Popup Snackbar + Manage State 
    //#region 
    function handleCloseSnackbar(){

    }

    const [stateSnackbar,setStateSnackbar] = useState({messSnackbar:"",openSnackbar:false,isSuccess:false});
    //#endregion


    
    function TimKhachHang(sdt)
    {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        let _URL = "https://phutungserver.herokuapp.com/khachhang/TimKhachHang?SDT="+sdt;
        
        NetWorking(_URL,requestOptions,5000)
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
        if(name === "")
        {
            handleClose();
            return;
        }
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        };

        
        let _URL = "https://phutungserver.herokuapp.com/sanpham/TimKiemSanPham?name="+name;
        NetWorking(_URL,requestOptions,5000)
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
            setStateSnackbar({...stateSnackbar,isSuccess:false,messSnackbar:e,openSnackbar:true})
            handleClose();
        });



    }

    return(
        <section style={{marginLeft:20,marginRight:40}} className='oder-container'>
            
            <header className='oder-header'>
            <div
            style={{color:resources.colorPrimary,margin:10}}
            >
                Thông Tin Khách Hàng
            </div>
                <div 
                style={{
                    display:'flex',
                    marginRight:10,marginLeft:10,padding:10}}
                className='container-input'>

                    <div className='input-content'>
                    <Autocomplete
                    id="combo-box-khach"
                    freeSolo={true}
                    options={lstSuggest}
                    getOptionLabel={(option) => option.Name}
                    style={{ width: 200 }}
                    inputValue={ValueName}
                    onInputChange={(event, newInputValue) => {
                        setTenKhach(newInputValue);
                        setValueName(newInputValue);
                        if(newInputValue != null)
                            {
                              for(var i = 0 ;i < arr_KhachHang.length;i++)
                              {
                                 
                                  if(arr_KhachHang[i].Name == newInputValue)
                                  {
                                    setSoDienThoai(arr_KhachHang[i].SDT);
                                    setValueSDT(arr_KhachHang[i].SDT);

                                    setDiaChi(arr_KhachHang[i].DiaChi); 
                                    setValueDiaChi(arr_KhachHang[i].DiaChi);
                                    break;
                                  }
                              }
                        }
                      }}
                    renderInput={(params) => 
                    <TextField {...params} 
                    label="Tên Khách"
                        text={tenkhach}
                        onChange={e=>
                        {
                            setTenKhach(e.target.value);   
                            if(ValueName != null)
                            {
                              var obj = _.find(arr_KhachHang,function(e){return e.Name == ValueName});
                              if(obj != null)
                              {
                                setValueSDT(obj.SDTKhach);  
                                setValueDiaChi(obj.DiaChiKhach); 
                              }else
                              {
                                setValueSDT("");  
                                setValueDiaChi("");
                              }
                              
                            }

                        }}  
                    variant="outlined" />
                    }
                    />
                    </div>

                    <div className='input-content'>
                    <Autocomplete
                     freeSolo={true}
                    id="combo-box-sdt"
                    options={lstSuggest}
                    inputValue={ValueSDT}
                    onIn
                    getOptionLabel={(option) => option.SDT}
                    style={{ width: 200,marginLeft:50 }}
                    renderInput={(params) => 
                        <TextField
                        {...params} 
                        style={{height:50,marginRight:30}}
                        onChange={e=>
                            {
                                setSoDienThoai(e.target.value);
                                if(ValueSDT != null)
                                {

                                }
                            }
                           } 
                         text={sodienthoai}
                          label='Số Điện Thoại'
                          variant="outlined"
                          />
                    }
                    />
                    </div>
                    
                    <div className='input-content'>
                    <Autocomplete
                     freeSolo={true}
                     inputValue={ValueDiaChi}
                    id="combo-box-diachi"

                    onInputChange={(event, newInputValue) => {
                        setDiaChi(newInputValue);
                    }}
                    options={lstSuggest}
                    getOptionLabel={(option) => option.DiaChi}
                    style={{ width: 200 ,marginLeft:50}}
                    renderInput={(params) =>
                        <TextField
                        {...params} 
                        style={{height:50,marginRight:30}}
                        onChange={e=>
                        {
                            setDiaChi(e.target.value);
                            if(ValueDiaChi != null)
                            {
                                
                            }
                        }
                        } 
                         text={diachi} 
                         variant="outlined"
                          label='Địa Chỉ'/>
                    }
                    />
                  
                    </div>

                    <TextField
                    id="date"
                    required={true}
                    label="Ngày Đặt Hàng"
                    type="date"
                    value={dateOrder}
                    style={{
                        marginLeft:30,
                        marginTop:5,
                        color: resources.colorPrimary}}
                        onChange={e=>{
                       var _d =  new Date(e.target.value);
                       setDateOrder(_d.getFullYear()+"-"+(parseInt(_d.getMonth())+1)+"-"+_d.getDate());
                       
                    }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="outlined"
                    />
                    
                    <div
                    style={{marginLeft:30,paddingLeft:20,fontWeight:'bold',color:resources.colorPrimary}}
                    >
                        Tên Nhân Viên: {HoTenNV}
                    </div>

                </div>
               
                <div
                style={{margin:20,display:'flex'}}
                >
                    

                {/* <FontAwesomeIcon
                style={{position:'absolute',right:420}}   
                onClick={e=>{
                    setResultCart("");
                    setThanhTien(0);
                    setTienKhachNo(0);
                    arr_Cart  = [];
                    }} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
                <div
                 style={{color:resources.colorPrimary,padding:5,position:'absolute',right:270}}
                >
                    Làm mới giỏ hàng !
                </div> */}

                </div>

            </header>

            <div className='find-product'>
               <input
               onKeyPress={event=>{
                if(event.key === 'Enter'){
                    TimSanPham(contentSearch);
                  }
                    }}
                    onChange={e=>
                            {
                                setContentSearch(e.target.value);
                            }
                        } value={contentSearch}
                            style={{color:resources.colorPrimary,width:300,position:'absolute',left:35,marginTop:15,height:50,top:140,paddingLeft:20}}
                            type='text' placeholder='Nhập sản phẩm cần tìm' 
                           />
                           
                        </div>

            <section
            className='container-content'>
                <div 
                style={{height:800,marginTop:10}}
                className='content-left'>
                    <div className='content-left__find-product'>
                        
                        <TableContainer
                            style={{
                                height:'100%',
                                width: '100%',
                            }}
                        >
                            <Table
                            stickyHeader aria-label="sticky table"
                            >
                                <TableHead
                                >
                                    <TableRow>
                                        <TableCell
                                        style={{fontSize:10,maxWidth:"30",fontWeight:'bold'}}
                                        >Tên Sản Phẩm</TableCell>
                                        <TableCell
                                     
                                          style={{fontSize:10,maxWidth:"30",fontWeight:'bold'}}
                                          >Số Lượng Đang Có</TableCell>
                                        <TableCell
                                          style={{fontSize:10,maxWidth:"30",fontWeight:'bold'}}
                                          >Giá Bán</TableCell>
                                        <TableCell
                                          style={{fontSize:10,maxWidth:"30",fontWeight:'bold'}}
                                          >Điều Chỉnh</TableCell>
                                    </TableRow>
                                   
                                </TableHead>

                                <TableBody>{resultList}</TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    
                </div>

                <div style={{height:800,
                        width:"60%"
                    ,margin:10}}>
                    <div style={{width:'100%'}}  className='content-right__price'>
                       <TableContainer
                            style={{
                                height:'100%',
                                width: '100%',
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                         style={{fontSize:12,maxWidth:'5px',fontWeight:'bold'}}
                                        >Tên Sản Phẩm</TableCell>
                                        <TableCell
                                           style={{fontSize:12,maxWidth:'5px',fontWeight:'bold'}}
                                        >Số Lượng</TableCell>
                                        <TableCell
                                            style={{fontSize:12,maxWidth:'5px',fontWeight:'bold'}}
                                        >Đơn Giá</TableCell>
                                        <TableCell
                                            style={{fontSize:12,maxWidth:'5px',fontWeight:'bold'}}
                                        >Tổng Tiền</TableCell>
                                    </TableRow>
                                   
                                </TableHead>

                                <TableBody>{resultCart}</TableBody>
                            </Table>
                            
                        </TableContainer>
                       
                      
                    </div>
                    
                   
                </div>
                   <div
                   style={{width:200}}
                   >
                   <div  style={{width:'100%',
                   marginLeft:20,
                   fontSize:20,
                   justifyContent:'center',fontWeight:'bold',textAlign:'center',marginTop:20}}  className='total-price'>
                    
                     Thành tiền
                    
                    </div>
                    <div 
                     style={{marginLeft:20,textAlign:'center',fontSize:24,color:'red',paddingLeft:10}} 
                     className='price'>{parseInt(thanhtien)%1===0?thanhtien:0}</div>
                    <TextField
                    value={ghichu}
                    onChange={e=>{
                        setGhiChu(e.target.value);
                    }}
                    variant="outlined"
                    style={{width:250,height:200
                        ,paddingLeft:15,
                        marginTop:40
                        ,alignSelf:'center',marginLeft:15}}
                        placeholder={"Ghi Chú Đơn Hàng"}
                    />
                    <div className='content-right__submit'>
                        <button 
                        style={{backgroundColor:resources.colorPrimary,color:'white'}}
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
                                    let _num = parseInt(e.target.value);
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
        
            <Snackbar 
            open={stateSnackbar.openSnackbar}
             autoHideDuration={2000}
             onClose={() => {setStateSnackbar({...stateSnackbar,openSnackbar:false})}
             }
             >
                <Alert onClose={handleCloseSnackbar} severity={stateSnackbar.isSuccess?"success":"error"} >
                            {stateSnackbar.messSnackbar}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default Oder;

