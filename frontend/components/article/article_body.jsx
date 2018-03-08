import React from 'react';

import Chunk from '../chunk';
import ContentTypeSelector from './content_type_selector';


const ArticleBody = (props) => {
  return (
    <div className="article_body">
      {props.chunks.map((chunk) => {
        return <Chunk key={chunk.ord} chunk={chunk} />;
      })}
    </div>
  );
};

export default ArticleBody;
