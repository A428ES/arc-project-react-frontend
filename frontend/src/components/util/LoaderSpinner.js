import { ThreeDots } from "react-loader-spinner";

export default function LoaderSpinner() {
  return (
    <ThreeDots
      height="80"
      width="80"
      background-color="black"
      color="green"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=".loading-container"
      visible={true}
    />
  );
}
