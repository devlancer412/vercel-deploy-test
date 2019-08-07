import React from "react";

import { Layout } from "../../components";

const Article = ({ url: { query } }) => {
  return <Layout>{query.handle}</Layout>;
};

export default Article;
