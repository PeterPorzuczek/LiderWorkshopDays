import { Component, OnInit } from '@angular/core';
import * as bodymovin from 'bodymovin/build/player/bodymovin.js';
import { AfterViewInit } from '@angular/core';
import { MenuItem } from "./models/menuItem.model";
import { Coach } from "./models/coach.model";
import { Patron } from "./models/patron.model";
import { ScheduleItem } from "./models/scheduleItem.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  position: [number, number]; 
  private anim: any;
  animData: any;

  menuItems: MenuItem[] = [];
  patrons: Patron[] = [];
  coaches: Coach[][][] = [];
  days: ScheduleItem[][]  = [];

  constructor() {
    this.menuItems = [
      { href: '#start', title: 'Start', class: ''},
      { href: '#warsztaty', title: 'Warsztaty', class: ''},
      { href: '#trenerzy', title: 'Trenerzy', class: ''},
      { href: '#patroni', title: 'Patroni', class: ''},
      { href: '#miejsce', title: 'Miejsce', class: ''},
      { href: 'https://lwd2017.evenea.pl', title: 'Zapisz się już teraz', class: 'nav-signup'},
    ] as MenuItem[];
    this.patrons = [   
      { href: "http://gdansk.pl/", src: "assets/patrons/gdanskpl.svg",  class: "patron center-block img-responsive"},
      { href: "https://radiogdansk.pl", src: "assets/patrons/radiogdansk.svg",  class: "patron center-block  img-responsive"},
      { href: "http://gdansk.dlawas.info", src: "assets/patrons/gdanskdlawas.svg",  class: "patron center-block  img-responsive"},
      { href: "https://goyello.com/pl/", src: "assets/patrons/goyello.svg",  class: "patron center-block  img-responsive"},
      { href: "https://aplitt.pl/pl/", src: "assets/patrons/aplitt.svg",  class: "patron center-block  img-responsive"},
      { href: "http://www.centrumtalentow.pl", src: "assets/patrons/crt.svg",  class: "patron center-block  img-responsive"},
      { href: "https://pl.asseco.com", src: "assets/patrons/asseco.svg",  class: "patron center-block  img-responsive"},
      { href: "http://catta.pl", src: "assets/patrons/catta.svg",  class: "patron center-block  img-responsive"},
      { href: "https://sentione.com/pl", src: "assets/patrons/sentione.svg",  class: "patron center-block  img-responsive"},
      { href: "http://gdynia.pl", src: "assets/patrons/gdynia.svg",  class: "patron center-block  img-responsive"},
      { href: "http://www.study-gdansk.com", src: "assets/patrons/studyingdansk.svg",  class: "patron center-block  img-responsive"}
    ] as Patron[];
    this.coaches = [
      [
        [
          { href: "modal-rafal",srcImg: "assets/coachesInfo/RafalMiazgaImg.png",srcDesc: "assets/coachesInfo/RafalMiazgaDesc.svg",name: "Rafał Miazga (SentiOne)",desc: "Specjalista ds. komunikacji w SentiOne,  firmie działająca w branży internetowej, której głównym produktem jest narzędzie do monitorowania internetu i mediów społecznościowych. SentiOne pozwala firmom w szybki sposób sprawdzić opinie internautów na temat produktu, marki lub firmy w sieci. Główne zastosowania systemu to: monitoring wizerunku marki, prowadzenie komunikacji z klientem online, wsparcie sprzedaży w internecie oraz ochrona przed kryzysami wizerunkowym." },
          {  href: "modal-kasia",srcImg: "assets/coachesInfo/KatarzynaKantImg.png",srcDesc: "assets/coachesInfo/KatarzynaKantDesc.svg",name: "Katarzyna Kant (Catta Consulting)",desc: "Pomaga markom osiągać sukces w biznesie. Prowadzi szkolenia i warsztaty z zakresu marketingu, mediów społecznościowych i etykiety biznesu."}
        ],
        [
          { href: "modal-beata",srcImg: "assets/coachesInfo/BeataButkiewiczImg.png",srcDesc: "assets/coachesInfo/BeataButkiewiczDesc.svg",name: "Beata Butkiewicz (Centrum Rozwoju Kompetencji)",desc: "Pedagog, licencjonowany doradca zawodowy, coach. Wieloletni pracownik gdańskiego urzędu pracy. Ukończyła studia podyplomowe z zakresu doradztwa zawodowego na Uniwersytecie Łódzkim na Wydziale Psychologii. Na swoim koncie ma szereg szkoleń specjalistycznych z zakresu doradztwa zawodowego, coachingu, treningu umiejętności menedżerskich, interpersonalnych oraz rekrutacji i selekcji ukończonych m. in. na Akademii Leona Koźmińskiego. Uczestniczyła w szkoleniu Zarządzania Sobą i Swoimi Talentami. Posiada wieloletnie doświadczenie zawodowe w zakresie prowadzenia doradztwa zawodowego indywidualnego, jak i szkoleń warsztatowych dla różnych grup klientów. Jej działalność szkoleniowa dotyczy m. in. szkoleń z obszaru diagnozowania kompetencji, planowania kariery zawodowej, komunikacji interpersonalnej, rozwoju osobistego i zawodowego, technik autoprezentacji. W swojej pracy zawodowej stawia na profesjonalizm, wspieranie i towarzyszenie tym, którzy chcą się rozwijać.Najważniejsze talenty: zbieranie, maksymalista, bliskość, poważanie strateg." },
          { href: "modal-karol",srcImg: "assets/coachesInfo/KarolGierszewskiImg.png",srcDesc: "assets/coachesInfo/KarolGierszewskiDesc.svg",name: "Karol Gierszewski (Goyello)",desc: "Certyfikowany agile tester i analityk wymagań, absolwent studiów podyplomowych z zakresu testowania oprogramowania oraz inżynierii wymagań w projektach informatycznych. Prelegent zarówno na lokalnych spotkaniach testerskich (TrójQA) jak i ogólnopolskich konferencjach (TestWarez, Quality Excites). Od czterech lat w czołówce (2017 rok – 2 miejsce) najlepszych testerów w klasyfikacji indywidualnej Mistrzostw Polski w Testowaniu Oprogramowania TestingCup. W Goyello jako członek zespołów scrumowych zaraża wszystkich swoim bezkompromisowym podejściem do zapewniania jakości."}
        ]
      ],
      [
        [
          { href: "modal-robert",srcImg: "assets/coachesInfo/RobertSzulistImg.png",srcDesc: "assets/coachesInfo/RobertSzulistDesc.svg",name: "Robert Szulist (Aplitt)",desc: "Entuzjasta Pythona, Azure i dzielenia się wiedzą. W wolnych chwilach zajmuję się kaletnictwem i głaskaniem kotów."},
          { href: "modal-adam",srcImg: "assets/coachesInfo/AdamCetnerowskiImg.png",srcDesc: "assets/coachesInfo/AdamCetnerowskiDesc.svg",name: "Adam Cetnerowski (Intel)",desc: "Adam Cetnerowski jest menadżerem zespołu tworzącego sterowniki GPGPU w firmie Intel. Zajmuje się też trenowaniem zespołów z zakresu szeroko pojętych metodologii zwinnych (Agile)."}
        ],
        [
          { href: "modal-michal",srcImg: "assets/coachesInfo/MichalMichalczukImg.png",srcDesc: "assets/coachesInfo/MichalMichalczukDesc.svg",name: "Michal Michalczuk (Goyello)",desc: "Lider techniczny, Full-stack Software Developer, trener w infoShare Academy, okazjonalnie prelegent. Na froncie najczęściej walczy przy użyciu TypeScript w Angular 2 / Angular 1.x, Knockout.js oraz z wszelkiej maści task runnerami i build toolami. Na tyłach preferuje Asp.Net i C#, ale pracował w różnych językach i technologiach - od Pythona i Django, przez Wpf i Silverlight, Node.js, VBasic czy PHP. Uwielbia dzielić się wiedzą i szerzyć dobre praktyki oraz rozwiązywać proble my związane z używaniem Git-a.  Oprócz tego dumny współwłaściciel Rzecz Jasna, bistro na ul. Łąkowej na Dolnym Mieście :) Nie nudzi się, sypia, gdy jest taka potrzeba."},
          { href: "modal-mateusz",srcImg: "assets/coachesInfo/MateuszTurzynskiImg.png",srcDesc: "assets/coachesInfo/MateuszTurzynskiDesc.svg",name: "Mateusz Turzyński (Goyello)",desc: "Software Developer w Goyello. Miłośnik czystego kodu i rozwiązań chmurowych. Na codzień zajmuje się projektowaniem skalowalnych aplikacji działających na platformie Microsoft Azure.  Stara się automatyzować procesy wdrożenia i utrzymania systemów IT. Bliżej frontendu rozwija rozwiązania w Angularze przy wykorzysaniu TypeScriptu. Prywatnie miłośnik lotnictwa cywilnego i piłki nożnej."}
        ]
      ]
    ] as  Coach[][][];
    this.days = [
      [
        {itemType: 1,classMain: 'schedule-registration-head background-red border-bottom-red-dark border-right-blue',title: '07.11.2017',classTitle: 'text-red-dark',hour: '11:00',classHour: 'schedule-registration-hours border-red-dark text-right',content: 'Rejestracja',classContent: 'schedule-registration-info border-red-dark text-left',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 2,classMain: 'schedule-workshop-head background-red-dark border-bottom-red border-right-blue-dark',title: 'Analityka',classTitle: 'row-fluid text-red',hour: '',classHour: '',content: '',classContent: '',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 3,classMain: 'schedule-workshop-content background-red border-bottom-red-dark border-right-blue',title: 'Dowiedz się, co w sieci piszczy. Monitoring internetu jako źródło wiedzy o dyskusjach internautów.',classTitle: 'schedule-title',hour: '11:30 - 15:00 - SALA C24',classHour: 'schedule-hours border-red-dark',content: 'Rafał Miazga (SentiOne)',classContent: 'schedule-coach border-red-dark',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-red-dark',separatorClass: 'schedule-separator border-red-dark',href: 'modal-sentione',description: 'Prowadząc działalność w sieci, kluczowym jest, aby na bieżąco śledzić wszelkie wzmianki na temat marki, które pojawiają się w internecie. Podczas warsztatu nauczycie się korzystać z narzędzia przeznaczonego do monitorowania sieci.'},
        {itemType: 3,classMain: 'schedule-workshop-content background-red-dark border-bottom-red border-right-blue-dark',title: 'Budowanie strategii social media <br>dla marki  ',classTitle: 'schedule-title',hour: '15:15- 18:00 - SALA C21',classHour: 'schedule-hours border-red',content: 'Katarzyna Kant (Catta Consulting)',classContent: 'schedule-coach border-red',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-red',separatorClass: 'schedule-separator border-red',href: 'modal-catta',description: 'Podczas warsztatu dowiecie się, jak w spójny i przemyślany sposób zbudować strategię działań w social media dla marki lub organizacji pozarządowej. Poznacie narzędzia, które pomogą analizować efekty pracy i optymalizować kampanie.'},
        {itemType: 2,classMain: 'schedule-workshop-head background-red border-bottom-red-dark border-right-blue',title: 'Programowanie',classTitle: 'row-fluid text-red-dark',hour: '',classHour: '',content: '',classContent: '',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 3,classMain: 'schedule-workshop-content background-red-dark border-bottom-red border-right-blue-dark',title: 'Spring Framework <br> Live Coding',classTitle: 'schedule-title',hour: '11:30 - 15:00 - SALA C36',classHour: 'schedule-hours border-red',content: 'Piotr Porzuczek (KNI Lider)',classContent: 'schedule-coach border-red',hrefMaterials:'https://peterporzuczek.github.io/microBlog-workshop',materials:'Materiały',classMaterials:'schedule-materials',more: 'Więcej',classMore: 'schedule-more border-red',separatorClass: 'schedule-separator border-red',href: 'modal-lider',description: 'Spring to szkielet wytwarzania aplikacji (framework), dzięki któremu proces budowania oprogramowania w języku Java staje się znacznie prostsze i efektywniejsze.'},
        {itemType: 3,classMain: 'schedule-workshop-content background-red border-right-blue',title: 'Podstawy programowania w Pythonie wraz z wizualizacją danych',classTitle: 'schedule-title',hour: '15:15- 19:00 - SALA C36',classHour: 'schedule-hours border-red-dark',content: 'Robert Szulist (Aplitt)',classContent: 'schedule-coach border-red-dark',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-red-dark',separatorClass: 'schedule-separator border-red-dark',href: 'modal-aplitt',description: 'Warsztat skierowany do osób początkujących, podczas którego można będzie się nauczyć sterowania programem, podstaw obróbki i prezentacji danych.'}
      ],
      [
        {itemType: 1,classMain: 'schedule-registration-head background-blue border-bottom-blue-dark',title: '08.11.2017',classTitle: 'text-blue-dark',hour: '11:00',classHour: 'schedule-registration-hours border-blue-dark text-right',content: 'Rejestracja',classContent: 'schedule-registration-info border-blue-dark text-left',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 2,classMain: 'schedule-workshop-head background-blue-dark border-bottom-blue',title: 'Analityka',classTitle: 'row-fluid text-blue',hour: '',classHour: '',content: '',classContent: '',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 3,classMain: 'schedule-workshop-content background-blue border-bottom-blue-dark',title: 'Praca w metodologii Kanban <br>na bazie firmy informatycznej',classTitle: 'schedule-title',hour: '12:00- 15:00 - SALA C21',classHour: 'schedule-hours border-blue-dark',content: 'Adam Cetnerowski (Intel)',classContent: 'schedule-coach border-blue-dark',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-blue-dark',separatorClass: 'schedule-separator border-blue-dark',href: 'modal-intel',description: 'Kanban obok Scrum jest jedną z najbardziej popularnych metodologii zwinnych. Podczas warsztatów uczestnicy będą mieli możliwość zapoznania się założeniami teoretycznymi metodologii jak również przejść symulację kierowania zespołem korzystającym z Kanban przy tworzeniu oprogramowania.'},
        {itemType: 3,classMain: 'schedule-workshop-content background-blue-dark border-bottom-blue',title: 'Piramida zmian <br> zarządzaj własnym rozwojem',classTitle: 'schedule-title',hour: '16:00 - 18:00 - SALA C21',classHour: 'schedule-hours border-blue',content: 'Beata Butkiewicz (CRT)',classContent: 'schedule-coach border-blue',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-blue',separatorClass: 'schedule-separator border-blue',href: 'modal-crt',description: 'Korzyści:<br>zidentyfikujesz własne kompetencje <br>dowiesz się, jak proaktywną postawą stymulować własny potencjał <br>świadomie zaplanujesz swoją przyszłość zawodową'},
        {itemType: 2,classMain: 'schedule-workshop-head background-blue border-bottom-blue-dark',title: 'Programowanie',classTitle: 'row-fluid text-blue-dark',hour: '',classHour: '',content: '',classContent: '',hrefMaterials:'',materials:'',classMaterials:'',more: '',classMore: '',separatorClass: '',href: '',description: ''},
        {itemType: 3,classMain: 'schedule-workshop-content background-blue-dark border-bottom-blue',title: 'Testowanie <br> eksploracyjne',classTitle: 'schedule-title',hour: '11.15 - 15.00 - SALA C36',classHour: 'schedule-hours border-blue',content: 'Karol Gierszewski (Goyello)',classContent: 'schedule-coach border-blue',hrefMaterials:'',materials:'',classMaterials:'',more: 'Więcej',classMore: 'schedule-more border-blue',separatorClass: 'schedule-separator border-blue',href: 'modal-yello1',description: 'Testowanie eksploracyjne to sposób przeprowadzania testów przy jednoczesnej nauce zasad funkcjonowania aplikacji. Podczas warsztatu nauczymy się w jaki sposób przeprowadzić efektywną sesję testów eksploracyjnych oraz na jakie aspekty podczas testowania należy zwracać szczególną uwagę. Efektem prac będzie raport o stanie jakości dowolnej wybranej przez siebie aplikacji internetowej.'},
        {itemType: 3,classMain: 'schedule-workshop-content background-blue',title: 'Rozwój aplikacji w podejściu TDD <br>(Test Driven Development)',classTitle: 'schedule-title',hour: '15.15-19.00 - SALA C36',classHour: 'schedule-hours border-blue-dark',content: 'Michał Michalczuk, Mateusz Turzyński (Goyello)',classContent: 'schedule-coach border-blue-dark',hrefMaterials:'https://github.com/mturzynskigoyello/tdd',materials:'Materiały',classMaterials:'schedule-materials',more: 'Więcej',classMore: 'schedule-more border-blue-dark',separatorClass: 'schedule-separator border-blue-dark',href: 'modal-yello2',description: 'Zapraszamy na warsztaty Test-Driven Development. Podczas spotkania dowiesz się czym są testy jednostkowe, czym jest technika TDD oraz jak testy pozwalają utrzymywać czysty kod. Przewidujemy pair-programming, pisanie kodu techniką RGF (red-green- refactor) oraz rozwiązywane realnych przypadków biznesowych.'}
      ]
    ] as ScheduleItem[][]

    this.position = [ 54.445340, 18.553448 ]; 
  }

  ngOnInit() {
    this.animData = {
      container: document.getElementById('logoAnim'),
      renderer: 'svg',
      loop: 30,
      autoplay: true,
      path: './assets/logoAnim.json'
    };
    this.anim = bodymovin.loadAnimation(this.animData);
  }
}
