React ChartMaker
Project Overview

React ChartMaker is a web application that allows users to create and edit bar charts using Coordinated Multiple Views and Web Storage API. This project features a user-friendly GUI with two main components, Editor and BarChart, along with a menubar to handle file operations. Built with the React framework and MUI library, the app provides a seamless and interactive experience, with real-time updates to the chart as the user edits data in the Editor component.
Key Features

    Editor Component
        The Editor component is where users can add, modify, and delete data points.
        Any changes made in the Editor are immediately reflected in the BarChart, allowing for dynamic data manipulation.
        Users can input data attributes such as year and population, which are displayed in the bar chart.

    BarChart Component
        The BarChart visually displays data points added in the Editor as individual bars.
        Each bar can be selected or deselected with a mouse click, with selected bars highlighted in red and unselected bars in blue.
        Hovering over a bar displays a tooltip, which shows the year and population attributes of the data point, with the tooltip background color matching the bar color for easy identification.

    Menubar with File Menu
        The menubar provides a File menu that supports various file operations using the Web Storage API:
            New: Clears the current data and creates a new chart.
            Load: Loads saved data from the local storage.
            Save: Saves the current chart data to local storage in JSON format.
            Save As: Allows the user to save the current chart under a new name in local storage.
        All data is saved and loaded in JSON format, ensuring compatibility and ease of use.
