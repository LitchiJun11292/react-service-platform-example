import React from 'react';
import {Layout} from 'antd';
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import '../index.scss';
import NavLerft from '../../../components/NavLerft/index';
import UcenterHeader from '../../../components/Header/ucenterIndex';
import NavTabs from '../../../components/NavTabs/index';
import logoTitle from '../../../statics/images/logo_title01.png';
import logo from '../../../statics/images/logo.png';
import {resetData} from './actionCreators';


const {Header, Sider, Content} = Layout;

class Ucenter extends React.Component {

    state = {
        collapsed: false,
    };

    togglecCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount () {
        this.props.resetDatesdis();
    }

    render () {
        const {collapsed} = this.state;
        return (
            <Layout className="ucenter_layout">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src={this.state.collapsed ? logo : logoTitle} alt=""/>
                    </div>
                    <NavLerft/>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-header" style={{padding: 0}}>
                        <UcenterHeader
                            collapsed={collapsed}
                            togglecCollapsed={this.togglecCollapsed}
                        />
                        <NavTabs/>
                    </Header>
                    <Content className="site-layout-content ucenter_content">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetDatesdis () {
        const states = JSON.parse(sessionStorage.getItem('ucenter'));
        sessionStorage.removeItem("ucenter");
        states && dispatch(resetData(states));
    }
});

const withReducer = injectReducer({key: 'ucenter', reducer});
const withSaga = injectSaga({key: 'ucenter', saga});
const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withRouter,
    withReducer,
    withSaga,
    withConnect,
)(Ucenter);
