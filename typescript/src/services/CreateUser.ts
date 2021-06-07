interface TechObject {
   title: string
   experience: number
}

interface CreateUserData {
   name ?: string
   email: string
   password: string 
   techs: Array<string | TechObject>
   nicks ?: string[]
}

//export default function createUser(name = "", email: string, password: string) {
export default function createUser({ name = '', email, password }: CreateUserData) {   
   const user = {
      name,
      email,
      password
   }

   return user
}