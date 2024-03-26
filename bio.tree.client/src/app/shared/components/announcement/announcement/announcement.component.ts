import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit{
  title: string = '';
  description: string = '';
  redirectUrl: string = ''
  redirectButtonText: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>{
       this.title = params['title'];
       this.description = params['description'];
       console.log(params['redirectUrl']);
       this.redirectUrl = params['redirectUrl'] === undefined ? '/' : params['redirectUrl'];
       this.redirectButtonText = params['buttonText'];
    });
  }

  redirect(): void {
    this.router.navigate([this.redirectUrl])
      .then();
  }
}
