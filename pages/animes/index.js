import React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { fetchAnimes } from "src/api";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

import List from "components/views/list";
import GridCard from "components/cards/gridCard";
import Head from "next/head";
const ListCard = dynamic(import("components/cards/listCards/fullCard"));

const SkeletonItem = () => {
	return (
		<Grid item xs={4} sm={3} md={2}>
			<Skeleton variant="rectangular" animation="wave" width={"100%"}>
				<GridCard data={{ url: "/", image: { preview: "" } }} />
			</Skeleton>
			<Skeleton variant="text" animation="wave" width={"100%"} />
		</Grid>
	);
};

function Animes({ mode, data = {}, totalPages, setStateAnimes, stateList }) {
	const router = useRouter();
	// const isFirstRun = React.useRef(true);
	const [animes, setAnimes] = React.useState(stateList || data);

	const getAnimes = async () => {
		const resp = await fetchAnimes({
			limit: 30,
			order: "popularity",
			...router.query,
		});
		setAnimes(resp.data);
		setStateAnimes(resp.data);
	};

	React.useEffect(() => {
		getAnimes();
	}, [router.query]);
	//
	return (
		<>
			<Head>
				<title key="title">{`Каталог аниме | AniSeria`}</title>
				<meta
					key="description"
					name="description"
					content="`Каталог аниме онлайн бесплатно. Большая база лучших аниме с русской озвучкой в хорошем качестве."
				/>
			</Head>
			<List title="Каталог аниме" pages={totalPages}>
				{/* {animes.length == 0
          ? Array.from(new Array(30)).map((_) => <SkeletonItem />)
          : null} */}
				{animes.map((anime) =>
					mode === "grid" ? (
						<Grid key={anime.id} item xs={4} sm={3} md={2}>
							<GridCard key={anime.id} data={anime} />
						</Grid>
					) : (
						<ListCard key={anime.id} data={anime} />
					)
				)}
			</List>
		</>
	);
}
// export async function getServerSideProps({ query }) {
//   const resp = await fetchAnimes({
//     limit: 30,
//     order: "ranked",
//     ...query,
//   });
//   return { props: { data: resp.data, totalPages: 10 } };
// }
// Animes.getInitialProps = async ({ query }) => {
//   const resp = await getAnimesApi({
//     limit: 30,
//     order: "popularity",
//     query,
//   });
//   return { data: resp.data };
// };

const mapStateToProps = (state) => ({
	mode: state.list.viewMode,
	stateList: state.list.animes,
});
const mapDispatchToProps = (dispatch) => {
	return {
		setStateAnimes: (payload) => dispatch({ type: "ANIMES", payload: payload }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Animes);
