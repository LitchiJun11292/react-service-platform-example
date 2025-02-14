import React from 'react';
import {Radio} from 'antd';
import QuestionTitle from './../../component/QuestionTitle';
import './index.scss';

class Radios extends React.Component {

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render () {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="radio_type">
                <QuestionTitle {...this.props}/>
                <Radio.Group
                    disabled={this.props.disabled}
                    className="radio_group"
                    onChange={this.onChange} value={this.props.checkValue}>
                    {
                        this.props.options.map((item, index) => (<Radio
                            key={item.value}
                            style={radioStyle} value={item.value}>
                            {item.label || `选项${item.value}`}{item.isBlank?'w':'j'}
                        </Radio>))
                    }
                </Radio.Group>
            </div>
        )
    }
}

export default Radios;
