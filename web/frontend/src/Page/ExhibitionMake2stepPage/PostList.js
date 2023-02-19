import React, { useState } from 'react'
import ExhibitionPosting from '../../Component/ExhibitionPosting'

const PostList = () => {
    const [postList, setPostList] = useState([{ post: "", description: "" }])

    const newPost = () => {

    }

    const temp = (e) => {
        console.log(e.post)
        console.log(e.description)
        return (<ExhibitionPosting exhibitionPost={e.post} description={e.description}>
        </ExhibitionPosting>)
    }
    return (
        <>
            {postList.map(e => (
                temp(e)
            ))}
        </>
    )
}

export default PostList