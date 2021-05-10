import React, { useState } from "react";
import parse from "html-react-parser";

function HtmlRender({ htmlString }) {
  return <div className={"html-renderer-wrapper"}>{parse(htmlString)}</div>;
}
export default HtmlRender;