/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
// react plugin used to create charts
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from 'reactstrap';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import { dashboardPanelChart } from 'chart.js';
import PieChart from 'variables/chart2';
import BasicTabs from './Dash_daytab';

import ChartCard from "cards/Chartcard";
import ChartCateCard from "cards/ChartCatecard";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,

};


function Realtimerank() {
  return (
    <>
      <div className='Neo'>
        <PanelHeader
          size="xs"
          title="실시간 랭킹 분석"
        />
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">조회수 Top5</CardTitle>
                </CardHeader>
                <CardBody>
                  <ChartCard apiURL="views" keyName="조회수" />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">좋아요수 Top5</CardTitle>
                </CardHeader>
                <CardBody>
                  <ChartCard apiURL="likes" keyName="좋아요수" />
                </CardBody>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">댓글수 Top5</CardTitle>
                </CardHeader>
                <CardBody>
                  <ChartCard apiURL="comments" keyName="댓글수" />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Slider {...sliderSettings}>
            {/**/}
            <div>
              <Col xs={12} md={12}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">정치 Top3</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="정치" />
                  </CardBody>
                </Card>
              </Col>
            </div>


            {/**/}
            <div>
              <Col xs={12} md={12}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">경제 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="경제" />
                  </CardBody>
                </Card>
              </Col>
            </div>
            <div>
              <Col xs={12} md={12}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">사회 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="사회" />
                  </CardBody>
                </Card>
              </Col>
            </div>

            {/**/}
            <div>
              <Col xs={12} md={30}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">생활문화 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="생활문화" />
                  </CardBody>
                </Card>
              </Col>
            </div>

            {/**/}
            <div>
              <Col xs={12} md={30}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">IT/과학 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="IT과학" />
                  </CardBody>
                </Card>
              </Col>
            </div>

            {/**/}
            <div>
              <Col xs={12} md={30}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">스포츠 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="스포츠" />
                  </CardBody>
                </Card>
              </Col>
            </div>

            {/**/}
            <div>
              <Col xs={12} md={30}>
                <Card className="card-chart">
                  <CardHeader>
                    <CardTitle tag="h4">세계 Top3</CardTitle>

                  </CardHeader>
                  <CardBody>
                    <ChartCateCard apiURL="세계" />
                  </CardBody>
                </Card>
              </Col>
            </div>

          </Slider>
        </div>
      </div>

    </>
  );
}
export default Realtimerank;