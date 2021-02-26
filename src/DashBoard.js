import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import disableScroll from 'disable-scroll'
import KhoHang from './screens/KhoHang/KhoHang'
import NhapKho from './screens/NhapKho/NhapKho'
import MatHangHetSL from './screens/HangTonSLThap/MatHangHetSL'
import Order from './screens/Oder/Oder'
import Manage from './screens/Manage/Manage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tab, Col, Nav, Row } from 'react-bootstrap'
import resources from './resource/color/ColorApp'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function DashBoard() {
    const history = useHistory()

    const HoTenNV = useSelector((state) => state.HoTen)
    const isQuanLi = useSelector((state) => state.isQuanLi)

    useEffect(() => {
        //disableScroll.on();
        // Kiem Tra Account

        if (HoTenNV == 'Chưa Có') {
            history.push('/')
        }
    }, [])

    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="banhang">
                <Row>
                    <Col sm={12}>
                        <Nav
                            style={{
                                backgroundColor: resources.colorSecondary,
                                color: resources.colorText,
                            }}
                            variant="pills"
                            className="justify-content-center sm-6"
                            fill={true}
                            justify={true}
                        >
                            <Nav.Item>
                                <Nav.Link
                                    style={{
                                        color: resources.colorBorder,
                                        fontSize: 22,
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    eventKey="banhang"
                                >
                                    Bán Hàng
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    style={{
                                        color: resources.colorBorder,
                                        fontSize: 22,
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    eventKey="nhaphang"
                                >
                                    Thêm Hàng
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    style={{
                                        color: resources.colorBorder,
                                        fontSize: 22,
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    eventKey="xemkhohang"
                                >
                                    Quản Lí Kho
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    style={{
                                        color: resources.colorBorder,
                                        fontSize: 22,
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    eventKey="thongbaohethang"
                                >
                                    Mặt Hàng Có Số Lượng Báo Động
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item
                                style={{
                                    display:
                                        isQuanLi == 2 || isQuanLi == 3
                                            ? 'block'
                                            : 'none',
                                }}
                            >
                                <Nav.Link
                                    style={{
                                        color: resources.colorBorder,
                                        fontSize: 22,
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    eventKey="quanli"
                                >
                                    Quản Lí
                                </Nav.Link>
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
                                <MatHangHetSL />
                            </Tab.Pane>

                            <Tab.Pane eventKey="quanli">
                                <Manage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default DashBoard
