import React, { Fragment, useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import Loading from '../../components/Loading/Loading';
import './Account.css';

interface AccountProps {

}

const Account: React.FC<AccountProps> = ({ }) => {




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


      loading ?
        <Loading />
        :
        <Container />

    }
    </Fragment>
  );
};

export default Account;



