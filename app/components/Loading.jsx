"use client"
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";export default function() {
    let [color, setColor] = useState("#ffffff");
    return(
        <div className="loadingContainer">
      <ClipLoader
        color={color}
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />        </div>
    )
}