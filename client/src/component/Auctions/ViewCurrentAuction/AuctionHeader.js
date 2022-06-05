import React, { Fragment, useEffect, useState } from 'react';
import AuctionDetails from './AuctionDetails';
import Bids from './Bids';

import classes from './ViewCurrentAuction.module.css';

function AuctionHeader({ AuctionData , isShownBidsProp , socket , roomData }) {
	const [isShownDetails, setIsShownDetails] = useState(true);
	const [isShownBids, setIsShownBids] = useState(false);


	const btnDetailsHandler = () => {
		setIsShownDetails(true);
		setIsShownBids(false);
	};

	const btnBidsHandler = () => {
		setIsShownDetails(false);
		setIsShownBids(true);
	};

	// start show bid when bidder joined in auction and want to bid
	useEffect(()=>{
		if(isShownBidsProp){
			btnBidsHandler()
		}
		else{
			btnDetailsHandler()
		}
	},[isShownBidsProp])
	// end show bid when bidder joined in auction and want to bid


	return (
		<Fragment>
			<div className={classes.AuctionHeader}>
				<button
					className={`btn ${isShownDetails && !isShownBids ? classes.ActiveLink : ''}`}
					onClick={btnDetailsHandler}
				>
					Details
				</button>

					<button
						className={`btn ${isShownBids ? classes.ActiveLink : ''} ${classes.showBidsBtn}`}
						onClick={btnBidsHandler}
					>
						Bids
					</button>

			</div>
			{isShownDetails && <AuctionDetails
				data={AuctionData && AuctionData}
				/>
			}
			{isShownBids &&	<Bids
					socket={socket}
					roomData={(AuctionData && AuctionData['status'] !== 'ongoing') ? AuctionData : roomData   }
				/>
			}


		</Fragment>
	);
}

export default AuctionHeader;
