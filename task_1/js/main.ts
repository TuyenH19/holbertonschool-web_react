interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
}

const teacher3: Teacher = {
  firstName: 'John',
  lastName: 'Doe',
  fullTimeEmployee: false,
  location: 'London',
  contract: false,
};

console.log(teacher3);

interface Directors extends Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  yearsOfExperience?: number;
  location: string;
  [key: string]: any;
  numberOfReports: number;
}

const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(director1);

function printTeacher(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}. ${lastName}`;
}

interface printTeacherFunction {
  firstName: string,
  lastName: string;
}

console.log(printTeacher('John', 'Doe'));

// Interface that describe the instance shape of the class
interface StudentClassInterface {
  firstName: string;
  lastName: string;
  workOnHomework(): string;
  displayName(): string;
}

// Interface that describe the constructor signature of the class
interface StudentClassConstructor {
  new (firstName: string, lastName: string): StudentClassInterface;
}

// Implementation of the class
class StudentClass implements StudentClassInterface {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  workOnHomework(): string {
    return 'Currently working';
  }

  displayName(): string {
    return this.firstName;
  }
}

// Bind the constructor to the constructor interface
const Student: StudentClassConstructor = StudentClass;

// Create an instance and exercise methods
const student: StudentClassInterface = new Student('John', 'Smith');
console.log(student.displayName());
console.log(student.workOnHomework());
