import './Articles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // hoặc chỉ import 'bootstrap/js/dist/dropdown'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import md5 from 'md5';
import { FaXmark } from "react-icons/fa6";

import { faEllipsisH, faThumbsUp, faThumbsDown, faGlobe, faLock, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { AiFillDislike } from "react-icons/ai";
import { FaGlobeAsia, FaSync } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import { GoLog } from "react-icons/go";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useState, useEffect } from "react";
import { PiArticleThin } from "react-icons/pi";

import { useSelector, useDispatch } from "react-redux";
import { IsActiveActions } from '../../../Reducers/IsActiveReducer';
import { NavLink, json, useLocation } from 'react-router-dom';
import fetchGet from '../../../Fetch/fetchGet';
import fetchPost from '../../../Fetch/fetchPost';
import { Button, Modal, Form } from 'react-bootstrap';


import queryString from 'query-string';
import { makeColor } from '../../../Award';
const makeDay = (Day) => {
    console.log(typeof (Day))
    // Lấy ngày
    const day = Number(Day.slice(5, 7));

    // Lấy tháng (lưu ý rằng tháng trong JavaScript được đếm từ 0)
    const month = Number(Day.slice(8, 10));


    return month + ' tháng ' + day;
}
const Articles = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.IsActiveReduce);
    const params = queryString.parse(window.location.search);
    const [iconModes, setIconModes] = useState([]);
    const [rightIconModes, setRightIconModes] = useState([]);
    const [threeDotsAndBelow, setThreeDotsAndBelow] = useState([]);
    const [titles, setTitles] = useState([]);
    const [iconX, setIconX] = useState([]);
    const [confs, setConfs] = useState([]);
    const [articles, setArticles] = useState([]);
    const [client, setClient] = useState(null);
    const parameter = queryString.parse(window.location.search);
    const loc = useLocation();
    useEffect(() => {
        console.log('article render');

        (
            async () => {
                let client = await fetchGet(`http://localhost:8888/guest/getUserInfo?userId=${parameter.userId}`);;
                setClient(client[0]);
                const role = state?.user?.role;
                const userId = params.userId;
                let data = [];
                if (params.who === 'my') data = await fetchGet(`http://localhost:8888/user/getAllArticles?userId=${userId}`);
                else if (params.who === 'other' && role !== 3) data = await fetchGet(`http://localhost:8888/guest/getAllArticles?userId=${userId}`);
                else if (params.who === 'other' && role === 3) data = await fetchGet(`http://localhost:8888/admin/getAllArticles?userId=${userId}`);
                const iconModes = [];
                const rightIconModes = [];
                const threeDotsAndBelow = [];
                const titles = [];
                const iconXs = [];
                const confs = [];
                data[0]?.sideA?.forEach((tus, index) => {
                    iconModes[index] = tus?.status;
                    titles[index] = tus?.title;
                    rightIconModes[index] = false;
                    threeDotsAndBelow[index] = false;
                    iconXs[index] = false;
                });
                data[0]?.sideA?.forEach((tus, index) => {
                    confs[index] = [];
                    tus?.ImageAndVideoModels?.forEach((link) => {
                        confs[index].push(false);
                    });
                });
                setArticles(data[0]?.sideA);
                setIconModes(iconModes);
                setRightIconModes(rightIconModes);
                setThreeDotsAndBelow(threeDotsAndBelow);
                setTitles(titles);
                setIconX(iconXs);
                setConfs(confs);
                window.scrollTo(0, 0);
            }
        )();
    }, [state.renderArticle, loc]);
    const handleCancel = (i, j) => {
        setConfs(state => {
            const tmp = [];
            state?.forEach((valuei, indexi) => {
                tmp[indexi] = [];
                valuei.forEach((valuej, indexj) => tmp[indexi][indexj] = valuej);
            })
            tmp[i][j] = !tmp[i]?.[j];
            state = tmp;
            return state;
        });
    }
    const handleOkay = async (i, j, id) => {
        setConfs(state => {
            const tmp = [];
            state.forEach((valuei, indexi) => {
                tmp[indexi] = [];
                valuei.forEach((valuej, indexj) => tmp[indexi][indexj] = valuej);
            })
            tmp[i][j] = !tmp[i]?.[j];
            state = tmp;
            return state;
        });
        const data = await fetchPost('http://localhost:8888/user/deleteImageAndVideo', { imageAndVideoId: id, userId: client.userId });
        if (data instanceof Error) {
            setContentState('Xóa thành công');
            setShow(true);
        }
        else {
            setContentState('Xóa thành công');
            setShow(true);
        }
        setIndexState(-1);
        setTimeout(() => dispatch(IsActiveActions.changeStatusUser({ ...state.user })), 2000);
    }
    const handleX = (i, j) => {
        setConfs(state => {
            const tmp = [];
            state.forEach((valuei, indexi) => {
                tmp[indexi] = [];
                valuei.forEach((valuej, indexj) => tmp[indexi][indexj] = valuej);
            })
            tmp[i][j] = !tmp[i][j];
            state = tmp;
            return state;
        });
    }
    const handleIcon = (index) => {
        setRightIconModes(state => {
            state[index] = !state[index];
            state = [...state];
            return state;
        })

    }
    const [indexState, setIndexState] = useState(0);
    const [statusState, setStatusState] = useState(true);
    const [contentState, setContentState] = useState('');
    const [typeState, setTypeState] = useState(0);
    const [show, setShow] = useState(false);
    const handleChangeStatus = async (index, value) => {
        setRightIconModes(state => {
            state[index] = !state[index];
            state = [...state];
            return state;
        });
        setIconModes(state => {
            state[index] = value;
            state = [...state];
            return state;
        });
        try {
            (
                async () => {
                    const err = await fetchPost('http://localhost:8888/user/updateArticle', { articleId: articles[index].articleId, status: value });
                    if (err instanceof Error) setContentState('Thay đổi trạng thái bài viết không thành công');
                    else {
                        setContentState('Thay đổi trạng thái bài viết thành công');
                    }
                    setIndexState(-1);
                }
            )();
        } catch (error) {
            console.log(error);
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        if (indexState === -1) {
            setShow(false);
            return;
        }
        if (typeState === 1) await handleChangeStatus(indexState, statusState);
        else if (typeState === 2) await handleXoa(indexState);
    }
    const preChangeStatus = (index, value) => {
        setContentState('Xác nhận thay đổi trạng thái bài viết ');
        setShow(true);
        setIndexState(index);
        setTypeState(1);
        setStatusState(value);
    }
    const Modall = (props) => {
        return (
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {props.content}
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="success" onClick={handleShow}> Đồng ý</Button>
                        <Button variant="danger" onClick={handleClose}> Đóng</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );

    }
    const handleOption = (index) => {
        setThreeDotsAndBelow(state => {
            state[index] = !state[index];
            state = [...state];
            return state;
        });
    }
    const preXoa = async (index) => {
        setContentState('Xác nhận xóa bài viết ');
        setShow(true);
        setIndexState(index);
        setTypeState(2);
    }
    const handleXoa = async (index) => {
        try {
            const err = await fetchPost('http://localhost:8888/user/deleteArticle', { articleId: articles[index].articleId });
            if (err instanceof Error) setContentState('Xóa không thành công');
            else setContentState('Xóa thành công');
            setIndexState(-1);
            // setTimeout(() => dispatch(IsActiveActions.changeStatusRenderArticle(!state.renderArticle)) , 1000);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='top-articles'>
                <NavLink className='titlee'> #About {client?.name} </NavLink>
                {
                    (state?.user?.role >= 1 && parameter.who === 'my') ? <NavLink to='/addNewArticle'><IoAdd /> Thêm bài viết <GoLog /></NavLink> : <></>
                }

                <div className='articles'>
                    {
                        articles?.map((tus, tusIndex) => {
                            return (
                                <div className='article'>
                                    <div className='first-of-article'>
                                        <div className='first-of-article-left'>
                                            <img className='small-avatar' src={client?.linkAvatar} alt='small-avatar'></img>
                                            <div className='name-article'> <span style={{ color: makeColor(client?.star, 1), fontWeight: 'bold' }}>{client?.name?.[0]}</span><span style={{ color: makeColor(client?.star, 2), fontWeight: 'bold' }}>{client?.name?.slice(1)}</span> </div>
                                            <div>
                                                <span className='date-article'>{makeDay(tus?.timePosted)}</span>
                                                {(iconModes[tusIndex] && parameter.who === 'my') ? <FaGlobeAsia className='private-or-public-icon-article' onClick={() => { handleIcon(tusIndex) }} /> : <FontAwesomeIcon icon={faLock} className='private-or-public-icon-article' onClick={() => { handleIcon(tusIndex) }} />}
                                                {rightIconModes[tusIndex] ?
                                                    <span className='private-or-public-modal'>
                                                        <button className='public-and-private' onClick={() => preChangeStatus(tusIndex, false)}>Chỉ mình tôi</button>
                                                        <button className='public-and-private' onClick={() => preChangeStatus(tusIndex, true)}>Công khai</button>
                                                    </span>
                                                    : <></>
                                                }
                                            </div>
                                        </div>

                                        {(parameter.who === 'my' && state?.user?.role >= 1) ?
                                            <div className='first-of-article-right'>
                                                <FontAwesomeIcon className='option-article' icon={faEllipsisH} onClick={() => handleOption(tusIndex)} />
                                                {
                                                    !threeDotsAndBelow[tusIndex] ? <></> :
                                                        <div className='option' onClick={() => preXoa(tusIndex)}>
                                                            <button className=' button-fix button-option' >Xóa</button>
                                                        </div>
                                                }
                                            </div> : <></>}
                                    </div>

                                    <div className='title-article'>{tus.title}</div>

                                    <div className='third-of-article'>
                                        {
                                            tus?.ImageAndVideoModels?.map((value, linkIndex) => {
                                                if (value.type === false) {
                                                    return (
                                                        <span className='link-media'>
                                                            <img style={{ width: '320px', height: '240px' }} src={value.link} alt='link-media'>
                                                            </img>
                                                            {
                                                                (parameter.who === 'my' && state.user) ? <FaXmark className='X-mark' style={{ position: 'absolute' }} onClick={() => handleX(tusIndex, linkIndex)} /> : <></>
                                                            }
                                                            {confs[tusIndex][linkIndex] ?
                                                                <div className="conf">
                                                                    <div className="jus">
                                                                        Xác nhận Xóa
                                                                    </div>
                                                                    <button className="button-fix ok " onClick={() => handleOkay(tusIndex, linkIndex, value.imageAndVideoId)}>OK</button>
                                                                    <button className='button-fix cancel' onClick={() => handleCancel(tusIndex, linkIndex)}>Cancle</button>
                                                                </div>
                                                                : <></>
                                                            }
                                                        </span>
                                                    )
                                                }
                                                return (
                                                    <span className='link-media'>
                                                        <video width="320" height="240" controls>
                                                            <source src={value.link} type="video/mp4"></source>
                                                            Your browser does not support the video tag.
                                                        </video>
                                                        {
                                                            (parameter.who === 'my' && state.user) ? <FaXmark className='X-mark' style={{ position: 'absolute' }} onClick={() => handleX(tusIndex, linkIndex)} /> : <></>
                                                        }
                                                        {confs[tusIndex][linkIndex] ?
                                                            <div className="conf">
                                                                <div className="jus">
                                                                    Xác nhận Xóa
                                                                </div>
                                                                <button className="button-fix ok " onClick={() => handleOkay(tusIndex, linkIndex, value.imageAndVideoId)}>OK</button>
                                                                <button className='button-fix cancel' onClick={() => handleCancel(tusIndex, linkIndex)}>Cancle</button>
                                                            </div> : <></>}
                                                    </span>

                                                );
                                            })
                                        }
                                    </div>
                                    <br />

                                    <br />

                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Modall title='Thông báo' content={contentState} />
        </>
    );
}
// flex wrap tự độn xuoogns dòng
export default Articles;
