<h2>CV Manager</h2>
<p>A NestJS API for managing CVs with basic CRUD features for user, CV, and skills models.</p>
<h3>Installation</h3>
<p>Clone the Git repository:</p>
<pre><code>git clone https://github.com/Chlafen/gestionnaire-cv.git</code></pre>
<p>Install dependencies:</p>
<pre><code>cd gestionnaire-cv
npm install</code></pre>
<p>Configure the database:</p>
<p>Create a .env file:</p>
<pre><code>DB_USER = [user]
DB_PASS = [password]
DB_NAME = [gestionnaire_cv]
</code></pre>
<p>Edit the environment variables in the .env file to match your database configuration.</p>
<p>Run database migrations:</p>
<pre><code>npm run migration:run</code></pre>
<p>Launch the application:</p>
<pre><code>npm run start:dev</code></pre>
<h3>Usage</h3>
<p>The API provides the following endpoints to interact with the user, CV, and skills models:</p>
<h4>User</h4>
<ul>
  <li>GET /users: retrieve all users</li>
  <li>GET /users/🆔 retrieve a user by ID</li>
  <li>POST /users: create a new user</li>
  <li>PUT /users/🆔 update an existing user</li>
  <li>DELETE /users/🆔 delete an existing user</li>
</ul>
<h4>CV</h4>
<ul>
  <li>GET /cvs: retrieve all CVs</li>
  <li>GET /cvs/🆔 retrieve a CV by ID</li>
  <li>POST /cvs: create a new CV</li>
  <li>PUT /cvs/🆔 update an existing CV</li>
  <li>DELETE /cvs/🆔 delete an existing CV</li>
</ul>
<h4>Skills</h4>
<ul>
  <li>GET /skills: retrieve all skills</li>
  <li>GET /skills/🆔 retrieve a skill by ID</li>
  <li>POST /skills: create a new skill</li>
  <li>PUT /skills/🆔 update an existing skill</li>
  <li>DELETE /skills/🆔 delete an existing skill</li>
</ul>
<p>The data is returned in JSON format.</p>
<h3>Binomes</h3>
<a href="https://github.com/Chlafen">Bouchnak Med Amine.</a>
<br/>
<a href="https://github.com/zak-soussi">Zakaria Soussi.</a>