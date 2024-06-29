## What is Odinbook?
Odinbook is a full-stack application which is a Facebook clone that was developed using the MERN stack. This web application has basic CRUD functionalities that allows the user to create an account, read posts, update comments, delete friends, and more. JSON web tokens are used to handle the authentication of users which will allow or deny clients access to the API and Socket IO allows for real-time messaging to occur between clients.

<p align="center">
    <img src="react/src/assets/Demo.gif" alt="Demo of application" width="500"/>
</p>

## How it works:
- Create or login to your Odinbook account to begin connecting with other users.
- View the latest posts from your friends on your home feed and show support by liking their post or leaving a comment.
- Share your thoughts by making your own posts which you can edit or delete whenever you want.
- Search for other users and connect with them by adding them to your friends list.
- Send messages to your friends and receive real-time updates of the conversation to your browser.

**How to run locally on your computer**: Use `npm run dev` in the src folder to run the application, use `npm run devstart2` in the routes folder to run the auth server for JSON webtokens, and use `nodemon app.js` in the default folder to run the server for the API.

## What it looks like:
![Screenshot of the login page](https://imgur.com/gEG6Ces.jpg)
<p align="center"><i>View of the Home Page (Logged out)</i></p>

![Screenshot of the home page feed](https://imgur.com/Mko4nhS.jpg)
<p align="center"><i>View of the Home Page (Logged in)</i></p>
![Screenshot of the pop-up chat messenger](https://imgur.com/kCvPabF.jpg)
<p align="center"><i>View of the Pop-up Chat Messenger</i></p>

![Screenshot of the post creation pop-up](https://imgur.com/L2RnKZP.jpg)
<p align="center"><i>View of the Post Creation Pop-up</i></p>

![Screenshot of a user's profile](https://imgur.com/2jG36ev.jpg)
<p align="center"><i>View of a User's Profile Page</i></p>

![Screenshot of the friends page](https://imgur.com/nsqkWRE.jpg)
<p align="center"><i>View of the Friends Page</i></p>

### Other thoughts
The frontend of this project was built with React because I find that the reusable function components and hooks make it easy to create interactive user interfaces. While it may get messy to have multiple components that make up a single page, I like that each function is pure and has its own purpose. As for designing the interface itself, I decided to try Tailwind for the first time to style my application and I was really surprised by how easy it was to learn the syntax thanks to the documentation available. Prior to working with Tailwind, I was already doing a lot of inline CSS by using the styled-components library, but I heard many good things about Tailwind, so I tried it out and found it super intuitive to use. I love the option of having default values for the CSS attributes because it saves time in having to adjust the numbers until the element looks just right, and I think Tailwind definitely suits my style because I find it convenient being able to write my CSS in the same document as my JavaScript.

The backend was built with Express and I used MongoDB as my database because it's been easy to work with. The API for interacting with the database was made with REST guidelines in mind where endpoint paths are represented by nouns and the HTTP methods describe the request method, operations are stateless, and errors return the appropriate response codes. I tested the API with Postman to make sure each method returned the right data or error response and then set up JSON web tokens to authenticate users so that I could approve their requests to the API. I opted to use JSON web tokens to handle the authentication of users because a social media website has to be able to manage a lot of people using the page at the same time, so I figured that JWTs would reduce the traffic and load on the database server which could get too many requests for user identification when calling the API. Another reason I chose JWT was because I wanted to challenge myself to implement refresh and access tokens which is something I failed to do in one of my previous projects and I saw this project as a good opportunity to revisit it.

The concept of refresh and access tokens were confusing at the beginning, especially because I kept mixing the two of them up with each other, but I eventually figured out that access tokens were meant for users to access the API with while refresh tokens were meant for users to generate new access tokens with because access tokens expire faster than the refresh tokens. I decided to store my refresh token in MongoDB with an expiration time of 30 minutes which meant that I could keep generating new access tokens within that half an hour window. The refresh token is simply proof that the user has logged in with the right credentials and that token gives them the authority to create access tokens which are stored in a cookie that expires after 15 minutes. I wanted to keep the expiration times short in case the tokens happen to be stolen to limit the amount of damage that could be potentially caused during the 15 minutes that the access token is valid. While there seems to be a lot of discourse surrounding JWT and the security behind their usage, I found storing the refresh token in my database and storing the access token into an HTTP only cookie to work for me.

I also implemented socket io into my web application for real-time messaging between users. Instead of having to hit the database for the updated chat every time a new message is sent, the socket io server pushes the message to the connected clients, so the messages are sent in real-time as long as the API POST request is approved. 

Although I faced many challenges while attempting to pick up new tools and skills for the Facebook Clone project, it was a great learning experience for me. I enjoy being able to test my knowledge of libraries and frameworks that I am familiar with, such as React and Express, and love figuring out how to implement new concepts like socket.io, JWT, and Tailwind into what I already know. If there's something I'd want to improve on for this project, I'd definitely want to redesign my chat component so I can properly paginate my messages to increase performance. I did not account for the fact that loading a bunch of messages all on one page would cause serious lag and delay until I began testing the application more and realized how slow my inputs were due to the large array of data. In the future, I want to make sure that I split my messages into smaller-sized arrays which would then be stored in one larger array which I can navigate through to display the contents of each index instead of having all the data loaded at once.