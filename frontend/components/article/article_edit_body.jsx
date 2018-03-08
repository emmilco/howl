import React from 'react';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';


class ArticleEditBody extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chunks: props.chunks
    };
  }

  handleChange(e){

  }

  render(){
    return (
      <div className="article_body">
        {this.state.chunks.map((chunk) => {
          const content = chunk.content;
          const type = chunk.content_type;
          return (
            <div key={chunk.id} className={`chunk_${chunk.content_type}`}>
              <p contentEditable="true"
                onInput={this.handleChange}
                className='chunk'>{chunk.content}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

}

export default ArticleEditBody;
