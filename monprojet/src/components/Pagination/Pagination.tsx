import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
interface PaginationProps {
    currentPage?: number
    totalPages?: number
    nextPage?: number | null
    previousPage?: number | null
    pageLinks?: string[]
    onPageChange?: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, pageLinks, onPageChange, previousPage, nextPage }) => {

    const links = pageLinks?.map((page) => parseInt(page.split('=')[1]))
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
        const runLocalData = async () => {

        }

        runLocalData()



    })

    const handleClick = (event: any, page?: number | null) => {

        event.preventDefault()
        console.log({ page });


        if (page) {
            page && onPageChange && onPageChange(page)
            const currentSearchParams = new URLSearchParams(window.location.search)
            currentSearchParams.set('page', page.toString())
            navigate({ search: currentSearchParams.toString() })


        }
    }
    const renderPageNumbers = () => {
        let newLinks = links
        newLinks = newLinks?.filter((page: number) => (page >= currentPage! - 2) && (page <= currentPage! + 2))
        return newLinks?.map((page: number, index: number) => (
            <li className="page-item" key={index}>
                <a className={"page-link  " + (page == currentPage ? 'active' : '')}

                    onClick={(event) => handleClick(event, page)}
                >
                    {page}
                </a>
            </li>))
    }


    return (
        <div className='Pagination'>


            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={(event) => handleClick(event, previousPage)}
                    >Prev</a></li>

                    {
                        currentPage! > 3 &&
                        <>
                            <li className="page-item" >
                                <a className="page-link"

                                    onClick={(event) => handleClick(event, 1)}
                                >
                                    {1}
                                </a>
                            </li>

                            <li className="page-item" >
                                <a className={"page-link  "}

                                    onClick={(event) => handleClick(event, 1)}
                                >
                                    ...
                                </a>
                            </li>

                        </>



                    }
                    {renderPageNumbers()}
                    {
                        currentPage! > totalPages! &&
                        <>
                            <li className="page-item" >
                                <a className={"page-link  "}

                                    onClick={(event) => handleClick(event, 1)}
                                >
                                    ...
                                </a>
                            </li>
                            <li className="page-item" >
                                <a className="page-link"

                                    onClick={(event) => handleClick(event, totalPages)}
                                >
                                    {totalPages}
                                </a>
                            </li>



                        </>



                    }



                    <li className="page-item"><a className="page-link" href="#"
                        onClick={(event) => handleClick(event, nextPage)}
                    >Next</a></li>
                </ul>
            </nav> </div>
    )
}

export default Pagination
