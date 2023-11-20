import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, message } from 'antd';
import StickyBox from 'react-sticky-box';
import { apiLogout, getListLogsToday, apiUpdateLogs } from "../../apis";
import Login from "../login";


const Home = () => {
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [dataLogs, setDataLogs] = useState([]);
    const handleLogout = () => {
        apiLogout({ refreshToken: localStorage.getItem("r") }).then(() => {
            localStorage.clear();
            message.success("Đăng suất thành công");
            setTimeout(() => {
                location.reload();
            }, 500);
        });
    }

    const handleGetListLogToday = async () => {
        const res = await getListLogsToday();
        setDataLogs(res?.data?.data || []);
    }
    useEffect(() => {
        handleGetListLogToday();
    }, [])

    const handleUpdateLog = (type, file, log_id) => {
        apiUpdateLogs({
            type,
            file,
            log_id
        }).then(handleGetListLogToday);
    }
    const columns = [{
        title: 'User',
        dataIndex: 'customer_id',
        key: 'customer_id',
        align: 'center'
    }, {
        title: 'Video',
        dataIndex: 'video',
        key: 'video',
        align: 'center',
        sorter: (a, b) => a?.video - b?.video,
        render: (video, log) => {
            if (localStorage.getItem("t")) {
                return <>
                    <Button onClick={() => handleUpdateLog("minus", "video", log.log_id)}>-</Button>
                    <span style={{ width: 50, display: 'inline-block' }} >{video}</span>
                    <Button onClick={() => handleUpdateLog("add", "video", log.log_id)}>+</Button>
                </>
            } else {
                return video
            }

        }
    }, {
        title: 'Photo',
        dataIndex: 'photo',
        key: 'photo',
        align: 'center',
        render: (photo, log) => {
            if (localStorage.getItem("t")) {
                return <>
                    <Button onClick={() => handleUpdateLog("minus", "photo", log.log_id)}>-</Button>
                    <span style={{ width: 50, display: 'inline-block' }}>{photo}</span>
                    <Button onClick={() => handleUpdateLog("add", "photo", log.log_id)}>+</Button>
                </>
            } else {
                return photo
            }
        }
    }]

    return <>
        <div style={{ margin: "0px auto", maxWidth: '1200px' }}>
            <Table rowKey={(log) => log.log_id || Math.random()} pagination={false} style={{ marginTop: 50 }} columns={columns} dataSource={dataLogs}></Table>
        </div>
        {
            localStorage.getItem("r") ? (
                <Button onClick={handleLogout} type='primary' style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>Đăng xuất</Button>
            ) : (
                <Button onClick={() => setOpenModalLogin(true)} type='primary' style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>Đăng nhập</Button>
            )
        }
        <Button type='primary' style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }} onClick={handleGetListLogToday}>Reload</Button>
        <Modal onCancel={() => setOpenModalLogin(false)} title="Đăng nhập" footer={null} open={openModalLogin}>
            <Login />
        </Modal>
    </>;
};
export default Home;