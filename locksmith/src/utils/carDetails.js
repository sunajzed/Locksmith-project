const carDetails = {
    Suzuki: {
      Swift: [
        { buttons: 2, yearFrom: 2000, yearTo: 2005 },
        { buttons: 2, yearFrom: 2005, yearTo: 2010 },
        { buttons: 2, yearFrom: 2017, yearTo: 2021 },
      ],
      Ignis: [{ buttons: 2, yearFrom: 2000, yearTo: 2005 }],
      GrandVitara: [{ buttons: 2, yearFrom: 2006, yearTo: 2013 }],
      Splash: [{ buttons: 2, yearFrom: 2008, yearTo: 2015 }],
      SX4: [{ buttons: 2, yearFrom: 2006, yearTo: 2012 }],
      WagonR: [{ buttons: 2, yearFrom: 2000, yearTo: 2008 }],
    },
    Toyota: {
      Avalon: [{ buttons: 3, yearFrom: 2005, yearTo: 2011 }],
      Proace: [{ buttons: 3, yearFrom: 2013, yearTo: 2016 }],
      Camry: [{ buttons: 3, yearFrom: 2003, yearTo: 2011 }],
      Corolla: [
        { buttons: 3, yearFrom: 2005, yearTo: 2010 },
        { buttons: 3, yearFrom: 2007, yearTo: 2013 },
      ],
      Rav4: [
        { buttons: 3, yearFrom: 2006, yearTo: 2010 },
        { buttons: 3, yearFrom: 2005, yearTo: 2012 },
      ],
      Venza: [{ buttons: 3, yearFrom: 2009, yearTo: 2010 }],
      Yaris: [
        { buttons: 3, yearFrom: 2007, yearTo: 2010 },
        { buttons: 3, yearFrom: 2005, yearTo: 2011 },
      ],
      Previa: [{ buttons: 3, yearFrom: 2006, yearTo: 2006 }],
      Tarago: [{ buttons: 3, yearFrom: 2006, yearTo: 2006 }],
      Auris: [{ buttons: 3, yearFrom: 2006, yearTo: 2012 }],
      Hilux: [{ buttons: 3, yearFrom: 2005, yearTo: 2012 }],
      InnovaKijang: [{ buttons: 3, yearFrom: 2005, yearTo: 2005 }],
      LandCruiser200: [{ buttons: 3, yearFrom: 2012, yearTo: 2012 }],
      LandCruiserPrado: [{ buttons: 3, yearFrom: 2013, yearTo: 2013 }],
      Wish: [{ buttons: 3, yearFrom: 2004, yearTo: 2009 }],
      Aygo: [{ buttons: 3, yearFrom: 2005, yearTo: 2014 }],
    },
    Subaru: {
      Impreza: [{ buttons: 3, yearFrom: 2011, yearTo: 2012 }],
      B9Tribeca: [{ buttons: 3, yearFrom: 2008, yearTo: 2010 }],
      Legacy: [
        { buttons: 3, yearFrom: 2009, yearTo: 2014 },
        { buttons: 3, yearFrom: 2008, yearTo: 2009 },
      ],
      Outback: [
        { buttons: 3, yearFrom: 2009, yearTo: 2014 },
        { buttons: 3, yearFrom: 2008, yearTo: 2009 },
      ],
      Wrx: [{ buttons: 3, yearFrom: 2010, yearTo: 2014 }],
      G3XJusty2: [{ buttons: 3, yearFrom: 2004, yearTo: 2007 }],
    },
    Ford: {
      Fiesta: [
        { buttons: 3, yearFrom: 2003, yearTo: 2008 },
        { buttons: 3, yearFrom: 2008, yearTo: 2012 },
        { buttons: 3, yearFrom: 2011, yearTo: 2017 },
      ],
      Focus: [
        { buttons: 3, yearFrom: 1998, yearTo: 2004 },
        { buttons: 3, yearFrom: 2004, yearTo: 2010 },
        { buttons: 3, yearFrom: 2011, yearTo: 2014 },
        { buttons: 3, yearFrom: 2015, yearTo: 2019 },
      ],
      Galaxy: [
        { buttons: 3, yearFrom: 2006, yearTo: 2010 },
        { buttons: 3, yearFrom: 2010, yearTo: 2015 },
        { buttons: 3, yearFrom: 2017, yearTo: 2022 },
      ],
      GrandCMax : [{ buttons: 3, yearFrom: 2010, yearTo: 2015 }],
      Kuga: [
        { buttons: 3, yearFrom: 2008, yearTo: 2011 },
        { buttons: 3, yearFrom: 2011, yearTo: 2016 },
        { buttons: 3, yearFrom: 2016, yearTo: 2020 },
      ],
      Mondeo: [
        { buttons: 3, yearFrom: 2001, yearTo: 2006 },
        { buttons: 3, yearFrom: 2007, yearTo: 2011 },
        { buttons: 3, yearFrom: 2011, yearTo: 2014 },
        { buttons: 3, yearFrom: 2017, yearTo: 2022 },
      ],
      Mustang: [{ buttons: 3, yearFrom: 2017, yearTo: 2017 }],
      Ka: [ { buttons: 3, yearFrom: 2008, yearTo: 2016 }],
      KaPlus: [{ buttons: 3, yearFrom: 2016, yearTo: 2019 }],
      puma: [{ buttons: 3, yearFrom: 2019, yearTo: 2019 }],
      tomeoCustom: [{ buttons: 3, yearFrom: 2012, yearTo: 2012 }],
      transit: [{ buttons: 3, yearFrom: 2000, yearTo: 2006 },
        { buttons: 3, yearFrom: 2006, yearTo: 2013 },
        { buttons: 3, yearFrom: 2013, yearTo: 2016 },
      ],
      transitCustom: [{ buttons: 3, yearFrom: 2012, yearTo: 2012 },
        { buttons: 3, yearFrom: 2002, yearTo: 2008 },
        { buttons: 3, yearFrom: 2009, yearTo: 2013 },
        { buttons: 3, yearFrom: 2018, yearTo: 2018 },
      ],
    TourmeoConnect: [
      { buttons: 3, yearFrom: 2002, yearTo: 2008 },
      { buttons: 3, yearFrom: 2009, yearTo: 2013 },
    ],
    Ranger: [{ buttons: 3, yearFrom: 2011, yearTo: 2015 }],
    SMax: [ { buttons: 3, yearFrom: 2017, yearTo: 2017 },
      { buttons: 3, yearFrom: 2006, yearTo: 2010 },
        { buttons: 3, yearFrom: 2010, yearTo: 2015 }],
        BMax: [{ buttons: 3, yearFrom: 2012, yearTo: 2018 }],
        CMax: [{ buttons: 3, yearFrom: 2000, yearTo: 2015 },
          { buttons: 3, yearFrom: 2015, yearTo: 2019 }],
          Ecosport: [{ buttons: 3, yearFrom: 2012, yearTo: 2016 }],
          Fusion: [{ buttons: 3, yearFrom: 2002, yearTo: 2012 }],
    Mini: {
        cabrio: [{ buttons: 3, yearFrom: 2007, yearTo: 2015 }],
      Clubman: [{ buttons: 3, yearFrom: 2006, yearTo: 2014 }],
      Countryman: [{ buttons: 3, yearFrom: 2010, yearTo: 2016 }],
      Coupe: [{ buttons: 3, yearFrom: 2005, yearTo: 2013 }],
      Hatchback: [{ buttons: 3, yearFrom: 2005, yearTo: 2013 }],
      Paceman: [{ buttons: 3, yearFrom: 2012, yearTo: 2016 }],
      Roadster: [
        { buttons: 3, yearFrom: 2003, yearTo: 2006 },
        { buttons: 3, yearFrom: 2011, yearTo: 2015 },
      ],
      Cooper: [{ buttons: 2, yearFrom: 2001, yearTo: 2006 }],
      One: [{ buttons: 2, yearFrom: 2001, yearTo: 2006 }],
    },
    Kia: {
      Ceed: [{ buttons: 3, yearFrom: 2015, yearTo: 2018 }],
      Optima: [{ buttons: 3, yearFrom: 2013, yearTo: 2015 }],
      Rio: [{ buttons: 3, yearFrom: 2014, yearTo: 2018 }],
      Sorento: [{ buttons: 3, yearFrom: 2012, yearTo: 2014 }],
      Soul: [{ buttons: 3, yearFrom: 2014, yearTo: 2019 }],
      Sportage: [
        { buttons: 3, yearFrom: 2010, yearTo: 2013 },
        { buttons: 3, yearFrom: 2013, yearTo: 2015 },
        { buttons: 3, yearFrom: 2016, yearTo: 2020 },
      ],
    },
    Nissan: {
        Frontier: [{ buttons: 2, yearFrom: 2014, yearTo: 2020 }],
        Juke: [{ buttons: 2, yearFrom: 2010, yearTo: 2019 }],
        Micra: [
          { buttons: 2, yearFrom: 2002, yearTo: 2010 },
          { buttons: 2, yearFrom: 2010, yearTo: 2015 },
          { buttons: 2, yearFrom: 2017, yearTo: 2022 },
        ],
        Navara: [
          { buttons: 2, yearFrom: 2005, yearTo: 2015 },
          { buttons: 2, yearFrom: 2015, yearTo: 2020 },
        ],
        Note: [
          { buttons: 2, yearFrom: 2004, yearTo: 2013 },
          { buttons: 2, yearFrom: 2013, yearTo: 2020 },
        ],
        Nv300: [{ buttons: 2, yearFrom: 2014, yearTo: 2020 }],
        NV200: [
          { buttons: 2, yearFrom: 2009, yearTo: 2013 },
          { buttons: 2, yearFrom: 2010, yearTo: 2017 },
        ],
        NV400: [{ buttons: 3, yearFrom: 2010, yearTo: 2017 },
            { buttons: 2, yearFrom: 2010, yearTo: 2017 }
        ],
        Pathfinder: [{ buttons: 2, yearFrom: 2005, yearTo: 2014 }],
        Qashqai: [
          { buttons: 2, yearFrom: 2007, yearTo: 2014 },
          { buttons: 2, yearFrom: 2014, yearTo: 2017 },
        ],
        QashqaiJ11 : [
            { buttons: 2, yearFrom: 2014, yearTo: 2017 }
           
          ],
        Pulsar: [
          { buttons: 2, yearFrom: 2014, yearTo: 2019 }
        ],
        PulsarC13: [
            { buttons: 2, yearFrom: 2014, yearTo: 2024 }
          ],
        Tida: [
          { buttons: 2, yearFrom: 2006, yearTo: 2013 },
          { buttons: 2, yearFrom: 2015, yearTo: 2020 },
        ],
        Xtrail: [{ buttons: 2, yearFrom: 2014, yearTo: 2017 }],
    },
    Cabstar: [{ buttons: 2, yearFrom: 2006, yearTo: 2013 }],
    Maxity: [{ buttons: 2, yearFrom: 2006, yearTo: 2013 }],
    NissanTruck: {
      Cabstar: [{ buttons: 2, yearFrom: 2006, yearTo: 2013 }],
    },
      },
    
      Seat: {
        Altea: [
          { buttons: 0, yearFrom: 2004, yearTo: 2008 },
          { buttons: 3, yearFrom: 2007, yearTo: 2015 },
        ],
        AlteaXL: [{ buttons: 0, yearFrom: 2006, yearTo: 2008 }],
        Ibiza: [
          { buttons: 0, yearFrom: 2004, yearTo: 2009 },
          { buttons: 3, yearFrom: 2008, yearTo: 2016 },
          { buttons: 3, yearFrom: 2015, yearTo: 2017 },
        ],
        Leon: [
          { buttons: 0, yearFrom: 2005, yearTo: 2009 },
          { buttons: 3, yearFrom: 2005, yearTo: 2015 },
          { buttons: 3, yearFrom: 2016, yearTo: 2019 },
        ],
        Toledo: [
          { buttons: 3, yearFrom: 2004, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2010 },
          { buttons: 3, yearFrom: 2013, yearTo: 2019 },
        ],
        Ateca: [{ buttons: 3, yearFrom: 2016, yearTo: 2018 }],
        Cupra: [{ buttons: 3, yearFrom: 2016, yearTo: 2017 }],
        MII: [{ buttons: 3, yearFrom: 2012, yearTo: 2016 }],
        Alhambra: [{ buttons: 3, yearFrom: 2010, yearTo: 2016 }],
      },
      Skoda: {
        Octavia: [
          { buttons: 0, yearFrom: 2004, yearTo: 2006 },
          { buttons: 3, yearFrom: 2009, yearTo: 2013 },
          { buttons: 3, yearFrom: 2013, yearTo: 2019 },
        ],
        Roomster: [
          { buttons: 0, yearFrom: 2006, yearTo: 2008 },
          { buttons: 3, yearFrom: 2011, yearTo: 2015 },
        ],
        RoomsterScout: [
          { buttons: 0, yearFrom: 2007, yearTo: 2008 },
          { buttons: 3, yearFrom: 2011, yearTo: 2015 },
        ],
        Citigo: [{ buttons: 3, yearFrom: 2012, yearTo: 2016 }],
        Fabia: [
          { buttons: 3, yearFrom: 2011, yearTo: 2014 },
          { buttons: 3, yearFrom: 2014, yearTo: 2020 },
        ],
        Superb: [
          { buttons: 3, yearFrom: 2008, yearTo: 2013 },
          { buttons: 3, yearFrom: 2015, yearTo: 2023 },
        ],
        Rapid: [
          { buttons: 3, yearFrom: 2012, yearTo: 2015 },
          { buttons: 3, yearFrom: 2015, yearTo: 2019 },
        ],
        Yeti: [{ buttons: 3, yearFrom: 2009, yearTo: 2013 }],
      },
      Volkswagen: {
        Beetle: [
          { buttons: 3, yearFrom: 2011, yearTo: 2016 }
        ],
        Amarok: [          
          { buttons: 3, yearFrom: 2010, yearTo: 2016 }
        ],
        Caddy: [
          
          { buttons: 3, yearFrom: 2011, yearTo: 2016 }
        ],
        CrossGolf: [{ buttons: 3, yearFrom: 2006, yearTo: 2007 }],
        EOS: [
         
          { buttons: 3, yearFrom: 2010, yearTo: 2016 }
        ],
        Golf: [
          { buttons: 3, yearFrom: 2009, yearTo: 2013 },
          { buttons: 3, yearFrom: 2013, yearTo: 2018 },
        ],
        GolfPlus: [{ buttons: 3, yearFrom: 2009, yearTo: 2014 }],
        Jetta: [
         
          { buttons: 3, yearFrom: 2010, yearTo: 2016 }
        ],
        Polo: [
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2017, yearTo: 2017 },
        ],
        Scirocco: [
          { buttons: 3, yearFrom: 2008, yearTo: 2010 },
          { buttons: 3, yearFrom: 2011, yearTo: 2016 },
        ],
        Sharan: [{ buttons: 3, yearFrom: 2010, yearTo: 2016 }],
        Tiguan: [
          { buttons: 3, yearFrom: 2008, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2018 },
        ],
        Touran: [
          { buttons: 3, yearFrom: 2011, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2024 },
        ],
        Transporter: [{ buttons: 3, yearFrom: 2009, yearTo: 2016 }],
        TRoc: [{ buttons: 3, yearFrom: 2018, yearTo: 2018 }],
        UP: [{ buttons: 3, yearFrom: 2011, yearTo: 2016 }],
      },
      BMW: {
        X5: [{ buttons: 3, yearFrom: 2004, yearTo: 2006 }],
        Z4: [{ buttons: 3, yearFrom: 2002, yearTo: 2008 }],
        Series3: [
          { buttons: 3, yearFrom: 2002, yearTo: 2005 },
          { buttons: 3, yearFrom: 2004, yearTo: 2005 },
        ],
        Series5: [{ buttons: 3, yearFrom: 2003, yearTo: 2005 }],
        Series6: [{ buttons: 3, yearFrom: 2003, yearTo: 2005 }],
        X3: [{ buttons: 3, yearFrom: 2003, yearTo: 2010 }],
      },
      Mazda: {
        "6": [{ buttons: 3, yearFrom: 2012, yearTo: 2020 },
        { buttons: 2, yearFrom: 2012, yearTo: 2020 }],
        CX5: [
          { buttons: 3, yearFrom: 2012, yearTo: 2017 },
          { buttons: 2, yearFrom: 2012, yearTo: 2020 },
        ],
        MX5: [{ buttons: 3, yearFrom: 2015, yearTo: 2020 }],
        BT50: [{ buttons: 3, yearFrom: 2011, yearTo: 2019 }],
        "3": [{ buttons: 2, yearFrom: 2013, yearTo: 2019 }],
        "2": [{ buttons: 2, yearFrom: 2014, yearTo: 2020 }],
        CX3: [{ buttons: 2, yearFrom: 2015, yearTo: 2020 }],
        DJ: [{ buttons: 2, yearFrom: 2014, yearTo: 2020 }],
      }, 
      Peugeot: {
        RCZ: [{ buttons: 3, yearFrom: 2011, yearTo: 2015 }],
        Bipper: [{ buttons: 3, yearFrom: 2008, yearTo: 2017 }],
        "207": [{ buttons: 3, yearFrom: 2009, yearTo: 2012 }],
        "208": [
          { buttons: 3, yearFrom: 2012, yearTo: 2019 },
          { buttons: 3, yearFrom: 2019, yearTo: 2022 },
        ],
        "301": [{ buttons: 3, yearFrom: 2013, yearTo: 2016 }],
        "307": [{ buttons: 3, yearFrom: 2007, yearTo: 2008 }],
        "308": [
          { buttons: 3, yearFrom: 2007, yearTo: 2008 },
          { buttons: 3, yearFrom: 2010, yearTo: 2013 },
          { buttons: 3, yearFrom: 2014, yearTo: 2020 },
        ],
        "508": [
          { buttons: 3, yearFrom: 2010, yearTo: 2016 },
          { buttons: 3, yearFrom: 2018, yearTo: 2020 },
        ],
        "807": [
          { buttons: 3, yearFrom: 2005, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2014 },
        ],
        "3008": [
          { buttons: 3, yearFrom: 2009, yearTo: 2013 },
          { buttons: 3, yearFrom: 2016, yearTo: 2022 },
        ],
        "5008": [
          { buttons: 3, yearFrom: 2009, yearTo: 2013 },
          { buttons: 3, yearFrom: 2016, yearTo: 2019 },
        ],
        Expert: [
          { buttons: 3, yearFrom: 2007, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2022 },
        ],
        Traveller: [{ buttons: 3, yearFrom: 2016, yearTo: 2022 }],
        Rifter: [{ buttons: 3, yearFrom: 2019, yearTo: 2022 }],
        Partner: [
          { buttons: 3, yearFrom: 2008, yearTo: 2013 },
          { buttons: 3, yearFrom: 2018, yearTo: 2022 },
        ],
        "2008": [
          { buttons: 3, yearFrom: 2013, yearTo: 2019 },
          { buttons: 3, yearFrom: 2019, yearTo: 2022 },
        ],
        Boxer: [
          { buttons: 3, yearFrom: 2006, yearTo: 2009 },
          { buttons: 3, yearFrom: 2010, yearTo: 2010 },
        ],
      },
      Citroen: {
        DS5: [{ buttons: 3, yearFrom: 2011, yearTo: 2016 }],
        Jumper: [
          { buttons: 3, yearFrom: 2006, yearTo: 2009 },
          { buttons: 3, yearFrom: 2010, yearTo: 2010 },
        ],
        Nemo: [
          { buttons: 3, yearFrom: 2007, yearTo: 2015 },
          { buttons: 3, yearFrom: 2008, yearTo: 2008 },
        ],
        Relay: [
          { buttons: 3, yearFrom: 2009, yearTo: 2009 }
         
        ],
        C3Aircross: [{ buttons: 3, yearFrom: 2017, yearTo: 2022 }],
        C8: [{ buttons: 3, yearFrom: 2005, yearTo: 2009 }],
        C5: [{ buttons: 3, yearFrom: 2006, yearTo: 2011 }],
        C5Aircross: [{ buttons: 3, yearFrom: 2017, yearTo: 2022 }],
        Spacetourer: [{ buttons: 3, yearFrom: 2016, yearTo: 2022 }],
        Jumpy: [
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2022 },
        ],
        DS3: [
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2019, yearTo: 2022 },
        ],
        Dispatch: [
          { buttons: 3, yearFrom: 2007, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2022 },
        ],
        C4Cactus: [{ buttons: 3, yearFrom: 2018, yearTo: 2020 }],
        C4Picasso: [
          { buttons: 3, yearFrom: 2006, yearTo: 2013 },
          { buttons: 3, yearFrom: 2013, yearTo: 2016 },
        ],
        C4Spacetourer: [{ buttons: 3, yearFrom: 2018, yearTo: 2020 }],
        C1:[{ buttons: 2, yearFrom: 2005, yearTo: 2014 }],
        C2: [{ buttons: 3, yearFrom: 2005, yearTo: 2009 }],
        C3: [
          { buttons: 3, yearFrom: 2005, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2016, yearTo: 2022 },
        ],
        C3Picasso: [{ buttons: 3, yearFrom: 2008, yearTo: 2017 }],
        C3Pluriel: [{ buttons: 3, yearFrom: 2005, yearTo: 2009 }],
        Berlingo: [
          { buttons: 3, yearFrom: 2009, yearTo: 2014 },
          { buttons: 3, yearFrom: 2018, yearTo: 2022 },
        ],
      },
      Fiat: {
        "500": [
          { buttons: 3, yearFrom: 2007, yearTo: 2007 }
        ],
        "500X": [{ buttons: 3, yearFrom: 2014, yearTo: 2014 }],
        "500L": [{ buttons: 3, yearFrom: 2012, yearTo: 2012 }],
        Bravo: [{ buttons: 3, yearFrom: 2007, yearTo: 2015 }],
        Doblo: [
          { buttons: 3, yearFrom: 2009, yearTo: 2009 },
          { buttons: 3, yearFrom: 2010, yearTo: 2022 },
        ],
        Ducato: [
          { buttons: 3, yearFrom: 2006, yearTo: 2009 },
          { buttons: 3, yearFrom: 2010, yearTo: 2010 },
        ],
        Fiorino: [{ buttons: 3, yearFrom: 2007, yearTo: 2007 }],
        Panda: [
          { buttons: 3, yearFrom: 2002, yearTo: 2002 },
          { buttons: 3, yearFrom: 2012, yearTo: 2012 },
        ],
        Punto: [
          { buttons: 3, yearFrom: 2012, yearTo: 2018 }
        ],
        PuntoEvo: [
          { buttons: 3, yearFrom: 2009, yearTo: 2012 }
        ],
        GrandePunto: [{ buttons: 3, yearFrom: 2005, yearTo: 2012 }],
        Linea: [{ buttons: 3, yearFrom: 2007, yearTo: 2015 }],
        Idea: [{ buttons: 3, yearFrom: 2002, yearTo: 2007 }],
        Stilo: [{ buttons: 3, yearFrom: 2001, yearTo: 2007 }],
        Scudo: [
          { buttons: 3, yearFrom: 2007, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2016 },
          { buttons: 3, yearFrom: 2021, yearTo: 2022 },
        ],
        Freemont: [{ buttons: 3, yearFrom: 2011, yearTo: 2016 }],
        Talento: [{ buttons: 3, yearFrom: 2016, yearTo: 2016 }],
        Ulysse: [
          { buttons: 3, yearFrom: 2005, yearTo: 2009 },
          { buttons: 3, yearFrom: 2009, yearTo: 2011 },
        ],
        Qubo: [{ buttons: 3, yearFrom: 2008, yearTo: 2019 }],
        Sedici: [{ buttons: 2, yearFrom: 2006, yearTo: 2014 }],
      },
      Lancia: {
        Phedra: [{ buttons: 3, yearFrom: 2006, yearTo: 2010 }],
        Delta: [
          { buttons: 3, yearFrom: 2008, yearTo: 2010 },
          { buttons: 3, yearFrom: 2008, yearTo: 2014 },
        ],
        Musa: [
          { buttons: 3, yearFrom: 2004, yearTo: 2008 },
          { buttons: 3, yearFrom: 2009, yearTo: 2012 },
        ],
        Ypsilon: [
          { buttons: 3, yearFrom: 2003, yearTo: 2010 },
          { buttons: 3, yearFrom: 2010, yearTo: 2011 },
        ],
      },
      AlfaRomeo: {
        Giulietta: [{ buttons: 3, yearFrom: 2010, yearTo: 2010 }],
        MiTo: [{ buttons: 3, yearFrom: 2008, yearTo: 2008 }],
        Giulia: [{ buttons: 3, yearFrom: 2016, yearTo: 2020 }],
        GT: [{ buttons: 3, yearFrom: 2004, yearTo: 2010 }],
        "147": [{ buttons: 3, yearFrom: 2001, yearTo: 2009 }],
        Stelvio: [{ buttons: 3, yearFrom: 2017, yearTo: 2020 }],
      },
      Jeep: {
        GrandCherokee: [{ buttons: 3, yearFrom: 2014, yearTo: 2017 },
            { buttons: 4, yearFrom: 2014, yearTo: 2014 },
        ],
        Cherokee: [
          { buttons: 3, yearFrom: 2014, yearTo: 2019 },
          { buttons: 4, yearFrom: 2014, yearTo: 2014 },
        ],
        Compass: [{ buttons: 3, yearFrom: 2014, yearTo: 2014 }],
        Renegade: [{ buttons: 3, yearFrom: 2014, yearTo: 2014 }],
      },
      LandRover: {
        RangeRover: [{ buttons: 5, yearFrom: 2012, yearTo: 2018 }],
        RangeRoverSport: [{ buttons: 5, yearFrom: 2012, yearTo: 2018 }],
        Evoque: [{ buttons: 5, yearFrom: 2011, yearTo: 2019 }],
        Discovery: [{ buttons: 5, yearFrom: 2012, yearTo: 2018 }],
        DiscoverySport: [{ buttons: 5, yearFrom: 2015, yearTo: 2018 }],
        Freelander: [{ buttons: 5, yearFrom: 2012, yearTo: 2014 }],
        Freelander2: [{ buttons: 5, yearFrom: 2006, yearTo: 2012 }],
      },
      Mercedes: {
        AClass: [
          { buttons: 3, yearFrom: 2004, yearTo: 2012 },
          { buttons: 3, yearFrom: 2012, yearTo: 2014 },
        ],
        BClass: [
          { buttons: 3, yearFrom: 2005, yearTo: 2011 },
          { buttons: 3, yearFrom: 2011, yearTo: 2014 },
        ],
        CClass: [
          { buttons: 3, yearFrom: 2000, yearTo: 2008 },
          { buttons: 3, yearFrom: 2008, yearTo: 2014 },
        ],
        EClass: [
          { buttons: 3, yearFrom: 1996, yearTo: 2002 },
          { buttons: 3, yearFrom: 2002, yearTo: 2009 },
          { buttons: 3, yearFrom: 2010, yearTo: 2014 },
        ],
        MClass: [
          { buttons: 3, yearFrom: 2005, yearTo: 2011 },
          { buttons: 3, yearFrom: 2011, yearTo: 2014 },
        ],
        RClass: [{ buttons: 3, yearFrom: 2005, yearTo: 2013 }],
        SClass: [
          { buttons: 3, yearFrom: 1998, yearTo: 2005 },
          { buttons: 3, yearFrom: 2005, yearTo: 2013 },
        ],
        CL: [
          { buttons: 3, yearFrom: 1999, yearTo: 2006 },
          { buttons: 3, yearFrom: 2006, yearTo: 2013 },
        ],
        CLA: [{ buttons: 3, yearFrom: 2013, yearTo: 2014 }],
        CLK: [
          { buttons: 3, yearFrom: 1997, yearTo: 2002 },
          { buttons: 3, yearFrom: 2003, yearTo: 2010 },
        ],
        CLS: [
          { buttons: 3, yearFrom: 2004, yearTo: 2010 },
          { buttons: 3, yearFrom: 2010, yearTo: 2014 },
        ],
        GWagon: [{ buttons: 3, yearFrom: 2000, yearTo: 2007 }],
        GLA: [{ buttons: 3, yearFrom: 2013, yearTo: 2014 }],
        SL: [
          { buttons: 3, yearFrom: 2001, yearTo: 2005 },
          { buttons: 3, yearFrom: 2005, yearTo: 2011 },
        ],
        SLK: [
          { buttons: 3, yearFrom: 2004, yearTo: 2011 },
          { buttons: 3, yearFrom: 2011, yearTo: 2014 },
        ],
        SLS: [{ buttons: 3, yearFrom: 2010, yearTo: 2014 }],
        Sprinter: [{ buttons: 3, yearFrom: 2006, yearTo: 2018 }],
        Viano: [{ buttons: 3, yearFrom: 2003, yearTo: 2014 }],
        Vito: [{ buttons: 3, yearFrom: 2003, yearTo: 2014 }],
      },
      Audi: {
        A1: [{ buttons: 3, yearFrom: 2011, yearTo: 2018 }],
        A3: [{ buttons: 3, yearFrom: 2012, yearTo: 2020 }],
        Q2: [{ buttons: 3, yearFrom: 2017, yearTo: 2019 }],
        Q3: [{ buttons: 3, yearFrom: 2011, yearTo: 2018 }],
      },
      Volvo: {
        S60: [{ buttons: 5, yearFrom: 2011, yearTo: 2016 }],
        S80: [{ buttons: 5, yearFrom: 2010, yearTo: 2015 }],
        V40: [{ buttons: 5,  yearFrom: 2013, yearTo: 2016 }],
        V60: [{ buttons: 5,  yearFrom: 2011, yearTo: 2016 }],
        V70: [{ buttons: 5,  yearFrom: 2010, yearTo: 2016 }],
        XC60: [{ buttons: 5,  yearFrom: 2009, yearTo: 2016 }],
        XC70: [{ buttons: 5,  yearFrom: 2010, yearTo: 2016 }],
      },
      Smart: {
        Forfour: [{ buttons: 3, yearFrom: 2014, yearTo: 2020 }],
        Fortwo: [
          { buttons: 3, yearFrom: 2000, yearTo: 2007 },
          { buttons: 3, yearFrom: 2007, yearTo: 2016 },
          { buttons: 3, yearFrom: 2014, yearTo: 2014 },
        ],
      },
    };
    
    export default carDetails;


  
    

    // Hyundai   Honda Chevrolet Holden Dodge Lada Dacia , Alpha Romeo, Iveco, Chrysler, Abarth, Opel, Opel Vauxhall, Porsche,Renault


    