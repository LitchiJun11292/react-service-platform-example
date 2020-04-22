import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu} from 'antd';
import MenConfig from './../../utils/menuConfig';
import {
    MailOutlined,
} from '@ant-design/icons';
import tabsRoute from "../../utils/tabsRoute";

const {SubMenu} = Menu;

class NavLerft extends React.Component {

    state = {
        selectedKeys: '',
        openKeys: [],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    };

    // 打开对应的SubMenu
    handleInitTableList = (route) => {
        let openKeys = route.pathname.split('/');
        this.setState({
            openKeys: [openKeys[2]],
            selectedKeys: route.activeMenu ? route.activeMenu : route.pathname
        });
    };

    componentDidMount () {
        const menuTreeNode = this.renderMenu(MenConfig[this.props.target]);
        let openKeys = this.props.location.pathname.split('/');
        this.setState({
            menuTreeNode,
            openKeys: [openKeys[2]],
            selectedKeys: this.props.location.pathname
        });
        this.props.history.listen((route) => {
            this.handleInitTableList(route);
        });
    }

    // 解决组件卸载不能更新报警告
    componentWillUnmount () {
        this.setState = (state, callback) => {
            return false;
        };
    }

    // 菜单渲染
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.url}
                        title={
                            <span>
                                <MailOutlined/>
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.url}>
                        {item.title === '办事大厅' ? <MailOutlined/> : ''}
                        <span>
                            <NavLink to={item.url} style={{color: 'inherit'}}>{item.title}</NavLink>
                        </span>
                    </Menu.Item>
                )
            }
        })
    };

    render () {
        return (
            <Menu theme="dark" mode="inline"
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                  // selectedKeys={this.props.location.pathname}
                  selectedKeys={this.state.selectedKeys}
                  defaultSelectedKeys={['1']}>
                {this.state.menuTreeNode}
            </Menu>
        );
    }
}

const mapState = (state) => ({
    target: state.users.target,
    tableRouteList: state.ucenter.tableRouteList
});

export default connect(mapState, null)(withRouter(NavLerft));
