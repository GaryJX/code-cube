# Code Cube

## Routes

#### Frontend

- Login: `/login`
  - Centered modal form to allow the user to log in/register (with OAuth providers or Email?)
  - Redirects to `/` if user is already logged in
- Homepage: `/`
  - Shows the index page, containing a list of Code Cubes that the user is created, and they can add/delete cubes here
  - Redirects to `/login` if user is not logged in
- Editor: `/editor/<id>`
  - The main editor page, allowing the user to edit the HTML/CSS/JS of the cube and see the rendered page.
  - Also see if I can allow importing packages from `cdnjs`, `unpkg`, or `jsdelivr`
  - Redirects to `/login` if user is not logged in
- (Lower Priority) Landing Page: `/<todo: replace Homepage with another endpoint>`
  - A landing page to display the functionality of the application

#### Backend

- Cubes List: `/api/cubes` (GET)
  - Gets a list of the all of the cubes available to the user
- Create New Cube: `/api/cube` (POST)
- Get Cube: `/api/cube/<id>` (GET) (TODO: Look into making this one a WebSocket connection instead of a GET)
- Edit Cube: `/api/cube/<id>` (PUT) (TODO: Maybe have 4 separate endpoints for updating HTML, CSS, JS, and packages separately)
- Delete Cube: `/api/cube` (DELETE)

#### Production Deployment

- The `client` folder containing the front-end code is hosted on [Vercel](vercel.com), and is automatically rebuilt whenever a commit is pushed to the `main` branch
- The `server` folder containing the server-side code is hosted on [Heroku](https://heroku.com/). To trigger a re-deployment, push the changes to Heroku's remote Git repository:

  ```sh
  git subtree push --prefix server heroku main
  ```
