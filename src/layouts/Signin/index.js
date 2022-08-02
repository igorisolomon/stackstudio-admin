import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import IllustrationLayout from "components/IllustrationLayout";

// Image
import chat from "assets/images/illustrations/chat.png";
import { handleSignin } from "shared/auth";
import SoftSnackbar from "components/SoftSnackbar";

function Signin() {
  const navigate = useNavigate()

  const [state, setState] = useState({ username: "", password: "" });
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <SoftSnackbar
      color="success"
      icon="check"
      title="Stack studio"
      content="Welcome"
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <SoftSnackbar
      color="error"
      icon="warning"
      title="Stack studio"
      content="Unable to auntheticate"
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const handleData = ({ target }) => {
    const initialState = { ...state };
    initialState[target.name] = target.value;

    setState({ ...initialState });
  };

  const handleSubmit = async () => {
    const response = await handleSignin({ ...state });
    response ? (
      openSuccessSB(),
      navigate('/')
      ) : openErrorSB();
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: chat,
        title: '"Stack Studio"',
        description: "",
      }}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Username"
            size="large"
            name="username"
            onChange={handleData}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type="password"
            placeholder="Password"
            size="large"
            name="password"
            onChange={handleData}
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" size="large" onClick={handleSubmit} fullWidth>
            sign in
          </SoftButton>
          {renderSuccessSB}
          {renderErrorSB}
        </SoftBox>
      </SoftBox>
    </IllustrationLayout>
  );
}

export default Signin;