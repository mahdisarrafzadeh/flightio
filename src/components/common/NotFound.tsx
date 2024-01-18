import { FC } from "react";

interface Props {
  text: string;
}

const NotFound: FC<Props> = ({ text }) => {
  return (
    <div className="flex justify-center items-center font-semibold" dir="ltr">
      {text}
    </div>
  );
};

export default NotFound;
