import { Card, Divider, Grid, Switch } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftDatePicker from "components/SoftDatePicker";
import SoftInput from "components/SoftInput";
import SoftSelect from "components/SoftSelect";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbar";
import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { fetchData, postData, updateData } from "shared/data";

const CreateBlog = () => {
  const sampleBlog = {
    published_date: "",
    title: "",
    is_published: true,
    body_html: "",
    body: "",
  };

  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const pathArr = path.split("/");
  const isEdit = pathArr.includes("edit");
  const id = pathArr.at(-1);

  const [blog, setBlog] = useState(sampleBlog);

  useEffect(() => {
    // if edit
    // get blog
    if (isEdit) {
      // fetch blog
      const fetchBlog = async () => {
        const { data: blog } = await fetchData(`v1/admin/blog/${id}`);

        setBlog({ ...blog });
      };
      fetchBlog();
    }
  }, []);

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
    const initialBlog = { ...blog };
    initialBlog.body = editor.getText();
    initialBlog.body_html = editor.getHTML();

    setBlog({ ...initialBlog });
  };

  const handleText = ({ target }) => {
    const initialState = { ...blog };
    initialState[target.name] = target.value;

    setBlog({ ...initialState });
  };

  const handleDate = (e) => {
    const initialState = { ...blog };
    initialState.published_date = e[0].toISOString();

    setBlog({ ...initialState });
  };

  const handleCheck = () => {
    const initialState = { ...blog };
    initialState.is_published = !initialState.is_published;

    setBlog({ ...initialState });
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateData(`v1/admin/blog/${id}/`, { ...blog }).then((res) => {
        navigate("/blogs/blog");
      });
    } else {
      postData("v1/admin/blog/", { ...blog }).then((res) => {
        navigate("/blogs/blog");
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
                  Blog
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
                  <SoftInput name="title" value={blog.title} onChange={handleText} />

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
                          value={blog.published_date}
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
                          checked={blog.is_published}
                          onChange={handleCheck}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

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
                      value={blog.body_html}
                      onChange={handleBlog}
                    />
                  </div>
                  {/* <SoftInput /> */}
                </SoftBox>

                <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                  <SoftButton variant="gradient" color="info" onClick={handleSubmit}>
                    {isEdit ? "Edit" : "Create"}
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );

  return <>{!isEdit || blog.body_html ? loadPage : showLoader}</>;
};

export default CreateBlog;
