import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    Icon,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { MdCheck, MdEdit, MdEditAttributes, MdPriceCheck, MdSendAndArchive } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentAwards = () => {
    const [awards, setAwards] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5);
    const [editingAward, setEditingAward] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5190/api/Staff/GetStudentAwards")
            .then((res) => setAwards(res.data))
            .catch((err) => console.error("Error loading data:", err));
    }, [currentPage]);

    const handleApproved = (contestID) => {
        // console.log(contestID);
        try {
            var respone = axios.patch(`http://localhost:5190/api/Staff/SendStudentAwardForReview/${contestID}`);
            toast.success("Send draft list student receive award successfully");
            navigate(0);


        } catch (error) {
            toast.error("Something occurs errors");

        }

    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentData = awards.slice(offset, offset + itemsPerPage);
    console.log(currentData);

    return (
        <div className="container mt-4">
            <Table className="table table-bordered">
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                </colgroup>
                <Thead>
                    <Tr>
                        <Th>Contest</Th>
                        <Th>Actions</Th>
                        <Th>Student Name</Th>
                        <Th>Award Name</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentData.map((contest, index) => (
                        <React.Fragment key={index}>
                            <Tr>
                                <Td rowSpan={contest.awards.length + 1}>{contest.contestName}</Td>
                                <Td rowSpan={contest.awards.length + 1}>
                                    {/* <Button colorScheme="blue" size="sm" onClick={() => handleEdit(contest)}>
                                        <Icon as={MdEdit} />
                                    </Button> */}
                                    {contest.awards.every(i => i.status == "Draft" || i.status == "Reject") &&
                                        <Button colorScheme="green" size="sm" className="ms-2" onClick={() => handleApproved(contest.contestId)}>
                                            <Icon as={MdSendAndArchive} />
                                        </Button>
                                    }
                                </Td>
                            </Tr>

                            {contest.awards.map((award, i) => (
                                <Tr key={i}>
                                    <Td>{award.studentName}</Td>
                                    <Td>{award.awardName}</Td>
                                    <Td>{award.status}</Td>

                                </Tr>
                            ))}

                            {/* Action column with rowSpan */}

                        </React.Fragment>
                    ))}
                </Tbody>

            </Table>

            <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                pageCount={Math.ceil(awards.length / itemsPerPage)}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />

            {editingAward && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Award Information</ModalHeader>
                        <ModalBody>
                            <Input
                                value={editingAward.StudentName}
                                onChange={(e) =>
                                    setEditingAward({ ...editingAward, StudentName: e.target.value })
                                }
                                placeholder="Student Name"
                                mb={2}
                            />
                            <Input
                                value={editingAward.AwardName}
                                onChange={(e) =>
                                    setEditingAward({ ...editingAward, AwardName: e.target.value })
                                }
                                placeholder="Award Name"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Save
                            </Button>
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default StudentAwards;
