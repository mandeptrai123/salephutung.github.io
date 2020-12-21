import {
    LoginAction,
    AllSanPham,
    GetAllKhachHang,
    AddNewKhachHang,
    AddNewSanPham,
    IsUpdateCongNo,
    SaveListSPThieuSL,
    UpdateGhiChuNewSpThieuSl,
} from './ActionType'

// File Xu Li Logic ( Quan Li State)

const defineState = {
    SDTNV: '',
    Pass: '',
    HoTen: 'Chưa Có',
    isQuanLi: false,
    AllSanPham: [],
    AllKhachHang: [],
    isUpdateCongNo: false, //cho nhập mật khẩu lần đầu khi cập nhật công nợ
    ListSPThieuSL: [
        {
            Name: '',
            amount: '',
            amountAlert: '',
            Ghichu: '',
            NhaCC: '',
            SDTNhaCC: '',
        },
    ],
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

        case AllSanPham:
            const arrSP = [...action.dataSanPham]
            state.AllSanPham = arrSP
            return state

        case GetAllKhachHang:
            const arrKH = [...action.dataKhachHang]
            state.AllKhachHang = arrKH
            return state

        case AddNewKhachHang:
            const objNewKhachHang = { ...action.dataNewKhachHang }
            state.AllKhachHang.push(objNewKhachHang)
            return state

        case AddNewSanPham:
            const objSanPham = { ...action.dataNewSanPham }
            state.AllSanPham.push(objSanPham)
            return state

        case IsUpdateCongNo:
            state.isUpdateCongNo = true
            return state

        case SaveListSPThieuSL:
            const arrClone = [...action.value]
            state.ListSPThieuSL = arrClone
            return state

        case UpdateGhiChuNewSpThieuSl:
            const objClone = { ...action.value }
            state.ListSPThieuSL[objClone.index].Ghichu = objClone.ghiChuNew
            return state

        default:
            return state
    }
}

export default Reducer
