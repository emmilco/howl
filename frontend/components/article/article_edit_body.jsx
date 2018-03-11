import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';
import { merge } from 'lodash';

import {
  receiveChunk,
  deleteChunk,
  createChunk
} from '../../actions/chunk_actions';

class ArticleEditBody extends React.Component {
  constructor(props){
    super(props);
  }

  handleCarriageReturn(chunk){
    return (e) => {
      if (e.key === "Enter"){
        e.preventDefault();
        const packagedArticle = merge({}, this.props.article);
        packagedArticle.chunks_attributes = [];
        this.props.article.chunks.forEach((chunkId) => {
          packagedArticle.chunks_attributes.push(this.props.chunks[chunkId]);
        });
        delete packagedArticle.chunks;
        const ord = {insertAt: chunk.ord + 1};
        this.props.createChunk(packagedArticle, ord)
          .then(() => document.getElementById(chunk.ord + 1).focus()
        );
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
            <div class="chunk_container"
              onKeyDown={this.handleCarriageReturn(chunk).bind(this)}>
              <Chunk key={chunk.id}
                edit={true}
                chunk={chunk}
                receiveChunk={this.props.receiveChunk}
                deleteChunk={this.props.deleteChunk}
                chunkCount={this.props.article.chunks.length}
                />
          </div>
          );
        }, this)}
      </div>
    );
  }
}

const mdp = (dispatch) => {
  return {
    receiveChunk: (chunk) => dispatch(receiveChunk(chunk)),
    deleteChunk: (chunk) => dispatch(deleteChunk(chunk)),
    createChunk: (chunk, ord) => dispatch(createChunk(chunk, ord))
  };
};


export default connect(null, mdp)(ArticleEditBody);
