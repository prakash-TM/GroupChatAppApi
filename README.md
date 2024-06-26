Assignment : Build a simple application which provides web services to facilitate group chat
and manage data.
Admin APIs (only admin can add users)
- Manage Users (create user, edit user)
Any User (normal user, admin user) –
Authentication APIs (login, logout)
Groups (Normal User) –
Manage groups (create, delete, search and add members, etc). All users are
visible to all users.
Group Messages (Normal User)
- Send messages in group
- Likes message, etc

Development node version : v16.20.0

Steps to follow for code compile and run :

 1. Make sure your are in root path (inside GroupChatApp folder)
 2. Check the node version and Do `npm i`
 3. Run the command `npm start`
 4. Use `groupChatApiRequests.http` file to trigger api's
 5. For Unit test, run the command `npm test`

Note: Use the mentioned command in your terminal to generate temporary jwt token - `require('crypto').randomBytes(64).toString('hex')`
