import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';

import useChartData from 'variables/useChartData';
import mainLikesData from 'variables/main_likes';
import mainCommentsData from 'variables/main_comments';

import { Line } from 'react-chartjs-2';

const Chartcard = ({ apiURL, keyName }) => {
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
        axios.get(`http://3.37.47.118:8000/znew/main_ranking/?tp=${apiURL}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    }, []);

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

    const getChartData = (apiURL) => {
        switch (apiURL) {
            case "views":
                return [useChartData(0), useChartData(1), useChartData(2), useChartData(3), useChartData(4)];
            case "likes":
                return [mainLikesData(0), mainLikesData(1), mainLikesData(2), mainLikesData(3), mainLikesData(4)];
            case "comments":
                return [mainCommentsData(0), mainCommentsData(1), mainCommentsData(2), mainCommentsData(3), mainCommentsData(4)];
        }
    };

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
                                <Col xs={12} style={{ padding: 5 }}>
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
                                    {keyName === "좋아요수" && (
                                        <p><i className="now-ui-icons ui-2_like" /> {keyName}: {subItem.cum_counts}</p>
                                    )}
                                    {keyName === "댓글수" && (
                                        <p><i className="now-ui-icons files_single-copy-04" /> {keyName}: {subItem.cum_counts}</p>
                                    )}
                                    {keyName === "조회수" && (
                                        <p><i className="now-ui-icons media-1_button-play" /> {keyName}: {subItem.cum_counts}</p>
                                    )}

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

export default Chartcard;

