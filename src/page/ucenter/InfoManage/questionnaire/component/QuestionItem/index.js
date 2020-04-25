import React from 'react';
import Radios from './../../questionType/Radios';
import CKEditor from '@/components/CKEditors';
import OptionOperation from './../OptionOperation';
import './index.scss';

class QuestionItem extends React.Component {
    static defaultProps = {
        isEdit: false
    };

    state = { isEdit: false };

    componentDidMount() {
        const { isEdit, keys, handleEdit } = this.props;
        if (isEdit) {
            handleEdit(keys, 'add');
        }
    }

    // componentWillReceiveProps(prop) {
    // };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    handleType = () => {
        const { type } = this.props;
        switch (type) {
            case 'd01':
                return <Radios {...this.props} disabled={true} />;
            default:
                return;
        }
    };

    handleOperation = () => {
        const { type } = this.props;
        switch (type) {
            case 'd01':
                return <OptionOperation
                    onOptionsEdit={this.onOptionsEdit}
                    {...this.props} />;
            default:
                return;
        }
    };

    onOptionsEdit = (obj) => {
        this.props.handleOnChange(obj);
    };

    onChangeEdit = (evt) => {
        this.props.handleOnChange({
            keys: [this.props.keys, 'title'],
            type: 'update',
            val: evt.editor.getData()
        });
    };

    render() {
        const { keys, handleEdit } = this.props;

        return (
            <div className={`question_item ${this.props.isEdit ? 'is_active' : ''}`}>
                <div onClick={() => { 
                    handleEdit(keys, 'update')
                }}>
                    {this.handleType()}
                </div>
                {
                    this.props.isEdit ?
                        <div className="question_edit">
                            <span className="edit_arrow" />
                            <CKEditor onChange={this.onChangeEdit} />
                            {this.handleOperation()}
                        </div> : ''
                }

            </div>
        )
    }
}

export default QuestionItem;
