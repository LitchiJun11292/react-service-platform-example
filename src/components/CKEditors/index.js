// import React, {useState} from 'react';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CKEditor from 'ckeditor4-react';
import './index.scss';

let editorRef = React.createRef();


class CKEditors extends React.Component {

    componentDidMount () {
    }

    onInstanceReady = (ev) => {
        // 初始化聚焦
        ev.editor.focus();
    };

    render () {
        const {onChange} = this.props;
        return (
            <CKEditor
                ref={editorRef}
                config={{
                    // toolbar: [ [ 'Bold' ] ],
                    // width: 600,
                    height: 100,
                    // resize_dir: 'both',
                    // resize_minWidth: 200,
                    resize_minHeight: 300,
                    resize_maxWidth: 800,
                    // startupFocus: true // 配置初始化聚焦
                }}
                data={this.props.data}
                onChange={onChange}
                onInstanceReady={this.onInstanceReady}
            />
        );
    }
}

const mapState = (state) => ({});

export default connect(mapState, null)(withRouter(CKEditors));
