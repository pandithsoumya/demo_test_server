const { ApolloError, ForbiddenError, UserInputError, AuthenticationError } = require('apollo-server-express')
const { mysqlQuery } = require('../../config/mysql')






module.exports = {

   

    Query: {

        async getAllVMs(_, args) {
            
                return new Promise(async (resolve, reject) => {

                    try {
                        const query = `SELECT vm_id,vm_name,location,status FROM vm_data`
                       

                        const results = await mysqlQuery(query)


                        const dataArray = results.map(row => {
                            const obj = {
                               vm_id : row.vm_id,
                               vm_name : row.vm_name,
                               location : row.location,
                               status : row.status
                            }
                            return obj;
                        })  
                        resolve(dataArray)
                    }

                    catch (error) {
                        resolve(new ApolloError(error))
                    }
                })
            
        },

    },


    Mutation : {
        async addVM(_, args) {
            
            return new Promise(async (resolve, reject) => {

                const { vm_id, vm_name, location, status} = args.input

                try {
                    const query = `INSERT INTO vm_data (vm_id,vm_name,location,status) VALUES (?,?,?,?) `
                    const params = [vm_id,vm_name,location,status]
                    const insertResult = await mysqlQuery(query,params)

                    const dataArray ={
                       
                            id : insertResult.insertId,
                           vm_id : row.vm_id,
                           vm_name : row.vm_name,
                           location : row.location,
                           status : row.status
                        
                        
                    }
                    resolve(dataArray)
                }

                catch (error) {
                    resolve(new ApolloError(error))
                }
            })
        
    },

    async editVM(_, args) {
            
        return new Promise(async (resolve, reject) => {

            const { vm_id, vm_name, location, status} = args.input

            try {
                const query = `UPDATE vm_data SET vm_id=?, vm_name=?, location=?, status =? `
                const params = [vm_id,vm_name,location,status]
                const results = await mysqlQuery(query,params)

                if(results.length > 0) {
                    const dataArray = {
                      
                            id : insertId,
                           vm_id : row.vm_id,
                           vm_name : row.vm_name,
                           location : row.location,
                           status : row.status
                       
                    }
                    resolve(dataArray)
                }
                else {
                    resolve('Updated Failed! Try again')
                }
               
            }

            catch (error) {
                resolve(new ApolloError(error))
            }
        })
    
},

async deleteVM(_, args) {
            
    return new Promise(async (resolve, reject) => {

        const { vm_id} = args.input

        try {
            const query = `DELETE FROM vm_data WHERE vm_id=? `
            const params = [vm_id]
            const results = await mysqlQuery(query,params)

            resolve(true)
         
           
           
        }

        catch (error) {
            resolve(new ApolloError(error))
        }
    })

},

    }
}