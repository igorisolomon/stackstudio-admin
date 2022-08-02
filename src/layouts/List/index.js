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
import data from "layouts/List/data/dataTableData";
import { Grid, Icon } from "@mui/material";
import SoftButton from "components/SoftButton";

import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchData } from "shared/data";

function Lists({ title }) {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const targetPath = path.split('/').at(-1)

  const [list, setList] = useState([]);

  // const data = {
  //   columns: [
  //     { Header: "date", accessor: "published_date", width: "20%" },
  //     { Header: "title", accessor: "title" },
  //     ],
  //     rows: list
  // }

  const create = () => {
    navigate(`create`, { replace: false });
  };

  useEffect(() => {
    console.log();
    // fetch About
    // v1/admin/list/podcast
    const fetchList = async () => {
      const { data: list } = await fetchData(`v1/admin/list/${targetPath}`);

      setList(list);
    };
    fetchList();
  }, [targetPath]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={6} pb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={3} ml={2}>
          <SoftButton variant="gradient" color="dark" onClick={create}>
            Create&nbsp;
            <Icon>add</Icon>
          </SoftButton>
        </SoftBox>

        <Card>
          <SoftBox p={3} lineHeight={1}>
            {/* <SoftTypography variant="h5" fontWeight="medium">
              {title}
            </SoftTypography> */}
          </SoftBox>
          <DataTable table={data(list)} entriesPerPage={false} canSearch={false} />
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
