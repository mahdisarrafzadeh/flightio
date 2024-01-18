import React, { FC } from "react";
import { Hourglass } from "react-loader-spinner";

const Loading: FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
};

export default Loading;
