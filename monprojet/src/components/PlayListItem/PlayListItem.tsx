
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { video } from '../../models/video'
import './PlayListItem.css'

interface PlayListItemProps {
    video: video
    currentVideoId: number

}

const PlayListItem: FC<PlayListItemProps> = ({ currentVideoId, video }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        const runLocalData = async () => {

        }

        runLocalData()



    })
    const navigate = useNavigate()
    const createdAt = moment(video?.created_at)
    const handleClick = (event: any) => {
        event.preventDefault()
        const currentSearchParams = new URLSearchParams(window.location.search)
        navigate("/reader/" + video.slug + '?' + currentSearchParams.toString())



    }
    return (
        <div className={"PlayListItem my-3 card shadow-lg" + (currentVideoId == video._id ? "row border current" : 'row border')} >
            <a onClick={handleClick} href="#" className='row'>
                <div className="col-4">
                    <img width={"100%"} src={video.posterLink as string} alt={video.title} />

                </div>

                <div className="col-8 d-flex align-items-center">
                    <div className="">
                        <div className="video-title">
                            <strong>{video.title}</strong>
                        </div>

                        <div className="created_at">
                            {createdAt.fromNow()}
                        </div>
                    </div>
                </div>

            </a>
        </div>
    )
}

export default PlayListItem