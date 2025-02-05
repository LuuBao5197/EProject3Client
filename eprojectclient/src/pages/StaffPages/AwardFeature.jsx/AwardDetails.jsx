<h2 className="text-center mb-3">Award Detail</h2>
<div className="row">
    <div className="col-md-6">
        <p><strong>Name:</strong> {award.name}</p>
        <p><strong>Value:</strong> {award.value}$</p>
        <p><strong>Quantity:</strong> {award.awardQuantity}</p>
    </div>
    <div className="col-md-6">
        <p><strong>Contest Name:</strong> {award.contest?.name}</p>
        <p><strong>Status:</strong> {award.status}</p>
    </div>
</div>

{award.status === "Published" || (award.studentAwards && award.studentAwards.length > 0) ? (
    <div className="col-md-8 text-center mx-auto">
        <h1>List of award-winning students</h1>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th className="text-center">Student ID</th>
                    <th className="text-center">Student Name</th>
                </tr>
            </thead>
            <tbody>
                {award.studentAwards && award.studentAwards.length > 0 ? (
                    award.studentAwards.map((award, index) => (
                        <tr key={index}>
                            <td className="text-center">{award.student?.id}</td>
                            <td className="text-center">{award.student?.user?.name}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="text-center">No award.</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
) : null}

{(award.status === "Draft" || award.status === "Rejected") && (
    <div className="d-flex gap-2">
        <button className="btn btn-warning" onClick={() => navigate(`/staff/award/edit/${id}`)}>
            <Icon as={MdEdit} /> Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
            <Icon as={MdDeleteForever} /> Delete
        </button>
        <button className="btn btn-success" onClick={sendAwardForReview}>
            <Icon as={MdSend} /> Send for Review
        </button>
    </div>
)}
