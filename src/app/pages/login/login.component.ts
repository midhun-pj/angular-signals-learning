import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// services
import { AuthService } from '../../services';
import { MessagesService } from '../../components/messages';

@Component({
  selector: 'login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  form = this.fb.group({
    email: [''],
    password: [''],
  });

  messageService = inject(MessagesService);
  authService = inject(AuthService);
  router = inject(Router);

  async onLogin() {
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        this.messageService.showMessage(
          'Enter an email and password.',
          'error'
        );
        return;
      }
      await this.authService.login(email, password);
      await this.router.navigate(['/home']);
    } catch (err) {
      console.error(err);
      this.messageService.showMessage(
        'Login failed, please try again',
        'error'
      );
    }
  }
}
