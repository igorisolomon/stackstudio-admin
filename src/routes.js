// Soft UI Dashboard PRO React icons
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Company from "layouts/Company";
import Intro from "layouts/Intro";
import Lists from "layouts/List";
import CreatePodcast from "layouts/Podcast";
import CreateBlog from "layouts/Blog";
import Signin from "layouts/Signin";

const routes = [
  {
    type: "collapse",
    name: "Company",
    key: "company",
    icon: <Office size="12px" />,
    collapse: [
      {
        name: "About",
        key: "about",
        route: "/company/about",
        component: <Company />,
      },
      {
        name: "Intro",
        key: "intro",
        route: "/company/intro",
        component: <Intro />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Blog",
    key: "blogs",
    route: "/blogs/blog",
    icon: <Document size="12px" />,
    component: <Lists title="Blog" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Podcast",
    key: "podcasts",
    route: "/podcasts/podcast",
    icon: <CustomerSupport size="12px" />,
    component: <Lists title="Podcast" />,
    noCollapse: true,
  },
  {
    key: "createBlog",
    route: "/blogs/blog/create",
    component: <CreateBlog />,
    noCollapse: true,
  },
  {
    key: "editBlog",
    route: "/blogs/blog/edit/:id",
    component: <CreateBlog />,
    noCollapse: true,
  },
  {
    key: "createPodcast",
    route: "/podcasts/podcast/create",
    component: <CreatePodcast />,
    noCollapse: true,
  },
  {
    key: "editPodcast",
    route: "/podcasts/podcast/edit/:id",
    component: <CreatePodcast />,
    noCollapse: true,
  },
  {
    key: "signin",
    route: "/signin",
    component: <Signin />,
    noCollapse: true,
  },
  {
    key: "def",
    route: "*",
    component: <Signin />,
    noCollapse: true,
  },
];

export default routes;
