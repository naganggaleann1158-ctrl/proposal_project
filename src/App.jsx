import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


  function App() {
  // State for input and students list
  const [name, setName] = useState("")
  const [students, setStudents] = useState([])

  // Add new student
  const addStudent = () => {
    if (name.trim() === "") return

    const newStudent = {
      id: Date.now(),
      name: name,
      status: "Absent",
    }

    setStudents([...students, newStudent])
    setName("")
  }

  // Mark Present
  const markPresent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: "Present" }
          : student
      )
    )
  }

  // Mark Absent
  const markAbsent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: "Absent" }
          : student
      )
    )
  }

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  return (
    <div className="container">
      <h1>Student Attendance Checker</h1>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* Students Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td className={student.status === "Present" ? "present" : "absent"}>
                {student.status}
              </td>
              <td>
                <button className="present-btn" onClick={() => markPresent(student.id)}>Present</button>
                <button className="absent-btn" onClick={() => markAbsent(student.id)}>Absent</button>
                <button className="delete-btn" onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App