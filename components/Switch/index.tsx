import React, { useState } from "react";
import { SwitchProps } from "./index.type";

const Switch = ({ status, productId, onSwitch }: SwitchProps) => {
  const [isReady, setIsReady] = useState<boolean>(status);

  const handleChange = (e: any) => {
    setIsReady(e.target.checked);

    onSwitch(productId, { isReady: e.target.checked });
  };

  return (
    <div className="form-control w-28">
      <label className="cursor-pointer label">
        <span className="label-text">{isReady ? "Ready" : "Sold"}</span>
        <input
          checked={isReady}
          onChange={handleChange}
          type="checkbox"
          className="toggle [--tglbg:white] toggle-accent"
        />
      </label>
    </div>
  );
};

export default Switch;
