// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbar";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/List/data/dataTableData";
import { Grid, Icon } from "@mui/material";
import SoftButton from "components/SoftButton";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Lists({ title }) {
  let navigate = useNavigate();

  const create = (title) => {
    navigate(`/${title.toLowerCase()}s/create`, { replace: true });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={6} pb={3}>

        <SoftBox display="flex" justifyContent="flex-end" mb={3} ml={2}>
          <SoftButton variant="gradient" color="dark" onClick={() => create(title)}>
            Create&nbsp;
            <Icon>add</Icon>
          </SoftButton>
        </SoftBox>

        <Card>
          <SoftBox p={3} lineHeight={1}>
            <SoftTypography variant="h5" fontWeight="medium">
              {title}
            </SoftTypography>
          </SoftBox>
          <DataTable table={dataTableData} entriesPerPage={false} canSearch={false} />
        </Card>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

Lists.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Lists;
