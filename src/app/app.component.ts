import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
//import { isAbsolute } from 'path';



declare var $:any;

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
 
interface Summary {
    name: string;
}


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})


export class AppComponent implements OnInit {
      search1:any;
      wordlt:any;
      consno:any;
      data={
                id:null,
            };
      key:any=[];
      multi:number[][]  ;
      value:any=[];
      
      searchterm="";
      sentWordMapArr:string;
      aa:boolean=false;
      datap:any;
      data1:any;
      cacheForecasts: any;
      castwords: any;


           filterForeCasts(selectVal: any) 
        {
                  if (selectVal == "1")
                  this.castwords = this.cacheForecasts;
            else
                  this.castwords = this.cacheForecasts.filter((item:any) => item.summary == selectVal);
        }

  

            setIndex(ii:any)
        {
                  this.aa=ii;
                  console.log
        }

 

            sortMap(inputMap:any) 
        {
                  return new Map(Array.from(inputMap))
        } 

             fun(str:string,w:any)
        {
                  let nameAgeMapping = new Map<string,number>();

        if(w==undefined){w=2;}

              var inputText:string=str;
              var normalizedText = inputText.split('.').join('').split(',').join('').split('|').join('');
              var sentWordArr = normalizedText.split(" ");
              var sentWordMap = new Map();
              var seperator = ' = ';
              var sentWordMapArr = new Array();
              var consecutiveWordLength =parseInt(w);
    
          
              for (var i = 0; i < sentWordArr.length; i++) 
              {
                  var currWord = sentWordArr.slice(i, i + consecutiveWordLength).join(" ");
                  var sentWordMapWord = sentWordMap.get(currWord);
                if (sentWordMapWord) {
                  sentWordMap.set(currWord, sentWordMapWord + 1);
              } else {
                  sentWordMap.set(currWord, 1);
            }
        }

        sentWordMap.forEach((value: number, key: string) => {
            sentWordMapArr.push(key + seperator + value);
         //   alert(key);
        });
        

        sentWordMapArr.sort(function (a, b) {
            var tempA = a.split(seperator)[1];
            var tempB = b.split(seperator)[1];

            return tempB - tempA;
        })
        
        
      

        for(var i=0;i<sentWordMapArr.length;i++){
       //    this.B[i]=new Object();
         //   this.B[i].key=sentWordMapArr[i].split(seperator)[0];
          //  this.B[i].value=sentWordMapArr[i].split(seperator)[1];
           
            this.key.push(sentWordMapArr[i].split(seperator)[0]);
            this.value.push(sentWordMapArr[i].split(seperator)[1]);
            
        }

        //console.log('sentWordMapArrSorted : ', sentWordMapArr);
              this.data1=sentWordMapArr;
     //   this.data=sentWordMap;
        
      
     
    }

    

              newmeth(str:string)
                  {
                      var a=str.split(' ');
     // alert(JSON.stringify(a));
                     var b = new Array();
                     b[0]=a[0];
     
                     for(var i=1;i<a.length;i++){
        //alert("hello baba");
        //alert(b)
        //b[i]=a[i];
                     if(b.indexOf(a[i])==-1){ b[i]=a[i];}else{}
      
                }
      //alert(JSON.stringify(b));
                      this.wordlt=b;
               }

            pframe(str:string,w:any){
     
        this. fun(str,w);
        let nameAgeMapping = new Map<string,number>();
 
 if(w==undefined){w=2;}
 
       var inputText:string=str;
         var normalizedText = inputText.split('.').join('').split(',').join('').split('|').join('');
         var sentWordArr = normalizedText.split(" ");
         var sentWordMap = new Map();
         var seperator = ' = ';
         var sentWordMapArr = new Array();
         var consecutiveWordLength =parseInt(w);
     
           
          for (var i = 0; i < sentWordArr.length; i++) {
           var currWord = sentWordArr.slice(i, i + consecutiveWordLength).join(" ");
           var sentWordMapWord = sentWordMap.get(currWord);
           if (sentWordMapWord) {
             sentWordMap.set(currWord, sentWordMapWord + 1);
           } else {
             sentWordMap.set(currWord, 1);
           }
         }
  
         sentWordMap.forEach((value: number, key: string) => {
             sentWordMapArr.push(key + seperator + value);
          //   alert(key);
         });
         
 
         sentWordMapArr.sort(function (a, b) {
             var tempA = a.split(seperator)[1];
             var tempB = b.split(seperator)[1];
 
             return tempB - tempA;
         })
         
         
        
       
 
         for(var i=0;i<sentWordMapArr.length;i++){
        //    this.B[i]=new Object();
          //   this.B[i].key=sentWordMapArr[i].split(seperator)[0];
           //  this.B[i].value=sentWordMapArr[i].split(seperator)[1];
            
             this.key.push(sentWordMapArr[i].split(seperator)[0]);
             this.value.push(sentWordMapArr[i].split(seperator)[1]);
             
         }
 
         //console.log('sentWordMapArrSorted : ', sentWordMapArr);
         sentWordMapArr = sentWordMapArr.filter((elem) => {
            var elemArr = elem.replace('-=-', ' ').split(' ');
            return elemArr.indexOf(this.searchterm) > -1;
        });
        

        this.datap=sentWordMapArr;
      //   this.data=sentWordMap;
         
       
      
     }
 

