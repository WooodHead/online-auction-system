import { Expose, Transform } from 'class-transformer';
import { ExposeObjectId } from '../../../common/decorators/mongo/expose-id.decorator';
import { SerializeIt } from 'src/common/utils';
import { UserDto } from 'src/models/users/shared-user/dto';
import { User } from 'src/models/users/shared-user/schema/user.schema';

/**
 * Auction dto - Describe what auction data to be sent over the network
 */
export class AuctionDto {
  @Expose()
  @ExposeObjectId()
  _id: string;

  @Expose()
  product: string;

  @Expose()
  initialPrice: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  status: string;

  @Expose()
  @Transform(({ obj }) => {
    //* Serialize  the seller object to remove the sensitive data
    return SerializeIt(UserDto, obj.seller);
  })
  seller: User;
}
