import React from 'react';
import './index.scss';

class QuestionTitle extends React.Component {
    render () {
        const {keys, title} = this.props;
        return (
            <div className="title_question_all">
                <span className="topic_question title"><span className="req">*</span>{keys + 1}.</span>
                <span className="topic_question content" dangerouslySetInnerHTML={{__html: title || `标题${keys + 1}`}}/>
            </div>
        )
    }
}

export default QuestionTitle;
