# Task-Manager
This is a REST API designed in the context of a task-manager app.

## Routes
The API serves at the following routes:

### User-routes
```
/users
desc: Signup
method: POST
```

```
/users/login
desc: Signin
method: POST
```

```
/users/logout
desc: Signout
method: POST
```

```
/users/logoutAll
desc: Logout from all devices
method: POST
```

```
/users/me
desc: Read profile
method: GET
```

```
/users/me
desc: Update profile
method: PATCH
```

```
/users/me
desc: Delete profile
method: DELETE
```

```
/users/me/avatar
desc: Upload an avatar (max. size: 250px x 250px)
method: POST
```
The response from the above method includes the ```_id``` that can be notes as it is can be used to access your avatar outside of the API

```
/users/me/avatar
desc: Delete your avatar
method: DELETE
```

```
/users/:id/avatar
desc: View your avatar
method: GET
```
Replace the placeholder ```id``` with ```_id``` noted earlier.

### Task-routes
```
/tasks
desc: Post an array of tasks
method: POST
```

```
/tasks
desc: Retrieve tasks (query options: See /src/routers/task.js line 20)
method: GET
```

```
/tasks/:id
desc: Read a task by its _id property
method: GET
```

```
/tasks/:id
desc: Update a task
method: PATCH
```

```
/tasks/:id
desc: Delete a task
method: DELETE
```

### Configuring

Rename the ```.env.example``` file to ```dev.env``` and put it in ```/config/``` to configure the app.










