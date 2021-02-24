import {
    LoginAction,
    AllSanPham,
    GetAllKhachHang,
    AddNewKhachHang,
    AddNewSanPham,
    IsUpdateCongNo,
    SaveListSPThieuSL,
    UpdateGhiChuNewSpThieuSl,
    UpdateKhachHang,
    DeleteSanPham,
    UpdateThanhTienDonHang,
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
    thanhTienDH: 0,
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
            state.AllSanPham = JSON.parse(JSON.stringify(state.AllSanPham))
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

            state.AllSanPham = JSON.parse(JSON.stringify(state.AllSanPham))

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
            state.ListSPThieuSL = JSON.parse(
                JSON.stringify(state.ListSPThieuSL)
            )
            return state

        case UpdateThanhTienDonHang:
            state.thanhTienDH = action.value
            state.thanhTienDH = JSON.parse(JSON.stringify(state.thanhTienDH))

            return state

        case UpdateKhachHang:
            let o = action.value

            state.AllKhachHang[o.index].Name = o.objectKhachHang.Name
            state.AllKhachHang[o.index].DiaChi = o.objectKhachHang.DiaChi
            state.AllKhachHang[o.index].SDT = o.objectKhachHang.SDT
            state.AllKhachHang[o.index].Congno = o.objectKhachHang.Congno
            state.AllKhachHang[o.index].LoaiKhach = o.objectKhachHang.LoaiKhach
            state.AllKhachHang[o.index].SoHangDaMua =
                o.objectKhachHang.SoHangDaMua
            state.AllKhachHang[o.index].ThoiQuen = o.objectKhachHang.ThoiQuen

            state.AllKhachHang = JSON.parse(JSON.stringify(state.AllKhachHang))

            return state

        default:
            return state
    }
}

export default Reducer
