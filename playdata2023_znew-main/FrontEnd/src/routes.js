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
import Realtime_main from "views/Realtime_main";
//import Notifications from "views/Dashboard_cate";
// import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Search from "views/Search";
import TableList from "views/Dash_day";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import DemoNavbar from "components/Navbars/DemoNavbar";
import Categoryrank from "views/Realtime_cate";
import Realtimerank from "views/Realtime_rank";
import Dashboard from "views/Dash_day";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "실시간 메인 랭킹",
    // icon: "design_app",
    component: <Realtime_main />,
    layout: "/admin",
  },
  {
    path: "/categoryrank",
    name: "실시간 카테고리 랭킹",
    // icon: "ui-1_bell-53",
    component: <Categoryrank />,
    layout: "/admin",
  },
  
  {
    path: "/realtimerank",
    name: "실시간 랭킹 분석",
    // icon: "design_image",
    component: <Realtimerank />,
    layout: "/admin",
  }, 
  {
    path: "/extended-tables",
    name: "기간별 종합 분석",
    // icon: "files_paper",
    component: <TableList />,
    layout: "/admin",
  },

  {
    path: "/search",
    name: "검색창",
    // icon: "design-2_ruler-pencil",
    component: <Search />,
    layout: "/admin",
  },
 

  //  {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
 
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
