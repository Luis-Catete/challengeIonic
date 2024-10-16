import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  formRegister:FormGroup;

  constructor(
    private authServices:AuthService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {}


  onSubmit() {
    this.authServices.register(this.formRegister.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/auth/login']);
      })
      .catch(error => console.log(error));
  }

  login(){
    this.router.navigate(['/auth/login']); 
  }

}
