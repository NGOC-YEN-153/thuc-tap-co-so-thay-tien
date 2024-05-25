import LayOutDefault from "../components/LayOutDefault";
import ListTutors from "../components/ListTutors";
import Login from "../components/LayOutDefault/NavBar/Login";
import ThoiGianRanhModal from "../components/ThoiGianRanhModal";
import TinhTu from "../components/TinhTu/TinhTu";
import React, { useState } from 'react';
import TrangChu from "../components/TrangChu";
import HoiDap from "../components/HoiDap";
import TuyenDung from "../components/TuyenDung";
import FormTuyenDung from "../components/TuyenDung/FormTuyenDung";
import TimGiaSu from "../components/TimGiaSu";
import Register from "../components/LayOutDefault/NavBar/Register";
import ProfileWall from "../components/ProfileWall";
import DetailAssessment from "../components/ProfileWall/Assessment/DetailAssessment";
import AddNewArticle from "../components/AddNewArticle";
import Profile from "../components/Profile";
import TuyenHocVien from "../components/TuyenHocVien";
import Order from "../components/Order";
import CSKH1 from "../components/CSKH1";
import CSKH2 from "../components/CSKH2";
import BeforeCSKH2 from "../components/BeforeCSKH2";
import Censore from "../components/Censore";
import Connect from "../components/Connect";
import CustomManage from "../components/CustomManage";
import Rank from "../components/Rank";
const routes = [
    {
        path: "/",
        element: <LayOutDefault />,
        children: [
            {
                path: "/Censore",
                element: <Censore />,
            },
            {
                path: "/BeforeCSKH2",
                element: <BeforeCSKH2 />,
            },
            {
                path: "/rank",
                element: <Rank />,
            },
            {
                path: "/CSKH2",
                element: <CSKH2 />,
            },
            {
                path: "/CSKH1",
                element: <CSKH1 />,
            },
            {
                path: "/",
                element: <TrangChu />,
            },
            {
                path: "/TrangChu",
                element: <TrangChu />,
            },
            {
                path: "/TinhTu",
                element: <TinhTu />,
            },
            {
                path: "/HoiDap",
                element: <HoiDap />,
            },
            {
                path: "/TuyenDung",
                element: <TuyenDung />,
            },
            {
                path: "/FormTuyenDung",
                element: <FormTuyenDung />,
            },
            {
                path: "/TimGiaSu",
                element: <TimGiaSu />,
            },
            {
                path: "/Register",
                element: <Register />,
            },
            {
                path: "/ProfileWall",
                element: <ProfileWall />
            },
            {
                path: "/addNewArticle",
                element: <AddNewArticle />
            },
            {
                path: "/detailAssessment",
                element: <DetailAssessment />,
            },
            {
                path: "/tuyenHocVien",
                element: <TuyenHocVien />,
            },
            {
                path: "/order",
                element: <Order />,
            },
            {
                path: "/connect",
                element: <Connect />,
            },
            {
                path: "/customManage",
                element: <CustomManage />,
            },
        ]
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
];
export default routes;