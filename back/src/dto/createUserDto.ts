import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Username is too short. Minimum length is 4 characters.' })
  @MaxLength(20, { message: 'Username is too long. Maximum length is 20 characters.' })
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password is too short. Minimum length is 8 characters.' })
  @MaxLength(32, { message: 'Password is too long. Maximum length is 32 characters.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak.' })
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: 'Display Name is too short. Minimum length is 4 characters.' })
  @MaxLength(50, { message: 'Display Name is too long. Maximum length is 50 characters.' })
  displayName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}