import React, { useState } from "react";
import { Card, CardHeader, CardBody, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useLocation } from "react-router-dom";
import { selMenu } from "views/Searchapi.js";
import Select from "react-select";

const menuOptions = [
  { value: "title", label: "제목" },
  { value: "category", label: "카테고리" },
  { value: "ch_name", label: "채널명" },
  { value: "hashtag", label: "해시태그" }
];

function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menuOptions[0]);

  const location = useLocation();
  const searchResultsFromSidebar = location.state?.searchResults || [];
  const initialKeyword = location.state?.keyword || "";
  const initialSelectedMenu = location.state?.selectedMenu;

  // Sidebar에서 검색 결과를 전달받은 경우 해당 결과를 설정
  React.useEffect(() => {
    if (searchResultsFromSidebar.length > 0) {
      setSearchResults(searchResultsFromSidebar);
    }
  }, [searchResultsFromSidebar]);

  React.useEffect(() => {
    setSelectedMenu(initialSelectedMenu);
  }, [initialSelectedMenu]);


  //keyword전달받음
  React.useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
    // setSearchResults([]);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    const data = await selMenu(selectedMenu, keyword);
    setSearchResults(data);
    setLoading(false);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };


  const handleMenuChange = (selectedOption) => {
    setSelectedMenu(selectedOption);
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
    <>
      <div className="Neo">
        <PanelHeader size="xs" title="검색창" />
        <div className="content">
          <Row>

            <Col md={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col xs={12} md={2}>
                      <Select
                        value={selectedMenu}
                        onChange={handleMenuChange}
                        options={menuOptions}
                        isSearchable={false}
                      />
                    </Col>
                    <Col xs={12} md={10}>
                      <InputGroup className="no-border">
                        <Input
                          className="Neo"
                          style={{ fontSize: "15px" }}
                          type="text"
                          placeholder="검색어를 입력하세요"
                          value={keyword}
                          onChange={handleInputChange}
                          onKeyPress={handleOnKeyPress}
                        />
                        <InputGroupAddon addonType="append" onClick={handleSearchClick}>
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_zoom-bold" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                      <h5>검색결과</h5>
                    </Col>
                  </Row>

                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      {Array.isArray(searchResults) && searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <Card key={index}>
                            <CardBody>
                              <Row>
                                <Col xs={12} md={2}>
                                  <img src={result.thumbnail} alt="Thumbnail" />

                                </Col>

                                <Col xs={12} md={10}>
                                  <Row>
                                    <a href={`https://www.youtube.com/watch?v=${result.link}`}
                                      style={{ color: "black" }}>{result.title}</a>
                                  </Row>
                                  <Row>
                                    <p> {result.ch_name}</p>
                                  </Row>
                                  <Row>
                                    <p> {result.hashtag.join(", ")}</p>
                                  </Row>
                                  <Row>
                                    <p>조회수: {result.cum_views} / 좋아요수: {result.cum_likes} / 댓글수:{result.cum_comments}</p>
                                  </Row>
                                  <Row>
                                    <p>{formatDate(result.ut)}</p>
                                  </Row>
                                </Col>
                              </Row>

                            </CardBody>
                          </Card>
                        ))
                      ) : (
                        <p>검색 결과가 없습니다.</p>
                      )}
                    </div>
                  )}

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

    </>
  );
}

export default Search;