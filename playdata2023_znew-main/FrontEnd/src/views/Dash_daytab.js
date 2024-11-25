import * as React from 'react';
import PropTypes from 'prop-types';

import {Tabs, Tab, Typography, Box, createTheme, ThemeProvider} from "@mui/material"

import ChartComponent from 'variables/title_sense';
import PlaytimeViewsComponent from 'variables/playtime_views';
import VlcTotalLineChart from 'variables/time_counts';
import HashtagTrendLineChart from 'variables/time_hashtag';
import CategoryCountsPieChart from 'variables/catecory_counts';
import ChannelCategoryCountsPieChart from 'variables/ch_category_counts';
import ChannelCategoryViewsPieChart from 'variables/ch_category_views';
import "assets/css/main.css"

import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from 'reactstrap';

const theme = createTheme({
    typography: {
        fontFamily: "NanumSquareNeo-Variable"
    }
})
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className='Neo'
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);
    const [TitleSenseData, setChartData] = useState([]);
    const [CategoryPoliticsTitleSenseData, setOtherData1] = useState([]);
    const [CategoryEconomyTitleSenseData, setOtherData2] = useState([]);
    const [CategorySocietyTitleSenseData, setOtherData3] = useState([]);
    const [CategoryCultureTitleSenseData, setOtherData4] = useState([]);
    const [CategoryItscienceTitleSenseData, setOtherData5] = useState([]);
    const [CategorySportsTitleSenseData, setOtherData6] = useState([]);
    const [CategoryWorldTitleSenseData, setOtherData7] = useState([]);

    const [PlayTimeViewsData, setOtherData8] = useState([]);

    const [transformedAllTimeCountsData, setTransformedAllTimeCountsData] = useState([]);

    const [transformedAllTimeHashTagCountsData, setTransformedAllTimeHashTagCountsData] = useState([]);

    const [transformedCategoryCountsData, setTransformedCategoryCountsData] = useState([]);

    const [transformedChannelCategoryCountsData, setTransformedChannelCategoryCountsData] = useState([]);

    const [transformedChannelCategoryViewsData, setTransformedChannelCategoryViewsData] = useState([]);

    useEffect(() => {
        // 영상 제목 감성 분석
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=total')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setChartData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 카테고리별 영상 제목 감성 분석
        // 정치
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=정치')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData1(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 경제
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=경제')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData2(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 사회
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=사회')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData3(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 생활문화
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=생활문화')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData4(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // IT과학
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=IT과학')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData5(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 스포츠
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=스포츠')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData6(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 세계
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/titlesentiment?ct=세계')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { positive, negative, ambiguous } = item[date];

                    return {
                        date: date,
                        positive: positive,
                        negative: negative,
                        ambiguous: ambiguous,
                    };
                });

                setOtherData7(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 영상 길이별 조회수 총합
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/pt_views_total')
            .then((response) => {
                const data = response.data;
                console.log('API Response:', data);

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const { short, medium, long } = item[date];

                    return {
                        date: date,
                        short: short,
                        medium: medium,
                        long: long,
                    };
                });

                setOtherData8(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 영상 댓글, 좋아요, 조회수 총합 합계 분석
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/vlc_total')
            .then((response) => {
                const data = response.data;
                console.log('ALL VIC API Response:', data);

                const transformedData = data.map((item) => {
                    const entries = Object.entries(item);

                    const allTimeData = entries.map(([timestamp, statistics]) => {
                        const { total_views, total_likes, total_comments } = statistics[0];
                        return {
                            timestamp: timestamp,
                            total_views: total_views,
                            total_likes: total_likes,
                            total_comments: total_comments,
                        };
                    });

                    return allTimeData;
                });

                setTransformedAllTimeCountsData(transformedData);
                console.log("setTransformedAllTimeCountsData", setTransformedAllTimeCountsData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 해시태그 총 등장수 분석
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/hashtag_count')
            .then((response) => {
                const data = response.data;

                const transformedData = data.map((item) => {
                    const entries = Object.entries(item);
                    const allTimeData = entries.map(([timestamp, statistics]) => {
                        const allHashtagsData = statistics.map((entry) => {
                            const { hashtag, count } = entry;
                            return {
                                timestamp: timestamp,
                                hashtag: hashtag,
                                count: count
                            };
                        });
                        return allHashtagsData;
                    });
                    return allTimeData.flat();
                });

                setTransformedAllTimeHashTagCountsData(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // 카테고리별 영상 비율
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/category_videos')
            .then((response) => {
                const data = response.data;

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const categoryDataArray = item[date]; // 해당 날짜의 카테고리 데이터 배열

                    const formattedCategoryData = categoryDataArray.map((categoryData) => {
                        const { category, document_count } = categoryData;

                        return {
                            date: date,
                            category: category,
                            document_count: document_count,
                        };
                    });

                    return formattedCategoryData;
                });

                setTransformedCategoryCountsData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


        // 뉴스 채널별 카테고리별 영상 비율
        axios
            .get('http://3.37.47.118:8000/znew/analysis/date_term/channel_category_videos_views')
            .then((response) => {
                const data = response.data;

                const allChannels = ['MBCNEWS', '연합뉴스TV', 'YTN', 'KBS News', 'SBS 뉴스', 'MBN News', 'JTBC News', '뉴스TVCHOSUN', '채널A 뉴스', 'EBS뉴스'];

                const formattedData = data.map((item) => {
                    const date = Object.keys(item)[0];
                    const channelDataArray = item[date];

                    // Create an array with all channels, and set categories as an empty array initially
                    const allChannelsData = allChannels.map((channel) => ({
                        channel: channel,
                        categories: [],
                    }));

                    // Merge the actual channels data with all channels data, so that all channels are included
                    const mergedChannelData = [...channelDataArray, ...allChannelsData.slice(channelDataArray.length)];

                    return {
                        date: date,
                        channels: mergedChannelData.map((channelData) => ({
                            channel: channelData.channel,
                            categories: channelData.categories.slice(0, 7)
                        })),
                    };
                });

                setTransformedChannelCategoryCountsData(formattedData);
                setTransformedChannelCategoryViewsData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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

    return (
        <Box sx={{ width: '100%' }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <ThemeProvider theme={theme}>
                <Tabs value={value} variant="scrollable" scrollButtons={false} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={<Typography className="Neo" Fsx={{ fontWeight: 'bold' }}>영상 감성 분석 비율</Typography>} />
                    <Tab label="영상 길이별 조회수 총합" {...a11yProps(1)} />
                    <Tab label="영상 댓글수/좋아요수/조회수 추이" {...a11yProps(2)} />
                    <Tab label="해시태그 등장수 추이" {...a11yProps(3)} />
                    <Tab label="카테고리별 영상 수 비율" {...a11yProps(4)} />
                    <Tab label="채널별 카테고리 영상 수 비율" {...a11yProps(5)} />
                    <Tab label="채널별 카테고리 조회수 비율" {...a11yProps(6)} />
                </Tabs>
                </ThemeProvider>
                
            </Box>
            
            <CustomTabPanel value={value} index={0}>
                <Container>
                    
                    <Row className='Neo'>
                        {TitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index} >
                                <Card className="card-chart">
                                    <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="전체" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategoryPoliticsTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="정치" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategoryEconomyTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="경제" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategorySocietyTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="사회" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategoryCultureTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="생활문화" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategoryItscienceTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="IT/과학" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategorySportsTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="스포츠" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {CategoryWorldTitleSenseData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <ChartComponent data={dataObj} category="세계" />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Container>
                    <Row className='Neo'>
                        {PlayTimeViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={6} key={index}>
                                <Card className="card-chart">
                                <CardHeader>{formatDate(dataObj.date)}</CardHeader>
                                    <CardBody>
                                        <PlaytimeViewsComponent data={dataObj} />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Container>
                    <Row className='Neo'>
                        {transformedAllTimeCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={12} md={12} lg={12} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <VlcTotalLineChart data={dataObj} />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Container>
                    <Row className='Neo'>
                        {transformedAllTimeHashTagCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={12} md={12} lg={12} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <HashtagTrendLineChart data={dataObj} />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <Container>
                    <Row className='Neo'>
                        {transformedCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={6} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <CategoryCountsPieChart data={dataObj} />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <Container>
                    <Row>
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='0' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='1' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='2' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='3' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='4' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='5' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='6' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='7' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='8' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryCountsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryCountsPieChart data={dataObj} idx='9' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                <Container>
                    <Row>
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='0' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='1' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='2' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='3' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='4' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='5' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='6' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='7' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='8' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                        {transformedChannelCategoryViewsData.map((dataObj, index) => (
                            <Col xs={12} sm={6} md={4} lg={5} key={index}>
                                <Card className="card-chart">
                                    <CardHeader>{dataObj.date}</CardHeader>
                                    <CardBody>
                                        <ChannelCategoryViewsPieChart data={dataObj} idx='9' />
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomTabPanel>
        </Box>
    );
}