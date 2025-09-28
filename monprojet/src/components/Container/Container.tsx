import React, { useEffect, useState } from 'react';
import './Container.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoFormModal from '../VideoFormModal/VideoFormModal';
import { video } from '../../models/video';
import { getAllVideo } from '../../api/api-video';
import { convertFileToBlobToUrl } from '../../helpers/filehelpers';
import ViewVideoModal from '../ViewVideoModal/ViewVideoModal';
import DeleteVideoModal from '../DeleteVideoModal/DeleteVideoModal';
import UploadModal from '../UploadModal/UploadModal'
import { useLocation } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';




export default function Container() {



  const [displayModal, setdisplayModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<video | undefined>();
  const [uploadModal, setUploadModal] = useState<boolean>(false)

  const [videos, setVideos] = useState<video[]>([]);
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const location = useLocation()

  const runLocalData = async () => {

    const data: any = await getAllVideo()
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






  }, [])

  const handleView = (video: video) => {
    setCurrentVideo(video)
    setViewModal(true)




  }

  const handleEdit = (video: video) => {

    setCurrentVideo(video)
    setdisplayModal(true)



  }
  const handleAdd = () => {

    setCurrentVideo(undefined)
    setdisplayModal(true)
  }

  const handleDelete = (video: video) => {

    setCurrentVideo(video)
    setDeleteModal(true)
  }

  const handleUpload = () => {
    setCurrentVideo(undefined)

    setUploadModal(true)

  }







  return (

    <div className="Container py-2">
      <SearchBox handleChange={setVideos} />
      <div className='d-flex gap-2 justify-content-between'>
        <button className='btn btn-primary  me-md-2' onClick={handleAdd}>
          Add Video
        </button>
        <button className='btn btn-danger  me-md-2' onClick={handleUpload}>
          Add Many
        </button>

      </div>

      {displayModal && <VideoFormModal hideModal={() => setdisplayModal(false)}

        updateData={runLocalData}
        currentVideo={currentVideo}
      />}
      {uploadModal && <UploadModal hideModal={() => setUploadModal(false)}

        updateData={runLocalData}

      />}
      {viewModal && currentVideo && <ViewVideoModal hideModal={() => setViewModal(false)}

        videoId={currentVideo._id!}
      />}
      {deleteModal && currentVideo && <DeleteVideoModal hideModal={() => setDeleteModal(false)}

        currentVideo={currentVideo}

        updateData={runLocalData}


      />}

      {videos.length !== 0 && <div className="video-list py-1">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Poster</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              videos.map((video) => {
                return <tr key={video._id}>
                  <th scope="row">{video._id}</th>
                  <td>{video.title}</td>
                  <td>
                    <img width={80} src={video.posterLink as string} alt={video.title} />

                  </td>
                  <td>{video.category}</td>
                  <td>
                    <button className="btn btn-success m-1" onClick={() => handleView(video)}>View</button>
                    <button className="btn btn-primary m-1" onClick={() => handleEdit(video)}>Edit</button>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(video)} >Delete</button>


                  </td>
                </tr>
              })
            }



          </tbody>
        </table>

      </div>}



    </div>

  )
}
