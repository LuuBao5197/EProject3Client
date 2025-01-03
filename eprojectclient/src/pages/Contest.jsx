import React, { useEffect, useState } from 'react';
import { getContest } from '../API/getContest';


function Contest() {
    const [contests, setContests] = useState([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const data = await getContest(); 
                setContests(data); 
                //console.log(data);
                
            } catch (error) {
                console.error('Failed to fetch contests:', error);
                
            }
        };
        
        fetchContests();
    }, []); 

    return (
        <div>
            <h1>Cuộc thi sắp diễn ra</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Tên Cuộc Thi</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Ngày Kết Thúc</th>
                        <th>Người Tổ Chức</th>
                    </tr>
                </thead>
                <tbody>
                    {contests.map((c, index) => (
                        <tr key={index}>
                            <td>{c.name}</td>
                            <td>{c.startDate}</td>
                            <td>{c.endDate}</td>
                            <td>{c.organizer.user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Contest;
