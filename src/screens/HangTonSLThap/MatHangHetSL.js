
import React,{useState,useEffect} from 'react'

// import css
import './css/HangTonSLThap.css';

//import component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {Modal ,Spinner } from 'react-bootstrap';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import resources from '../../resource/color/ColorApp';
import NetWorking from '../../networking/fetchWithTimeout';
import {Button} from 'react-bootstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import _ from 'lodash';
import disableScroll from 'disable-scroll';

function MatHangHetSL() {

    const [show, setShow] = useState(false);
    const [messLoading, setMessLoading] = useState("");

    const [resultLst, setResultLst] = useState();
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


   

    function ItemNoiDung(props)
    {
        return <TableRow>
           
            <TableCell>{props.NhaCC}</TableCell>
            <TableCell>{props.SDTNhaCC}</TableCell>
            <TableCell>
            <List component="nav" aria-label="secondary mailbox folders">
                         {props.DanhSachSP.map(e=>{
                            return <ListItem 
                            onClick={e=>{
                            }}
                            button>
                                {e.Name}
                            </ListItem>
                        })}
                </List>
            </TableCell>
            <TableCell>
                <Button>
                    Liên Hệ Nhà CC
                </Button>
            </TableCell>
        </TableRow>
    }

    useEffect(()=>{
        setMessLoading("   Đang Làm Mới Kho Hàng!");
        Refresh();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function Refresh()
    {
        handleShow();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        };

        let _URL ="https://phutungserver.herokuapp.com/quanli/MatHangHetSL";
        NetWorking(_URL,requestOptions,10000) 
        .then(res =>{
            handleClose();  
            if(res.success)
            {
                var arr = [];
                _.forEach(res.data,function(e){
                    e.DanhSachSP = [{Name:e.name}];
                   var isAlready =  _.some(arr, { NhaCC:e.NhaCC});
                    if(!isAlready)
                    {
                        arr.push(e);
                    }else
                    {
                        var index = _.findIndex(arr, function(o) { return o.NhaCC == e.NhaCC; });
                        arr[index].DanhSachSP.push({Name:e.name});
                    }
                        
                })

                console.log(arr)

                UpdateHangThieuSL(arr.reverse());
            }
        }).catch(e=>
            {
                alert("Có Lỗi Ở Mặt Hàng Hết SL ! : "+e);
                handleClose();
            }
            );
    }

    function UpdateHangThieuSL(arr){
        const result = arr.map(e=>{
            return ItemNoiDung(e);
        })
        setResultLst(result);

    }
    
    return(
        <section className='hang-container'>
            <div className='hang-container__content'>
             
            <h3 
            style={{color:resources.colorPrimary,textAlign:'center'}}
            className='title'>Sản Phẩm Hết Số Lượng</h3>
            <FontAwesomeIcon  
            style={{marginBottom:10}}
            onClick={e=>{Refresh()}} color={resources.colorPrimary} size="3x" icon={faSyncAlt}/>
            <TableContainer
                style={{
                    height:'80%',
                    width: '93%',
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nhà Cung Cấp</TableCell>
                            <TableCell>SDT Nhà Cung Cấp</TableCell>
                            <TableCell>Danh Sách Sản Phẩm Hết</TableCell>
                            <TableCell>Liên Hệ</TableCell>

                        </TableRow>
                    </TableHead>

                    <TableBody>{resultLst}</TableBody>
                </Table>
            </TableContainer>
            
            </div>


            <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} onHide={handleClose}>
                <Modal.Body >
                 <Modal.Title>
                 <Spinner animation="border" variant="success" role="status"></Spinner>
                     {messLoading}

                 </Modal.Title>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default MatHangHetSL;

