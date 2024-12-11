import { Client } from "pg";

const client = new Client({
    // host:"@ep-tiny-cell-a5zscnvk.us-east-2.aws.neon.tech",
    // port:5432,
    // database:"postgres",
    // user:"test_owner",
    // password:"Fo6rRtEwMh5Q" 
    // OR paste connectionstring directly
    connectionString:"postgresql://test_owner:Fo6rRtEwMh5Q@ep-tiny-cell-a5zscnvk.us-east-2.aws.neon.tech/test?sslmode=require"

})



async function createTable():Promise<void>{
    await client.connect()
    const createTable = `CREATE TABLE Users(
    Id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
    )`                                                             // CURRENT_TIMESTAMP RETUNS CURRENT DATE AND TIME 

   const result = await client.query(createTable)

    // await client.query(`CREATE TABLE Users(    this will also work
    // Id SERIAL PRIMARY KEY 
    // username varchar(255) NOT NULL
    // email VARCHAR(255) UNIQUE NOT NULL
    // password VARCHAR(255) NOT NULL
    // created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP  
    // )`)
}

createTable().then(()=>{
    console.log("created succefully")
}).catch((e)=>{
    console.error("Error while creating error---",e)
})


//Create a function that let’s you insert data into a table. Make it async, make sure client.connect resolves before u do the insert

async function insertValues(){
    await client.connect()

    const insert = `INSERT INTO Users (username,email,password) VALUES ($1,$2,$3)`

   const res = client.query(insert,["tejas","tejas@gmail.com","123456"])
   console.log("insert successfully",res)

}


// get users

async function getUsers(email:string){

    await client.connect()

    const getuser = `SELECT * FROM Users WHERE email=$1` 

    const result = await client.query(getuser,[email])
    
    if(result.rows.length > 0){
        console.log("user found")
        return result.rows
    }else{
        console.log("user not found")
        return null
    }

}


// relationships and joins

// there are two tables users and adddress related to each other now get user and address combinly using joins

`select u.name,u.email, a.city FROM
Users u JOIN address a ON u.id = a.user_id
WHERE u.id = YOUR_USER_ID `


