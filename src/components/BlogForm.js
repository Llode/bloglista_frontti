import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <b>Title</b>
          <input
            type="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          <b>Author</b>
          <input
            type="author"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          <b>URL</b>
          <input
            type="url"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">tallenna blogi</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm