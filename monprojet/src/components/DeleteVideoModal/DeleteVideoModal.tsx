
import React, { useEffect } from 'react'
import { FC } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteVideo } from '../../api/api-video'
import { video } from '../../models/video'
import "./DeleteVideoModal.css"

interface DeleteVideoModalProps {
    hideModal: () => void
    updateData: () => void
    currentVideo: video


}

const DeleteVideoModal: FC<DeleteVideoModalProps> = ({ updateData, currentVideo, hideModal }) => {



    useEffect(() => {

        window.scrollTo(0, 0)
        const runLocalData = async () => {

        }


        runLocalData()



    }, [])
    const handleDelete = async () => {
        await deleteVideo(currentVideo._id!)
        updateData()
        hideModal()

    }

    return (
        <div>


            <Modal show={true} scrollable centered >
                <Modal.Header>
                    <Modal.Title>
                        Delete confirm
                    </Modal.Title>
                    <button className='btn-close' onClick={hideModal}></button>
                </Modal.Header>


                <Modal.Body>
                    <p>Are you sure you want to delete this video :<strong>{currentVideo.title}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'primary'} onClick={hideModal}>Cancel</Button>
                    <Button variant={'success'} onClick={handleDelete}>Confirm </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )
}

export default DeleteVideoModal