  ngOnInit(){

  

    function cleanString(str) {
      return str.replace('', '')
          .replace(/\s+/g,' ')
          .replace(/\d+/g,'');
         // .toLowerCase();
  }
  
  function extractSubstr(str:any, regexp:any) {
      return cleanString(str).match(regexp) || [];
  }
  
  function getWordsByNonWhiteSpace(str:any) {
      return extractSubstr(str, /\S+/g);
  }
  
  function getWordsByWordBoundaries(str:any) {
      return extractSubstr(str, /[a-zA-Z~]+/g);
  }
  
  function wordMap(str: any) {
      return getWordsByWordBoundaries(str).reduce(function(map:any, word:any) {
          map[word] = (map[word] || 0) + 1;
          return map;
      }, {});
  }
  
  function mapToTuples(map: any) {
      return Object.keys(map).map(function(key) {
          return [ key, map[key] ];
      });
  }
  
  function mapToSortedTuples(map: any, sortFn: any, sortOrder: any) {
      return mapToTuples(map).sort(function(a, b) {
          return sortFn.call(undefined, a, b, sortOrder);
      });
  }
  
  function countWords(str) {
      return getWordsByWordBoundaries(str).length;
  }
  
  function wordFrequency(str) {
      return mapToSortedTuples(wordMap(str), function(a, b, order) {
          if (b[1] > a[1]) {
              return order[1] * -1;
          } else if (a[1] > b[1]) {
              return order[1] * 1;
          } else {
              return order[0] * (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
          }
      }, [1, -1]);
  }
  
  function printTuples(tuples) {
      return tuples.map(function(tuple) {
          return padStr(tuple[0], ' ', 12, 1) + ' -> ' + tuple[1];
      }).join('\n');
  }
  
  function padStr(str, ch, width, dir) { 
      return (width <= str.length ? str : padStr(dir < 0 ? ch + str : str + ch, ch, width, dir)).substr(0, width);
  }
  
  function toTable(data, headers) {
      return $('<table>').append($('<thead>').append($('<tr>').append(headers.map(function(header) {
          return $('<th>').html(header);
      })))).append($('<tbody>').append(data.map(function(row) {
          return $('<tr>').append(row.map(function(cell) {
              return $('<td>').html(cell);
          }));
      })));
  }
  
  function addRowsBefore(table:any, data:any) {
      table.find('tbody').prepend(data.map(function(row) {
          return $('<tr>').append(row.map(function(cell) {
              return $('<td>').html(cell);
          }));
      }));
      return table;
  }
  
  $(function() {
      $('#countWordsBtn').on('click', function(e) {
          var str = $('#wordsTxtAra').val();
          var wordFreq = wordFrequency(str);
          var wordCount = countWords(str);
          var uniqueWords = wordFreq.length;
          var summaryData = [
              [ 'TOTAL', wordCount ],
              [ 'UNIQUE', uniqueWords ]
          ];
          var table = toTable(wordFreq, ['Word', 'Frequency']);
          addRowsBefore(table, summaryData);
          $('#wordFreq').html(table);
       //  alert(wordFreq);
      });
  });

  }

  role = '';
  chars = 0;

 
  fileContent: string | ArrayBuffer = '';

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result;
    }
    fileReader.readAsText(file);
  }
  download() {
   alert("Hello");

  }

   
}
