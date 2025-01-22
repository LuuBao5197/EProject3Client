import { useEffect, useState } from "react";
import { getExhibitionArtwork } from "../../API/getExhibitionArtwork";
import { getStudentIdDemo } from "../../API/getStudentIdDemo";
import { MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import NavbarStudentHome from "./components/navbar/NavbarStudentHome";
import FooterHome from "../PublicPages/components/footer/FooterHome";

function ExhibitionArtwork() {
    const [eas, setEas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // State to manage the current page
    const [itemsPerPage] = useState(5);  // Number of artworks per page

    useEffect(() => {
        const getEas = async () => {
            try {
                const data = await getExhibitionArtwork(getStudentIdDemo());
                setEas(data);
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

        getEas();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = eas.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!eas || eas.length === 0) {
        return <div className='container'>
            <strong>Loading...</strong>
            <MDBSpinner className='ms-auto' role='status' />
        </div>;
    }

    const totalPages = Math.ceil(eas.length / itemsPerPage);

    return (
        <div className="container">
            <NavbarStudentHome />
            <div className="text-center">

                <h2 className="mt-3">Exhibition Artwork</h2>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Exhibition name</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Organized by</th>
                            <th>Status</th>
                            <th>Payment status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((e, i) => (
                            <tr key={i}>
                                <td>{indexOfFirstItem + i + 1}</td>
                                <td>{e.artwork.submission.contest.name}</td>
                                <td>{e.exhibition.name}</td>
                                <td>{e.exhibition.location}</td>
                                <td className="text-danger">{e.artwork.price}$</td>
                                <td>{e.exhibition.organizer.user.name}</td>
                                <td>{e.artwork.status}</td>
                                <td className="text-warning">{e.artwork.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination controls */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`btn btn-outline-secondary ${index + 1 === currentPage ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>


            </div><FooterHome />
        </div>
    );
}

export default ExhibitionArtwork;
