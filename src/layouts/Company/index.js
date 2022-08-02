// import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Navbar from "components/Navbar";
import DashboardNavbar from "examples/Navbar";

import ReactQuill from "react-quill";


const Company = () => {
  
  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getText());
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Navbar /> */}
      <SoftBox mt={3} mb={4}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <SoftBox p={2} lineHeight={1}>
                <SoftTypography variant="h6" fontWeight="medium">
                  BRAND
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  About company
                </SoftTypography>
                <Divider />
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <SoftBox mt={0} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Company Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Logo
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      About
                    </SoftTypography>
                  </SoftBox>

                  <div style={{ minHeight: 300 }}>
                    <ReactQuill style={{ minHeight: 300 }} value={"Hey"} onChange={handleChange} />
                  </div>
                  {/* <SoftInput /> */}
                </SoftBox>

                <SoftTypography mt={5} variant="h6" fontWeight="medium">
                  PODCAST
                </SoftTypography>

                <SoftBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                  height="100%"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <SoftBox mt={3}>
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Feature Podcast 1
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          defaultValue={{ value: "clothing", label: "Clothing" }}
                          options={[
                            { value: "clothing", label: "Clothing" },
                            { value: "electronics", label: "Electronics" },
                            { value: "furniture", label: "Furniture" },
                            { value: "others", label: "Others" },
                            { value: "real estate", label: "Real Estate" },
                          ]}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SoftBox mt={3}>
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Feature Podcast 2
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          defaultValue={{ value: "clothing", label: "Clothing" }}
                          options={[
                            { value: "clothing", label: "Clothing" },
                            { value: "electronics", label: "Electronics" },
                            { value: "furniture", label: "Furniture" },
                            { value: "others", label: "Others" },
                            { value: "real estate", label: "Real Estate" },
                          ]}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Google Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Apple Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Spotify Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput />
                </SoftBox>
                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftBox mr={1}>
                    <SoftButton color="light">cancel</SoftButton>
                  </SoftBox>
                  <SoftButton variant="gradient" color="info">
                    create project
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
};

export default Company;
