import { Authorized, Body, CurrentUser, Get, HttpError, JsonController, Param, Post, Put, Req, UseBefore } from "routing-controllers";
import { CreateUserDto } from "../dto/createUserDto";
import { LoginUserDto } from "../dto/loginUserDto";
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";
import { MulterUpload } from "../multer/usersPhoto";

@JsonController('/users')
export class UserController {

  @Post('/register')
  @UseBefore(MulterUpload)
  async create(@Body() userData: CreateUserDto, @Req() req: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User();
    newUser.username = userData.username;
    newUser.password = hashedPassword;
    newUser.displayName = userData.displayName;
    newUser.email = userData.email;
    newUser.token = nanoid();
    newUser.role = 'user';

    if (req.file) {
      newUser.avatar = req.file.filename; 
    }

    await UserRepository.save(newUser);

    const responseUser = {
      id: newUser.id,
      username: newUser.username,
      token: newUser.token,
      role: newUser.role
    };

    return responseUser;
  }

  @Post('/login')
  async login(@Body() loginData: LoginUserDto) {
    const user = await UserRepository.findOne({ where: { username: loginData.username } });

    if (!user) throw new HttpError(401, "User not found");

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isPasswordMatch) throw new HttpError(401, "Unauthorized");

    user.token = nanoid();
    await UserRepository.save(user);

    return { token: user.token, username: user.username, id: user.id, role: user.role };;
  }
  
  @Get('/profile')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
  
  @Put('/profile')
  async updateProfile(@Body() profileData: any, @CurrentUser() user: User) {
    user.displayName = profileData.displayName || user.displayName;
    user.avatar = profileData.avatar || user.avatar;
    user.email = profileData.email || user.email;

    if (profileData.password) {
      user.password = await bcrypt.hash(profileData.password, 10);
    }

    await UserRepository.save(user); 
    return user;
  }

  @Authorized('admin')
  @Post('/make-admin/:userId')
  async makeAdmin(@Param('userId') userId: number) {
    const user = await UserRepository.findOne({ where: { id: userId } });

    if (!user) throw new HttpError(400, "User not found");

    user.role = 'admin';
    await UserRepository.save(user);

    return { message: 'Role updated to admin' };
  }

}