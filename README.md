# Customer Success Platform

## Objective

The Customer Success Platform is an automated tool aimed at resolving the following problem statements:
- Sharing project-related information with stakeholders and management for better monitoring and transparency.
- Weekly auditing of project information and sharing findings with management and stakeholders using a Word document.
- Automating the process of data gathering, auditing, and sharing findings with stakeholders.


## Backend Configuration
### Run Script
**dotnet run --migrate-database**

# Optional i migration not work

## Step 1: Check if Admin Role Exists

Create a new admin role with the following details:
- Name: Admin
- Description: Admin Role with full access to the system

## Step 2: Create Admin 
- Username: auth0|65f6dc09cc7dca58831d9893
- Name: Admin
- Email: admin1@gmail.com
- Active: true

## Step 3: Check if Relationship Exists
- UserId: 
- RoleId: 

## Task Division

- Developer: Pankaj Kumar
- DevOps Team: Sunny Bhushan Kumar and Jainil Patel

## Features
  - Project Budget
  - Version History
  - Scope
  - Escalation Matrix
  - Stakeholders
  - Risk Profiling
  - Phases/Milestones
  - Sprint-wise Detail
  - Projecct Update
  - Sprint
  - Resource
  - Client Feedback
  - Minute Meeting 
  - User Management
  - Role Management

### 2. Export as a Document

- **Description:** Implement functionality to export project details as a document in a predefined format for specific project.
- **Responsibilities:**
  - Develop a feature allowing stakeholders to export project details seamlessly.
  - Implement the  CRUD operations for insight into data operations to be exported.
  - Test export feature with CRUD operations for compatibility and accuracy.
  - Optionally, assist in implementing the Email Update Notification System.

### 3. Email Update Notification System

-  Build a system to send email notifications to all stakeholders for updates and changes within the platform.


### 4. Developer’s Guide

- **UX Design:** Ensure the provided UX design is implemented.
- **UI Component Library:** Refer to the provided UI component library for UI development.
- **Code Startup Repository:** Maintain the provided code repository for consistency in code development.
  - [Project Setup Repository](https://github.com/chintans/customer-success-platform/tree/main)
  - [Project Development Repository](https://github.com/pankaj7464/CustomerSuccessProject/)

## UI Interface

- **Description:** Design and develop the user interface as per the given UX for all features of the Customer Success Platform.

This README serves as a guide for the development of the Customer Success Platform. Developers and the DevOps team should collaborate effectively to achieve the objectives outlined above.

