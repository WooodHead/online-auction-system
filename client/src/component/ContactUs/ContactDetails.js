import {
	faComment,
	faEnvelope,
	faLocationDot,
	faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

// import style of Contact us
import classes from './ContactDetails.module.css';

const ContactDetails = () => {
	return (
		<React.Fragment>
			<div className={` ${classes.ContactDetails} p-0`}>
				<h4 className="text-center"> Contact Details</h4>

				<div className="mt-2">
					<FontAwesomeIcon
						icon={faLocationDot}
						className={classes.ContactIcon}
					/>
					<p> Company Address </p>
				</div>
				<div className="mt-2">
					<FontAwesomeIcon icon={faPhone} className={classes.ContactIcon} />
					<p> (+20) 12547554 </p>
				</div>
				<div className="mt-2">
					<FontAwesomeIcon icon={faEnvelope} className={classes.ContactIcon} />
					<p> onlineAuction@email.com </p>
				</div>

				<div className="mt-2">
					<FontAwesomeIcon icon={faComment} className={classes.ContactIcon} />
					<p> you can chat with Administrator</p>
					<Link className={`${classes.ChatNow} `} to="/">
						{' '}
						Chat Now{' '}
					</Link>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ContactDetails;