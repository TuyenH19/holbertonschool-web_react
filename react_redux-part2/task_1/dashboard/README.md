# Task 1 - Loading state
Implement a loading state in the Notifications component to provide feedback during data fetching

This improvement will result in a better user experience and will display a loading indicator when notifications are fetched

In the notificationsSlice:

Add a new state property loading and set it default value to false
Modify the extraReducers to handle the pending, fulfilled, and rejected states of the fetchNotifications thunk:
Set loading to true when the request is pending
Set loading to false when the request is fulfilled or rejected


In the Notifications:

Render Conditionally the notifications UI based on the loading state:

display a loading indicator (Loading...) while data is being fetched, and render the notifications list only after the data has been successfully fetched


Requirements:

ALL your new unit tests PASS

No console warns or errors

No lint errors
