import React ,{ Fragment} from "react";
import CurrentAuctions from "./CurrentAuctions/CurrentAuctions";
import Header from "./Header/Header";
import UpGoingAuctions from "./UpGoingAuctions/UpGoingAuctions";

import scollbarStyle from '../UI/ScrollBar.module.css'
import Categories from "./Categories/Categories";


const HomePage = () => {
	return (
		<Fragment>
			<div className= {`${scollbarStyle.scollbar} container-fluid px-0`} style={{backgroundColor: "#191a19" , minHeight:"100vh"}}>
				<Header/>
				<div className="d-md-flex mb-5">
					<Categories/>
					<UpGoingAuctions/>
				</div>
					<CurrentAuctions/>
			</div>


		</Fragment>
	);
}

export default HomePage;