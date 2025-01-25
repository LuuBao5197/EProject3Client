import { useEffect, useState } from "react";
import { getMySubmissions } from "../../API/getMySubmissions";
import { MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ModalDetail from "./Notifications/ModalSubmission";
import { getStudentIdDemo } from "../../API//getStudentIdDemo";
import { convertTime } from "./Notifications/ConvertFormatTime";
import FooterHome from "../PublicPages/components/footer/FooterHome";
import NavbarHome from "../PublicPages/components/navbar/NavbarHome";
import Rating from "react-rating";
import { useLocation } from "react-router-dom";


function MySubmission() {
    const [subs, setSubs] = useState([]);
    const nav = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [idSub, setIdSub] = useState("");
    const [selectedContest, setSelectedContest] = useState("");
    const [uniqueContests, setUniqueContests] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  // State to manage the current page
    const [itemsPerPage] = useState(5);  // Number of submissions per page
    const location = useLocation();
    const newSubmission = location.state?.newSubmission;

    // Gộp dữ liệu mới vào danh sách submissions hiện tại

    const toggleModal = (id) => {
        setIdSub(id);
        setShowModal(!showModal);
    };

    useEffect(() => {
        const getSubs = async () => {
            try {
                const data = await getMySubmissions(getStudentIdDemo());
                setSubs(data);
                console.log(data);


                // Extract unique contest names
                const contestNames = [...new Set(data.map(sub => sub.contest.name))];
                setUniqueContests(contestNames);
                setFilteredSubmissions(data); // Display all submissions initially
            } catch (error) {
                console.error('Failed to fetch:', error);
            }
        };

        if (newSubmission) {
            setSubs((prev) => [...prev, newSubmission]);
        }

        getSubs();
    }, [newSubmission]);

    useEffect(() => {
        if (selectedContest) {
            const filtered = subs.filter(sub => sub.contest.name === selectedContest);
            setFilteredSubmissions(filtered);
        } else {
            setFilteredSubmissions(subs);
        }
    }, [selectedContest, subs]);

    const handleSelectChange = (event) => {
        setSelectedContest(event.target.value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!subs || subs.length === 0) {
        return (
            <div className='container mx-auto'>
                <strong>Loading...</strong>
                <MDBSpinner className='ms-auto' role='status' />
            </div>
        );
    }

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

    return (
        <div className="container">
            <NavbarHome />
            <div className="row mt-3" style={{ margin: 'auto' }}>
                <div className="col-6">
                    <h1>My submissions</h1>
                </div>
                <div className="col-6">
                    <select className="form-select" onChange={handleSelectChange} value={selectedContest}>
                        <option value="">All</option>
                        {uniqueContests.map((contest, index) => (
                            <option key={index} value={contest}>
                                {contest}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="table table-hover table-bordered text-center table-striped" style={{ margin: 'auto' }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Contest name</th>
                        <th>Submission date</th>
                        <th>Submission name</th>
                        <th>Description</th>
                        <th>File</th>
                        <th>Vote</th>
                        <th>Comment</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((c, index) => {
                        const endDate = new Date(c.contest.endDate);
                        const isExpired = new Date() > endDate;

                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{c.contest.name.substring(0, 20) + '...'}</td>
                                <td>{convertTime(c.submissionDate)}</td>
                                <td>{c.name.substring(0, 20) + '...'}</td>
                                <td>{c.description.substring(0, 10) + '...'}</td>
                                <td>
                                    <a href={c.filePath} target="_blank" rel="noreferrer">
                                        <img src={c.filePath} className='img-thumbnail' alt={c.filePath.substring(0, 10) + '...'} width="100px" />
                                    </a>
                                </td>
                                <td>

                                    Vote:
                                    <Rating
                                        initialRating={c.submissionReviews?.ratingLevel ?? 0}
                                        emptySymbol="fa fa-star-o fa-1x"
                                        fullSymbol="fa fa-star fa-1x"
                                        readonly
                                    />

                                </td>
                                <td>{c.submissionReviews.reviewText ?? "No comment"}</td>
                                <td>
                                    <a className="btn btn-outline-primary" onClick={() => toggleModal(c.id)}>
                                        <MDBIcon fas icon="info" />
                                    </a>
                                </td>
                                <td>
                                    <a
                                        className={`btn ${isExpired ? 'btn-outline-secondary disabled' : 'btn-outline-warning'}`}
                                        onClick={() => !isExpired && nav(`/updatemysubmission/${c.id}`)}
                                    >
                                        <MDBIcon fas icon="pen" />
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
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

            <ModalDetail showModal={showModal} toggleModal={toggleModal} idSub={idSub} />
            <FooterHome />
        </div>
    );
}

export default MySubmission;
