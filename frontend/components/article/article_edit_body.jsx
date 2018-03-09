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
        const packagedArticle = merge({}, this.props.article);
        packagedArticle.chunks_attributes = [];
        this.props.article.chunks.forEach((chunkId) => {
          packagedArticle.chunks_attributes.push(this.props.chunks[chunkId]);
        });
        delete packagedArticle.chunks;
        const ord = {insertAt: chunk.ord + 1};
        this.props.createChunk(packagedArticle, ord);
      }
    };
  }

  render(){
    return (
      <div className="article_body">
        {this.props.article.chunks.map((chunkId) => {
          console.log(chunk);
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
