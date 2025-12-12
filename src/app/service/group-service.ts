import {inject, Injectable} from '@angular/core';
import {Group} from '../models/group';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth-service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  http = inject(HttpClient)
  authService = inject(AuthService)

  allGroups: Group[] = []

  private springUrl = 'http://localhost:8080/api/base/students'

  getAllGroups(){
    return this.http.get<Group[]>(`http://localhost:8080/api/group/allgroups`)
  }

  addNewGroup(group: Group){
    console.log('addNewGroup', group)
    const role = this.authService.getRole().toLowerCase()
    return this.http.post<Group>(`http://localhost:8080/api/${role}/group`, group)
  }

  updateGroup(group: Group){
    const role = this.authService.getRole().toLowerCase()
    return this.http.put<Group>(`http://localhost:8080/api/${role}/group`, group)
  }


  deleteGroup(id: number){
    const role = this.authService.getRole().toLowerCase()
    return this.http.delete(`http://localhost:8080/api/${role}/group/${id}`)
  }
}
