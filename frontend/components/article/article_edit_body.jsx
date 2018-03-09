import React from 'react';
import ReactDOM from 'react-dom';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';
import { merge } from 'lodash';


class ArticleEditBody extends React.Component {
  constructor(props){
    super(props);
    this.state = {selected: 0};
  }

  handleReturn(chunk){
    return (e) => {
      if (e.key !== "Enter"){
        return;
      } else {
        e.preventDefault();
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
          const chunk = this.props.chunks[chunkId];
          if (!chunk) { return <div></div>; }
          const content = chunk.content;
          const type = chunk.content_type;
          return (
            <div onKeyDown={this.handleReturn(chunk).bind(this)}>
              <Chunk key={chunk.id}
                edit={true}
                chunk={chunk}
                receiveChunk={this.props.receiveChunk}
                deleteChunk={this.props.deleteChunk}
                setFocus={(ord) => this.setState({focus: ord})}
                />
          </div>
          );
        }, this)}
      </div>
    );
  }

}

export default ArticleEditBody;
