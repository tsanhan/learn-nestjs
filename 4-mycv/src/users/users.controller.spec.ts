import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => Promise.resolve({id, email:"asd@asd.com", password:"123"} as User),
      find: (email: string) => Promise.resolve([{id:1, email, password:"123"}] as User[]),
      // remove: (id: number) => Promise.resolve({} as User),
      // update: (id: number, attrs: Partial<User>) => Promise.resolve({} as User),
    };
    fakeAuthService = {
      // signup: (email: string, password: string) => Promise.resolve({} as User),
      signin: (email: string, password: string) => Promise.resolve({
        id: 1,
        email,
        password
      } as User),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with a given email', async () => {
    const users = await controller.findAllUsers("asd@asd.com")
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual("asd@asd.com");
  });

  it('findUser returns a single user with a given id', async () => {
    expect(await controller.findUser('1')).toBeDefined();
  });
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signin updates session object and returns user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin({ 
      email: "asd@asd.com",
      password: "123"
    }, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
  
});
