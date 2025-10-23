import React from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const { Content } = Layout;

const   MainLayout: React.FC = () => {

    return (
        <Layout
            style={{
                height: '100vh',
            }}
        >
            <Sidebar />
            <Layout className='!bg-white'>
                <DashboardHeader />
                <Content >
                    <div
                        className=" min-h-[50vh] w-full p-3 h-[calc(100vh-80px)] !bg-white overflow-y-scroll"
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
