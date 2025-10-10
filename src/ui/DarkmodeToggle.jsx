import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkmode } from "../context/DarkmodeContext";

function DarkmodeToggle() {
  const { isDarkmode, toggleDarkmode } = useDarkmode();

  return (
    <ButtonIcon onClick={toggleDarkmode}>
      {isDarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkmodeToggle;
