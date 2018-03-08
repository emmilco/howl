import React from 'react';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';
import { merge } from 'lodash';


class ArticleEditBody extends React.Component {
  constructor(props){
    super(props);
  }

  handleChange(chunkId){
    return (e) => {
      if (e.nativeEvent.inputType === "insertText"){
        this.props.receiveChunk({ [chunkId]: {content: e.target.innerText}});
      }
    };
  }

  handleDelete(chunk){
    return (e) => {
      if (e.key !== "Backspace"){
        return;
      }
      if (e.target.innerText !== ""){
        this.props.receiveChunk({ [chunk.id]: {content: e.target.innerText}});
      } else {
        this.props.removeChunk(chunk);
      }
    };
  }

  render(){
    return (
      <div className="article_body">

        {this.props.article.chunks.map((chunkId) => {
          const chunk = this.props.chunks[chunkId];
          const content = chunk.content;
          const type = chunk.content_type;
          return (
            <div key={chunk.id} className={`chunk_${chunk.content_type}`}>
              <p contentEditable="true"
                onInput={this.handleChange(chunk.id).bind(this)}
                onKeyDown={this.handleDelete(chunk).bind(this)}
                className='chunk'>{chunk.content}
              </p>
            </div>
          );
        }, this)}
      </div>
    );
  }

}

export default ArticleEditBody;
