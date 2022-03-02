import { Module, Logger } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Auction,
	AuctionDocument,
	AuctionSchema,
} from './schema/auction.schema';
import { ItemModule } from '../items/item.module';
import { CategoryModule } from '../category/category.module';
import { ItemService } from './../items/item.service';

@Module({
	imports: [
		ItemModule,
		CategoryModule,
		MongooseModule.forFeatureAsync([
			{
				name: Auction.name,
				imports: [ItemModule],
				useFactory: (itemService: ItemService) => {
					const logger: Logger = new Logger('Auction Mongoose Module');
					const schema = AuctionSchema;
					//? Add the auto-populate plugin
					schema.plugin(require('mongoose-autopopulate'));

					/**
					 * Pre hook to remove the item related to the auction
					 */
					schema.pre<AuctionDocument>('remove', async function () {
						//* Remove the item by id
						//@ts-ignore
						await itemService.remove(this.item._id);
						logger.log('Remove the item related to that auction...🧺');
					});

					return schema;
				},
				inject: [ItemService],
			},
		]),
	],
	providers: [AuctionsService],
	exports: [
		AuctionsService,
		MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
	],
})
export class AuctionsModule {}
