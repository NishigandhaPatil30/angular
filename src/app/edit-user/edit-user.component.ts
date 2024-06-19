import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      id: [''], // Hidden input for user ID
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        // Set form values
        this.userForm.patchValue({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        });
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const id = this.userForm.get('id')?.value; 
      const user = this.userForm.value; 
      console.log(id);
      console.log(user);
      this.userService.updateUser(id, user).subscribe(
        response => {
          alert('User updated successfully');
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error updating user', error);
          alert('Error updating user');
        }
      );
    }
  }
}
