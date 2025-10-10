import styled from "styled-components";
import { useDarkmode } from "../context/DarkmodeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkmode } = useDarkmode();

  const src = isDarkmode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
