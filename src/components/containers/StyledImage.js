import React from "react";
function StyledImage(props) {
  const { width, margin, height, borderRadius, className = "", style = {}, ...rest } = props;

  const imgStyle = {
    display: "block",
    margin: margin || "0 auto",
    width: width || "auto",
    height: height || "auto",
    borderRadius: borderRadius || 0,
    ...style,
  };

  return <img alt="noImage" className={className} style={imgStyle} {...rest} />;
}

export default StyledImage;
