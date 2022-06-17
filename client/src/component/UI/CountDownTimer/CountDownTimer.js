import React, { useCallback } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useTimer from '../../../CustomHooks/useTimer';

import classes from './CountDownTimer.module.css';

const CountDownTimer = ({AuctionDate , status}) => {
	const getDate = useCallback((AuctionDate) => {
		const timer = useTimer(new Date(AuctionDate));
		let timeOut , timeOut2
		if(timer.isTimeUp && status === 'upcoming' ){
			toast.success(`Auction Will Be UpGoing Now, If You Ready For Bidding , Join Now ❤️‍🔥`)
			timeOut = setTimeout(()=>{
				window.location.reload()

			},3000)
		}
		if(timer.isTimeUp && status === 'ongoing' ){
			toast.success(`Auction will Be Closed Now 💔🙃`)
			timeOut2 = setTimeout(()=>{
				window.location.reload()

			},3000)
		}


		return (
			<>
				<span> {timer.days} Days </span>
				<span> {timer.hours} h</span>
				<span> {timer.minutes} m</span>
				<span> {timer.seconds} s</span>
				{(timer.isTimeUp && status === 'upcoming' ) && (() => clearTimeout(timeOut)) }
				{(timer.isTimeUp && status === 'ongoing' ) && (() => clearTimeout(timeOut2)) }


			</>

		);
	},[AuctionDate]);

	return (
		<React.Fragment>
				<ToastContainer theme="dark" />
				<div className={classes.Timer}>
					{getDate(AuctionDate)}
				</div>
		</React.Fragment>
	)

};

export default React.memo(CountDownTimer);
