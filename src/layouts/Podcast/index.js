import { Card, Divider, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftDatePicker from "components/SoftDatePicker";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbar";
import React, { useState } from "react";

import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { postData } from "shared/data";

const CreatePodcast = () => {
  const samplePodcast = {
    published_date: "",
    title: "",
    is_published: true,
    body_html: "",
    body: "",
    published_link: "",
  };

  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(samplePodcast);

  const handleBody = (content, delta, source, editor) => {
    // get state
    const initialPodcast = { ...podcast };
    initialPodcast.body = editor.getText();
    initialPodcast.body_html = editor.getHTML();

    setPodcast({ ...initialPodcast });
  };

  const handleText = ({ target }) => {
    const initialState = { ...podcast };
    initialState[target.name] = target.value;

    setPodcast({ ...initialState });
  };

  const handleDate = (e) => {
    const initialState = { ...podcast };
    initialState.published_date = e[0].toISOString();

    setPodcast({ ...initialState });
  };

  const handleCheck = ({ target }) => {
    const initialState = { ...podcast };
    initialState.is_published = !initialState.is_published;

    setPodcast({ ...initialState });
  };

  const handleSubmit = () => {
    postData("v1/admin/podcast/", { ...podcast }).then((res) => {
      navigate("/podcasts/podcast");
    });
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
                  Podcast
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
                      Title
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput name="title" value={podcast.title} onChange={handleText} />

                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Published Date
                          </SoftTypography>
                        </SoftBox>
                        <SoftDatePicker
                          name="published_date"
                          value={podcast.published_date}
                          onChange={handleDate}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item xs={6}>
                      <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Published
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox ml={0.5} mb={0.25} mt={1}>
                        <Switch
                          checked={podcast.is_published}
                          onChange={handleCheck}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Podcast Link
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="published_link"
                    value={podcast.published_link}
                    onChange={handleText}
                  />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      About
                    </SoftTypography>
                  </SoftBox>

                  <div style={{ minHeight: 300 }}>
                    <ReactQuill
                      style={{ minHeight: 300 }}
                      value={podcast.body_html}
                      onChange={handleBody}
                    />
                  </div>
                </SoftBox>

                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftButton variant="gradient" color="info" onClick={handleSubmit}>
                    Create
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

export default CreatePodcast;
