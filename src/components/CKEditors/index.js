import React, {useState} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CKEditor from 'ckeditor4-react';
import './index.scss';


class CKEditors extends React.Component {
    render () {
        const {onChange} = this.props;
        return (
            <CKEditor
                config={{
                    // toolbar: [ [ 'Bold' ] ],
                    // width: 600,
                    height: 100,
                    // resize_dir: 'both',
                    // resize_minWidth: 200,
                    resize_minHeight: 300,
                    resize_maxWidth: 800
                }}
                // data="<p>Hello from CKEditor 4!</p>"
                onChange={onChange}
            />
        );
    }
}

const mapState = (state) => ({});

export default connect(mapState, null)(withRouter(CKEditors));
