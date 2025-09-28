
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './VideoCard.css'

import { video } from '../../models/video'
import moment from 'moment'
interface VideoCardProps {
    video: video

}
const VideoCard: FC<VideoCardProps> = ({ video }) => {
    const createdAt = moment(video?.created_at)
    return (



        <div key={video._id} className="VideoCard col-lg-4 col-md-6 p-1">
            <Link to={`/reader/${video.slug}`}>
                <div className='card'>
                    <img
                        src={video.posterLink}
                        alt={video.title} className="card-img-top"
                        height={200} />
                    <div className='card-body'>
                        <h5 className='card-title'>{video.title}</h5>
                        <p className='card-text'>Created At:<strong>{createdAt.fromNow()}</strong> </p>

                    </div>
                </div>


            </Link>







        </div>

    )
}

export default VideoCard