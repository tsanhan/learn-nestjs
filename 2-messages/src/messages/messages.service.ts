import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';


@Injectable()
export class MessagesService {
    constructor(public messagesRepo: MessagesRepository) {}

    // This method will return a message by its id
    async findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }

    // This method will return all messages
    async findAll() {
        return this.messagesRepo.findAll();
    }

    // This method will create a new message
    async create(content: string) {
        return this.messagesRepo.create(content);
    }
}