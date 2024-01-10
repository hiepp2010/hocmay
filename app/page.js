import Image from "next/image";
import Navbar from "./navBar.js";
import IframeComponent from "./Grafana.js";

function resizeIframe(obj) {
  obj.style.height =
    obj.contentWindow.document.documentElement.scrollHeight + "px";
}

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <IframeComponent></IframeComponent>
    </>
  );
}
