import fs from "fs";
import {v4 as uuidv4} from "uuid";


export class UserManager {
    constructor(path){
        this.path = path
    }

    async getUsers(){
        try{
            if(fs.existsSync(this.path)){
                const    users = await fs.promises .readFile(this.path, "utf8");
                return JSON.parse(users)
            } else return [];
            } catch (error) {
                console.log(error)
            }
        }

        async createUser(obj){
            try {
                const user = {
                    id: uuidv4(),
                    ...obj
                };
                const userFile = await this.getUsers();
                const userExist = userFile.find((u) => u.username === user.username);
                if(userExist) return null
                userFile.push(user);
                await fs.promises.writeFile(this.path, JSON.stringify(userFile));
                return user;
            }  catch (error) {
                console.log(error)
            }
        }
















        async getUserById(id){
            try{
                const userFile = await this.getUsers();
                const userExist = userFile.find((u) => u.id === id);
                if(!userExist) return null;
                return userExist;
            } catch (error) {
                console.log(error);
            }
        }
        

        async updateUser(obj,id){
            try{
                const userFile = await this.getUsers();
                let userExist = await this.getUserById(id);
                if(!userExist) return null;
                userExist = {...userExist, ...obj };
                const newArray = userFile.filter((u) => u.id !== id);
                newArray.push(userExist);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return userExist;
            }  catch (error) {
                console.log(error)
            }

            }
        
            async deleteUser(id){
                try{
                    const userFile = await this.getUsers();
                    if(userFile.length > 0) {
                        const userExist = await this.getUserById(id);
                        if(userExist){
                            const newArray = userFile.filter((u) => u.id !== id);
                            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                            return userExist
                        }
                    }else return null;
                } catch (error) {
                    console.log(error);
                }
            }

    }
