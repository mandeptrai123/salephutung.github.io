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

var itemSelected;
let arr_Cart=[];
var _tienkhachno = 0;
var _tongtien = 0;
var _thanhtien = 0;

function TienVietNam(input)
    {

        var x = parseInt(input);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return x;
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
    const [tienkhachno, setTienKhachNo] = useState(0);

    //Response
    const [messResponse, setMessResponse] = useState("");
    const [showResponse, setShowResponse] = useState(false);

    var _responseSanPham = [];
  

    function ItemCart(props){
    
        return <TableRow hover>
            <TableCell>{props.name}</TableCell>
            <TableCell>
                <InputText
                onChange={e=>{
                  var _index =  arr_Cart.findIndex(i=>i._id==props._id);
                  arr_Cart[_index].soluongBan = e.target.value;
                  RenderKetQuaGioHang(arr_Cart);
                }}
                value={props.soluongBan}
                />
               </TableCell>
            <TableCell>X</TableCell>
            <TableCell>
                <InputText
                onChange={e=>
                    {
                        var _index = arr_Cart.findIndex(i=>i._id===props._id);
                        arr_Cart[_index].price = e.target.value;
                        RenderKetQuaGioHang(arr_Cart);
                    }}
                value={parseInt(props.price)%1===0?props.price:""}
                />
                </TableCell>
            <TableCell>{
            parseInt(TienVietNam(parseInt(props.price)*parseInt(props.soluongBan)))%1===0?
            TienVietNam(parseInt(props.price)*parseInt(props.soluongBan)):0}</TableCell>
            <FontAwesomeIcon
            style={{alignSelf:'center',width:50}}
            color={resources.colorPrimary}
            size={'2x'}
            icon={faTrash}
            />
        </TableRow>
    }

    function ItemSanPham(props){
        return <TableRow hover>
            <TableCell>{props.name}</TableCell>
            <TableCell>
                {props.amount}
                </TableCell>
            <TableCell>
                {TienVietNam(props.price)}</TableCell>
            <TableCell><Button  onClick={e=>Handle_AddToCart(props._id)} >Chọn</Button></TableCell>
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
        if(_tienkhachno > 0
            && _tienkhachno% 1000 === 0)
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
        if(isCheck)
        {
         return true;   
        }else
        {
            if(sodienthoai === "")
                return false;
            if(diachi === "")
                return false;
            if(tenkhach === "")
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
            var _itemRq = 
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
           return _itemRq;
        
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
        let _URL = "https://phutungserver.herokuapp.com/donhang/ThemDonHang";
        
        NetWorking(_URL,requestOptions,5000)
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
            
        })
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
            alert(e);
            handleClose();
        });



    }

    return(
        <section style={{marginLeft:20,marginRight:20}} className='oder-container'>
            
            <header className='oder-header'>
            <div
            style={{color:resources.colorPrimary,margin:10}}
            >
                Thông Tin Khách Hàng
            </div>
                <div 
                style={{marginRight:10,marginLeft:10,padding:10}}
                className='container-input'>
                    <div className='input-content'>
                        <InputText 
                        style={{height:50,marginRight:30}}
                        onChange={e=>setTenKhach(e.target.value)}
                           text={tenkhach} placeholder='Tên Khách'/>
                    </div>
                    <div className='input-content'>
                        <InputText
                          style={{height:50,marginRight:30,marginLeft:10}}
                        onChange={e=>setSoDienThoai(e.target.value)}    text={sodienthoai}  onBlur={e=>LoadKhach()} placeholder='Số Điện Thoại'/>
                    </div>
                    
                    <div className='input-content'>
                        <InputText
                            style={{height:50,marginRight:30}}
                        onChange={e=>setDiaChi(e.target.value)}  text={diachi}    placeholder='Địa Chỉ'/>
                    </div>
                    
                </div>
               
                <div
                style={{margin:20,display:'flex'}}
                >
                <FontAwesomeIcon   
                onClick={e=>{
                    setResultCart("");
                    setThanhTien(0);
                    setTienKhachNo(0);
                    arr_Cart  = [];
                    }} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
                <h5
                 style={{color:resources.colorPrimary,padding:5}}
                >
                    Làm mới giỏ hàng !
                </h5>

                </div>

            </header>

            <section className='container-content'>
                <div 
                style={{height:300,marginTop:10}}
                className='content-left'>
                    <div className='content-left__find-product'>
                        <div className='find-product'>
                            <input onChange={e=>
                            {
                                setContentSearch(e.target.value);
                                if(e.target.value.length == 2)
                                    TimSanPham(e.target.value);


                            }} value={contentSearch}
                            style={{color:resources.colorPrimary}}
                            type='text' placeholder='Nhập sản phẩm cần tìm' className='input-find'/>
                           
                        </div>
                        <TableContainer
                            style={{
                                height:'85%',
                                width: '100%',
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

                <div   style={{height:600,marginLeft:30,margin:10}}>
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
                    
                   
                </div>
                   <div
                   style={{width:200}}
                   >
                   <div  style={{width:'100%',
                   justifyContent:'center',textAlign:'center',marginTop:20}}  className='total-price'>
                    
                     Thành tiền
                    
                    </div>
                    <div  style={{textAlign:'center',fontSize:20,color:'red'}} className='price'>{parseInt(thanhtien)%1===0?thanhtien:0}</div>
                    <InputText
                    style={{width:200,alignSelf:'center',marginLeft:15}}
                        placeholder={"Ghi Chú Đơn Hàng"}
                    />
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
        </section>
    );
}

export default Oder;

