import { Grid } from "@material-ui/core";

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
}) {
  return (
    <>
      {useFilter && <Filter title={title} />}

      <div className="container">
        {useSecondaryFilter && <SecondaryFilter />}

        <div className="list">
          <Grid container spacing={2}>
            {children}
          </Grid>
        </div>

        {pages && <Paginator pages={pages} />}
      </div>
    </>
  );
}
