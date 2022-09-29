import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { RegionsService } from 'src/app/services/region-service/regions.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {

  public regionsArray: Region[] = []

  constructor( 
    private regionServ: RegionsService 
  ) { }

  ngOnInit(): void { 
    this.loadRegions();
  }

  loadRegions(){ 
    this.regionServ.getRegions().subscribe({ 
      next: regions => this.regionsArray = regions, 
      error: err => console.log(err)
    });
  } 

  orderByName(){ 
    this.regionsArray.sort(this.compareByName);
  } 

  compareByName(a: Region, b: Region){ 
    return a.name.localeCompare(b.name);
  }

  orderByPopulation(){ 
    this.regionsArray.sort(this.compareByPopulation);
  } 

  compareByPopulation(a: Region, b: Region){ 
    return b.population - a.population;
  }
}
