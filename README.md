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
- (Optional) Landing Page: `/<todo: replace Homepage with another endpoint>`

#### Backend

#### Production Deployment

- The `client` folder containing the front-end code is hosted on [Vercel](vercel.com), and is automatically rebuilt whenever a commit is pushed to the `main` branch
- The `server` folder containing the server-side code is hosted on [Heroku](https://heroku.com/). To trigger a re-deployment, push the changes to Heroku's remote Git repository:

  ```sh
  git subtree push --prefix server heroku main
  ```
