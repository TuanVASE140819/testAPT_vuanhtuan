import React from "react";
import ClassList from "./Screen/listClass";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import cors from "cors";

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //Enable CORS on Server Side
  const corsOptions = {
    origin: "https://exam.congdongcode.vn",
    optionsSuccessStatus: 200,
  };

  return (
    <div>
      <cors {...corsOptions}>
        <Header />
        <ClassList />
        <Footer />
      </cors>
    </div>
  );
}

export default App;
