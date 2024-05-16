import React from "react";

import {
  SiAsus,
  SiHp,
  SiSamsung,
  SiDell,
  SiAcer,
  SiMsibusiness,
  SiLenovo,
  SiApple,
} from "react-icons/si";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const generateIconBrand = (brand: string) => {
  switch (brand) {
    case "asus":
      return <SiAsus size={42} />;
    case "hp":
      return <SiHp size={24} />;
    case "samsung":
      return <SiSamsung size={42} />;
    case "dell":
      return <SiDell size={24} />;
    case "acer":
      return <SiAcer size={42} />;
    case "msi":
      return <SiMsibusiness size={42} />;
    case "lenovo":
      return <SiLenovo size={42} />;
    case "apple":
      return <SiApple size={24} />;
    default:
      return <BsFillGrid3X3GapFill size={20} />;
  }
};

const Brand = ({
  brand,
  onClick,
  filter,
}: {
  brand: string;
  onClick: () => void;
  filter: string;
}) => {
  return (
    <div
      className={`${
        brand === filter ? "text-yellow-400" : "text-black"
      } cursor-pointer hover:text-yellow-400`}
      onClick={onClick}
    >
      {generateIconBrand(brand)}
    </div>
  );
};

export default Brand;
