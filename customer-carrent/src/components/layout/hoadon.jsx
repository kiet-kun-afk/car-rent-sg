import React, { useEffect, useState } from 'react';

const PaymentSuccess = () => {
    const [params, setParams] = useState({});

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramObject = {};

        urlParams.forEach((value, key) => {
            paramObject[key] = value;
        });

        setParams(paramObject);
    }, []);

    return (
        <div>
            <h1>Payment Success</h1>
            <ul>
                {Object.entries(params).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}</strong>: {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentSuccess;
