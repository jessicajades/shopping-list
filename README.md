# Shopping List

## About

Shopping List is an application that I built for a mock-interview coding challenge as part of Bloc's cirriculum. It allows users to create, edit, and delete different shopping lists with items to buy for each individual store. The cool part about this app is that it sends users updates in real-time using Socket.IO. This way if you are shopping with a family member or friend, you both aren't picking up the same items.

You can view the live application [here](https://jessicajades-shopping-list.herokuapp.com/)

## Build Process

I built this project using the MVC architecture using Node, Postgres, and EJS as the main components. I decided to use Node and Express for this application, which allows me to create a fullstack application. I built the backend and the database using Postgres and Sequelize. I went with EJS for rendering my front-end code, because it has the ability to display data from the database, which was handy in a situation like this where the application is very data-driven.

## Tech

-   Node
-   Express
-   EJS
-   Postgres
-   Sequelize

## Improvements

I have several features that I would like to add to the app in the future. The first improvement I would make is to associate different lists to a particular User ID, and then add the ability for a user to add collaborators to their lists that they create. Right now the app has limited functionality, due to the fact that anyone can sign in and view all lists.

I would also add the ability to create "default" lists, for stores such as the grocery store where a user might purchase similar items each week.

## Install

```
git clone git@github.com:jessicajades/shopping-list.git
cd the-wall
npm install
npm start
```

## Author

Jessica Shepherd is a full-stack web developer currently based in Phoenix, AZ. Where you can find her:

-   [jessicajade.dev](https://jessicajade.dev/)
-   [jessicajadecodes@gmail.com](mailto:jessicajadecodes@gmail.com)
-   [twitter.com/javascript_jess](https://twitter.com/javascript_jess)
-   [github.com/jessicajades](https://github.com/jessicajades)
