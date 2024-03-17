import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() value: GLfloat = 0; // Initial rating value
  @Output() valueChange = new EventEmitter<number>(); // Event emitter for rating change

  setValue(newValue: number) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
