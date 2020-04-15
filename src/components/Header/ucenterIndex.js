// /* eslint-disable */
import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Breadcrumb, Avatar} from 'antd';
import {Menu, Dropdown} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {setSignOut} from './../../store/actionCreators';
import './ucenterIndex.scss';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined
} from '@ant-design/icons';


class UcenterHeader extends React.Component {

    handleSignOut = () => {
        this.props.setSignOut(this.props.history.push);
    };

    render () {
        const {collapsed, togglecCollapsed} = this.props;

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    {/* eslint-disable-next-line */}
                    <Link to="/front">基本信息</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="1">
                    {/* eslint-disable-next-line */}
                    <Link to="/login">设置</Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2">
                    {/* eslint-disable-next-line */}
                    <a onClick={this.handleSignOut}>退出</a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={"ucenter_header"}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: togglecCollapsed,
                })}
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/">Application Center</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/">Application List</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
                <div className="right_menu">
                    <Avatar style={{backgroundColor: '#87d068'}}
                            size="small"
                            icon={<UserOutlined/>}/>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Hover me <DownOutlined/>
                        </a>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

const mapDispatch = (dispatch) => ({
    setSignOut (push) {
        dispatch(setSignOut(push));
    }
});
export default withRouter(connect(null, mapDispatch)(UcenterHeader));
