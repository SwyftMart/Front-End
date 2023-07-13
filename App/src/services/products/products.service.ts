import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PRODUCT_MODEL } from '../../abstract_classes/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private BASE_URL = 'http://localhost:4000/products';
    private products: PRODUCT_MODEL[] = [];
    private productsSubject: Subject<PRODUCT_MODEL[]> = new Subject<PRODUCT_MODEL[]>();

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.BASE_URL);
    }

    fetchProducts(): void {
        this.getProducts().subscribe(
            (products: PRODUCT_MODEL[]) => {
                this.products = products;
                this.productsSubject.next(this.products);
                // EMIT UPDATED products
            },
            (error: any) => {
                console.error('Error fetching products:', error);
            }
        );
    }

    getStoredProducts(): Observable<PRODUCT_MODEL[]> {
        return this.productsSubject.asObservable();
    }

    createProduct(product: PRODUCT_MODEL, token: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'token': `${token}`
        });
        return this.http.post<any>(this.BASE_URL, product, { headers });
    }

    deleteProduct(productId: string): Observable<void> {
        const productUrl = `${this.BASE_URL}/${productId}`;
        return this.http.delete<void>(productUrl);
    }
}
