import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  function App() {
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);

  const addStudent = () => {
    
    if (!/^\d{10}$/.test(idNumber)) {
      alert("ID must be exactly 10 numbers");
      return;
    }

    if (name.trim() === "") return;

    const newStudent = {
      id: Date.now(),
      studentId: idNumber,
      name: name,
      status: "Unmarked",
    };

    setStudents([...students, newStudent]);

    setName("");
    setIdNumber("");
  };

  const markPresent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: "Present" } : student
      )
    );
  };


  const markAbsent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: "Absent" } : student
      )
    );
  };


  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="container">
      <h1>Student Attendance Checker</h1>


      <div className="input-section">
        
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Student ID (10 digits)"
          value={idNumber}
          maxLength="10"
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setIdNumber(value);
            }
          }}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>


      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td className={student.status === "Present" ? "present" : "absent"}>
                {student.status}
              </td>
              <td>
                <button
                  className="present-btn"
                  onClick={() => markPresent(student.id)}
                >
                  Present
                </button>
                <button
                  className="absent-btn"
                  onClick={() => markAbsent(student.id)}
                >
                  Absent
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteStudent(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
