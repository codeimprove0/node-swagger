1) Introduction 
2) Installation & Configure 
3) Server 
4) Path 
5) Parameter 
6) Response 
7) Post Parameter
8) Request Body 
9) 


1) 
  npm i swagger swagger-ui-express yamljs

2) add in app.js  

const { swaggerServe, swaggerSetup } = require('./config')  
app.use("/api-docs", swaggerServe, swaggerSetup); 

3) add file config.js  
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load("api.yaml");

const options = {
    customCss: ` img {content:url(\'../logo.svg\'); height:auto;} `,
    customfavIcon: "../favicon.ico",
    customSiteTitle: "Code Improve API Doc"
}; 

module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJSDocs,options) };

4) follow doc 
https://swagger.io/docs/specification/basic-structure/

VI
In Yml File 
===================================================================== 

1) openapi :- version swagger  , info inside see title desc , verison your 1,2 change 
openapi: 3.0.0
info:
  title: Code Improve API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 1.0 


2) server:-  add sever detail 

servers:
  - url: http://localhost:8081/
    description:  Local server 
  - url: https://prod.com/
    description:  Pre Production server
  - url: https://test.com/
    description:  Production server


3) path :- get or post api 

paths:
  /users/detail/{userId}:
    get:
      summary: Returns a user details by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description in CommonMark or HTML.
          schema:
            # type : integer
            # format: int64
            type: string
            example: "Users String"
            minimum: 1
      responses: 
        '200':
          description: OK
  

  paths:
  /users/list:
    post:
      summary: Returns a user list. 
      responses: 
        '200':
          description: OK


   2.1) 
         parameters:
        - in: query
          name: month_year
          schema:
            #type: integer
            example: 2022-10          
  


  3) Response : In details 

    /users/list:
    post:
      summary: Returns a user list. 
      responses:
        '200':
          description: A user object. 
        '400':
          description: The specified user ID is invalid (not a number).
        '404':
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error



 4) Post Parameter:- 

  paths:
  /users/list:
    post:
      tags:
        - User List API 
      summary: Returns a user list. 
      description: <b> Request :- </b> <br /> <br />
              <b> page_no* </b>  is required <br /> 
              <b> status* </b>  is required <br /> 
              <b> type* </b>  is required <br /> 

      parameters:
        - in: query
          name: month_year
          schema:
            #type: integer
            example: 2022-10        
      post:
      requestBody:
        required: true
        content:
           application/json:
            schema:
              type: object
              properties: 
                page_no:         
                  type: integer
                  example: 1  
                type:       
                  type: string
                  example: "A" 
                status:
                  type: integer
                  example: 0
         
      responses:
        '200':
          description: A user object. 
        '400':
          description: The specified user ID is invalid (not a number).
        '404':
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error    
 
   ------------------------------------  
   4.1)  tag , description , summary 
     /users/list:
    post:
      tags:
        - User List API 
      summary: Returns a user list. 
      description: <b> Request :- </b> <br /> <br />
              <b> page_no* </b>  is required <br /> 
              <b> status* </b>  is required <br /> 
              <b> type* </b>  is required <br /> 

    4.2)  request body type
      post:
      requestBody:
        required: true
        content:
           application/json:
            schema:
              type: object
              properties: 
                page_no:         
                  type: integer
                  example: 1  
                type:       
                  type: string
                  example: "A" 
                status:
                  type: integer
                  example: 0

    4.3) add image / file 
    changes:-      multipart/form-dat or 
      fileName:
                  type: string
                  format: binary   
    ------ -----------  ------- 
         post:
      requestBody:
        required: true
        content:
          multipart/form-data:
           #application/json:
            schema:
              type: object
              properties: 
                page_no:         
                  type: integer
                  example: 1  
                type:       
                  type: string
                  example: "A" 
                status:
                  type: integer
                  example: 0
                fileName:
                  type: string      

    4.4) paramter add also
          parameters:
        - in: query
          name: month_year
          schema:
            #type: integer
            example: 2022-10   






5) pass token use like 

https://swagger.io/docs/specification/authentication/

type 
http – for Basic, Bearer and other HTTP authentications schemes
apiKey – for API keys and cookie authentication
oauth2 – for OAuth 2
openIdConnect – for OpenID Connect Discovery

5.2) 
changes 
    ApiTokenss:        # arbitrary name for the security scheme
      type: http
      scheme: basic
    
5.3) ApiTokenss:   # bearer
   type: http
      scheme: bearer
 
components:
  securitySchemes:
    ApiToken:        # arbitrary name for the security scheme
      type: apiKey
      in: header       # can be "header", "query" or "cookie"
      name: Authorization
    
    ApiKey:        # arbitrary name for the security scheme
      type: apiKey
      in: header       # can be "header", "query" or "cookie"
      name: apikey

paths:
  /users/detail/{userId}:
    get:
      security:
       - ApiToken: []
       - ApiKey: []
      summary: Returns a user details by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description in CommonMark or HTML.
          schema:
            # type : integer
            # format: int64
            type: string
            example: "Users String"
            minimum: 1
      responses: 
        '200':
          description: OK







 ============================ 
 API 
 http://localhost:8081/users/list