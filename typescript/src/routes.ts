import { Request, Response } from "express"
import createUser from "./services/CreateUser"

export function helloWorld(request: Request, response: Response){
   const user = createUser({
      name: "PitzTech",
      email: "victorlaurentino7@gmail.com",
      password: "senha123",
      techs: [
         "Node.js",
         "ReactJS",
         "React Native",
         { title: "Javascript", experience: 100 }
      ],
      nicks: [
         "Pitz",
         "victor"
      ]
   })

   return response.json({ message: "Hello World!" })
}