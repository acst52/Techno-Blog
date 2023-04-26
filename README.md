# Notes

Steps to run app locally before deploying to Heroku:

- create db in MySQL (in terminal, mysql -u root -p, CREATE DATABASE blog_db; - Sequelize instance in connection.js takes care of connecting to proper db so no need to run USE cmd)
- npm i
- npm run seed
- npm start
--> then go to <http://localhost:3001> to see how site is working
