

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-sort',
  imports: [FormsModule],
  templateUrl: './sort.html',
  styleUrl: './sort.css',
})
export class SortComponent {
    //productService = inject(ProductService)
}
