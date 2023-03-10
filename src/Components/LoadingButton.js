import { FaRadiation } from "react-icons/fa";

const LoadingButton = ({ btnStyle }) => {
  return (
    <button
      type="button"
      className={`${btnStyle} flex justify-center gap-2 items-center bg-rose-400 text-white font-semibold rounded-sm  cursor-wait px-5 py-2 `}
      disabled
    >
        <p>Pending</p>
      <FaRadiation className="animate-spin h-5 w-5"></FaRadiation>
    </button>
  );
};

export default LoadingButton;
