import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../student.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-managestudent',
  imports: [FormsModule,CommonModule],
  templateUrl: './managestudent.component.html',
  styleUrl: './managestudent.component.css'
})
export class ManagestudentComponent {
 students: Student[] = [];
  editingStudent: Student | null = null;

  constructor(private studentService: StudentService) {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
  }

  editStudent(student: Student) {
    this.editingStudent = { ...student };
  }

  updateStudent() {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent);
      this.editingStudent = null;
      this.loadStudents();
    }
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.loadStudents();
  }
  cancelEdit() {
    this.editingStudent = null;
  }
}
