import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        //this.repo.insert(user); // perform insert operation
         return this.repo.save(user); // theck exsisitng user and perform insert or update operation
    }

    findOne(id: number) {
        if (!id) 
            return null;
        return this.repo.findOneBy({ id });
    }

    findOneByEmail(email: string) {
        return this.repo.findOneBy({ email });
    }

    find(email: string) {
        return this.repo.find({where: {email}});
    }

    async update(id: number, attrs: Partial<User>) {
        const user  = await this.findOne(id);
        if (!user) {
            throw null
        }
        Object.assign(user, attrs);
        return this.repo.save(user);

        // better way to update:
        //return this.repo.update(id, attrs);
    }

    async remove(id: number):Promise<User> {
        const user  = await this.findOne(id);
        if (!user) 
            return null;
        
        return this.repo.remove(user);
    }
}

