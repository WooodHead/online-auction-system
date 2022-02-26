import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Serialize } from 'src/common/interceptors';
import { UserDto } from './dto';
import { Role } from './enums';
import { MongoObjectIdDto } from 'src/common/dto/object-id.dto';
import { AuctionDto } from 'src/models/auction/dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * List all system users
	 * @returns List of all users
	 */
	@Roles(Role.Admin)
	@Serialize(UserDto)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	/**
	 * List specific category auctions
	 * @param category id
	 * @returns List of category's auctions
	 */
	@Roles(Role.Admin, Role.Employee, Role.Seller, Role.Buyer)
	@Serialize(AuctionDto)
	@Get('category/:id/auctions')
	getAuctionsOfCategory(@Param() { id }: MongoObjectIdDto) {
		return this.usersService.getAuctionsOfCategory(id);
	}
}