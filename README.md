# Anvaya – CRM App

A Fullstack CRM App with functionality such as lead listing, filtering the leads, adding new leads, updating lead, deleting leads, adding and deleting sales agent, displays sales agent, displays reports in form of charts.
Built with React for frontend, Node/Express for backend, MongoDB for Database, Bootstrap for styling and Chart.js for charts.

---

## Demo Link

[Live Demo](https://neogcamp-anvaya-crm-app-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/patilVikrant/neogcamp-anvayaCrmApp-frontend.git
cd neogcamp-anvayaCrmApp-frontend
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router DOM
- React Context
- Chart JS
- Axios
- Node JS
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough of all the major features of this app:
[Loom Video](https://www.loom.com/share/d10d045bc4a048a0afaf0f167263e52e)

---

## Features

**Dashboard**

- Displays an overview of total leads, new leads, contacted leads, and qualified leads.
- Displays recently added leads in a structured table format.

**Lead Listing**

- Displays all leads in a structured table format.
- Filters leads based on sales agent and status.
- Supports URL-based filtering.
- Sorts leads by time to close or priority.
- Allow users to navigate to add lead page and lead detail page.

**Lead Detail**

- Displays complete details of a selected lead.
- Allows users to edit or delete the lead.
- Displays comment associated with the selected lead.
- Allow users to add new comment to the lead.

**Sales**

- Displays an overview of total leads, closed leads, average time to close leads, and open leads.
- Displays all the closed leads in a structured table format.

**Agents**

- Displays all the sales agents in a structured table format.
- Allows user to navigate to add new sales agent page.

**Reports**

- Displays leads closed in the last week using pie chart.
- Displays closed leads by sales agent using bar chart.
- Displays total leads in the pipeline grouped by status using bar chart.
- Displays leads ttatus distribution using pie chart.

**Settings**

- Allow user to delete Sales agents.
- Allow user to delete Leads.

---

## API Reference

### **GET /leads**<br>

List all leads<br>

Sample Response:<br>

```
[{_id, name, source, salesAgent, status, tags, timeToClose, priority}, ....]
```

### **GET /leads/:id**<br>

List details of single lead<br>

Sample Response:<br>

```
{_id, name, source, salesAgent, status, tags, timeToClose, priority }
```

### **GET /leads/:id/comments**<br>

List all the comments associated with the selected lead<br>

Sample Response:<br>

```
[{_id, author, commentText}, ...]
```

### **POST /leads**<br>

Creates a new lead<br>

Sample Response:<br>

```
{message: "Lead added successfully", lead:{_id,  name, source, salesAgent, status, tags, timeToClose, priority }}
```

### **POST /leads/:id**<br>

Updates an existing lead<br>

Sample Response:<br>

```
{message: "Lead updated successfully", lead:{_id,  name, source, salesAgent, status, tags, timeToClose, priority }}
```

### **POST /leads/:id/comments**<br>

Adds a comment to a lead<br>

Sample Response:<br>

```
{message: "Comment added successfully", comment:{_id, author, commentText }}
```

### **DELETE /leads/:id**<br>

Deletes a lead<br>

Sample Response:<br>

```
{message: "Lead deleted successfully", lead:{_id,  name, source, salesAgent, status, tags, timeToClose, priority }}
```

### **GET /agents**<br>

List all Sales Agent<br>

Sample Response:<br>

```
[{_id, name, email }, ....]
```

### **POST /agents**<br>

Creates a new sales agent<br>

Sample Response:<br>

```
{message: "Agent added successfully, agent:{_id, name, email }}
```

### **DELETE /agents/:id**<br>

Deletes a sales agent<br>

Sample Response:<br>

```
{message: "Agent deleted successfully, item:{_id, name, email}}
```

---

## Contact

For bugs and feature requests, please reach out to pvikrant248@gmail.com
