
import React, { FC, useEffect, useState } from 'react'

import './FileDrop.css'

interface FileDropProps {
    onFileDrop: (files: Array<File>) => void


}

const FileDrop: FC<FileDropProps> = ({ onFileDrop }) => {


    const [dragging, setDragging] = useState<boolean>(false)


    const handleDragEnter = (event: any) => {
        event.preventDefault()


        setDragging(true)







    }

    const handleDragLeave = (event: any) => {
        event.preventDefault()
        setDragging(false)


    }
    const handleDragOver = (event: any) => {
        event.preventDefault()
        setDragging(true)
    }



    const handleDrop = (event: any) => {

        event.preventDefault()
        setDragging(false)
        const files: File[] = Array.from(event.dataTransfer.files)

        onFileDrop(files)






    }


    return (
        <div className='FileDrop'>

            <div className={"upload-zone " + (dragging ? 'dragging' : '')}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}


            >
                <p>Glissez déposez vos fichiers vidéos !</p>

            </div>


        </div>
    )
}

export default FileDrop
