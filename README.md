# facebook-clone

The Facebook Clone is a full-stack project that I developed using ReactJS/Tailwind for the frontend and Node/Express for the backend. I used Mongoose to create the models that stored my web application's data and then created my own REST API for the client/user to create, read, update, and delete information from their profiles such as their posts, comments, and friends' list. I opted to use JSON web tokens to handle the authentication of users because a social media website has to be able to manage a lot of people using the page at the same time, so I figured that JWTs would reduce the traffic and load on the database server which could get too many requests for user identification when calling the API. Another reason I chose JWT was because I wanted to challenge myself to implement refresh and access tokens which is something I failed to do in one of my previous projects and I saw this project as a good opportunity to revisit it.



It was my first time working with socket io for real-time messaging, Tailwind for CSS styling, and access/refresh JSON web tokens for authorization/authentication.