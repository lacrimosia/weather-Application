import { Component, OnInit, OnChanges } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location = "Los Angeles";
  newLocation = null;
  private weatherURL = "http://api.apixu.com/v1/current.json?key=74d49cd76a79430cad0214409170805&q=";
  data = null;
  weatherThumb = null;
  constructor(private http: Http)
  {

  };

  ngOnInit(){
  	// initial request
  	this.http.get(this.weatherURL + this.location)
                  .map(response => response.json())
                  .subscribe(data => {
                  	this.data = data;
                  	this.location = this.data.location.name;
                  	this.weatherThumb = this.data.current.condition.icon;
                  	console.log(data);
                  });
  }

  getLocation(val){
  	this.location = val;
  	// another request to change data
  	this.http.get(this.weatherURL + this.location)
                  .map(response => response.json())
                  .subscribe(data => {
                  	this.data = data;
                  	this.location = this.data.location.name;
                  	this.weatherThumb = this.data.current.condition.icon;
                  	console.log('request', data);
                  });
  }

  roundNum(num){
  	return Math.round(num);
  }

  getBackgroundColor(val){
  	if(!val){
  		return "#495663"; // night time
  	}else{
  		return "#f9a36d"; // day time
  	}
  }
}
