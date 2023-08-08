import React from "react";

import { Helmet } from "react-helmet";

import Faq from "./faq/Faq";
import GigFinder from "./gig_finder/GigFinder";
import PartOfGig from "./part_of_gig/PartOfGig";
import OwlCrousal from "./owl_crousal/OwlCrousal";
import FindNextGig from "./find_next_gig/FindNextGig";
import Organization from "./organizations/Organization";
import SearchIndustry from "./search_industry/SearchIndustry";
import WhatMakeDiffrent from "./what_make_different/WhatMakeDiffrent";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <FindNextGig />
      <WhatMakeDiffrent />
      <SearchIndustry />
      <OwlCrousal />
      <PartOfGig />
      <Organization />
      <GigFinder />
      <Faq />
    </div>
  );
};

export default Home;
