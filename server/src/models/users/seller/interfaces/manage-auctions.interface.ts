import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { CreateAuctionDto, UpdateAuctionDto } from 'src/models/auction/dto';
import { Auction } from 'src/models/auction/schema/auction.schema';
import { SellerDocument } from '../schema/seller.schema';

export interface AuctionsBehaviors {
	//* Add new auction to the seller account
	addAuction(
		createAuctionDto: CreateAuctionDto,
		seller: SellerDocument,
	): Promise<Auction>;

	//* List all auctions for that seller
	listAuctions(seller: SellerDocument): Promise<Auction[]>;

	//* Edit seller's auction details
	editAuction(
		updateAuctionDto: UpdateAuctionDto,
		seller: SellerDocument,
	): Promise<Auction>;

	//* Remove auction of that seller
	removeAuction(id: MongoObjectIdDto, sellerId: string): Promise<Auction>;
}
