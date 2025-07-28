import { Injectable } from '@angular/core';
import { Student } from '../student.model'; // Adjust the import path as necessary
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

     private students: Student[] = [];
  private nextId = 1;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem('students');
      if (saved) {
        this.students = JSON.parse(saved);
        this.nextId = this.students.length ? Math.max(...this.students.map(s => s.id)) + 1 : 1;
      }
    }
  }

  private saveToStorage() {
    if (this.isBrowser) {
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(student: Student) {
    student.id = this.nextId++;
    this.students.push(student);
    this.saveToStorage();
  }

  updateStudent(updated: Student) {
    const index = this.students.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.students[index] = updated;
      this.saveToStorage();
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    this.saveToStorage();
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }
}
