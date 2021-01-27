import {
    LoginAction,
    AllSanPham,
    GetAllKhachHang,
    AddNewKhachHang,
    AddNewSanPham,
    IsUpdateCongNo,
    SaveListSPThieuSL,
    UpdateGhiChuNewSpThieuSl,
    SaveObjectBill,
    DeleteItemBill,
    AddBill,
    UpdateItemBill,
    UpdateValueItemBill,
    DeleteSanPham,
} from './ActionType'

// File Xu Li Logic ( Quan Li State)

const defineState = {
    SDTNV: '',
    Pass: '',
    HoTen: 'Chưa Có',
    isQuanLi: 1,
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
    objectBill: {
        Congno: 0,
        Date: '',
        DiaChiKhach: '',
        Ghichu: '',
        IDAction: 0,
        NameNV: '',
        SDTKhach: '',
        SDTNV: '',
        TenKhach: '',
        ThanhTien: 0,
        Time: '',
        TimeOfDay: '',
        TongTien: 0,
        TraNo: 0,
        doanhthu: 0,
        lstSanPham: [],
        _id: '',
    },
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

        case DeleteSanPham:
            const len = state.AllSanPham.length

            for (var i = 0; i < len; ++i) {
                if (state.AllSanPham[i]._id == action.value) {
                    state.AllSanPham.splice(i, 1)
                    break
                }
            }
            state = JSON.parse(JSON.stringify(state))
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

        case SaveObjectBill:
            const objBillClone = { ...action.value }
            state.objectBill = objBillClone
            return state

        case DeleteItemBill:
            state.objectBill.lstSanPham.splice(action.value, 1)
            return state

        case AddBill:
            const objNewBillClone = { ...action.value }
            state.objectBill.lstSanPham.push(objNewBillClone)
            return state

        case UpdateItemBill:
            const objNewUpdateBillClone = { ...action.value.objBillUpdate }
            state.objectBill.lstSanPham[
                action.value.indexBill
            ] = objNewUpdateBillClone
            return state

        case UpdateValueItemBill:
            const objNewValueItemBillClone = { ...action.value }
            state.objectBill.lstSanPham[
                objNewValueItemBillClone.indexBill
            ].soluongBan = objNewValueItemBillClone.soluongBan

            state.objectBill.lstSanPham[
                objNewValueItemBillClone.indexBill
            ].price = objNewValueItemBillClone.price

            state.objectBill.lstSanPham[
                objNewValueItemBillClone.indexBill
            ].pricesum = objNewValueItemBillClone.pricesum
            state.objectBill.lstSanPham[
                objNewValueItemBillClone.indexBill
            ].Ghichu = objNewValueItemBillClone.Ghichu

            return state

        default:
            return state
    }
}

export default Reducer
