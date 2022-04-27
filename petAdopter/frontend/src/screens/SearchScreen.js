import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ListPets } from "../actions/petActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Pet from "../components/Pet";
import Rating from "../components/Rating";
// import { prices, ratings } from "../utils";

const SearchScreen = (props) => {
	const {
		name = "all",
		species = "all",
		min = 0,
		max = 0,
		rating = 0,
		application = "newest",
		pageNumber = 1,
	} = useParams();
	const dispatch = useDispatch();
	const petList = useSelector((state) => state.petList);
	const { loading, error, pets, page, pages } = petList;

	const petSpeciesList = useSelector((state) => state.petSpeciesList);
	const {
		loading: loadingSpecieses,
		error: errorSpecieses,
		specieses,
	} = petSpeciesList;
	useEffect(() => {
		dispatch(
			ListPets({
				pageNumber,
				name: name !== "all" ? name : "",
				species: species !== "all" ? species : "",
				min,
				max,
				rating,
				application,
			})
		);
	}, [species, dispatch, max, min, name, application, rating, pageNumber]);

	const getFilterUrl = (filter) => {
		const filterPage = filter.page || pageNumber;
		const filterCategory = filter.species || species;
		const filterName = filter.name || name;
		const filterRating = filter.rating || rating;
		const sortApplication = filter.application || application;
		const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
		const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
		return `/search/species/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/application/${sortApplication}/pageNumber/${filterPage}`;
	};
	return (
		<div>
			<div class="d-flex justify-content-between align-items-center mb-3">
				<span>
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant="danger">{error}</MessageBox>
					) : (
						<div text-primary>{pets.length} Results</div>
					)}
				</span>
				<strong className="custom-badge text-uppercase">
					Sort by{" "}
					<select
						value={application}
						onChange={(e) => {
							props.history.push(getFilterUrl({ application: e.target.value }));
						}}
					>
						<option value="newest">Newest Arrivals</option>

						<option value="toprated">Avg. Customer Reviews</option>
					</select>
				</strong>
			</div>

			<div className="row top">
				<div className="d-none d-sm-block col-sm-4 col-md-3 col-lg-2">
					<div className="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white bg-light">

						<ul className="list-group flex-column mb-auto">
							<li className="list-group-item list-group-item-action active">
								Back to All
							</li>
							<li className="list-group-item list-group-item-action">
								{loadingSpecieses ? (
									<LoadingBox></LoadingBox>
								) : errorSpecieses ? (
									<MessageBox variant="danger">{errorSpecieses}</MessageBox>
								) : (
									<ul>
										<li>
											<Link
												className={"all" === species ? "active" : ""}
												to={getFilterUrl({ species: "all" })}
											>
												All
											</Link>
										</li>
										{specieses?.map((c) => (
											<li key={c}>
												<Link
													className={c === species ? "active" : ""}
													to={getFilterUrl({ species: c })}
												>
													{c}
												</Link>
											</li>
										))}
									</ul>
								)}
							</li>

						</ul>
					</div>
				</div>

				<div className="col-sm-8 col-md-9 col-lg-10">
					{loading ? (
						<LoadingBox></LoadingBox>
					) : error ? (
						<MessageBox variant="danger">{error}</MessageBox>
					) : (
						<>
							{pets.length === 0 && (
								<MessageBox>No pet Found</MessageBox>
							)}
							<div className="row">
								{pets.map((pet) => (
									<Pet key={pet._id} pet={pet}></Pet>
								))}
							</div>

						</>
					)}

					<ul className="pagination">
						{[...Array(pages).keys()].map((x) => (
							<Link
								className="page-item "
								key={x + 1}
								to={getFilterUrl({ page: x + 1 })}
							>
								{x + 1}
							</Link>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SearchScreen;
