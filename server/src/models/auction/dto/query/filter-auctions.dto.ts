import {
	IsDate,
	IsEnum,
	IsOptional,
	IsMongoId,
	IsBooleanString,
} from 'class-validator';
import { AuctionStatusForSearch } from '../../enums';

export class FilterAuctionQueryDto {
	@IsOptional()
	@IsEnum(AuctionStatusForSearch, {
		message: 'Sorry, status must be one of [pending, accepted, closed] 👀',
	})
	status: AuctionStatusForSearch;

	@IsOptional()
	@IsMongoId()
	category: string;

	@IsOptional()
	@IsBooleanString()
	populate: string;
}
