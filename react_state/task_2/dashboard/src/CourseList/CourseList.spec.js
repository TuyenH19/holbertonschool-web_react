import CourseList from "./CourseList"
import { render, screen } from "@testing-library/react"

describe('CourseList Component', () => {
  test('renders 5 different rows when it receives an array of courses objects', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: '60' },
      { id: 2, name: 'Webpack', credit: '20' },
      { id: 3, name: 'React', credit: '40' }
    ];

    render(<CourseList courses={courses} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('renders 1 row when it receives an empty array', () => {
    render(<CourseList courses={[]} />);
    
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});

