import React, { Fragment, useEffect, useState } from 'react';

import './ErrorPage.css';

interface ErrorPageProps {

}

const ErrorPage: React.FC<ErrorPageProps> = ({ }) => {




  const [loading, setLoading] = useState(true)
  // const [value, setValue] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setLoading(false)
    }


    runLocalData()
  }, [])

  return (
    <Fragment>{

      <div className="ErrorPage" >
        <h2>404</h2>
        <p>Page not founnd</p>
      </div>

    }
    </Fragment>
  );
};

export default ErrorPage;






