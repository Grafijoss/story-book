import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

import { ButtonTest } from "./styles";

const Button = ({ children, buttonType, onClick }) => (
  <ButtonTest onClick={onClick} className={buttonType}>
    {children}
  </ButtonTest>
);

Button.defaultProps = {
  buttonType: "primary",
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  buttonType: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
