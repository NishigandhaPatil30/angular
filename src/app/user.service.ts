import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://swatpro.co/add-user.php';
  private fetchUsersUrl = 'https://swatpro.co/fetch-users.php';
  private editUserUrl = 'https://swatpro.co/edit-user.php';
  private deleteUserUrl = 'https://swatpro.co/delete-user.php'; 
  private updateurl = 'https://swatpro.co/updateuser.php'; 
  constructor(private http: HttpClient) {}
  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.fetchUsersUrl);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.editUserUrl}?id=${id}`);
  }
  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.updateurl}`, user); 
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteUserUrl}?id=${id}`);
  }
}
