import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input() strongText: string = '';
  @Input() text: string = '';
  isVisible: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {

  }
  showAlertWithStrongText(strongText: string, text: string): void{
    this.strongText = strongText;
    this.text = text;
    this.showAlert();
  }

  showAlertWithText(text: string): void{
    this.text = text;
    this.showAlert();
  }

  showAlert(): void{
    this.isVisible = true;
    setTimeout(() => {
      this.hideAlert();
      this.cdr.detectChanges();
    }, 5000);
  }



  hideAlert(): void{
    this.isVisible = false;
    this.strongText = '';
    this.text = '';
  }
}
