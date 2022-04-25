import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

/**
 * This service combine all methods that work with date
 */

@Injectable()
export class HandleDateService {
	constructor() {}

	//? Set the format of the date in chat message
	private static readonly dateFormatForChatMessage: string =
		'dddd, MMMM Do YYYY, h:mm:ss a';

	private static readonly auctionEndDateDifference: number = 7;

	/**
	 * Use moment to get the current date in good format
	 * @returns string representing the date in simple format
	 */
	public static getCurrentDateFormatted(): string {
		return moment().format(this.dateFormatForChatMessage);
	}

	/**
	 * Use moment to add period of time to the given start date
	 * @param auctionStartDate - Auction start date
	 * @returns End date for the auction
	 */
	public static getNewEndDateFromStartDate(auctionStartDate: Date) {
		return moment(auctionStartDate).add(this.auctionEndDateDifference, 'days');
	}
}
