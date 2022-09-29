import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Region } from 'src/app/models/region';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private http: HttpClient) { } 
  
  getRegions(){ 
    const regionsUrl = 'https://restcountries.com/v3.1/region/europe'; 

    return this.http.get<Region[]>(regionsUrl).pipe( 
      map(regions => this.parserRegions(regions))
    );
  }

  parserRegions(regions: any){ 
    console.log(regions); 

    const regionsArray: Region[] = [];
    
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i];
      console.log(region); 

      const regionID = i.toString();
      const regionName = region.name.common;  
      const regionAltSpelling = region.altSpellings[0]; 
      const regionCapital = region.capital[0]; 
      // const regionCurrenciesName = region.currencies.name; 
      // const regionCurrenciesSymbol = region.currencies.symbol; 
      const regionFlag = region.flags.png; 
      const regionLanguages = region.languages; 
      const regionMaps = region.maps.openStreetMaps; 
      const regionArea = region.area; 
      const regionTimezone = region.timezones[0]; 
      const regionPopulation = region.population; 

      console.log(regionLanguages); 

      
      
      const parsedRegion: Region = { 
        id: regionID, 
        name: regionName, 
        altSpelling: regionAltSpelling, 
        capital: regionCapital, 
        flags: regionFlag, 
        languages: regionLanguages, 
        maps: regionMaps, 
        area: regionArea, 
        timezones: regionTimezone, 
        population: regionPopulation 
      } 

      regionsArray.push(parsedRegion);
      
    } 

    console.log('regionsArray', regionsArray);
    
    return regionsArray; 

    }

    
  
}
