import {
    LoginAction,
    AllSanPham,
    GetAllKhachHang,
    AddNewKhachHang,
} from './ActionType'

// File Xu Li Logic ( Quan Li State)

const defineState = {
    SDTNV: '',
    Pass: '',
    HoTen: 'Chưa Có',
    isQuanLi: false,
    AllSanPham: [],
    AllKhachHang: [],
}

const Reducer = (state = defineState, action) => {
    switch (action.type) {
        case LoginAction:
            // console.log(action.SDTNV)
            return {
                ...defineState,
                SDTNV: action.SDTNV,
                isQuanLi: action.isQuanLi,
                HoTen: action.HoTen,
                Pass: action.Pass,
            }
            break

        case AllSanPham:
            const arrSP = [...action.dataSanPham]
            state.AllSanPham = arrSP
            return state
            break

        case GetAllKhachHang:
            const arrKH = [...action.dataKhachHang]
            state.AllKhachHang = arrKH
            return state
            break

        case AddNewKhachHang:
            const objNewKhachHang = { ...action.dataNewKhachHang }
            state.AllKhachHang.push(objNewKhachHang)
            return state
            break

        default:
            return state
            break
    }
}

export default Reducer
