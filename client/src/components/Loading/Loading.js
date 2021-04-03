import React, { useState, useEffect } from "react";

import "./Loading.css";

export default function Loading() {
  return (
    <div class="lds-ring">
      {/*I should really just make loading a component */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
