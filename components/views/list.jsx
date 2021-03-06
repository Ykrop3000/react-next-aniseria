import { Grid, NoSsr } from "@mui/material";
import SubHeader from "components/base/subHeader";

import dynamic from "next/dynamic";

const Filter = dynamic(import("components/filter/filter"));
const SecondaryFilter = dynamic(import("components/filter/secondaryFilter"));
const Paginator = dynamic(import("components/paginator"));

export default function Home({
  children,
  title = "Каталог",
  pages,
  useFilter = true,
  useSecondaryFilter = true,
  secondaryChildren,
}) {
  return (
    <>
      <SubHeader secondaryChildren={secondaryChildren} title={title}>
        {useFilter && <Filter />}
      </SubHeader>
      <div className="container narrowContainer">
        <NoSsr>{useSecondaryFilter && <SecondaryFilter />}</NoSsr>
        <div className="list">
          <Grid container spacing={2}>
            {children}
          </Grid>
        </div>
        <NoSsr>{pages && <Paginator pages={pages} />}</NoSsr>
      </div>
    </>
  );
}
