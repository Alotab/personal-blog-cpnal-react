# React Blog App with Django Rest Framework


A full-stack blog application built with React for the front-end and Django Rest Framework (DRF) for the back-end. This app supports all CRUD (Create, Read, Update, Delete) operations for blog posts.

## Features
* Create Post: Add new blog posts to the platform.
* Read Post: View a list of all blog posts and their details.
* Update Post: Edit the content of an existing blog post.
* Delete Post: Remove blog posts from the platform.
* API Integration: The app interacts with a Django Rest Framework API for all the CRUD operations.

## Technologies Used:
* Frontend:
    * React
    * React Router
    * Axios (for making API calls)
    * CSS (for styling)
* Backend:
    * Django
    * Django Rest Framework (DRF)
 
## Installation
### Frontend (React)
1. Clone the repository:

   ```
   git clone https://github.com/Alotab/personal-blog-react.git
   ```
2. Navigate to the React app directory:

   ```
   cd personal-blog-cpnal-react
   ```
3. Install the dependencies:
   
   ```
   npm install
   ```
4. Start the react development server:
   
   ```
   npm run dev
   ```
   This will run the frontend app on http://localhost:5173

### Backend (Django Rest Framework)
1. Clone or download the Django project containing the API:
   ```
   git clone https://github.com/Alotab/django-rest-framework.git
   ```

2. Navigate to the Django project directory:
   ```
   cd django-rest-framework
   ```

3. Create a virtual environment:
   ```
   python -m venv venv
   ```

4. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Apply database migrations
   ```
   python manage.py migrate
   ```
6. Start the Django development server:
   ```
   python manage.py runserver
   ```
This will run the API on http://localhost:8000.

## API Endpoints
* GET `/auth/posts/` - Get a list of all blog posts.
* POST `/auth/posts` - Create a new blog post.
* GET `/auth/posts/${slug}/${id}` - Get details of a speciic post.
* PUT `/auth/posts/${slug}/${id}` - Update a specific post.
* DELETE `/auth/posts/${slug}/${id}` - Delete a specific post.

## Usage

### Frontend
1. Create a Blog Post: Click on the "Write" button to add a new blog post. Enter the title and content and submit. Only permitted users are allowed to create a post.
2. View Posts: The list of blog posts will be displayed on the homepage to everyone.
3. Edit a Post: Click on the "Edit" button in the detail post to update the title or content. Only the owner of the post can edit the post.
4. Delete a Post: Click on the "Delete" button to remove a post. Only the owner or author can delete a post.

### Backend (Django)
1. You can manage your blog posts from the Django admin interface by logging in at http://localhost:8000/admin








   


