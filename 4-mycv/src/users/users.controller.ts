import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { log } from 'console';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthError, AuthService } from './auth.service';
import { CurrnetUser } from './decorators/currnet-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {
        
        
    }

   
    // @Get('/whoami')
    // whoAmI(@Session() session: any) {

    //     const user = this.usersService.findOne(session.userId);
    //     if(!user) 
    //         throw new NotFoundException('user not found');
    //     return user;
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrnetUser() user: User) {
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        
        session.userId = user.id;
        return user;
    }
 
    @Get('/:id')
    async findUser(@Param("id") id: string) {
        log('handler is running');
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const deletedUser = await this.usersService.remove(parseInt(id));
        if(!deletedUser) 
            throw new NotFoundException('user not found');
        return deletedUser;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const updatedUser = await this.usersService.remove(parseInt(id));
        if(!updatedUser) 
            throw new NotFoundException('user not found');
        return this.usersService.update(parseInt(id), body);
    }

}
