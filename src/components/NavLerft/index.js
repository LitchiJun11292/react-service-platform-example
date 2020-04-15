import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu} from 'antd';
import MenConfig from './../../utils/menuConfig';
import tabsRoute from './../../utils/tabsRoute';
import {
    MailOutlined,
} from '@ant-design/icons';
import {
    initTablesRoutelist
} from "./../../page/ucenter/admin/actionCreators";

const {SubMenu} = Menu;

class NavLerft extends React.Component {

    state = {
        selectedKeys: '/ucenter/collectInformation',
        openKeys: [],
    };

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
    };

    // 地址打开对应的tab页
    handleInitTableList = (route) => {
        let filter = tabsRoute.filter(item => (item.url === route.pathname));
        if (filter.length > 0) {
            let obj = filter[0];
            if (obj.url !== tabsRoute[0].url) {
                this.props.initTablesRoutelist({
                    title: obj.title,
                    url: obj.url
                });
            }
        }

        // 打开对应的SubMenu
        let openKeys = route.pathname.split('/');
        this.setState({
            openKeys: [openKeys[2]]
        });
    };

    componentDidMount () {
        const menuTreeNode = this.renderMenu(MenConfig[this.props.target]);
        let openKeys = this.props.location.pathname.split('/');
        tabsRoute[0].closable = false;
        this.props.initTablesRoutelist(tabsRoute[0]);
        this.setState({
            menuTreeNode,
            openKeys: [openKeys[2]]
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
                  selectedKeys={this.props.location.pathname}
                  defaultSelectedKeys={['1']}>
                {this.state.menuTreeNode}
            </Menu>
        );
    }
}

const mapState = (state) => ({
    target: state.users.target
});

const mapDispatch = (dispatch) => ({
    initTablesRoutelist (data) {
        dispatch(initTablesRoutelist(data));
    }
});
export default connect(mapState, mapDispatch)(withRouter(NavLerft));
