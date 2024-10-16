import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  form: FormGroup;

  constructor(
    private authServices:AuthService,
    private router: Router
  ) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  onSubmit() {
    if(this.form.valid){
      
    this.authServices.login(this.form.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      })
      .catch(error => console.log(error));
      
    }else{
      this.form.markAllAsTouched();
    }
  }

  goRegister(){
    this.router.navigate(['/auth/register']); 
  }

  onClick() {
    this.authServices.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error))
  }
}
