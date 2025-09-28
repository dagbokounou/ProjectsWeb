
import React, { FC, useEffect, useState } from 'react'
import './PlayList.css'
import { useLocation } from 'react-router-dom';
import { findVideo, getAllVideo } from '../../api/api-video';
import { convertFileToBlobToUrl } from '../../helpers/filehelpers';
import { ResultData } from '../../models/ResultData';
import { video } from '../../models/video';
import Pagination from '../Pagination/Pagination';
import PlayListItem from '../PlayListItem/PlayListItem';
interface PlayListProps {
    videoId: number

}

const PlayList: FC<PlayListProps> = ({ videoId }) => {
    const currentSearchParams = new URLSearchParams(window.location.search)
    const searchQuery = currentSearchParams.get('searchVideo') || ''
    const pageQuery = parseInt(currentSearchParams.get('page') || '1')
    const [currentPage, setCurrentPage] = useState<number>(pageQuery)
    const [pageSize, setPageSize] = useState<number>(20)
    const [videos, setVideos] = useState<video[]>([]);

    const [datas, setDatas] = useState<ResultData | null>(null)
    const location = useLocation()

    const runLocalData = async () => {

        const data: any = await findVideo(searchQuery, 'title', currentPage, pageSize)
        setDatas(data)
        if (data.isSuccess) {


            data.results.map((video: video) => {

                video.posterLink = convertFileToBlobToUrl(video.poster as Blob)
                video.videoLink = convertFileToBlobToUrl(video.link as Blob)

                return video
            })
            setVideos(data.results)
        }




    }

    useEffect(() => {
        window.scrollTo(0, 0)

        runLocalData()



    }, [location.search])

    return (
        <div className='PlayList p-1'>
            <div className="PlayListHeader shadow-lg p-2">
                <h2>PlayList</h2>
                <p>{datas?.allCount} videos</p>
                <Pagination
                    currentPage={datas?.currentPage}
                    totalPages={datas?.totalPages}
                    previousPage={datas?.previousPage}
                    nextPage={datas?.nextPage}
                    pageLinks={datas?.pageLinks}
                    onPageChange={setCurrentPage}
                />


            </div>
            <div className="PlayListContent">


                {

                    videos.map((video: video) => <PlayListItem key={video._id} currentVideoId={videoId} video={video} />)



                }
            </div>

        </div>
    )
}

export default PlayList