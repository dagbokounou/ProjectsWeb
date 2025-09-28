import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllVideo } from '../../api/api-video';
import Loading from '../../components/Loading/Loading';
import SearchBox from '../../components/SearchBox/SearchBox';
import VideoCard from '../../components/VideoCard/VideoCard';
import { convertFileToBlobToUrl } from '../../helpers/filehelpers';
import { video } from '../../models/video';
import './Home.css';

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {




  const [loading, setLoading] = useState(true)
  // const [value, setValue] = useState('')
  const [videos, setVideos] = useState<video[]>([]);









  useEffect(() => {
    window.scrollTo(0, 0)

    setLoading(false)


  }, [])

  return (
    <Fragment>{


      loading ?
        <Loading />
        :
        <div className="Home container py-2" >

          <SearchBox handleChange={setVideos} />

          <div className="row">{

            videos.map((video: video) => (
              <VideoCard video={video} />

            ))

          }

          </div>

        </div>


    }
    </Fragment>
  );

}
export default Home;
