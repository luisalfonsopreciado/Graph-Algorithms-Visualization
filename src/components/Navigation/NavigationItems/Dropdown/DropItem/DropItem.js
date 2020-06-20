import React from "react";

const DropItem = ({children, clicked}) => {
return <p onClick={clicked}>{children}</p>;
};

export default DropItem;
