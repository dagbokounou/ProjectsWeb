
import React, { FC, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { findVideo, getAllVideo, getVideoByPage } from '../../api/api-video'
import { convertFileToBlobToUrl } from '../../helpers/filehelpers'
import { ResultData } from '../../models/ResultData'
import { video } from '../../models/video'
import Pagination from '../Pagination/Pagination'

interface SearchBoxProps {
    handleChange: (videos: video[]) => void

}
interface resultData {
    isSuccess: boolean;
    results?: Record<string, any>[];
    totalPages?: number;
    currentPage?: number;
    nextPage?: number | null;
    previousPage?: number | null
    allCount?: number | null
    pageLinks?: string[]
}

const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {

    const currentSearchParams = new URLSearchParams(window.location.search)
    const searchQuery = currentSearchParams.get('searchVideo') || ''
    const pageQuery = parseInt(currentSearchParams.get('page') || '1')

    const [datas, setDatas] = useState<ResultData | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(pageQuery)
    const [pageSize, setPageSize] = useState<number>(8)
    const location = useLocation()
    console.log({ searchQuery });
    const runLocalData = async () => {

        const data: any = await findVideo(searchQuery, 'title', currentPage, pageSize)
        setDatas(data)
        console.log(data)

        if (data.isSuccess) {
            data.results.map((video: video) => {

                video.posterLink = convertFileToBlobToUrl(video.poster as Blob)
                video.videoLink = convertFileToBlobToUrl(video.link as Blob)

                return video
            })

            handleChange(data.results)



        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)



        runLocalData()
    }, [location.search, currentPage, pageSize])
    return (
        <div className='SearchBox'>
            {searchQuery !== "" && <div className="HomeHeader">
                <h2>Search Results</h2>
                <p>

                    Displaying {datas?.allCount} videos matching the search query "<strong>{searchQuery}</strong>".
                </p>

            </div>}
            <div className="d-flex justify-content-between">
                <Pagination
                    currentPage={datas?.currentPage}
                    totalPages={datas?.totalPages}
                    previousPage={datas?.previousPage}
                    nextPage={datas?.nextPage}
                    pageLinks={datas?.pageLinks}
                    onPageChange={setCurrentPage}
                />
                <div>
                    <select name="pageSize" id="PageSize" className='form-control'
                        onChange={(e) => setPageSize(parseInt(e.target.value))}>


                        <option value="5">5</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>



        </div>
    )
}

export default SearchBox