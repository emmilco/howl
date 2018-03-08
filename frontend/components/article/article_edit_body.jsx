import React from 'react';
import ReactDOM from 'react-dom';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';
import { merge } from 'lodash';


class ArticleEditBody extends React.Component {
  constructor(props){
    super(props);
  }

  handleReturn(chunk){
    return (e) => {
      if (e.key !== "Enter"){
        return;
      } else {
        this.props.createChunk({
          chunkable_id: chunk.chunkable_id,
          ord: chunk.ord + 1,
          content_type: 'p',
          content: ''
        });
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
            <div onKeyDown={this.handleReturn(chunk).bind(this)}>
              <Chunk key={chunk.id}
                edit={true}
                chunk={chunk}
                receiveChunk={this.props.receiveChunk}
                removeChunk={this.props.removeChunk}
                />
          </div>
          );
        }, this)}
      </div>
    );
  }

}

export default ArticleEditBody;
