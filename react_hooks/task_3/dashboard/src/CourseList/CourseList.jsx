import CourseListRow from './CourseListRow';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div className="w-4/5 mx-auto my-8 max-[912px]:w-full max-[912px]:px-3 max-[912px]:my-4">
        <table id="CourseList" className="w-full">
          <tbody>
            <CourseListRow isHeader={false} textFirstCell="No course available yet" />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto my-8 max-[912px]:w-full max-[912px]:px-3 max-[912px]:my-4">
      <table id="CourseList" className="w-full">
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Available courses" />
          <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
        <tbody>
          {courses.map((course) => (
            <CourseListRow 
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
