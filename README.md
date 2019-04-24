## E-Commerce

#### List of basic routes:

| Route          | HTTP | Header(s) | Body                                | Description                                                  |
| -------------- | ---- | --------- | ----------------------------------- | ------------------------------------------------------------ |
| /registerAdmin | POST | none      | email: String<br />password: String | Create a user (role auto admin)<br />success:<br />(201), example: {"_id": String, "name": String, "email": String, "password": String, "role": String, "watchTags": [String, String, etc]}<br />errors:<br />(500), error |
| /register      | POST | none      | email: String<br />password: String | Create a user (role auto user)<br />success:<br />(201), example: {"_id": String, "name": String, "email": String, "password": String, "role": String, "watchTags": [String, String, etc]}<br />errors:<br />(500), error |
| /login         | POST | none      | email: String<br />password: String | Login and get token based on credentials<br />success:<br />(200), example: {"_id": String, "name": String, "email": String, "password": String, "role": String,  "token": String}<br />errors:<br />(400), {message: 'Invalid email/password'}<br />(500), error |



#### List of user routes:

| Route              | HTTP   | Header(s)                                                    | Body              | Description                                                  |
| ------------------ | :----- | :----------------------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| /users             | GET    | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none              | Get all users info (Admin only)<br />success:<br />(200), example: [{"_id": String, "name": String, "email": String, "password": String, "role": String, "watchTags": [String, String, etc]}, {"_id": String, "name": String, "email": String, "password": String, "role": String, "watchTags": [String, String, etc]}, etc]<br />errors:<br />(500), error |
| /users/:id/:userId | GET    | Authenticated:<br />(token)                                  | none              | Get a single user info (Admin and authenticated member)<br />success:<br />(200), example: {"_id": String, "name": String, "email": String, "password": String, "role": String, "watchTags": [String, String, etc]}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |
| /users/add/:id     | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | watchTags: String | Update a user with new info<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |
| /users/delete/:id  | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | watchTags: String | Update a user with new info<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |
| /users/:id         | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none              | Delete a user (admin only)<br />success:<br />(200), example: {message: 'Deleted'}<br />errors:<br />(404), example: {message: 'User not found'}<br />(500), error |



#### List of question routes:

| Route                            | HTTP   | Header(s)                                                    | Body                                                         | Description                                                  |
| -------------------------------- | :----- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /questions                       | GET    | Authenticated:<br />(token)                                  | none                                                         | Get all questions<br />success:<br />(200), example: [{"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}, {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}, etc]<br />errors:<br />(500), error |
| /questions/:questionId           | GET    | Authenticated:<br />(token)                                  | none                                                         | Get a single question info<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Product not found'}<br />(500), error |
| /questions/:id                   | POST   | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />tags: [String, String] | Create a question<br />success:<br />(201), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /questions/:id/:questionId       | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />tags: [String, String] | Update a question with new info<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |
| /questions/:id/votes/:questionId | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | status: String                                               | Update votes of question<br />success:<br />(200), example: {"title": String, "description": String, "answer": [Object, Object, etc], "votes": [Object, Object, etc], "tags": [String, String, etc], userId: Object}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |
| /questions/:id/:questionId       | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | none                                                         | Delete a question<br />success:<br />(200), example: {message: 'Question successfully deleted'}<br />errors:<br />(404), example: {message: 'Question not found'}<br />(500), error |



#### List of answer routes:

| Route                        | HTTP   | Header(s)                                                    | Body                                                         | Description                                                  |
| ---------------------------- | :----- | :----------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| /answers/:questionId         | GET    | Authenticated:<br />(token)                                  | none                                                         | Get answer by questionId<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(500), error |
| /answers/:id/:questionId     | POST   | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | title: String<br />description: String<br />questionId: String | Create a answer<br />success:<br />(201), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(400), example: {"message": String}<br />(500), error |
| /answers/:id/:answerId       | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(check isUser) | title: String<br />description: String                       | Update a answer with new info<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |
| /answers/:id/votes/:answerId | PATCH  | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | status: String                                               | Update votes of answer<br />success:<br />(200), example: {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}, {"title": String, "description": String, "votes": [Object, Object, etc], "questionId": Object, userId: Object}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |
| /answers/:id/:answerId       | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(check isUser) | none                                                         | Delete a answer<br />success:<br />(200), example: {message: 'Answer successfully deleted'}<br />errors:<br />(404), example: {message: 'Answer not found'}<br />(500), error |



#### List of tag routes:

| Route | HTTP | Header(s)                   | Body | Description                                                  |
| ----- | :--- | :-------------------------- | ---- | ------------------------------------------------------------ |
| /tags | GET  | Authenticated:<br />(token) | none | Get all tags<br />success:<br />(200), example: [{"name": String}, {"name": String}, etc]<br />errors:<br />(500), error |



### Link Deploy

Server:



Client:

