import React from 'react'
import { Container } from 'react-bootstrap'
import OfflineExhibition from '../../Component/OfflineExhibition'

const Post = ({ posts, loading }) => {
  if (loading) {
    return <h2>...loading</h2>
  }

  return (
    <Container>
      {posts.map(exhibition => (
        <OfflineExhibition
          id={exhibition.id}
          title={exhibition.title}
          poaster={exhibition.poster}
          description={exhibition.descript}
        ></OfflineExhibition>
      ))}
    </Container>
  )
}

export default Post
