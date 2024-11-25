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

// function PanelHeader(props) {
//   return (
//     <div
//       className={
//         "panel-header " +
//         (props.size !== undefined ? "panel-header-" + props.size : "")
//       }
//     >
//       {props.content}
//     </div>
//   );
// }

// export default PanelHeader;

import React from "react";

function PanelHeader(props) {
  return (
    <div
      className={
        "panel-header " +
        (props.size !== undefined ? "panel-header-" + props.size : "")
      }
    >
      {props.title && (
        <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          <h2 style={{ color: 'white' }}>{props.title}</h2>
        </div>
      )}
      {props.content}
    </div>
  );
}

export default PanelHeader;
