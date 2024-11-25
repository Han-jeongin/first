import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Nav, InputGroup, InputGroupText, InputGroupAddon, Input, Card, CardBody } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { searchKeyword, selMenu } from "views/Searchapi.js"; // Import the search function
import Select from "react-select";
import Footer from "components/Footer/Footer";
var ps;

const menuOptions = [
  { value: "title", label: "제목" },
  { value: "category", label: "카테고리" },
  { value: "ch_name", label: "채널명" },
  { value: "hashtag", label: "해시태그" }
];

function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const initialValue = menuOptions[0].value;



  React.useEffect(() => {
    setSelectedMenu(menuOptions.find((option) => option.value === initialValue));
  }, [initialValue]);

  const handleMenuChange = (selectedOption) => {
    setSelectedMenu(selectedOption);
  };


  const handleIconClick = async () => {
    setLoading(true);
    const data = await selMenu(selectedMenu, keyword)
    setSearchResults(data);
    setLoading(false);
    navigate("search", { state: { searchResults: data, keyword, selectedMenu } }); // 검색 페이지로 이동하면서 검색 결과를 전달
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleIconClick();
    }
  };

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: true,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const customStyles = {
    // Set the background color with transparency (opacity) using RGBA format
    control: (provided, state) => ({
      ...provided,
      padding: "0px"

      // boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0, 123, 255, 0.25)" : null,
      // "&:hover": {
      //   borderColor: state.isFocused ? "#80bdff" : "#adb5bd",
      // },
    }),
  };

  return (
    <div className="sidebar" data-color={props.backgroundColor}>
      <div className="logo">
        <div
          className="Neo"
          onClick={() => navigate("/dashboard")}
          style={{ fontSize: 23, cursor: "pointer", color: "white" }}
        >
          <div className="Cafe"><i className="now-ui-icons objects_planet" style={{ margin: 5 }} /> Znew: 지금 뉴스는?</div>
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <form className="Neo">
          <Row className="mb-2"></Row>
          <Row className="mb-2">
            <Col xs={12} md={12} className="px-4" >
              <Select

                value={selectedMenu}
                onChange={handleMenuChange}
                options={menuOptions}
                isSearchable={false}

              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="px-4">
              <InputGroup className="no-border">

                <Input placeholder="검색어를 입력하세요" value={keyword} onChange={handleInputChange} onKeyPress={handleOnKeyPress} style={{ color: "black", fontSize: "15px" }} css={{
                  "&::placeholder": {
                    color: "black",
                  },
                }} className="Neo" />
                <InputGroupAddon addonType="append" onClick={handleIconClick}>
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

        </form>
        <Row>
          <Col xs={12} className="px-2">
            <Nav>
              {props.routes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.layout + prop.path) +
                      (prop.pro ? " active active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink to={prop.layout + prop.path} style={{ borderRadius: 15 }}>
                      <i className={"now-ui-icons " + prop.icon} />
                      <div className="Neo" style={{ fontSize: "15px" }}><p>{prop.name}</p></div>
                    </NavLink>
                  </li>
                );
              })}

            </Nav>
          </Col>

        </Row>
        <Row>
          <div className="footer">
            <div className="px-4">
              <div className="Neo">
                <p style={{ marginLeft: 55, color: "white" }}>Made By Znew</p>
              </div>
            </div>
          </div>
        </Row>

      </div>
    </div>
  );
}

export default Sidebar;