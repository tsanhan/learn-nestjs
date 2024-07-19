import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository  {

    // This method will return a message by its id
    async findOne(id: string) {
        const messages = await this.findAll();
        return messages[id];
    }
    
    // This method will return all messages
    async findAll() {
        const contents = await readFile('messages.json', 'utf-8');
        const messages = JSON.parse(contents);
        return messages;
    }

    // This method will create a new message
    async create(content: string) {
        const messages = await this.findAll();
        const id = Math.floor(Math.random() * 999);
        messages[id] = { id, content };
        await writeFile('messages.json', JSON.stringify(messages));
    }
}