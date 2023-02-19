import React from 'react'
import { Container } from 'react-bootstrap'
import SavedExhibition from '../../Component/SavedExhibition'

const Post = ({ posts, loading }) => {
  if (loading) {
    return <h2>...loading</h2>
  }

  return (
    <Container>
      {posts.map(exhibition => (
        <SavedExhibition
          id={exhibition.id}
          title={exhibition.title}
          date={exhibition.startDate}
          keyword={[exhibition.tag1, exhibition.tag2, exhibition.tag3]}
          likes={exhibition.like_count}
          author={exhibition.author}
          poaster={exhibition.poster}
          description={exhibition.description}
          step={exhibition.step}
        ></SavedExhibition>
      ))}
    </Container>
  )
}

export default Post
