import React from "react";

import {
  SiAsus,
  SiHp,
  SiSamsung,
  SiDell,
  SiAcer,
  SiMsibusiness,
} from "react-icons/si";

const generateIconBrand = (brand: string) => {
  switch (brand) {
    case "asus":
      return <SiAsus size={42} className="text-black hover:text-yellow-400" />;
    case "hp":
      return <SiHp size={24} className="text-black hover:text-yellow-400"/>;
    case "samsung":
      return <SiSamsung size={42} className="text-black hover:text-yellow-400"/>;
    case "dell":
      return <SiDell size={24} className="text-black hover:text-yellow-400"/>;
    case "acer":
      return <SiAcer size={42} className="text-black hover:text-yellow-400"/>;
    case "msi":
      return <SiMsibusiness size={42} className="text-black hover:text-yellow-400"/>;
    default:
      return null;
  }
};

const index = ({ brand }: { brand: string }) => {
  return <div>{generateIconBrand(brand)}</div>;
};

export default index;
