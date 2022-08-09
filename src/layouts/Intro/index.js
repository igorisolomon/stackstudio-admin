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

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Navbar from "components/Navbar";
import DashboardNavbar from "examples/Navbar";

import ReactQuill from "react-quill";
import { fetchData, updateData } from "shared/data";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";

function Intro() {
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

  const token = localStorage.getItem("stackstudioToken");
  const [about, setAbout] = useState(aboutSample);
  const [disable, setDisable] = useState(true);
  const [edit, setEdit] = useState("edit");

  useEffect(() => {
    // fetch About
    const fetchAbout = async () => {
      try {
        const { data: company } = await fetchData("v1/admin/about/");

        setAbout({ ...company });
      } catch (error) {
        // logout();
        // navigate("/signin");
      }
    };
    if (token) fetchAbout();
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
    company.intro_description = editor.getText();
    company.intro_description_html = editor.getHTML();

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
      updateData(`v1/admin/about/${about.id}/`, { ...about }).then((res) => {
        // call toast
      });
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
                  INTRO
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
                      Title
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    name="intro_title"
                    value={about.intro_title}
                    disabled={disable}
                    onChange={handleText}
                  />

                  <SoftBox mt={3} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Description
                    </SoftTypography>
                  </SoftBox>

                  <div style={{ minHeight: 300 }}>
                    <ReactQuill
                      style={{ minHeight: 300 }}
                      modules={quillFormat.modules}
                      formats={quillFormat.formats}
                      value={about.intro_description_html}
                      onChange={handleBlog}
                      readOnly={disable}
                    />
                  </div>
                  {/* <SoftInput /> */}
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

  // return <>{about.about ? loadPage : showLoader}</>;
  return <>{about.intro_description_html && token ? loadPage : showLoader}</>;
  // return <>{loadPage}</>;
}

export default Intro;
