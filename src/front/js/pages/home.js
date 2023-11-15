import React, { useContext } from "react";
import { Context } from "../store/appContext";

import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/style.css"
import Description from "../component/Description";
import Portfolio from "../component/Portfolio";




export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-6">


			<Description></Description>
			<Portfolio></Portfolio>
			





		
		</div>
	);
};

export default Home;