import React from "react";
import { SyncLoader } from "react-spinners";

function Loading() {
  return (
    <div className="container mx-auto text-center p-10 space-y-3">
      <SyncLoader color="rgba(54, 55, 214, 1)" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
