# Foodinarka  
A platform for sharing and exploring culinary recipes  

# Authors

- [Filip Velemir](https://github.com/ficadjole)
- [Maja Bogičević](https://github.com/MajaBogicevic)

## Project Description  
Foodinarka is a web application designed for users who want to share culinary recipes, comment on others, like useful dishes, and explore community-generated content. Moderators have additional permissions for managing content quality and maintaining the blog section.  
The project includes both a client and server application with full authentication, authorization, and role-based access control. 

---

## Features

### Users
- Registration and login (roles: user / moderator)  
- Adding recipes with:
  - dish name  
  - ingredients  
  - preparation description  
  - tips  
  - dish image  
- Selecting one or more categories when creating a recipe  
- Liking recipes  
- Commenting on other users’ recipes  

### Moderators
- All permissions available to regular users  
- Deleting inappropriate or inaccurate recipes  
- Managing recipe categories (adding or editing)  
- Managing the **Blog** section  
- Marking recommended recipes within a blog post  
:contentReference[oaicite:3]{index=3}

### Blog
The blog is maintained exclusively by moderators and includes:  
- culinary news  
- advice and tips  
- thematic articles  
- seasonal recommendations  
- linking recommended recipes to blog posts  
:contentReference[oaicite:4]{index=4}

### Home Page Includes
- Latest recipes  
- Most popular recipes (based on likes)  
- Recommended or highlighted blog posts  
:contentReference[oaicite:5]{index=5}

### Search & Filtering
- Recipe search by name  
- Filtering recipes by category  
- Dedicated recipe detail page  
- Dedicated blog post detail page  

---

## Technical Requirements
- SOLID principles  
- Clean architecture  
- TypeScript required (client + server)  
- Relational database usage  
- Authentication, authorization, and role management on both sides  
- JWT communication between client and server  
- Data validation on client and server  
- Styling with TailwindCSS, Bootstrap 5, or similar 

---

## Project Structure
**Frontend:** React, TypeScript 
**Backend:** Node.js, TypeScript, JWT  
**Database:** MySQL  
**Architecture:** Clean Architecture + SOLID  

