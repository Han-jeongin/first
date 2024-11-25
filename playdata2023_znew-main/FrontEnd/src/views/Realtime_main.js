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
import { Line, Bar } from "react-chartjs-2";
import React, { useEffect, useState } from 'react';

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
import Dashcard from "cards/Dashcard";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import 'assets/css/main.css'

function Realtime_main() {
  return (
    <>
      <div className="Neo">
        <PanelHeader
          size="xs"
          title="실시간 메인 랭킹"

        />


        <div className="content">

          <Row>

            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">조회수 Top5</CardTitle>

                </CardHeader>
                <CardBody>
                  <div>

                    <Dashcard apiURL="views" keyName="조회수" />
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="stats">

                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">좋아요수 Top5</CardTitle>
                </CardHeader>
                <CardBody>
                  <Dashcard apiURL="likes" keyName="좋아요수" />

                </CardBody>


                <CardFooter>
                  <div className="stats">

                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">댓글수 Top5</CardTitle>
                </CardHeader>
                <CardBody>
                  <Dashcard apiURL="comments" keyName="댓글수" />

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

export default Realtime_main;
