import React from 'react'
import { Container } from 'react-bootstrap'
import Exhibition from '../../Component/Exhibition'

const Post = ({ onlineExhibition }) => {
    return (
        <Container>
            {onlineExhibition.map(exhibition => (
                <Exhibition
                    id={exhibition.id}
                    title={exhibition.title}
                    date={exhibition.startDate}
                    keyword={[exhibition.tag1, exhibition.tag2, exhibition.tag3]}
                ></Exhibition>
            ))}
        </Container>
    )
}

export default Post