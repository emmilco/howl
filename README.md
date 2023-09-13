

# README

Howl is a social media application designed to be a beautiful, user-friendly home for long-form articles.

Built in React as a single-page application, with Redux state management, a Rails/Postgres backend, and a JSON view-layer constructed with Jbuilder.

[Live demo here.](http://howlapp.herokuapp.com)

## Features

The main features of Howl include:

- A `contenteditable`-based, pure WYSIWYG editor with support for basic content types and embedded media.

- A user-curated homepage with content selected based on user follows.

- Profile pages displaying a feed of recent published content, including the ability to view and manage follows.

- A content management utility that gives users control over all their
published and unpublished articles.

- Likes and comments.

## Design Philosophy

Howl was conceived as an exercise in demonstrating mastery of the React/Redux framework. To this end I kept the use of additional libraries and frameworks to an absolute minimum and built as much as possible from scratch.

Building Howl, I wanted every aspect of user experience to follow the same, tightly-controlled stylistic norms. To accomplish this, components were kept small and modular, and style patterns were recycled across the site's various views.

## The Article Editor

In order to enforce stylistic consistency and provide an absolutely pure WYSIWYG
experience, Howl's editor uses HTML's `contenteditable` attribute and treats each paragraph or content chunk as an individual entity. This means that each chunk can render as a function of its content-type.

The React framework does not like the `contenteditable` attribute, in part because by default it removes page elements from the control of the React/Redux state control system, thereby breaking the dependability of that system. Overcoming React's innate hostility to `contenteditable` was one of the major challenges of this project, and required extensive use of React lifecycle methods.

The other biggest challenge in building the Article Editor was providing expected text-editing behavior for users surrounding paragraph insertion and deletion. Insertion/deletion is handled by a complex event-listening function that treats `keyup` events differently based on context, for example to move the cursor to the end of the previous chunk upon paragraph deletion, and to trigger chunk reindexing dynamically upon paragraph insertion.

``` js
// frontend/components/chunk.jsx

handleKeystroke(e){
  if (e.key !== "Backspace"){
    this.props.receiveChunk({
      [this.state.id]: {content: e.target.innerText}
    });
    return;
  }

  const chunk = this.state;
  if (this.props.chunkCount === 1 && e.target.innerText === "") {
    this.props.receiveChunk({ [chunk.id]: {content_type: "p", content: ""}});
  } else if (e.target.innerText !== ""){
    this.props.receiveChunk({ [chunk.id]: {content: e.target.innerText}});
  } else if (chunk.ord > 0 || "mov" === chunk.content_type) {
    this.props.deleteChunk(chunk).then(() => {
      const previous = document.getElementById(chunk.ord - 1);
      previous.focus();
      this.placeCaretAtEnd(previous);
      }
    );
  } else {
    this.props.deleteChunk(chunk).then(
      () => document.getElementById(chunk.ord).focus()
    );
  }
}
```

### Content Management on the Backend

Because Articles on the backend are collections of independent Chunk records associated with a single Article record, article updating required the use of Rails's support for nested form submission.  Articles `accept_nested_attributes_for` Chunks, and the Article model handles Chunk reindexing during each insertion/deletion save cycle.

``` rb
# app/controllers/chunks_controller.rb

def create
  @article = Article.includes(:chunks).find(article_params[:id])
  if @article.author == current_user
    @article.update(article_params)
    @article.create_chunk_at(ord_params[:insertAt].to_i)
    render '/api/articles/show'
  else
    render json: ["Content does not belong to current user."], status: 403
  end
end

```

### Maintaining Paragraph Order Efficiently on the Backend

Paragraph creation and deletion proved to be the most difficult part of backend design as well. While I considered implementing each article's paragraph sequence as a linked list to enable constant time insertion and deletion, for various reasons maintaining paragraph order by means of an index column in the database was cleaner and more convenient.  However, updating the order to maintain consistency and avoid collisions *without* doing N+1 SQL queries proved difficult.  In the end I wrote two custom PostgreSQL queries to re-serialize all of the paragraph chunks for a given article in a single database call, drastically increasing the speed and responsiveness of the article editor.

``` ruby
def correct_chunk_sequence
  resequence = <<-SQL
    update chunks c
    set ord = c2.seqnum - 1
    from (
      select c2.*, row_number() over (order by c2.ord) as seqnum
      from chunks c2
      where c2.chunkable_id = #{self.id}
    ) c2
    where c2.id = c.id
  SQL
  ActiveRecord::Base.connection.execute(resequence)
end

```

## The Homepage

Howl's combines the style of a newspaper front-page with the functionality traditional social media feed.  Homepage articles are pulled from the current user's pool of followed authors, based on publication date.  In order to reduce load times, homepage assembly takes advantage of ActiveRecord data caching and reduces the information reported back through the AJAX view layer to a bare minimum.
