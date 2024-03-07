import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reload } from '@firebase/auth';
import { Form } from '../model/form';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  // onSubmit(ngForm) {
  //   // const email = ngForm.
  //   this.authService.createAccount(ngForm.value.email, ngForm.value.password);
  // }

  // ***********************************************************************

  formStatus: string = 'Add New Details';
  docId: string;
  post: any;
  registrationForm: FormGroup;
  imgSrc: any = './assets/img/27002.jpg';
  selectedImage: any;

  password: string = ''; // Initialize with an empty password
  showPassword: boolean = false; // Initially, password is hidden
  passwordFieldType: 'password' | 'text' = 'password'; // Initially, input type is 'password'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private postService: PostService
  ) {}
  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: [undefined, Validators.required],
      lastName: [undefined, Validators.required],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, Validators.required],
      matNo: [undefined, [Validators.required]],
      sex: ['', [Validators.required]],
      faculty: [undefined, [Validators.required]],
      department: [undefined, [Validators.required]],
      programme: [undefined, [Validators.required]],
      level: [undefined, [Validators.required]],
      waec: [undefined, [Validators.required]],
    });
  }

  get fc() {
    return this.registrationForm.controls;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  submit() {
    console.log(this.registrationForm.value);
    const postForm: Form = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      matNo: this.registrationForm.value.matNo,
      category: {
        sex: this.registrationForm.value.sex,
      },
      faculty: this.registrationForm.value.faculty,
      department: this.registrationForm.value.department,
      programme: this.registrationForm.value.programme,
      level: this.registrationForm.value.level,
      waec: '',
      createdAt: new Date(),
    };
    console.log(postForm);
    // this.postService.uploadImage(this.selectedImage, postForm);
    this.authService.createAccount(
      postForm.email,
      postForm.password,
      this.selectedImage,
      postForm
    );
  }
  logOut() {
    this.authService.logOut();
  }

  // show image preview
  showPreview($event) {
    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);

    this.selectedImage = $event.target.files[0];

    console.log(this.selectedImage);

    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    console.log(reader.onload);
    console.log(this.imgSrc);
  }
}
