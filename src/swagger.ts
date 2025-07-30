import express, {Request,Response } from 'express'
import SwaggerJsDoc from 'swagger-jsdoc'
import serverConfig from './config/server-config'
import swaggerUI from 'swagger-ui-express'

const router = express.Router()

const options:SwaggerJsDoc.Options = {
    swaggerDefinition:{
            openapi:"3.0.0",
        info:{
            title:"Social Media Microservice",
            version:"1.0.0",
            description:"This Is the indentity Service of social media Backend"
        },
        tags:[
            {
                name:"Auth",
                description:"Auth Api"
            },
            {
                name:"Users",
                description:"Users Api"
            }
        ],
        servers:[
            {
                url:`http://localhost:${serverConfig.PORT}`,
                description:"Development Server"
            }
        ],
        components:{
            securitySchemes:{
                Bearer:{
                    type:"http",
                    scheme:"Bearer",
                    bearerOption:"JWT"
                },
                ApiKeyAuth:{
                    type:"apiKey",
                    in:"header",
                    name:"x-api-key"
                }
            }
        },
    },

    apis:["./src/routes/*.ts"]

}

const swaggerSpecs = SwaggerJsDoc(options)

require('swagger-model-validator')(swaggerSpecs)

router.get('/json',(req:Request,res:Response)=>{
    res.setHeader("Content-Type","application/json")
    res.send(swaggerSpecs)
})

router.use('/',swaggerUI.serve,swaggerUI.setup(swaggerSpecs))

export default router 