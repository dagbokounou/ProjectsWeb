
import React, { FC, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addVideo } from '../../api/api-video'
import { convertFileToBlob, convertFileToBlobToUrl, linkToBlob } from '../../helpers/filehelpers'
import { emitNotification } from '../../helpers/notificationHelpers'
import { video } from '../../models/video'
import { ADD } from '../../redux/types/action'
import FileDrop from '../FileDrop/FileDrop'
import Loading from '../Loading/Loading'
import './UploadModal.css'

interface UploadModalProps {
    hideModal: () => void
    updateData: () => void

}

const UploadModal: FC<UploadModalProps> = ({ hideModal, updateData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const runLocalData = () => {

        }

        window.scrollTo(0, 0)
        runLocalData()
    })



    const handleFileDrop = async (files: File[]) => {
        setIsLoading(true)
        try {
            await Promise.all(files.map(async (file) => {

                const fileNameParse = file.name.split('.')
                const extension = fileNameParse.pop()
                const title = fileNameParse.join(" ")
                const videoBlob = await convertFileToBlob(file)

                const imageLink = window.origin + '/assets/images/formation-react.png'
                const posterBlob = await linkToBlob(imageLink)
                const video: video = {
                    title: title,
                    description: title,
                    link: videoBlob,
                    poster: posterBlob,
                    category: 'Divers',
                    isAvailable: false,
                    created_at: new Date()










                }
                await addVideo(video)
                console.log(video);


            }
            ))
            updateData()
            hideModal()
            emitNotification(dispatch, 'All video added successfully!', ADD, 'success')

        } catch (error) {

            console.error("une erreur s\'est produite lors du traitement des fichiers :", error)
        }



        setIsLoading(false)


    }
    return (
        <div className='UploadModal'>

            <Modal show={true} scrollable size='lg' centered >
                <Modal.Header>
                    <Modal.Title>
                        <h2>Upload Video </h2>
                    </Modal.Title>
                    <button className='btn-close' onClick={hideModal}></button>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ?

                        <Loading /> : <FileDrop onFileDrop={handleFileDrop} />}





                </Modal.Body>



            </Modal>


        </div>
    )
}

export default UploadModal