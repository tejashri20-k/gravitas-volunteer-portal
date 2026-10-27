# Gravitas 2026 Volunteer Registration Portal

A responsive front-end web application for registering and viewing volunteers for Gravitas 2026, the annual techno-management festival of VIT.

## Technologies
- HTML5
- CSS3 (Flexbox, Grid, media queries, CSS variables)
- JavaScript (ES6)
- Browser localStorage for storing volunteers (no back end)

## Pages
| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Welcome section, festival info, navigation, Register as Volunteer button |
| Registration | `registration.html` | Registration form, client-side validation, success message |
| Volunteers | `volunteers.html` | Volunteer table, total count, live search |

## Folder structure
```
Gravitas2026VolunteerPortal/
├── index.html
├── registration.html
├── volunteers.html
├── css/
│   └── style.css
├── js/
│   ├── validation.js
│   ├── volunteers.js
│   └── search.js
├── images/
│   └── vit-logo.png
└── README.md
```

## How to run
1. Download or clone the folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox).
3. Click **Register as Volunteer**, fill the form and submit.
4. Open **Volunteers** to see the table, the total count and to search.

## Validation rules
- Full name: 3-50 letters (spaces, dots, apostrophes and hyphens allowed)
- Registration number: format `22BCE1234`
- Email: valid email format
- Phone: 10 digits, starting with 6-9
- Year, team, availability: required
- Guidelines checkbox: must be ticked
- Duplicate registration number or email is rejected

## Application flow
Home Page -> Volunteer Registration -> Client-side Validation -> Registration Successful -> Volunteer added to list -> Registered Volunteers Page -> Search Volunteers
