 import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import loadableComponent from './utils/loadableComponent';

const Login = loadableComponent('page/login/index.js');
const Home = loadableComponent('page/home/index.js');
const Ucenter = loadableComponent('page/ucenter/index.js');

class App extends React.Component {

    componentDidMount () {
        window.addEventListener("beforeunload", this.beforeunloadFn);
    }


    componentWillUnmount () {
        window.removeEventListener("beforeunload", this.beforeunloadFn);
    }

    render () {
        return (<Switch>
            <Redirect exact from="/" to="login"/>
            <Route path='/login' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/ucenter' component={Ucenter}/>
        </Switch>)
    }

    beforeunloadFn = () => {
        for (let key in this.props.states) {
            if (key !== 'users') {
                sessionStorage.setItem(key, JSON.stringify(this.props.states[key]))
            }
        }
    }
}

// function App () {
//     return (
//         <Switch>
//             <Redirect exact from="/" to="login"/>
//             <Route path='/login' component={Login}></Route>
//             <Route path='/home' component={Home}></Route>
//             <Route path='/ucenter' component={Ucenter}></Route>
//         </Switch>
//     );
// }

const mapState = (state) => ({
    states: state
});

export default connect(mapState, null)(App);
