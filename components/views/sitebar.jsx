import { useState } from "react";

import Section from "components/pagesComponent/siteBar/section";
import ShowMore from "components/buttons/showMore";
import SiteBarWrap from "components/views/siteBarWrap";

export default function SiteBar({ children, title = "Каталог" }) {
  const [full, setfull] = useState(false);

  return (
    <SiteBarWrap>
      <Section title={title}>
        {!full && children.slice(0, 4)}
        {full && children}
        <ShowMore val={full} set={setfull} />
      </Section>
    </SiteBarWrap>
  );
}
