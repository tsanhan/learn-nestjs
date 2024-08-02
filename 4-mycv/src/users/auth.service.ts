import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scryptSync} from 'crypto';

export enum AuthError {
    UserExists = 'User with that email already exists',
    UserNotFound = 'User with that email not found',
    BadPassword = 'Bad password'
}

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {
    }

    async signup(email: string, password: string) {
        // see if user with email exists
        const isUserExsist = await this.usersService.find(email);
        if(isUserExsist.length) 
            throw new BadRequestException(AuthError.UserExists);

        // hash the password 
            // generate a salt
        const salt = randomBytes(8).toString('hex');
            // hash the password with the salt
        const hash = scryptSync(password, salt, 32).toString('hex');;
            // join the salt and the hashed password
        const result = `${salt}.${hash}`;
        
        // creatre a new user and save it
        const user = await this.usersService.create(email, result);

        // return the user
        return user
    }

    async signin(email: string, password: string) {
        const user = await this.usersService.find(email);
        if(!user.length) 
            throw new NotFoundException(AuthError.UserNotFound);
        const fownUser = user[0];
        const [salt, storedHash] = fownUser.password.split('.');
        const hash = scryptSync(password, salt, 32).toString('hex');
        if(hash !== storedHash) 
            throw new NotFoundException(AuthError.BadPassword);
        
        return fownUser;
        
    }
}