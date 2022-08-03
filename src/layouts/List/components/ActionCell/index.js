// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ActionCell({id}) {

  const {pathname: path} = useLocation()
  const navigate = useNavigate()

  return (
    <SoftBox display="flex" alignItems="center" onClick={()=>navigate(`${path}/edit/${id}`)}>
      <SoftTypography variant="body1" color="secondary" sx={{ cursor: "pointer", lineHeight: 0 }}>
        <Tooltip title="Preview" placement="top">
          <Icon>visibility</Icon>
        </Tooltip>
      </SoftTypography>
    </SoftBox>
  );
}

ActionCell.propTypes = {
  id: PropTypes.number
};

export default ActionCell;
