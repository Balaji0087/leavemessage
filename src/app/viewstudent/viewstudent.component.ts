import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { Student } from '../student.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-viewstudent',
  imports: [CommonModule, FormsModule],
  templateUrl: './viewstudent.component.html',
  styleUrl: './viewstudent.component.css'
})
export class ViewstudentComponent {
students: Student[] = [];
  filterClass: string = '';
  filteredStudents: Student[] = [];
    remarks: string = '';


  constructor(private studentService: StudentService,private http: HttpClient) {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
    this.applyFilter();
  }
submitAttempted = false;

submitSelected(): void {
this.submitAttempted = true;

  const selectedStudents = this.filteredStudents.filter(s => s.selected);
  if (selectedStudents.length === 0 || !this.remarks.trim()) {
    return;
  }

  const payload = {
    students: selectedStudents,
    remarks: this.remarks.trim()
  };

  this.http.post('http://localhost:3000/send-sms', payload).subscribe({
    next: (res) => {
      alert('SMS sent successfully!');
      this.remarks = '';
      this.submitAttempted = false;
      this.filteredStudents.forEach(s => s.selected = false);
    },
    error: (err) => {
      alert('Failed to send SMS: ' + err.message);
    }
  });
}

hasSelectedStudent(): boolean {
  return this.filteredStudents.some(s => s.selected);
}


  applyFilter() {
    this.filteredStudents = this.filterClass
      ? this.students.filter(s => s.class.includes(this.filterClass))
      : [...this.students];
  }
}
