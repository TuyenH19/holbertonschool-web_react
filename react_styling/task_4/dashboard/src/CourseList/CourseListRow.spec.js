import CourseListRow from './CourseListRow';
import { render, screen } from '@testing-library/react';

describe('CourseListRow Component', () => {
  describe('When isHeader is true', () => {
    test('renders one th with colspan=2 when textSecondCell is null', () => {
      render(
        <table>
          <tbody>
            <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell={null} />
          </tbody>
        </table>
      );

      const th = screen.getByRole('columnheader');
      expect(th).toBeInTheDocument();
      expect(th).toHaveAttribute('colspan', '2');
      expect(th).toHaveTextContent('Course name');
    });

    test('renders two th elements when textSecondCell is not null', () => {
      render(
        <table>
          <tbody>
            <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
          </tbody>
        </table>
      );
      
      const thElements = screen.getAllByRole('columnheader');
      expect(thElements).toHaveLength(2);
      expect(thElements[0]).toHaveTextContent('Course name');
      expect(thElements[1]).toHaveTextContent('Credit');
    });
  });

  describe('When isHeader is false', () => {
    test('renders two td elements within a tr element', () => {
      render(
        <table>
          <tbody>
            <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" />
          </tbody>
        </table>
      );
      
      const tdElements = screen.getAllByRole('cell');
      expect(tdElements).toHaveLength(2);
      expect(tdElements[0]).toHaveTextContent('ES6');
      expect(tdElements[1]).toHaveTextContent('60');
    });
  });
});


