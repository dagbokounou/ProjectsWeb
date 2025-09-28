import React, { FC, useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { ADD } from '../../redux/types/action';
import { Notification } from '../../models/Notification';
import { ChangeEvent } from 'react';
interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const [searchInput, setSearchInput] = useState<string>(searchQuery)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setSearchInput(searchQuery)
    }


    runLocalData()
  }, [])



  const handleSearchSubmit = (event: any) => {
    event.preventDefault()
    const currentSearchParams = new URLSearchParams(window.location.search)
    currentSearchParams.set('searchVideo', searchInput)
    navigate({ search: currentSearchParams.toString() })

  }




  return <div className='header'>

    <nav className="navbar navbar-expand-lg bg-light shadow-lg">
      <div className="container-fluid">
        <Link to='/' className="d-flex gap-2 align-items-center">
          <div className="logo">
            <img src="/logo.png" width={30} alt="" />
          </div >
          <span className="navbar-brand text-danger">Ouitube</span>



        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/account' className="nav-link active"  >Account</Link>
            </li>
            <li className="nav-item">
              <Link to='/' className="nav-link active"  >Home</Link>
            </li>


          </ul>
        </div>

        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control me-2" type="search" defaultValue={searchInput} placeholder="Search" aria-label="Search" />
          <button

            className="btn btn-outline-success"
            type="submit">Search</button>
        </form>
        <button


          className='btn btn-outline-success' type='submit'>Add Notif </button>
      </div>


    </nav>


  </div>;
}

export default Header
