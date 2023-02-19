import React, { useState } from 'react'
import { Button, Figure, Modal } from 'react-bootstrap'


const ExhibitionPost = ({ show }) => {
    const [showModal, setModal] = useState(show)
    const openModal = () => { setModal(true) }
    const closeModal = () => { setModal(false) }
    console.log(show)


    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header><Modal.Title>Hello</Modal.Title></Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}

export default ExhibitionPost