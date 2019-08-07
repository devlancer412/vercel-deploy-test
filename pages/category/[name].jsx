import React from "react";

import { Layout } from "../../components";

const Category = ({ url: { query } }) => {
  return <Layout>{query.name}</Layout>;
};

export default Category;
