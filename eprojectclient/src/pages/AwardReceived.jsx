import { useEffect, useState } from "react";
import { getAwardReceived } from "../API/getAwardReceived";

function AwardReceived() {
     const [AwardReceived, setAwardReceived] = useState([]);
    
        useEffect(() => {
            const fetchAwardReceived= async () => {
                try {
                    //test voi student id 2
                    const data = await getAwardReceived(2); 
                    setAwardReceived(data); 
                    console.log(data);
                    
                } catch (error) {
                    console.error('Failed to fetch contests:', error);
                    
                }
            };
            
            fetchAwardReceived();
        }, []); 
    return ( 
        <>
            <h2>Testing Awards Received  </h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Tên Cuộc Thi</th>
                        <th>Tên Giải Thưởng</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Ngày Kết Thúc</th>
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody>
                    {AwardReceived.map((a, index) => (
                        <tr key={index}>
                            <td>{a.award.contest.name}</td>
                            <td>{a.award.name}</td>
                            <td>{a.award.contest.startDate}</td>
                            <td>{a.award.contest.endDate}</td>
                            <td>{a.award.value}$</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
     );
}

export default AwardReceived;