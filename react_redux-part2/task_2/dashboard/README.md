# Task 2 - Implement Course Selection
In this task you'll improve the user experience by enable the user to select/deselect a course(s) among the courses displayed on the courses table once logged in

In the coursesSlice:

Add a new state isSelected defaulting to false to the courses state once the API call is fulfilled
Create 2 new actions selectCourse, and unSelectCourse:
selectCourse: Takes a course id and sets isSelected to true for the corresponding course
unSelectCourse: Takes a course id and sets isSelected to false for the corresponding course
In the CourseList:

Create a new function onChangeRow:
It takes 2 arguments id (string), and checked (boolean)
When checked is true dispatch the selectCourse, otherwise unSelectCourse
In the courseListRow:

Each course row should include a new input element of type checkbox
Call the changeRow prop function with course id and the new checked state whenever the checkbox is checked


Tips:

Use the Redux DevTools to verify that the state updates correctly when checkboxes are clicked



Requirements:

Ensure the courses state in the Redux store is updated correctly when a course is selected or unselected

ALL your new unit tests PASS

No console warns or errors

No lint errors