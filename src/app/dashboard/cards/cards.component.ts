import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cards',
    standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.less']
})
export class CardsComponent {
   @Input() tipo = '';
  @Input() valor = '';
  @Input() percentual = '';

}
