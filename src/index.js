import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import Congno from './screens/CongNo/CongNo'
import KhoHang from './screens/KhoHang/KhoHang'
import NhapKho from './screens/NhapKho/NhapKho'
import HangTonSLThap from './screens/HangTonSLThap/HangTonSLThap'
import Order from './screens/Oder/Oder'
import Manage from './screens/Manage/Manage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tabs, Tab, Col, Nav, Row, Badge } from 'react-bootstrap'

ReactDOM.render(
    <Tab.Container id="left-tabs-example" defaultActiveKey="banhang">
        <Row>
            <Col sm={12}>
                <Nav
                    variant="pills"
                    className="justify-content-center sm-6"
                    fill={true}
                    justify={true}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="banhang">Bán Hàng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="nhaphang">Thêm Hàng</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="xemkhohang">Quản Lí Kho</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="thongbaohethang">
                            <Badge variant="danger">9</Badge>Mặt Hàng Đang Hết
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="quanli">Trang Quản Lí</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>

            <Col sm={12}>
                <Tab.Content>
                    <Tab.Pane eventKey="banhang">
                        <Order />
                    </Tab.Pane>

                    <Tab.Pane eventKey="nhaphang">
                        <NhapKho />
                    </Tab.Pane>

                    <Tab.Pane eventKey="xemkhohang">
                        <KhoHang />
                    </Tab.Pane>

                    <Tab.Pane eventKey="thongbaohethang">
                        <HangTonSLThap />
                    </Tab.Pane>

                    <Tab.Pane eventKey="quanli">
                        <Manage />
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
