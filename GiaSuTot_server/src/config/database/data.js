const AddUser = require('../../services/CRUD/Add/AddUser');
const AddArticle = require('../../services/CRUD/Add/AddArticle');
const AddClass = require('../../services/CRUD/Add/AddClass');
const AddClassSubject = require('../../services/CRUD/Add/AddClassSubject');
const AddFriend = require('../../services/CRUD/Add/AddFriend');
const AddPhoneNumber = require('../../services/CRUD/Add/AddPhoneNumber');
const AddSubject = require('../../services/CRUD/Add/AddSubject');
const AddTinhTu = require('../../services/CRUD/Add/AddTinhTu');
const sequelize = require('../../models/sequelize');
const AddPhoneNumberQueue = require('../../services/CRUD/Add/AddPhoneNumberPhoneQueue');
const AddEmail = require('../../services/CRUD/Add/AddEmail');
const AddAssessment = require('../../services/CRUD/Add/AddAssessMent');
const AddFriendClassSubject = require('../../services/CRUD/Add/addFriendClassSubject');
const AddImageAndVideo = require('../../services/CRUD/Add/AddImageAndVideo');
const AddTinh = require('../../services/CRUD/Add/AddTinh');
const AddHuyen = require('../../services/CRUD/Add/AddHuyen');
const AddXa = require('../../services/CRUD/Add/AddXa');
const AddThongKe = require('../../services/CRUD/Add/AddThongKe');
async function data() {
    const Users = [
        {
            userName: "admin",
            name: 'Lương Ngọc Yên',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/01/2003',
            gender: true,
            role: 3,
            star: 0,
            profileCensore: true,
            career: 'Quản trị viên',
            exp: 5,
            lastOnline: new Date(),
            mota: 'Chăm sóc nhiệt tình <3',
            linkAvatar: 'https://th.bing.com/th/id/R.636ed2cda71b9f4359468148c718c3d3?rik=6TCnqG6FlqyCYA&pid=ImgRaw&r=0'
        },
        {
            userName: "giasu1",
            name: 'Nguyễn Gia Tú',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/01/2004',
            gender: true,
            role: 2,
            star: 200,
            profileCensore: true,
            career: 'Student',
            exp: 5,
            lastOnline: new Date(),
            mota: 'Nhận gia sư toán 7 , toán 8 <3',
            linkAvatar: 'https://vnn-imgs-f.vgcloud.vn/2020/12/03/22/thanh-tich-xuat-sac-cua-chang-trai-dang-quang-sinh-vien-nam-2020-dh-y-ha-noi-5.jpg'
        },
        {
            userName: "giasu2",
            name: 'Lương Bích Cẩm Tú',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '12/5/1994',
            gender: false,
            role: 2,
            star: 2000,
            profileCensore: true,
            career: 'Teacher',
            exp: 3,
            lastOnline: new Date(),
            mota: 'Cô nhận gia sư tiếng Anh tiểu học và trung học <3',
            linkAvatar: 'https://th.bing.com/th/id/OIP.DxPEPn6orpZ0WAojN1sAAAHaHd?w=202&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top7.png?alt=media&token=dd9be0ca-cec1-48e0-8480-c4067b81690f'

        },
        {
            userName: "giasu3",
            name: 'Trần Hùng Phong',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '19/06/2002',
            gender: true,
            role: 2,
            star: 3000,
            profileCensore: true,
            career: 'Sinh Viên',
            exp: 2,
            lastOnline: new Date(),
            mota: 'Anh nhận gia sư vật lí thpt và ôn thi đại học <3',
            linkAvatar: 'https://th.bing.com/th/id/OIP.DOSAYPwG_KcUF_EfY6SV8QHaHa?pid=ImgDet&w=179&h=179&c=7&dpr=1.3',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top6.png?alt=media&token=719ffb6a-0b1a-424e-ba7f-c152880bac75'


        },
        {
            userName: "giasu4",
            name: 'Hà Trần Cẩm Ly',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '07/05/2001',
            gender: false,
            role: 2,
            star: 5000,
            profileCensore: true,
            career: 'Sinh Viên',
            exp: 4,
            lastOnline: new Date(),
            mota: 'Chị nhận gia sư Ngữ Văn cấp THCS + THPT <3',
            linkAvatar: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/1716027381970_download.jpg?alt=media&token=fc64a356-49f7-4345-a919-16a1ed050f35',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top5.png?alt=media&token=c1c639b9-295b-469c-adfb-ea954ffc73fe'

        },
        {
            userName: "giasu5",
            name: 'Đinh Bá Anh',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '22/03/1994',
            gender: true,
            role: 2,
            star: 10000,
            profileCensore: true,
            career: 'Giáo Viên',
            exp: 7,
            lastOnline: new Date(),
            mota: 'Anh nhận gia sư các bạn môn cấu trúc dữ liệu và giải thuật <3 ',
            linkAvatar: 'https://th.bing.com/th/id/OIP.1764xXbsl_DKhIxO050V-QHaHa?pid=ImgDet&w=179&h=179&c=7&dpr=1.3',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top4.png?alt=media&token=039c3e6e-0dc0-47e5-8835-a41a79223d28',

        },
        {
            userName: "giasu6",
            name: 'Nguyễn Trúc Phương Thảo',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            gender: false,
            role: 2,
            star: 15000,
            profileCensore: true,
            career: 'Sinh Viên',
            exp: 2,
            lastOnline: new Date(),
            mota: 'Nhận gia sư 1-1 lập trình Java <3',
            linkAvatar: 'https://userpic.codeforces.org/3701317/title/ec6e703a78e5ae7e.jpg',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top3.png?alt=media&token=aa907889-536e-44fa-a608-434138e6b0f7',

        },
        {
            userName: "giasu7",
            name: 'Huỳnh Ngọc Phương Đông',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2002',
            gender: true,
            role: 2,
            star: 20000,
            profileCensore: true,
            career: 'Sinh Viên',
            exp: 4,
            lastOnline: new Date(),
            mota: 'Nhận gia sư 1-1 lập trình C++ <3',
            linkAvatar: 'https://th.bing.com/th/id/OIP.UU5hQtMuX7IW-hy9ZJZ0wwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top2.png?alt=media&token=3c7edd06-3b23-40e4-92d9-8c140b72ce97'
        },
        {
            userName: "giasu8",
            name: 'Trần Thị Kiều Yến',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            gender: false,
            role: 2,
            star: 25000,
            profileCensore: true,
            career: 'Sinh Viên',
            exp: 4,
            lastOnline: new Date(),
            mota: 'Nhận gia sư 1-1 ngữ văn tiểu học <3',
            linkAvatar: 'https://giasuviet.net.vn/app/uploads/2019/08/received_272863586715720.jpeg',
            rankImage: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/top1.png?alt=media&token=95fe9d3e-9bf0-4d36-b9bb-ddc8be5fff8c'
        },
        {
            userName: "Customer1",
            name: 'Nguyễn Văn Anh',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer2",
            name: 'Nguyễn Văn Bắc',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer3",
            name: 'Nguyễn Văn Nam',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer4",
            name: 'Nguyễn Văn Đông',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer5",
            name: 'Nguyễn Văn Tây',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer6",
            name: 'Nguyễn Văn Phương',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer7",
            name: 'Nguyễn Văn Hậu',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        },
        {
            userName: "Customer8",
            name: 'Nguyễn Thị Linh',
            passWord: 'c4ca4238a0b923820dcc509a6f75849b',
            dob: '15/04/2001',
            role: 1,
            profileCensore: true,
            lastOnline: new Date(),
        }
    ];
    const PhoneNumbers = [
        {
            name: '07054704',
            userId: 1
        },
        {
            name: '070523423434704',
            userId: 2
        },
        {
            name: '0705344704',
            userId: 3
        },
        {
            name: '07053',
            userId: 4
        },
        {
            name: '07023253',
            userId: 5
        },
        {
            name: '07023253',
            userId: 6
        },
        {
            name: '07023253',
            userId: 7
        },
        {
            name: '07023253',
            userId: 8
        },
        {
            name: '07023253',
            userId: 9
        },
        {
            name: '07023253',
            userId: 10
        },
        {
            name: '07023253',
            userId: 11
        },
        {
            name: '07023253',
            userId: 12
        },
        {
            name: '07023253',
            userId: 13
        },
        {
            name: '07023253',
            userId: 14
        },
        {
            name: '07023253',
            userId: 15
        }
    ]
    const Emails = [
        {
            name: 'a@gmail.com',
            userId: 1
        },
        {
            name: 'a@gmail.com',
            userId: 2
        },
        {
            name: 'a@gmail.com',
            userId: 3
        },
        {
            name: 'a@gmail.com',
            userId: 4
        },
        {
            name: 'a@gmail.com',
            userId: 5
        },
        {
            name: 'a@gmail.com',
            userId: 6
        },
        {
            name: 'a@gmail.com',
            userId: 7
        },
        {
            name: 'a@gmail.com',
            userId: 8
        },
        {
            name: 'a@gmail.com',
            userId: 9
        },
        {
            name: 'a@gmail.com',
            userId: 10
        },
        {
            name: 'a@gmail.com',
            userId: 11
        },
        {
            name: 'a@gmail.com',
            userId: 12
        },
        {
            name: 'a@gmail.com',
            userId: 13
        },
        {
            name: 'a@gmail.com',
            userId: 14
        },
        {
            name: 'a@gmail.com',
            userId: 15
        }
    ]
    const Friends = [
        {
            tutorId: 1,
            parentId: 2,
        },
        {
            tutorId: 1,
            parentId: 2,
        },
        {
            tutorId: 1,
            parentId: 3,
        },
        {
            tutorId: 2,
            parentId: 4,
        }
    ]
    const Articles = [
        {
            title: 'Xin chào , mình tên là Nguyễn Gia Tú , hiện tại mình đang làm sinh viên của Học Viện Công Nghệ Bưu Chính Viễn Thông PTIT , điểm thi đại học của mình là 27.0 với 3 điểm 3 môn Toán , Lý',
            timePosted: new Date(),
            isCensored: false,
            userId: 2,
            status: true,
        },
        {
            title: 'hello2',
            contentText: 'dfgdfgd',
            like: 12,
            dislikes: 12,
            timePosted: new Date(),
            isCensored: false,
            userId: 1,
            status: false,

        },
        {
            title: 'fgdfsdfsdfgdgdfgd',
            contentText: 'dfgdsfsdffgd',
            like: 12,
            dislikes: 12,
            timePosted: new Date(),
            isCensored: true,
            userId: 2,
            status: true,
        },
        {
            title: 'fgdfasadgdgdfgd',
            contentText: 'dfgdasdasdadfgd',
            like: 12,
            dislikes: 12,
            timePosted: new Date(),
            isCensored: true,
            userId: 3,
            status: true,
        },
        {
            title: 'fgdfasadgdasdadasdsagdfgd',
            contentText: 'dfgdasasdadaadasdadfgd',
            like: 12,
            dislikes: 12,
            timePosted: new Date(),
            isCensored: true,
            userId: 4,
            status: true,
        }
    ];
    const Subjects = [
        { name: 'Tán gái đại cương' },
        { name: 'Cấu trúc dữ liệu và giải thuật' },
        { name: 'GDCD' },
        { name: 'Hóa học' },
        { name: 'Lập trình hướng đối tượng' },
        { name: 'Lập trình thuật toán bằng Java' },
        { name: 'Lập Trình C++' },
        { name: 'Lịch Sử' },
        { name: 'Nhập môn Công nghệ phần mềm' },
        { name: 'Ngữ Văn' },
        { name: 'Sinh học' },
        { name: 'Tiếng Anh' },
        { name: 'Toán' },
        { name: 'Vật Lí' },
        { name: 'Địa Lí' }
    ];
    const Classes = [
        {
            name: '1'
        },
        {
            name: '2'
        },
        {
            name: '3'
        },
        {
            name: '4'
        },
        {
            name: '5'
        },
        {
            name: '6'
        },
        {
            name: '7'
        },
        {
            name: '8'
        },
        {
            name: '9'
        },
        {
            name: '10'
        },
        {
            name: '11'
        },
        {
            name: '12'
        },
        {
            name: 'Đại học'
        },
    ];
    const ClassSubjects = [];
    for (let i = 0; i < Classes.length; i++) {
        for (let j = 0; j < Subjects.length; j++) {
            ClassSubjects.push({
                classId: i + 1,
                subjectId: j + 1
            })
        }
    }
    const Comments = [
        {
            commentText: 'asdfasdasdasdasd',
            like: 123,
            dislike: 123131,
            timePosted: new Date(),
            articleId: 1
        },
        {
            commentText: 'asdfasdasdasdasd',
            like: 123,
            dislike: 123131,
            timePosted: new Date(),
            articleId: 2
        },
        {
            commentText: 'asdfasdasdasdasdfsfsdfasdasd',
            like: 123,
            dislike: 123131,
            timePosted: new Date(),
            articleId: 3
        },
        {
            commentText: 'asdfasdasasfasdfdasadsadasdadadasd',
            like: 123,
            dislike: 123131,
            timePosted: new Date(),
            articleId: 4
        }
    ];

    const TinhTus = [
        {
            userId: 1,
            classSubjectId: 1,
            price: 200,
            pick: true,
            freetime: '123131231312312311231231231312',
            exp: 0.5,
            xaId: 1,
            isCensored: true
        },
        {
            userId: 1,
            classSubjectId: 1,
            price: 2200,
            pick: true,
            freetime: '123131231312312311231231231312',
            exp: 1.5,
            xaId: 1
        },
        {
            userId: 1,
            classSubjectId: 1,
            price: 2020,
            pick: true,
            freetime: '123131231312312311231231231312',
            exp: 2.5,
            xaId: 1
        },
        {
            userId: 1,
            classSubjectId: 2,
            price: 2020,
            pick: true,
            freetime: '123131231312312311231231231312',
            exp: 5.5,
            xaId: 2
        },
        {
            userId: 2,
            classSubjectId: 2,
            price: 400,
            pick: true,
            freetime: '123131231312312311231231231312',
            exp: 5.5,
            xaId: 2
        },
        {
            userId: 3,
            classSubjectId: 3,
            price: 900,
            pick: false,
            freetime: '123131231312312311231231231312',
            exp: 5,
            xaId: 2
        },
        {
            userId: 4, // tại sao 4-4 được mà 2-2 không được
            classSubjectId: 4,
            price: 900,
            pick: false,
            freetime: '123131231312312311231231231312',
            exp: 3,
            xaId: 2
        },
        {
            userId: 4, // tại sao 4-4 được mà 2-2 không được
            classSubjectId: 4,
            price: 900,
            pick: false,
            freetime: '123131231312312311231231231312',
            exp: 3,
            xaId: 4
        }

    ];
    const PhoneNumberQueues = [
        {
            name: '070345353'
        },
        {
            name: '072320345353'
        },
        {
            name: '020345353'
        },
        {
            name: '0703425353'
        }
    ];
    const FriendClassSubjects = [
        {
            friendId: 1,
            classSubjectId: 1,
            startTime: new Date()
        },
        {
            friendId: 2,
            classSubjectId: 2,
            startTime: new Date()
        },
        {
            friendId: 1,
            classSubjectId: 3,
            startTime: new Date()
        },
        {
            friendId: 2,
            classSubjectId: 1,
            startTime: new Date()
        },
        {
            friendId: 3,
            classSubjectId: 2,
            startTime: new Date()
        }
    ];
    const Assessments = [
        {
            friendClassSubjectId: 1,
            content: 'cháu dạy tốt',
            star: 100,
        },
        {
            friendClassSubjectId: 1,
            content: 'cháu dạy tệ',
            star: 0,
        },
        {
            friendClassSubjectId: 2,
            content: 'cháu dạy  cực tốt',
            star: 1000,
        },
        {
            friendClassSubjectId: 1,
            content: 'cháu dạy cực tệ',
            star: -100,
        },
        {
            friendClassSubjectId: 5,
            content: 'cháu dạy cực tốt',
            star: 200,
        },
    ];
    const ImageAndVideos = [
        {
            type: true,
            link: 'https://userpic.codeforces.org/3701317/title/ec6e703a78e5ae7e.jpg',
            articleId: 1
        },
        {
            type: false,
            link: 'https://userpic.codeforces.org/3701317/title/ec6e703a78e5ae7e.jpg',
            articleId: 1
        },
        {
            type: true,
            link: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/2024-04-29%2021-50-52.mkv?alt=media&token=d2488b31-049e-4ad0-be32-5a4c604a853f',
            articleId: 1
        },
        {
            type: false,
            link: 'https://userpic.codeforces.org/3701317/title/ec6e703a78e5ae7e.jpg',
            articleId: 1
        },
        {
            type: true,
            link: 'https://firebasestorage.googleapis.com/v0/b/image-f5a2a.appspot.com/o/2024-04-29%2021-50-52.mkv?alt=media&token=d2488b31-049e-4ad0-be32-5a4c604a853f',
            articleId: 1
        },
    ]
    const Tinhs = [
        {
            name: 'Hà Nội'
        },
        {
            name: 'Tp.Hồ Chí Minh'
        }
    ];
    const Huyens = [
        {
            name: 'Ba Đình',
            tinhId: 1
        },
        {
            name: 'Hà Đông',
            tinhId: 1
        },
        {
            name: 'Hoàng Mai',
            tinhId: 1
        },
        {
            name: 'Cần Giờ',
            tinhId: 2
        },
        {
            name: 'Củ Chi',
            tinhId: 2
        },
        {
            name: 'Bình Tân',
            tinhId: 2
        },
    ];
    const Xas = [
        {
            name: 'Cống Vị',
            huyenId: 1
        },
        {
            name: 'Điện Biên',
            huyenId: 1
        },
        {
            name: 'Đội Cấn',
            huyenId: 1
        },
        {
            name: 'Giảng Võ',
            huyenId: 2
        },
        {
            name: 'Kim Mã',
            huyenId: 2
        },
        {
            name: 'Liễu Giai',
            huyenId: 2
        },
        {
            name: 'Bình Chánh',
            huyenId: 3
        },
        {
            name: 'Bình Hưng',
            huyenId: 3
        },
        {
            name: 'Bình Lợi',
            huyenId: 3
        },
        {
            name: 'An Phú',
            huyenId: 4
        },
        {
            name: 'Nhuận Đức',
            huyenId: 4
        },
        {
            name: 'Thạnh An',
            huyenId: 4
        },

        {
            name: 'An Bình',
            huyenId: 5
        },
        {
            name: 'Nhuận Đông',
            huyenId: 5
        },
        {
            name: 'Thạnh Bình',
            huyenId: 5
        },
        {
            name: 'Cẩm Phả',
            huyenId: 6
        },
        {
            name: 'Nghĩa Yên',
            huyenId: 6
        },
        {
            name: 'Lang Chánh',
            huyenId: 6
        },
    ];
    const ThongKes = [
        {
            name: 'hello',
            dob: 'hello',
            gioiTinh: 'hello',
            que: 'hello',
            phone: 'hello',
            nghe: 'hello',
            living: 'hello',
            sv: 'hello',
            gv: 'hello',
            want: 'hello',
            exp: 'hello',
            mota: 'hello',
            thanhtich: 'hello',
            dataTime: '200120112021203120412051206120712081209121012111212121312141215121612171218121912201221122212231300130113021303130413051306130713081309131013111312131313141315131613171318131913201321132213231400140114021403140414051406140714081409141014111412141314141415141614171418141914201421142214231500150115021503150415051506150715081509151015111512151315141515151615171518151915201521152215231600160116021603160416051606160716081609161016111612161316141615161616171618161916201621162216231700170117021703170417051706170717081709171017111712171317141715171617171718171917201721172217231800180118021803180418051806180718081809181018111812181318141815181618171818181918201821182218231'
        },
        {
            name: 'hello',
            dob: 'hello',
            gioiTinh: 'hello',
            que: 'hello',
            phone: 'hello',
            nghe: 'hello',
            living: 'hello',
            sv: 'hello',
            gv: 'hello',
            want: 'hello',
            exp: 'hello',
            mota: 'hello',
            thanhtich: 'hello',
            dataTime: '200120112021203120412051206120712081209121012111212121312141215121612171218121912201221122212231300130113021303130413051306130713081309131013111312131313141315131613171318131913201321132213231400140114021403140414051406140714081409141014111412141314141415141614171418141914201421142214231500150115021503150415051506150715081509151015111512151315141515151615171518151915201521152215231600160116021603160416051606160716081609161016111612161316141615161616171618161916201621162216231700170117021703170417051706170717081709171017111712171317141715171617171718171917201721172217231800180118021803180418051806180718081809181018111812181318141815181618171818181918201821182218231'
        }
    ];
    await sequelize.transaction(async (t) => {
        try {
            await AddUser(Users);
            await AddPhoneNumber(PhoneNumbers);
            await AddEmail(Emails)
            // await AddFriend(Friends);
            // await AddArticle(Articles);
            await AddSubject(Subjects);
            await AddClass(Classes);
            await AddClassSubject(ClassSubjects);
            // await AddComment(Comments); 
            // await AddPhoneNumberQueue(PhoneNumberQueues);
            // await AddFriendClassSubject(FriendClassSubjects);
            // await AddAssessment(Assessments);
            // await AddImageAndVideo(ImageAndVideos);
            await AddTinh(Tinhs);
            await AddHuyen(Huyens);
            await AddXa(Xas);
            // await AddTinhTu(TinhTus);
            // await AddThongKe(ThongKes);
        } catch (error) {
            console.log(error);
            return error;
        }
    })
}
module.exports = data;