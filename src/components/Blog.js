import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog }) => (
  <div style={blogStyle} classname="Blog">
    {blog.title} {blog.author} {blog.likes}
  </div>
)
// const added = ({ blog }) => (
//   '{blog.likes}'
// )

// const satan = 'saatana itse'

// const Blog = ({ blog }) => (
//   <div style={blogStyle} onClick={() => console.log('troll')}>
//     {blog.title} {blog.author}
//     <div>
//       Likes: {blog.likes}
//     </div>
//     <button onClick={() => console.log('deleleee')} >DELETE</button>
//   </div>
// )


export default Blog