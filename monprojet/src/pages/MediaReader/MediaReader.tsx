import { OuitubePlayer } from 'ouitube-player';
import React, { Fragment, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAllVideo, searchVideoBySlug } from '../../api/api-video';
import Loading from '../../components/Loading/Loading';
import VideoCard from '../../components/VideoCard/VideoCard';
import { convertFileToBlobToUrl } from '../../helpers/filehelpers';
import { video } from '../../models/video';
import './MediaReader.css';
import PlayList from '../../components/PlayList/PlayList';

interface MediaReaderProps {

}

const MediaReader: React.FC<MediaReaderProps> = () => {




  const [loading, setLoading] = useState(true)
  const [errorPage, setErrorPage] = useState(false)
  const [video, setVideo] = useState<video | undefined>()
  //const [value, setValue] = useState('')
  let { slug } = useParams()
  const navigate = useNavigate()






  useEffect(() => {
    window.scrollTo(0, 0)

    const runLocalData = async () => {
      if (slug) {
        try {
          const data: any = await searchVideoBySlug(slug)
          console.log({ data });
          if (data.isSuccess) {
            const currentVideo = data.result
            currentVideo.posterLink = convertFileToBlobToUrl(currentVideo.poster as Blob)
            currentVideo.videoLink = convertFileToBlobToUrl(currentVideo.link as Blob)
            setVideo(currentVideo)
          }
          else {
            setErrorPage(true)
          }
        } catch (error) {
          setErrorPage(true)
        }




      }

      setLoading(false);
    }

    runLocalData()
  }, [slug])

  if (errorPage) {

    navigate('/error')
  }

  return (
    <div className='container-fluid'>
      {


        loading ?
          <Loading />
          :
          video ?


            <div className='MediaReader p-2'>
              <div className="row">
                <div className="col-md-9 card">
                  <OuitubePlayer src={video.videoLink as string} />
                  <div className='bg-primary'>

                    <h2>
                      {video.title}
                    </h2>

                  </div>
                  <div className="video-description p-2">
                    {video.description}


                  </div>



                </div>

                <div className='col-md-3'>
                  <PlayList videoId={video._id!} />



                </div>
              </div>
            </div>
            : null




      }
    </div>
  );

}
export default MediaReader;
