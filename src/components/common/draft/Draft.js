import PropTypes from 'prop-types';

import React, { Component } from 'react';

import * as draft from '../../../services/draft';

const initialState = {
  content: '',
  showMentions: false,
  autoComplete: []
};

class Draft extends Component {
  state = { ...initialState };

  handleContentChange = async event => {
    try {
      event.preventDefault();

      let { mentions } = this.props;
      let { content } = event.currentTarget.value;

      this.setState({
        content
      });

      let autoComplete = await draft.autoComplete(content, mentions);

      if (mentions && mentions.length && autoComplete && autoComplete.length) {
        this.setState({
          autoComplete,
          showMentions: true
        });
      }
    } catch (e) {

    }
  }

  render() {
    let { content } = this.state;

    return (
      <div className="draft-wrapper">
        <div className="draft-container">
          <div className="draft-editable-container">
            <textarea className="draft-editable" onChange={this.handleContentChange} value={content}/>
          </div>
          <div className="draft-footer-container">
            <div className="draft-footer">
              <div className="draft-footer-image-icon">
                <span className="fa fa-image icons"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Draft.propTypes = {
  renderTemplate: PropTypes.node
};

export default Draft;
