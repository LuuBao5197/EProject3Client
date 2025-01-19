import React, { useEffect, useState } from 'react';

function Total() {
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const fetchTotalValue = async () => {
            try {
                const response = await fetch("http://localhost:5190/api/Manager/GetAllValue");
                const data = await response.json();
                const sum = data.reduce((acc, curr) => acc + curr.Value, 0);
                setTotalValue(sum);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTotalValue();
    }, []);

    return totalValue;
}

export default Total;
