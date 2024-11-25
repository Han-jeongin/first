import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import BasicTabs from "./Dash_daytab";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
};

function Dashboard() {

  return (
    <>
      <div className='Neo'>
        <PanelHeader
          size="xs"
          title="기간별 종합 분석"
        />
        <div className="content">
          <Row>

            <Col xs={12} md={12}>
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">*24시간 내 업로드된 영상 분석입니다.</h5>
                  <CardTitle tag="h4">일간 분석</CardTitle>

                </CardHeader>
                <CardBody>
                  <BasicTabs />

                </CardBody>
                <CardFooter>
                  <div className="stats">

                  </div>
                </CardFooter>
              </Card>
            </Col>

          </Row>

        </div>
      </div>

    </>
  );
}

export default Dashboard;