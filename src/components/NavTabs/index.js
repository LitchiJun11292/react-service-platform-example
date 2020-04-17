import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {Tabs} from 'antd';
import './index.scss';
import {initTablesRoutelist} from "./../../page/ucenter/admin/actionCreators";
import {
    LoginOutlined
} from '@ant-design/icons';
import tabsRoute from "../../utils/tabsRoute";

const {TabPane} = Tabs;


class NavTabs extends React.Component {

    onChange = activeKey => {
        this.setState({activeKey});
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        const {tableRouteList} = this.props;
        let activeKey = this.props.location.pathname;
        let lastIndex;
        tableRouteList.forEach((pane, i) => {
            if (pane.url === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = tableRouteList.filter(pane => pane.url !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].url;
            } else {
                activeKey = panes[0].url;
            }
        }
        this.setState({activeKey});
        this.props.initTablesRoutelist(panes, -1);
        this.props.history.push(activeKey);
    };

    handleClear = () => {
        this.props.initTablesRoutelist(this.props.tableRouteList, 0);
        this.props.history.push(this.props.tableRouteList[0].url);
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
    };

    componentDidMount () {
        tabsRoute[0].closable = false;
        this.props.initTablesRoutelist(tabsRoute[0]);
        this.handleInitTableList(this.props.location);
        this.props.history.listen((route) => {
            this.handleInitTableList(route);
        });
    }

    render () {
        const {tableRouteList} = this.props;
        return (
            <div className="NavTabs_Total">
                <Tabs
                    className="NavTabs"
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.props.location.pathname}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {tableRouteList.map(pane => (
                        <TabPane tab={
                            <NavLink to={pane.url} style={{color: 'inherit'}}>{pane.title}</NavLink>
                        } key={pane.url} closable={pane.closable}/>
                    ))}
                </Tabs>
                <div className="LoginOutlined" onClick={this.handleClear}>
                    <LoginOutlined/>
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    tableRouteList: state.ucenter.tableRouteList
});

const mapDispatch = (dispatch) => ({
    initTablesRoutelist (data, opa) {
        dispatch(initTablesRoutelist(data, opa));
    }
});
export default connect(mapState, mapDispatch)(withRouter(NavTabs));
