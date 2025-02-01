import { useEffect, useState } from "react";
import { getAwardReceived } from "../../API/getAwardReceived";
import { MDBInputGroup, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { getStudentIdDemo } from "../../API/getStudentIdDemo";
import ModalAward from "./Notifications/ModalAward";
import { convertTime } from "./Notifications/ConvertFormatTime";
import NavbarStudentHome from "./components/navbar/NavbarStudentHome";
import FooterHome from "../PublicPages/components/footer/FooterHome";

function AwardReceived() {
    const [AwardReceived, setAwardReceived] = useState([]);
    const [filteredAr, setFilteredAr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAwardId, setSelectedAwardId] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);  // Number of awards per page

    const toggleModal = (id) => {
        setSelectedAwardId(id);
        setShowModal(!showModal);
    };

    useEffect(() => {
        const fetchAwardReceived = async () => {
            try {
                const data = await getAwardReceived(getStudentIdDemo());
                setAwardReceived(data);
                setFilteredAr(data);
            } catch (error) {
                console.error('Failed to fetch awards:', error);
            }
        };

        fetchAwardReceived();
    }, []);

    function handleSearch(txt) {
        const filtered = AwardReceived.filter(a => a.award.contest.name.toLowerCase().includes(txt.toLowerCase()));
        setFilteredAr(filtered);
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAr.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!AwardReceived || AwardReceived.length === 0) {
        return <div className='d-flex align-items-center'>
            <strong>Loading...</strong>
            <br />
            <MDBSpinner className='ms-auto' role='status' />
        </div>;
    }

    const totalPages = Math.ceil(filteredAr.length / itemsPerPage);

    return (
        <div style={{ textAlign: 'center' }} className="container">
            <NavbarStudentHome />
            <h2 className="mt-3">My Awards Received</h2>
            <MDBInputGroup className='mb-3' noBorder textBefore={<MDBIcon fas icon='search' />}>
                <input className='form-control' type='text' placeholder='Search by name...' onChange={e => handleSearch(e.target.value)} />
            </MDBInputGroup>
            
            {/* Check if there are no results */}
            {filteredAr.length === 0 ? (
                <p>No result found</p>
            ) : (
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Contest name</th>
                            <th>Award name</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Reward</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((a, index) => (
                            <tr key={index}>
                                <td style={{ fontWeight: 'bold' }}>{a.award.contest.name}</td>
                                <td>{a.award.name}</td>
                                <td>{convertTime(a.award.contest.startDate)}</td>
                                <td>{convertTime(a.award.contest.endDate)}</td>
                                <td className="text-danger">{a.award.value}$</td>
                                <td><button className="btn btn-primary" onClick={() => toggleModal(a.awardId)}><i className="fa-solid fa-info"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination controls */}
            {filteredAr.length > 0 && (
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
            )}

            <ModalAward showModal={showModal} toggleModal={toggleModal} awardId={selectedAwardId} />
            <FooterHome />
        </div>
    );
}

export default AwardReceived;
