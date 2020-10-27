# Vision Board

Vision Board is an app for inspiration. It is a blank canvas where users can collect, organize, and display photos and other items that inspire them in a streamlined web application. Users can create boards with a chosen theme and add items which speak to them.

## Created by the Code Revolutionaries:

- Gabriel Francis: github.com/thecoder-droid
- Marina Ivanovskaya: github.com/krapivaa
- Lauren Anthony: github.com/LaurenEAnthony

## App Features:

### Users:

- Create and log in to a personal account.
- Create and view boards for user defined topics on the landing page.
- Update board title, and other info, and delete boards that are no longer wanted.
- Add and view items inside of each board.
- Create items with images or text only items. Images can be URL or uploaded from a device.
- Update item information and delete items no longer wanted.
- Quickly switch between boards with sidebar navigation.

### Admin:

- View user information table.
- Create new admin users through a protected route.
- Update user passwords and admin status.
- Delete all user information.

## App Endpoints:

### User: ~/api/user

```
POST /signup                        => Register new user
POST /login                         => Log in a user
POST /admin/signup                  => Register a new admin
GET  /admin/view-all                => Get all users
PUT  /admin/edit/:userId            => Update user info
DELETE /admin/delete/:userId        => Delete user
```

### Board: ~/api/board

```
POST /create                        => Create a new board
PUT  /update/:boardId               => Update existing board
DELETE /delete/:boardId             => Delete existing board
GET  /mine                          => Find all user’s boards
GET  /:boardId                      => Find all items for a specific board
```

### Item: ~/api/item

```
POST  /create-new-on-board/:boardId => Create a new item on specified board
PUT /update/:itemId                 => Update existing item
DELETE  /delete/:itemId             => Delete existing item
```
