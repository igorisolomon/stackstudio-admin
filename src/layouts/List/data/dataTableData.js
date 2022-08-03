import ActionCell from "../components/ActionCell";

const data = (row) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const asDate = new Date(date);

    return asDate.toLocaleDateString("en-GB", options);
  };

  const new_row = row.map((item) => {
    item["published_date"] = formatDate(item["published_date"]);
    item["action"] = <ActionCell id={item.id} />;
    return item;
  });

  return {
    columns: [
      { Header: "date", accessor: "published_date", width: "20%" },
      { Header: "title", accessor: "title" },
      { Header: "action", accessor: "action", width: "10%" },
    ],

    rows: new_row,
  };
};

export default data;
