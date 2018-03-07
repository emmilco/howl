import React from 'react';

const Chunk = (props) => {
  const content = props.chunk.content;
  const type = props.chunk.content_type;

  return (
    <div className={`chunk_${props.chunk.content_type}`}>
      {Boolean(type === 'p') && <p className='chunk'>{content}</p>}
      {Boolean(type === 'h1') && <h1 className='chunk'>{content}</h1>}
      {Boolean(type === 'h2') && <h2 className='chunk'>{content}</h2>}
      {Boolean(type === 'h3') && <h3 className='chunk'>{content}</h3>}
      {Boolean(type === 'img') && <img className='chunk' src={content}/>}
      {Boolean(type === 'divider') && <p className='chunk'>...</p>}
    </div>
  );
};

export default Chunk;
