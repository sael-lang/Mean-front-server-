import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoprojrct';
 constructor(private http: HttpClient) { }
 contactGender= new FormControl('Gender');
 contactPassword=new FormControl('');
  contactName=new FormControl('');
  contactEmail=new FormControl('');
  id:string | undefined;
  totalAngularPackages :any[]=[];
  isLoggedIn:boolean | undefined;
  ngOnInit() {      
    // Simple GET request with response type <any>
    this.http.get<any>('http://localhost:3000/getData').subscribe(data => {
        this.totalAngularPackages = data;
        console.log(this.totalAngularPackages);
    })
}
  createContact() {
    window.location.reload();
    const contactData = {
      gender: this.contactGender.value,
      name: this.contactName.value,
      email: this.contactEmail.value,
      password: this.contactPassword.value
    };

    this.http.post('http://localhost:3000/api/contact', contactData).subscribe(
      (response) => {
        console.log('Contact created:', response);
        // Handle successful response from the backend
      },
      (error) => {
        console.log('Error creating contact:', error);
        // Handle error response from the backend
      }
    );
  }
  update(data: any) {
    this.contactGender.setValue(data.gender);
    this.contactName.setValue(data.name);
    this.contactEmail.setValue(data.email);
    this.contactPassword.setValue(data.password);
    this.isLoggedIn=true;
    this.id=data._id;
  }
  edit() {
    window.location.reload();
    const contactData = {
      gender: this.contactGender.value,
      name: this.contactName.value,
      email: this.contactEmail.value,
      password: this.contactPassword.value
    };

    this.http.patch('http://localhost:3000/update/'+this.id, contactData).subscribe(
      (response) => {
        console.log('Contact created:', response);
        // Handle successful response from the backend
      },
      (error) => {
        console.log('Error creating contact:', error);
        // Handle error response from the backend
      }
    );
  }
  delete(data: any) {
    window.location.reload();
    this.http.delete(`http://localhost:3000/delete/`+data).subscribe(
      (response) => {
        console.log('Contact created:', response);
        // Handle successful response from the backend
      },
      (error) => {
        console.log('Error creating contact:', error);
        // Handle error response from the backend
      }
      
    );
  }
}
