import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';
import { AvailableRolesForRegister } from 'src/models/users/shared-user/enums';

export class RegisterUserDto {
	@IsString()
	name = 'Anonymes';

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	password: string;

	@IsEnum(AvailableRolesForRegister, {
		message: 'Role must be either seller or buyer 🙂',
	})
	role: AvailableRolesForRegister;
}
