import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const CardMain = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch the data using Axios
        axios.get('http://127.0.0.1:8000/znews/')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    const renderCards = (items) => {
        return items.map(item => (
            <Card key={item.id}>
                <CardBody>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                </CardBody>
            </Card>
        ));
    };

    return (
        <div>
            {/* Check if data exists and has elements */}
            {data && data.length > 0 && (
                <div>
                    {Object.keys(data[data.length - 1]).map(key => (
                        <div key={key}>
                            {renderCards(data[data.length - 1][key])}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardMain;

