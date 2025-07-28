import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../student.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-addstudent',
  imports: [CommonModule,FormsModule],
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
 student: Student = { id: 0, name: '', class: '', rollNo: '', phone: '' };

  constructor(private studentService: StudentService, private router: Router) {}

  addStudent() {
    this.studentService.addStudent({ ...this.student });
    this.student = { id: 0, name: '', class: '', rollNo: '', phone: '' };
    this.router.navigate(['/students']);
  }
}
