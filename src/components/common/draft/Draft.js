import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import * as draft from '../../../services/draft';
// import CodeNode  from '../nodes/CodeNode';
// Editor default Value
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})
const initialState = {
  content: '',
  showMentions: false,
  autoComplete: [],
  value: initialValue
};

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function MarkHotkey(options) {
  const { type, key } = options
 
  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if (!event.ctrlKey || event.key != key) return
 
      // Prevent the default characters from being inserted.
      event.preventDefault()
 
      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    },
  }
}

function BoldMark(props) {
  return <strong>{props.children}</strong>
}


// Initialize a plugin for each mark...
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: '~', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]

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

  onChange = ({ value }) => {
    this.setState({ value })
  }
  
  render() {
    let { value } = this.state;

    return (
      <div className="draft-wrapper">
        <div className="draft-container">
          <div className="draft-editable-container">
              <Editor   plugins={plugins} value={value} onChange={this.onChange}  renderMark={this.renderMark} />
            {/* <textarea className="draft-editable" onChange={this.handleContentChange} value={content}/> */}
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
 
  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      // Add our new mark renderers...
      case 'code':
        return <code>{props.children}</code>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
    }
  }
  
}

Draft.propTypes = {
  renderTemplate: PropTypes.node
};

export default Draft;
