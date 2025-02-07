import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ExhibitionArtworks = () => {
    const [artworks, setArtworks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5190/api/Staff/GetAllExhibitionArtworks") // Adjust API endpoint accordingly
            .then(response => {
                console.log(response)
                const groupedData = {};
                response.data.forEach(item => {
                    if (!groupedData[item.exhibition?.name]) {
                        groupedData[item.exhibition?.name] = [];
                    }
                    groupedData[item.exhibition?.name].push(item);
                });
                console.log(groupedData)
                setArtworks(groupedData);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleEdit = (item) => {
        navigate(`/staff/ExhibitionArtWork/Edit/${item}`)
    };

    const handleApprove = async (item) => {
        console.log("Send Approved", item);
        try {
            var res = await axios.patch(`http://localhost:5190/api/Staff/SendExhibitionArtworkForReview/${item}`)
            console.log(res);
            toast.info("Send Exhibition Artwork to wait Apporved success");
            // navigate(0);
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data);
        }
    };

    const columns = [
        {
            name: "Exhibition",
            selector: row => row.exhibition,
            sortable: true,
            cell: row => row.isFirst ? (
                <strong className="rowspan-cell">{row.exhibition}</strong>
            ) : null
        },
        {
            name: "Artwork",
            selector: row => row.artworkName,
            sortable: true,
        },
        {
            name: "Price",
            selector: row => row.price,
            sortable: true,
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
        },
        {
            name: "Action",
            cell: row => row.isFirst ? (
                <div className="rowspan-cell">
                    <Button colorScheme="yellow" size="sm" onClick={() => handleEdit(row.exhibitionId)} className="me-2">Edit</Button>
                    {row.status == "Draft" && 
                    <Button colorScheme="green" size="sm" onClick={() => handleApprove(row.exhibitionId)}>Send Approved</Button>}
                </div>
            ) : null,
        },
    ];

    const formattedData = Object.entries(artworks).flatMap(([exhibitionName, items]) =>
        items.map((item, index) => ({
            exhibition: exhibitionName,
            exhibitionId: item.exhibitionId,
            artworkName: item.artwork?.submission?.name || "N/A",
            price: item.artwork?.price || "N/A",
            status: item.status,
            isFirst: index === 0,
            rowSpan: items.length,
        }))
    );

    return (
        <div className="container mt-4">
            {/* {console.log(formattedData)} */}
            <Button colorScheme="blue" className="mb-3" onClick={() => navigate(`/staff/ExhibitionArtWork/Create`)}>Create Exhibition Artwork</Button>
            <DataTable
                columns={columns}
                data={formattedData}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default ExhibitionArtworks;
