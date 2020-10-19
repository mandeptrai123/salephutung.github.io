import React from 'react'
import './css/BaoCaoDoanhThu.css'

//import component react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

//import component

function BaoCaoDoanhThu(props) {
    return(
        <section className='baocao-container'> 
            <header className='baocao-header'>
                <button className='btn-back'>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-arrow-alt-left fa-w-14 fa-5x"><path fill="currentColor" d="M448 208v96c0 13.3-10.7 24-24 24H224v103.8c0 21.4-25.8 32.1-41 17L7 273c-9.4-9.4-9.4-24.6 0-34L183 63.3c15.1-15.1 41-4.4 41 17V184h200c13.3 0 24 10.7 24 24z" class=""></path></svg>
                </button>
                <h1 className='title-baocao'>
                   Báo Cáo Doanh Thu 
                </h1>
            </header>
            <section className='baocao-container__content'>
                <div className='baocao-container__content-left'>
                    <Checkbox txtLabel='Xếp Theo Số Lượng Bán Nhiều Nhất' idCheck='mathang'/>
                    <Checkbox txtLabel='Xếp Theo Mặt Hàng Có Doanh Thu Cao Nhất' idCheck='soluong'/>
                </div>
                <div className='baocao-container__content-right'>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic" style={{
                            width: '230px',
                            height: '60px'
                        }}>Doanh thu tháng này</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" style={{
                                fontSize: '20px',
                                width: '230px',
                                height: '60px'
                            }}>Doanh thu tháng này</Dropdown.Item>
                             <Dropdown.Item href="#/action-1" style={{
                                fontSize: '20px',
                                width: '230px',
                                height: '60px'
                            }}>Doanh thu tháng này</Dropdown.Item>
                            <Dropdown.Item href="#/action-1" style={{
                                fontSize: '20px',
                                width: '230px',
                                height: '60px'
                            }}>Doanh thu tháng này</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="outline-info" style={{
                        fontSize: '20px',
                        width: '150px',
                        height: '60px'
                    }}>Xem</Button>
                </div>
            </section>
            <section className='table-content'>
                <h4 className='title-table'>Bạn đang xem doanh thu tháng 9/2020</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Top</th>
                            <th>Tên Sản Phẩm</th>
                            <th>Số Lượng Bán Được</th>
                            <th>Số Lượng Khách Mua</th>
                            <th>Doanh Thu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>1</td>
                        </tr>  <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>1</td>
                        </tr>  <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>1</td>
                        </tr>  <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>        
            </section>
        </section>
    );
}

export default BaoCaoDoanhThu;

function Checkbox(props) {
    return(
        <div className='input-chekbox'>
            <label for={props.idCheck} style={{
                fontSize: '18px',
                margin: '5px 0',
                textAlign: 'center'
                }}>
                {props.txtLabel}
            </label>  
            <input type='checkbox' id={props.idCheck} style={{
                width: '20px',
                height: '20px'
            }}/>      
        </div>  
    )
}