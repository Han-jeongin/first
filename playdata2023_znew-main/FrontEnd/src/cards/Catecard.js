import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';

const Catecard = ({ apiURL }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Axios를 사용하여 JSON 데이터 가져오기
        axios.get(`http://3.37.47.118:8000/znew/category_ranking/?ct=${apiURL}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    },[]);

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
                                <Col xs={12} md={4}>
                                    <img src={subItem.thumbnail} alt="Thumbnail" />
                                </Col>
                                <Col xs={12} md={6}>
                                    <Row>
                                        <a href={`https://www.youtube.com/watch?v=${subItem.link}`}
                                            style={{ color: getColorFromSense(subItem.sense), height: 110 }} target='_blank'>{subItem.title}</a>
                                    </Row>
                                    <Row>
                                        <p>{subItem.ch_name}</p>
                                    </Row>
                                    <Row>
                                        <p><i className="now-ui-icons ui-2_like" /> 좋아요수: {subItem.cum_likes}</p>

                                    </Row>
                                    <Row>
                                        <p><i className="now-ui-icons files_single-copy-04" /> 댓글수: {subItem.cum_comments}</p>
                                    </Row>
                                    <Row>
                                        <p><i className="now-ui-icons media-1_button-play" /> 조회수: {subItem.cum_views}</p>

                                    </Row>
                                    <Row>
                                        <p>업로드 시간: {formatDate(subItem.ut)} </p>
                                    </Row>
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