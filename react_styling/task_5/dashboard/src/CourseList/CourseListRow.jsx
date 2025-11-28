function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  const headerStyle = { 
    backgroundColor: 'var(--color-table-header)', 
    opacity: 0.65,
    border: '1px solid rgb(156 163 175)' // gray-400
  };
  const rowStyle = { 
    backgroundColor: 'var(--color-table-rows)', 
    opacity: 0.45,
    border: '1px solid rgb(156 163 175)' // gray-400
  };
  const cellStyle = {
    backgroundColor: 'var(--color-table-rows)',
    opacity: 1,
    border: '1px solid rgb(156 163 175)' // gray-400
  };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={rowStyle}>
          <th style={headerStyle} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr style={rowStyle}>
          <th style={headerStyle}>{textFirstCell}</th>
          <th style={headerStyle}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr style={rowStyle}>
        <td className="pl-2" style={cellStyle}>{textFirstCell}</td>
        <td className="pl-2" style={cellStyle}>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;
