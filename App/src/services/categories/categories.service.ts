import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//categories Service to handle api requests
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getFilteredProducts(selectedCategories: string[]): Observable<any> {

    // Make a GET request to the API with selected categories
    const url = 'http://localhost:4000/products';
    return this.http.get(url).pipe(
      map((response: any) => {
        // Filter the products based on selected categories
        const filteredProducts = response.filter((product: any) =>
          selectedCategories.includes(product.category)
        );

        // Return the filtered products
        return { products: filteredProducts };
      }),
      catchError((error: any) => {
        // Handle error
        throw error;
      })
    );
  }
}
