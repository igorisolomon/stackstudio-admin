import { useEffect, useState } from "react";

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
import { ThreeDots } from "react-loader-spinner";
import { fetchData, updateData } from "shared/data";
import { logout } from "shared/auth";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const aboutSample = {
    id: "",
    name: "",
    logo: null,
    podcast_title: "",
    google_podcast: "",
    about: "",
    about_html: "",
    apple_podcast: "",
    spotify_podcast: "",
    intro_title: "",
    intro_description: "",
    intro_description_html: "",
    featured_podcast: [],
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("stackstudioToken");

  const [about, setAbout] = useState(aboutSample);
  const [podcasts, setPodcasts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState("edit");

  useEffect(() => {
    // fetch about
    const fetchAbout = async () => {
      const { data: company } = await fetchData("v1/admin/about/");
      const { data: podcasts } = await fetchData("v1/admin/podcast/");

      setAbout({ ...company });
      setPodcasts(podcasts);
      // try {
      //   const { data: company } = await fetchData("v1/admin/about/");
      //   const { data: podcasts } = await fetchData("v1/admin/podcast/");

      //   setAbout({ ...company });
      //   setPodcasts(podcasts);
      // } catch (error) {
      //   // logout()
      //   // navigate("/signin")
      // }
    };

    fetchAbout()

    // if (token) fetchAbout();

    // console.log(about);

    // token ? fetchAbout() : (logout(), navigate("/signin"));
  }, [token]);

  const quillFormat = {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
    },

    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
    ],
  };

  const handleBlog = (content, delta, source, editor) => {
    // get state
    const company = { ...about };
    company.about = editor.getText();
    company.about_html = editor.getHTML();

    setAbout({ ...company });
  };

  const handleOption = (e, featureIndex) => {
    // get state
    const company = { ...about };
    company.featured_podcast[featureIndex] = e.value;

    setAbout({ ...company });
  };

  const handleText = ({ target }) => {
    const initialState = { ...about };
    initialState[target.name] = target.value;

    setAbout({ ...initialState });
  };

  const handleEdit = () => {
    if (disable) {
      setDisable(!disable);
      setEdit("Update");
    } else {
      setDisable(!disable);
      setEdit("Edit");

      // updateServer
      updateData(`v1/admin/about/${about.id}/`, { ...about }).then((res) => {});
    }
  };

  const showLoader = (
    <div className="App-centralize">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#000000"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );

  const loadPage = (
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
                  <SoftInput
                    name="name"
                    value={about.name}
                    disabled={disable}
                    onChange={handleText}
                  />

                  {/* <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Logo
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput value={about.logo} /> */}

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      About
                    </SoftTypography>
                  </SoftBox>

                  <div style={{ minHeight: 300 }}>
                    <ReactQuill
                      style={{ minHeight: 300 }}
                      modules={quillFormat.modules}
                      formats={quillFormat.formats}
                      value={about.about_html}
                      onChange={handleBlog}
                      readOnly={disable}
                    />
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
                          defaultValue={{
                            value: podcasts.find((x) => x?.id === about?.featured_podcast[0])?.id,
                            label: podcasts.find((x) => x?.id === about?.id)?.title,
                          }}
                          options={podcasts.map((x) => {
                            return { value: x.id, label: x.title };
                          })}
                          onChange={(e) => handleOption(e, 0)}
                          isDisabled={disable}
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
                          defaultValue={{
                            value: podcasts.find((x) => x?.id === about?.featured_podcast[1])?.id,
                            label: podcasts.find((x) => x?.id === about?.featured_podcast[1])
                              ?.title,
                          }}
                          options={podcasts.map((x) => {
                            return { value: x.id, label: x.title };
                          })}
                          onChange={(e) => handleOption(e, 1)}
                          isDisabled={disable}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Google Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="google_podcast"
                    value={about.google_podcast}
                    disabled={disable}
                    onChange={handleText}
                  />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Apple Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="apple_podcast"
                    value={about.apple_podcast}
                    disabled={disable}
                    onChange={handleText}
                  />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Spotify Podcast
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="spotify_podcast"
                    value={about.spotify_podcast}
                    disabled={disable}
                    onChange={handleText}
                  />
                </SoftBox>
                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftButton variant="gradient" color="info" onClick={handleEdit}>
                    {edit}
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );

  // return <>{about.about && podcasts[0] ? loadPage : showLoader}</>;
  return <>{about.name && token ? loadPage : showLoader}</>;
  // return <>{loadPage}</>;
};

export default Company;
