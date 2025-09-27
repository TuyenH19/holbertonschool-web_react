// interface definition for Student
interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

// creating variables for students
const student1: Student = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  age: 28,
  location: 'London',
};

const student2: Student = {
  firstName: 'Grace',
  lastName: 'Hopper',
  age: 35,
  location: 'New York',
};

// store students in an array
const studentsList: Student[] = [student1, student2];

  const renderTable = (students: readonly Student[]): void => {
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');

    for (const { firstName, location } of students) {
      const row: HTMLTableRowElement = document.createElement('tr');
      const firstCell: HTMLTableCellElement = document.createElement('td');
      const locationCell: HTMLTableCellElement = document.createElement('td');

      firstCell.textContent = firstName;
      locationCell.textContent = location;

      row.append(firstCell, locationCell);
      tbody.appendChild(row);
    }

    table.appendChild(tbody);
    document.body.appendChild(table);
  };

  renderTable(studentsList);
