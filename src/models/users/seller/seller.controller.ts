import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { GetCurrentUserData, Roles } from 'src/common/decorators';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionDocument } from 'src/models/auction/schema/auction.schema';
import { Role } from '../shared-user/enums';
import { AuctionsBehaviors } from './interfaces';
import { Seller, SellerDocument } from './schema/seller.schema';
import { SellerService } from './seller.service';

@Roles(Role.Seller)
@Controller('seller')
export class SellerController implements AuctionsBehaviors {
  constructor(private readonly sellerService: SellerService) {}

  /* Handle Auctions Functions */
  @Post('auction')
  addAuction() {
    throw new Error('Method not implemented.');
  }

  @Get('auction')
  listAuctions(
    @GetCurrentUserData() seller: SellerDocument, // Get the current logged in seller
  ): Promise<AuctionDocument[]> {
    return this.sellerService.listAuctions(seller);
  }

  @Patch('auction/:id')
  editAuction() {
    throw new Error('Method not implemented.');
  }

  @Delete('auction/:id')
  removeAuction(
    @Param() { id }: MongoObjectIdDto, // auction id
    @GetCurrentUserData('_id') sellerId: string,
  ) {
    return this.sellerService.removeAuction(id, sellerId);
  }
}
