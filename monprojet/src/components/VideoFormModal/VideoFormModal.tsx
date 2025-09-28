import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { text } from 'stream/consumers';
import { preProcessFile } from 'typescript';
import { fileURLToPath } from 'url';
import { addVideo, updateVideo } from '../../api/api-video';
import { convertFileToBlob, convertFileToLink } from '../../helpers/filehelpers';
import { emitNotification } from '../../helpers/notificationHelpers';
import { slugyfy } from '../../helpers/stringHelpers';
import { video } from '../../models/video';
import { ADD } from '../../redux/types/action';
import Loading from '../Loading/Loading';
import './VideoFormModal.css';




interface VideoFormModalProps {
  currentVideo?: video
  hideModal: () => void
  updateData: () => void
}

const VideoFormModal: React.FC<VideoFormModalProps> = ({ currentVideo, hideModal, updateData }) => {
  const [posterPreview, setPosterPreview] = useState<string>(currentVideo?.posterLink as string || "")
  const [videoPreview, setVideoPreview] = useState<string>(currentVideo?.videoLink as string || "")
  const [formSubmitError, setFormSubmitError] = useState<string>("")
  const [isSubmitted, setSubmitted] = useState<boolean>(false)
  const dispatch = useDispatch()




  const [formData, setformData] = useState<video>(currentVideo || {
    title: '',
    description: '',
    poster: null,
    link: null,
    category: '',
    isAvailable: true,




  })

  const [formErrors, setformErrors] = useState<Record<string, string>>(
    {


    }
  )
  useEffect(() => {

    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setformData(currentVideo || {
        title: '',
        description: '',
        poster: null,
        link: null,
        category: '',
        isAvailable: true,




      })


    }

    runLocalData()



  }, [currentVideo])

  const handleInputChange = async (event: any) => {

    const { name, value, type, files, checked } = event.target
    console.log({ name, value, type, files, checked })

    const newvalue: any = formData


    if (type === "checkbox") {

      newvalue[name] = checked
    } else if (type === "file") {

      const file = files[0]

      const link = await convertFileToLink(file)
      if (name === "poster") {

        if (!file.type.startsWith('image/')) {
          return;
        }
        setPosterPreview(link)
      }

      if (name === "link") {

        if (!file.type.startsWith('video/')) {
          return;
        }
        setVideoPreview(link)
      }


      newvalue[name] = file

    } else { newvalue[name] = value }

    const errors = formErrors

    delete errors[name]
    setformErrors({ ...errors })
    setformData(newvalue)

  }
  const validateForm = (): boolean => {

    const errors: Record<string, string> = {}

    if (!formData.title.trim()) {

      errors.title = "Title is required"

    }
    if (!formData.description.trim()) {

      errors.description = "Description is required"

    }
    if (!formData.poster) {

      errors.poster = "Poster is required"

    }


    if (!formData.link) {

      errors.link = "Link is required"

    }

    if (!formData.category.trim()) {

      errors.category = "Please select a category"

    }



    setformErrors(errors)

    return Object.keys.length === 0
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!validateForm()) {


    }

    try {
      setSubmitted(true)
      const video: video = formData



      let result
      if (currentVideo) {
        //update
        if (video.poster instanceof File) {

          video.poster = await convertFileToBlob(video.poster as File)
        }

        if (video.link instanceof File) {

          video.link = await convertFileToBlob(video.link as File)
        }
        delete video?.posterLink
        delete video?.videoLink


        video.updated_at = new Date()
        console.log(video);
        result = await updateVideo(video)

      }
      else {
        //create
        video.poster = await convertFileToBlob(video.poster as File)
        video.link = await convertFileToBlob(video.link as File)

        video.created_at = new Date()
        result = await addVideo(video)
      }


      if (result?.isSuccess) {
        setformData({
          title: '',
          description: '',
          poster: null,
          link: null,
          category: '',
          isAvailable: true,
        })
        updateData()
        hideModal()
        if (currentVideo) {

          emitNotification(dispatch, 'video updated successfully', ADD)
        } else {
          emitNotification(dispatch, 'video added successfully', ADD)

        }


      }




    } catch (error) {
      setFormSubmitError('Error,please try again later')
      emitNotification(dispatch, 'Error,please try again later', ADD, 'danger')
    }
    setSubmitted(false)


  }

  return (
    <div className="VideoFormModal" >
      <Modal show={true} size='lg' scrollable>
        <Modal.Header>
          <Modal.Title>
            VideoFormModal
          </Modal.Title>
          <button className='btn-close' onClick={hideModal}></button>
        </Modal.Header>
        <Modal.Body>
          {isSubmitted ?
            <Loading /> :

            <form action="">
              <div className="form-group">

                <label htmlFor='title'>Title:</label>
                <input defaultValue={formData.title} type='text' name='title' className={`form-control ${formErrors.title ? 'is-invalid' : ''}`} onChange={handleInputChange} />{formErrors.title && <div className='invalid-feedback'>{formErrors.title}</div>}

              </div>

              <div className="form-group">

                <label htmlFor='description'>Description:</label>
                <textarea defaultValue={formData.description} name='description' id='description' className={`form-control ${formErrors.description ? 'is-invalid' : ''}`} onChange={handleInputChange} />{formErrors.description && <div className='invalid-feedback'>{formErrors.description}</div>}

              </div>

              <div className="form-group">

                <label htmlFor='poster'>Image (poster):</label>
                <input type='file' name='poster' id='poster' className={`form-control ${formErrors.poster ? 'is-invalid' : ''}`} onChange={handleInputChange} accept="image/*" />
                {
                  posterPreview && <div className="preview-image card py-1">
                    <img className='img-fluid' width={'100%'} src={posterPreview} />

                  </div>
                }

                {formErrors.poster && <div className='invalid-feedback'>{formErrors.poster}</div>}
              </div>

              <div className="form-group">

                <label htmlFor='video'>Video:</label>
                <input type='file' name='link' id='video' className={`form-control ${formErrors.link ? 'is-invalid' : ''}`} onChange={handleInputChange} accept="video/*" />
                {videoPreview && <div className="video-preview card my-1">

                  <video controls src={videoPreview} width={100}></video>
                </div>

                }

                {formErrors.link && <div className='invalid-feedback'>{formErrors.link}</div>}
              </div>

              <div className="form-group">

                <label htmlFor='category'>Catégory: </label>
                <select onChange={handleInputChange} defaultValue={formData.category} name='category' id='category' className={`form-control ${formErrors.category ? 'is-invalid' : ''}`} >
                  <option value=''>Select video categories</option>
                  <option value='Politique'>Politique</option>
                  <option value='Education'>Education</option>
                  <option value='Culture'>Culture</option>
                  <option value='Formation'>Formation</option>


                </select>
                {formErrors.category && <div className='invalid-feedback'>{formErrors.category}</div>}
              </div>


              <div className="form-check form-switch">
                <input onChange={handleInputChange} className="form-check-input" type="checkbox" role="switch" id="isAvailable" name="isAvailable" defaultChecked={formData.isAvailable} />
                <label htmlFor="isAvailable">Is Available :</label>
              </div>


            </form>


          }




        </Modal.Body>


        <Modal.Footer>
          <Button variant={'primary'} onClick={hideModal}>Cancel</Button>
          {currentVideo ? <Button variant={'warning'} onClick={handleSubmit}>Update Video</Button> :
            <Button variant={'success'} onClick={handleSubmit}>Save Video</Button>}

        </Modal.Footer>
      </Modal>
    </div>


  );
};

export default VideoFormModal;


