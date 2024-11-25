import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';

import catePolitics from 'variables/catePolitics';
import cateEconomy from 'variables/cateEconomy';
import cateSociety from 'variables/cateSociety';
import cateCulture from 'variables/cateCulture';
import cateItscience from 'variables/cateItscience';
import cateSports from 'variables/cateSports';
import cateWorld from 'variables/cateWorld';

import { Line } from 'react-chartjs-2';

const Catecard = ({ apiURL }) => {
    const [data, setData] = useState([]);

    const options = {
        plugins: {
            legend: {
                display: false, // 라벨(legend)을 숨기기
            },
        },
    };

    useEffect(() => {
        // Axios를 사용하여 JSON 데이터 가져오기
        axios.get(`http://3.37.47.118:8000/znew/category_ranking/?ct=${apiURL}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    }, []);

    const getChartData = (apiURL) => {
        switch (apiURL) {
            case "정치":
                return [catePolitics(0), catePolitics(1), catePolitics(2)];
            case "경제":
                return [cateEconomy(0), cateEconomy(1), cateEconomy(2)];
            case "사회":
                return [cateSociety(0), cateSociety(1), cateSociety(2)];
            case "생활문화":
                return [cateCulture(0), cateCulture(1), cateCulture(2)];
            case "IT과학":
                return [cateItscience(0), cateItscience(1), cateItscience(2)];
            case "스포츠":
                return [cateSports(0), cateSports(1), cateSports(2)];
            case "세계":
                return [cateWorld(0), cateWorld(1), cateWorld(2)];
        }
    };

    function formatDate(dateString) {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Seoul",
        };
        const date = new Date(dateString);
        return date.toLocaleString("ko-KR", options);
    }

    const chartData = getChartData(apiURL)


    const getColorFromSense = (sense) => {
        if (sense === "positive") {
            return "blue"; // Change to the desired color for positive sense
        } else if (sense === "negative") {
            return "red"; // Change to the desired color for negative sense
        } else {
            return "gray"; // Change to the default color for other cases
        }
    };

    return (
        <div>
            {data.map((item, index) => (
                item[Object.keys(item)[0]].map((subItem, subIndex) => (
                    <Card key={subIndex}>
                        <CardBody>
                            <Row>
                                <Col xs={12} md={1}>
                                    <p>{subIndex + 1}</p>
                                </Col>
                                <Col xs={12} style={{ padding: 10 }}>
                                    <Line data={chartData[subIndex]} options={options} />
                                </Col>
                                <Col xs={12} style={{ height: 80, fontSize: 17 }}>
                                    <a href={`https://www.youtube.com/watch?v=${subItem.link}`}
                                        style={{ color: getColorFromSense(subItem.sense), height: 110 }} target='_blank'>{subItem.title}</a>
                                </Col>
                                <Col xs={12} style={{ fontSize: 15 }}>
                                    <p>{subItem.ch_name}</p>
                                </Col>
                                <Col xs={12} style={{ fontSize: 14 }}>
                                    <p><i className="now-ui-icons ui-2_like" /> 좋아요수: {subItem.cum_likes}</p>
                                    <p><i className="now-ui-icons files_single-copy-04" /> 댓글수: {subItem.cum_comments}</p>
                                    <p><i className="now-ui-icons media-1_button-play" /> 조회수: {subItem.cum_views}</p>
                                    <p>업로드 시간: {formatDate(subItem.ut)}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))
            ))}
        </div>
    );
};

export default Catecard;