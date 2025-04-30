<h1>Dynamic Location Filter in Kanban View (Odoo 17) owl</h1>


What This Task Does

This customization adds a dynamic state/location filter sidebar to the res.partner Kanban view in Odoo 17. It enables users to:

    View how many partners exist per location (state).

    Filter partners dynamically by clicking checkboxes.

    Automatically clear previous filters when a new one is selected.

    Optionally clear all filters from the UI using a function.

🚀 Features
Feature	Description
🗺️ Location Sidebar	Shows a list of all states with partner counts.
✅ Dynamic Filtering	Click on a location to instantly filter the Kanban by that state.
🧼 One-Click Clear	Auto-uncheck other checkboxes when one is selected (radio-style behavior).
🔁 Filter Reset Function	clearSearch() clears all active filters from the Kanban view.
♻️ Lightweight	Uses toggleSearchItem only when needed, avoids redundant operations.
