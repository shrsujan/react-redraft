
// import React, { Component}  from 'react';
export const CodeNode = (props) =>  {
    return (
        <pre {...props.attributes}>
          <code>{props.children}</code>
        </pre>
      )
};

export default CodeNode;
