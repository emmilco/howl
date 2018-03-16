

# README

Howl is a social media application designed to be beautiful, user-friendly home
for long-form articles. Built in React as a single-page application with
Redux state management and a Rails/Postgres backend.

[Live demo here.](http://howlapp.herokuapp.com)

## Features

The main features of Howl include:

- An article editor
that uses HTML `contenteditable` blocks to give users a pure WYSIWYG experience with support for basic content types and embedded media.

- A user-curated homepage with content selected based on user follows.

- Profile pages displaying a feed of recent published content, including the ability to view and manage follows.

- A content management utility that gives users control over all their
published and unpublished articles.

- Likes and comments.

## Design Philosophy

Howl was conceived as an exercise in demonstrating mastery of the React/Redux framework. To this end I kept the use of additional libraries and frameworks to an absolute minimum and built as much as possible from scratch.

Building Howl, I wanted every aspect of user experience to follow the same, tightly-controlled stylistic norms. To accomplish this, components were kept small and modular, and style patterns were recycled across the site's various views.

## Howl's Article Editor

In order to enforce stylistic consistency and provide an absolutely pure WYSIWYG
experience, Howl's editor uses HTML's `contenteditable` attribute and treats each paragraph or content chunk as an individual entity. This means that each chunk can render as a function of its content-type.

The React framework does not like the `contenteditable` attribute, in part because by default it removes page elements from the control of the React/Redux state control system, thereby breaking the dependability of that system. Overcoming React's innate hostility to `contenteditable` was one of the major challenges of this project, and required extensive use of React lifecycle methods.

The other biggest challenge in building the Article Editor was providing expected text-editing behavior for users surrounding paragraph insertion and deletion. Insertion/deletion is handled by a complex event-listening function that treats `keyup` events differently based on context, for example to move the cursor to the end of the previous chunk upon paragraph deletion, and to trigger chunk reindexing dynamically upon paragraph insertion.

### Content Management on the Backend

Because Articles on the backend are collections of independent Chunk records associated with a single Article record, article updating required the use of Rails's support for nested form submission.  Articles `accept_nested_attributes_for` Chunks, and the Article model handles Chunk reindexing during each save cycle.
