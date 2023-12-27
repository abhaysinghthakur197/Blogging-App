## Blogging-App

## Installation




1. git init
2. npm init - package.json
3. npm i express - express install
4. npm i ejs - ejs install
5. created container, routes,views,models folders
6. set view engine in index.js
7. create home.ejs frontend page
8. use particals for repeating code. - Those code all common in all that part is present in partials folder
9. created route for home page in index.js
10. npm i mongoose  - for creating models
11. create user model 
12. use salt (hashing the password) and crypto for encrypting the user password (* IMP }
13. connected to mongodb
14. created signup page
15. created router for signup,signin in routes-> user.js
16. added userRoute in index.js
17. add middleware express.urlencoded to get the form data.
18. added login router for login in user.js routes folder
19. Use mongoose virtual function for matching the hash password in login user. (* IMP }
20. install jsonwebtoken --> npm i jsonwebtoken
21. created authentication.js for token generation and validation
22. add authentication.js into user model
23. add matchpasswordandGenerateTokoen function in user routes in try catch blocks
24. added alert for incorrect password.
25. added middleware authentication for token authentication
26. added blog schema
27. added blog route for add blog page.
28. added blog.post route to save the blog in mongodb used multer to save the upload coverImage file --> npm i multer
29. created uploads folder in public folder to store the static blog coverImages.
30. used middle express.static() to show the blog coverImage in homepage because express thick it is a route
31. created addblog.ejs page for blog form
32. added card for showing the blog in home page in home.ejs
