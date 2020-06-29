import React from 'react';
import {withRouter} from 'react-router-dom';
import CombinePaperIitem from './combinePaperIitem.js';

class CombinePaper extends React.Component {

    state = {};


    componentDidMount () {
    };

    render () {
        return (<CombinePaperIitem key={this.props.location.pathname}/>)
    }
}

export default withRouter(CombinePaper);
