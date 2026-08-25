/* ═══════════════════════════════════════════════════════
   LA TERRAZA DE LUPITA — MAIN JS
   IIFE + window.__BRAND__ pattern
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Brand config ── */
  window.__BRAND__ = {
    phone: '56990998900',
    deliveryMin: 5000,
    deliveryZones: [
      { zone: 'Villa Hermosa', price: 1500 },
      { zone: 'Casas Chubi', price: 2000 },
      { zone: 'Camino Lampa / Av. España', price: 2000 },
      { zone: 'Sol y Luna', price: 2000 },
      { zone: 'Santa Sara', price: 3000 },
      { zone: 'Santa Carolina', price: 3000 }
    ]
  };

  var CUSTOM_PROTEINS = [
    'Pollo a la plancha', 'Carne mechada', 'Vacuno salteado', 'Pollo apanado', 'Lomo de cerdo'
  ];
  var CUSTOM_INGREDIENTS = [
    'Aceitunas', 'Cebolla morada', 'Frijoles', 'Lechuga', 'Pepinillos', 'Poroto verde',
    'Arroz Lupita', 'Champiñón salteado', 'Guacamole', 'Papas fritas', 'Pico de gallo',
    'Queso', 'Cebolla caramelizada', 'Choclo', 'Jalapeño', 'Papas hilo', 'Pimentón', 'Tomate'
  ];
  var CUSTOM_SAUCES = ['Salsa de cilantro', 'Salsa BBQ', 'Salsa de queso', 'Salsa de tocino'];
  var INCLUDED_DRINKS = [
    'Coca-Cola', 'Coca-Cola Zero', 'Fanta', 'Sprite', 'Sprite Zero',
    'Bilz', 'Kem Piña', 'Pepsi', 'Pepsi Zero'
  ];

  function customSteps() {
    return [
      {key:'protein',title:'Elige tu proteína',type:'single',count:1,options:CUSTOM_PROTEINS},
      {key:'ingredients',title:'Elige tres ingredientes',type:'multiple',count:3,options:CUSTOM_INGREDIENTS},
      {key:'sauces',title:'Elige dos salsas',type:'multiple',count:2,options:CUSTOM_SAUCES},
      {key:'drink',title:'Elige tu bebida incluida',type:'single',count:1,options:INCLUDED_DRINKS}
    ];
  }

  /* ── Product Catalog ── */
  var PRODUCTS = [
    // ─── Para compartir (0-13)
    {id:0,catId:"compartir",name:"Aros de Cebolla",price:3500,desc:"Doce aros gruesos, apanados y fritos al momento.",badges:[]},
    {id:1,catId:"compartir",name:"Papas Rústicas",price:3500,desc:"Con cáscara, doradas por fuera y cremosas por dentro. Con salsa de la casa.",badges:[]},
    {id:2,catId:"compartir",name:"Empanaditas de Queso",price:5000,desc:"Recién fritas, con el queso todavía haciendo hilo.",badges:[]},
    {id:3,catId:"compartir",name:"Nuggets",price:5000,desc:"Diez nuggets de pollo dorados y crujientes.",badges:[]},
    {id:4,catId:"compartir",name:"Papas Cheddar",price:5000,desc:"Papas rústicas bajo una capa de cheddar caliente.",badges:[]},
    {id:5,catId:"compartir",name:"Salchipapas",price:5500,desc:"Papas y vienesas doradas. El clásico que nunca falla.",badges:[]},
    {id:6,catId:"compartir",name:"Papas Cheddar y Tocino",price:6000,desc:"Cheddar fundido y tocino ahumado crujiente encima.",badges:[]},
    {id:7,catId:"compartir",name:"Boneless Lupita",price:9000,desc:"Seis trozos de pollo rebozado, papas, salchitacos y salsa de la casa.",badges:[]},
    {id:8,catId:"compartir",name:"Mister Alitas",price:10000,desc:"Seis alitas apanadas, seis empanaditas de queso y papas.",badges:[]},
    {id:9,catId:"compartir",name:"Mister Nuggets",price:11000,desc:"Ocho nuggets, ocho empanaditas de queso y papas.",badges:[]},
    {id:10,catId:"compartir",name:"Carnita al Disco",price:15000,desc:"Lomo liso de 300 g al disco con verduras salteadas y papas asadas. Con sour cream o guacamole.",badges:["local"]},
    {id:11,catId:"compartir",name:"Fajitas al Disco",price:17000,desc:"Seis tortillas, vacuno, pollo y verduras chisporroteando en el disco. Con queso, frijoles, guacamole y sour cream.",badges:["local"]},
    {id:12,catId:"compartir",name:"Trilogía de Taquitos",price:18000,desc:"Dos de pollo, dos de carnita y dos de cochinito. Con choclo, guacamole, pico de gallo y limón.",badges:[]},
    {id:13,catId:"compartir",name:"Tablita Lupita Tex-Mex",price:20000,desc:"Quesadilla de carne, flautitas, alitas, nachos con guacamole, aros de cebolla y papas. Con tres salsas.",badges:[]},

    // ─── Chorrillanas (14-28)
    {id:14,catId:"chorrillanas",name:"Tradicional",price:7500,desc:"Carne mechada, cebolla caramelizada, chorizo y huevo frito.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:7500},{label:"Para 3–4",price:12000}]}},
    {id:15,catId:"chorrillanas",name:"Suprema",price:12000,desc:"Pollo, salsa blanca, champiñones y cebollín.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:12000},{label:"Para 3–4",price:19000}]}},
    {id:16,catId:"chorrillanas",name:"Pollo Mongoliano",price:12000,desc:"Pollo salteado, cebollín, salsa de ostras y soya.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:12000},{label:"Para 3–4",price:19000}]}},
    {id:17,catId:"chorrillanas",name:"Papas Champi",price:12000,desc:"Champiñones salteados, cebollín y salsa de ostras.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:12000},{label:"Para 3–4",price:19000}]}},
    {id:18,catId:"chorrillanas",name:"La Vegetariana",price:12000,desc:"Cebolla, champiñón, pimentón, cebollín y salsa de queso.",badges:["vegetariano"],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:12000},{label:"Para 3–4",price:19000}]}},
    {id:19,catId:"chorrillanas",name:"Chicken Teriyaki",price:12000,desc:"Pollo, champiñón, cebollín, sésamo tostado y salsa teriyaki.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:12000},{label:"Para 3–4",price:19000}]}},
    {id:20,catId:"chorrillanas",name:"Lomo Saltado",price:16000,desc:"Vacuno, cebolla morada, tomate, soya y salsa de ostras.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:16000},{label:"Para 3–4",price:23000}]}},
    {id:21,catId:"chorrillanas",name:"Carne Mongoliana",price:16000,desc:"Lomo liso, cebollín, cheddar, salsa de ostras y soya.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:16000},{label:"Para 3–4",price:23000}]}},
    {id:22,catId:"chorrillanas",name:"El Fabi",price:16000,desc:"Chorizo, carne mechada, pollo, tocino y huevo frito.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:16000},{label:"Para 3–4",price:23000}]}},
    {id:23,catId:"chorrillanas",name:"Tradicional Extra",price:19000,desc:"Cebolla caramelizada, extra cerdo, extra mechada y huevo frito.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:19000},{label:"Para 3–4",price:23000}]}},
    {id:24,catId:"chorrillanas",name:"Suprema Camarón",price:19000,desc:"Salsa blanca, cebollín, champiñón, pollo y camarones.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:19000},{label:"Para 3–4",price:23000}]}},
    {id:25,catId:"chorrillanas",name:"La Reina de la Casa",price:19000,desc:"Salsa blanca, champiñón, pollo apanado, ciboulette y queso rallado.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:19000},{label:"Para 3–4",price:23000}]}},
    {id:26,catId:"chorrillanas",name:"Don Simón",price:23000,desc:"Salsa blanca, pollo, carne mechada, cebollín y champiñón.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:23000},{label:"Para 3–4",price:28000}]}},
    {id:27,catId:"chorrillanas",name:"La Carnívora",price:23000,desc:"Chorizo, pollo, mechada, lomo de cerdo, cebolla caramelizada y huevo frito.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:23000},{label:"Para 3–4",price:28000}]}},
    {id:28,catId:"chorrillanas",name:"Mar y Tierra",price:23000,desc:"Chorizo, vacuno, pollo, camarones, algas, cebolla caramelizada y huevo frito.",badges:[],variants:{title:"Elige tamaño",required:true,options:[{label:"Para 1–2",price:23000},{label:"Para 3–4",price:28000}]}},

    // ─── Chorrillanas solo en el local (29-33)
    {id:29,catId:"chorrillanas",name:"Suprema (local)",price:12000,desc:"Pollo, salsa blanca, champiñones y cebollín.",badges:["local"]},
    {id:30,catId:"chorrillanas",name:"Pollo Mongoliano (local)",price:12000,desc:"Pollo, cebollín, salsa de ostras y soya.",badges:["local"]},
    {id:31,catId:"chorrillanas",name:"Carne Mongoliana (local)",price:12000,desc:"Lomo liso, cebollín, cheddar, ostra y soya.",badges:["local"]},
    {id:32,catId:"chorrillanas",name:"Pollo Champiñón",price:12000,desc:"Pollo, cebollín, champiñones y salsa de la casa.",badges:["local"]},
    {id:33,catId:"chorrillanas",name:"Especial de la Casa",price:14000,desc:"Mozzarella fundida, carne y camarones con salsa de la casa.",badges:["local"]},

    // ─── Cocina mexicana (34-45)
    {id:34,catId:"mexicana",name:"Salchitacos",price:6000,desc:"Vienesas en tortilla de maíz con papas, salsa marinada y kétchup.",badges:[]},
    {id:35,catId:"mexicana",name:"Arma tu fajita",price:7000,desc:"Tortilla de trigo XL con una proteína, tres ingredientes, dos salsas y una bebida a elección. Incluye papas fritas.",badges:["personalizable"],customizer:{steps:customSteps()}},
    {id:122,catId:"mexicana",name:"Taco a tu pinta",price:7000,desc:"Dos tacos con una proteína, tres ingredientes, dos salsas y una bebida a elección.",badges:["personalizable"],customizer:{steps:customSteps()}},
    {id:36,catId:"mexicana",name:"Súper Burrito de Carne",price:6500,desc:"Carne, arroz Lupita, frijoles, lechuga, salsa verde y guacamole.",badges:[],variants:{title:"Acompañamiento",required:true,options:[{label:"Papas"},{label:"Nachos"}]}},
    {id:37,catId:"mexicana",name:"Burrito Lupita",price:7000,desc:"Pollo, arroz Lupita verde, queso, frijoles, salsa verde y guacamole.",badges:[],variants:{title:"Acompañamiento",required:true,options:[{label:"Papas"},{label:"Nachos"}]}},
    {id:38,catId:"mexicana",name:"Burrito El Facu",price:7000,desc:"Carne mechada, arroz Lupita, cebolla caramelizada, frijoles y cheddar.",badges:[]},
    {id:39,catId:"mexicana",name:"Chilaquiles en salsa roja o verde",price:7000,desc:"Pino de carne con frijoles negros, pico de gallo, queso rallado y huevo frito.",badges:[],variants:{title:"Elige salsa",required:true,options:[{label:"Salsa roja"},{label:"Salsa verde"}]}},
    {id:40,catId:"mexicana",name:"Enchilada de Pollo",price:7500,desc:"Pollo desmenuzado, pimiento rojo y un toque de ajo. Con guacamole y pico de gallo.",badges:[]},
    {id:41,catId:"mexicana",name:"Quesadilla de Pollo",price:7000,desc:"Con guacamole, pico de gallo y sour cream.",badges:[]},
    {id:42,catId:"mexicana",name:"Quesadilla de Verduras",price:7500,desc:"Choclo, champiñones y cebollín. Con guacamole, pico de gallo y sour cream.",badges:["vegetariano"]},
    {id:43,catId:"mexicana",name:"Quesadilla de Carne",price:8000,desc:"Con guacamole, pico de gallo y sour cream.",badges:[]},
    {id:44,catId:"mexicana",name:"El Terrible Burrito",price:8000,desc:"Carne y pollo, arroz Lupita, frijoles, papas, queso, salsa verde y salsa de tocino.",badges:[]},
    {id:45,catId:"mexicana",name:"Quesadilla de Camarón",price:9500,desc:"Con guacamole, pico de gallo y sour cream.",badges:[]},
    {id:46,catId:"mexicana",name:"Quesadilla Mixta",price:10000,desc:"Carne y pollo juntos. Con guacamole, pico de gallo y sour cream.",badges:[]},

    // ─── Sándwiches (47-62)
    {id:47,catId:"sandwiches",name:"Luco",price:5000,desc:"Gouda y cheddar fundidos hasta hacer hilo.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:48,catId:"sandwiches",name:"Italiana",price:5000,desc:"Tomate maduro, palta cremosa y mayonesa de la casa.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:49,catId:"sandwiches",name:"Completa",price:5000,desc:"Tomate, americana, chucrut y mayonesa de la casa.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:50,catId:"sandwiches",name:"Pobre",price:5000,desc:"Cebolla dorada lentamente y huevo frito con la yema entera.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:51,catId:"sandwiches",name:"La Chilena",price:5000,desc:"Tomate, cebolla morada curtida, cilantro fresco y ají verde a pedido.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:52,catId:"sandwiches",name:"Chacarera",price:5000,desc:"Tomate, poroto verde crujiente y ají a pedido.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5000},{label:"Pollo",price:5000},{label:"Lomo liso",price:6000}]}},
    {id:53,catId:"sandwiches",name:"Doble Queso",price:5500,desc:"Doble gouda y doble cheddar. Cuatro capas de queso fundido.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:54,catId:"sandwiches",name:"Queso Champi",price:5500,desc:"Gouda, cheddar y champiñones salteados en mantequilla.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:55,catId:"sandwiches",name:"De Luxe",price:5500,desc:"Gouda, cheddar, champiñones y cebolla caramelizada.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:56,catId:"sandwiches",name:"Gringa",price:5500,desc:"Gouda, cheddar, cebolla morada y tocino ahumado crujiente.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:57,catId:"sandwiches",name:"La Mozza",price:5500,desc:"Mozzarella derretida y aceitunas negras.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:58,catId:"sandwiches",name:"La Napolitana",price:5500,desc:"Gouda, tomate asado, aceitunas, orégano y salsa de tomate.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:59,catId:"sandwiches",name:"La Mexicana",price:5500,desc:"Cheddar, cebolla caramelizada, papas hilo y guacamole.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:60,catId:"sandwiches",name:"Brasileña",price:5500,desc:"Gouda, cheddar y palta cremosa.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:61,catId:"sandwiches",name:"Tradicional",price:5500,desc:"Lechuga, tomate, cebolla morada y pepinillo.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},
    {id:62,catId:"sandwiches",name:"La de la Casa",price:5500,desc:"Lechuga, tomate, cebolla morada, pepinillo y huevo frito.",badges:[],variants:{title:"Elige proteína",required:true,options:[{label:"Mechada",price:5500},{label:"Pollo",price:5500},{label:"Lomo liso",price:6500}]}},

    // ─── Hamburguesas (63-70)
    {id:63,catId:"hamburguesas",name:"Clásica Burger",price:5500,desc:"Mozzarella, lechuga, tomate, cebolla y kétchup.",badges:[]},
    {id:64,catId:"hamburguesas",name:"La Texana",price:6000,desc:"Cheddar, aros de cebolla crujientes y salsa BBQ ahumada.",badges:[]},
    {id:65,catId:"hamburguesas",name:"Tex-Mex Burger",price:6000,desc:"Cheddar, guacamole, tomate, jalapeño en rodajas y salsa chipotle.",badges:[]},
    {id:66,catId:"hamburguesas",name:"La Doble Barbacoa",price:6000,desc:"Doble carne, cheddar, BBQ y cebolla crispy.",badges:[]},
    {id:67,catId:"hamburguesas",name:"Doble Carne",price:6500,desc:"Doble carne, cheddar, cebolla morada, pepinillo y lechuga.",badges:[]},
    {id:68,catId:"hamburguesas",name:"La Pizza Burger",price:6500,desc:"Mantecoso fundido, pepperoni, tomate y aceite de oliva.",badges:[]},
    {id:69,catId:"hamburguesas",name:"La Poderosa",price:8000,desc:"Doble carne, huevo frito, tocino y todos los frescos.",badges:[]},
    {id:70,catId:"hamburguesas",name:"La Terrible",price:8500,desc:"Doble carne, doble queso, tocino, chorizo y huevo frito. Se come con las dos manos.",badges:[]},

    // ─── Especiales (71-76)
    {id:71,catId:"especiales",name:"Milanesa de Pollo",price:7000,desc:"Receta argentina. Con tomate, lechuga, huevo frito y mayonesa de la casa.",badges:[]},
    {id:72,catId:"especiales",name:"Milanesa Kaiser",price:7000,desc:"Milanesa de pollo, jamón planchado, gouda fundido, huevo frito y frescos.",badges:[]},
    {id:73,catId:"especiales",name:"Lomo Saltado",price:7000,desc:"Lomo liso salteado con cebolla morada, tomate, soya y salsa de ostras.",badges:[]},
    {id:74,catId:"especiales",name:"Lomo a la Napolitana",price:7000,desc:"Lomo liso, queso gratinado, tomate asado, orégano y aceitunas.",badges:[]},
    {id:75,catId:"especiales",name:"Crispy Sandwich",price:7000,desc:"Pollo crispy, gouda, tocino, mayonesa ahumada y salsa BBQ.",badges:[]},
    {id:76,catId:"especiales",name:"Milanesa de Vacuno",price:7500,desc:"Receta argentina. Con tomate, lechuga, huevo frito y mayonesa de la casa.",badges:[]},

    // ─── Veganos (77-84)
    {id:77,catId:"veganos",name:"La Verde",price:5500,desc:"Palta, tomate, lechuga, cilantro y mayonesa vegana de la casa.",badges:["vegano"]},
    {id:78,catId:"veganos",name:"La Chilena Vegana",price:5500,desc:"Tomate, cebolla morada curtida, cilantro fresco y ají verde a pedido.",badges:["vegano"]},
    {id:79,catId:"veganos",name:"Chacarera Vegana",price:5500,desc:"Tomate, poroto verde crujiente y ají a pedido.",badges:["vegano"]},
    {id:80,catId:"veganos",name:"La Mexicana Vegana",price:6000,desc:"Guacamole, pico de gallo, cebolla caramelizada y papas hilo.",badges:["vegano"]},
    {id:81,catId:"veganos",name:"Champi Deluxe",price:6000,desc:"Champiñones salteados, cebolla caramelizada y mayonesa vegana de ajo.",badges:["vegano"]},
    {id:82,catId:"veganos",name:"La Ahumada",price:6000,desc:"Pimentón asado, cebolla morada, hummus de porotos negros y BBQ ahumada.",badges:["vegano"]},
    {id:83,catId:"veganos",name:"Burrito Verde",price:7000,desc:"Arroz Lupita, frijoles negros, choclo, pimentón, guacamole y salsa verde.",badges:["vegano"]},
    {id:84,catId:"veganos",name:"Chorrillana Vegana",price:12000,desc:"Papas rústicas, champiñón, pimentón, cebolla caramelizada, choclo y salsa de la casa.",badges:["vegano"]},

    // ─── Postres (85-90)
    {id:85,catId:"postres",name:"Flan Napolitano",price:4500,desc:"Cremoso, con caramelo oscuro por encima. Receta de siempre.",badges:[]},
    {id:86,catId:"postres",name:"Churros con Dulce de Leche",price:4500,desc:"Cuatro churros calientes, azúcar canela y dulce de leche para mojar.",badges:[]},
    {id:87,catId:"postres",name:"Pastel Tres Leches",price:5000,desc:"Bizcocho empapado en tres leches con merengue y canela.",badges:[]},
    {id:88,catId:"postres",name:"Chocoflan",price:5500,desc:"Mitad bizcocho de chocolate, mitad flan. El pastel imposible.",badges:[]},
    {id:89,catId:"postres",name:"Brownie con Helado",price:6000,desc:"Brownie tibio, helado de vainilla y salsa de chocolate caliente.",badges:[]},
    {id:90,catId:"postres",name:"Churros para Compartir",price:8000,desc:"Ocho churros con tres salsas: dulce de leche, chocolate y frutos rojos.",badges:[]},

    // ─── Bebidas (91-101)
    {id:91,catId:"bebidas",name:"Bebida Express",price:1500,desc:"Vaso de bebida.",badges:[],variants:{title:"Elige tu bebida",required:true,options:[{label:"Coca-Cola"},{label:"Coca-Cola Zero"},{label:"Fanta"},{label:"Sprite"}]}},
    {id:92,catId:"bebidas",name:"Agua",price:1500,desc:"Botella individual.",badges:[],variants:{title:"Elige tipo",required:true,options:[{label:"Sin gas"},{label:"Con gas"}]}},
    {id:93,catId:"bebidas",name:"Té",price:1500,desc:"Infusión caliente.",badges:[]},
    {id:94,catId:"bebidas",name:"Bebida en lata 350 ml",price:1800,desc:"Lata individual bien fría.",badges:[],variants:{title:"Elige tu bebida",required:true,options:INCLUDED_DRINKS.map(function (label) { return {label:label}; })}},
    {id:95,catId:"bebidas",name:"Jugo en lata Jumex",price:1800,desc:"Jugo natural en lata.",badges:[],variants:{title:"Elige sabor",required:true,options:[{label:"Mango"},{label:"Piña"},{label:"Durazno"},{label:"Piña Coco"},{label:"Coco"},{label:"Guayaba"},{label:"Manzana"}]}},
    {id:96,catId:"bebidas",name:"Café",price:2000,desc:"Preparado al momento.",badges:[]},
    {id:97,catId:"bebidas",name:"Bebida 1,5 L",price:3000,desc:"Para toda la mesa.",badges:[],variants:{title:"Elige tu bebida",required:true,options:[{label:"Coca-Cola"},{label:"Coca-Cola Zero"},{label:"Sprite"},{label:"Fanta"}]}},
    {id:98,catId:"bebidas",name:"Agua de Jamaica",price:3000,desc:"Flor de jamaica, bien fría y no muy dulce.",badges:[]},
    {id:99,catId:"bebidas",name:"Horchata",price:3000,desc:"Arroz, canela y vainilla. Cremosa.",badges:[]},
    {id:100,catId:"bebidas",name:"Agua de Limón con Menta",price:3000,desc:"Limón exprimido y menta fresca.",badges:[]},
    {id:101,catId:"bebidas",name:"Jarra de Agua Fresca 1 L",price:7000,desc:"El sabor que elijas, para compartir.",badges:[],variants:{title:"Elige sabor",required:true,options:[{label:"Jamaica"},{label:"Horchata"},{label:"Limón con menta"}]}},

    // ─── Salsas (102-105)
    {id:102,catId:"salsas",name:"Salsa verde",price:800,desc:"Tomatillo, cilantro y un toque de jalapeño.",badges:[]},
    {id:103,catId:"salsas",name:"Pico de gallo",price:1200,desc:"Tomate, cebolla, cilantro y limón.",badges:[]},
    {id:104,catId:"salsas",name:"Sour cream",price:1200,desc:"Crema ácida para complementar.",badges:[]},
    {id:105,catId:"salsas",name:"Guacamole",price:1200,desc:"Palta fresca con cilantro y limón.",badges:[]},

    // ─── Agregados (106-121)
    {id:106,catId:"agregados",name:"Cebolla caramelizada",price:800,desc:"",badges:[]},
    {id:107,catId:"agregados",name:"Choclo",price:800,desc:"",badges:[]},
    {id:108,catId:"agregados",name:"Huevo",price:800,desc:"",badges:[]},
    {id:109,catId:"agregados",name:"Jalapeño",price:800,desc:"",badges:[]},
    {id:110,catId:"agregados",name:"Queso",price:800,desc:"",badges:[]},
    {id:111,catId:"agregados",name:"Tomate",price:800,desc:"",badges:[]},
    {id:112,catId:"agregados",name:"Lechuga",price:800,desc:"",badges:[]},
    {id:113,catId:"agregados",name:"Arroz Lupita",price:1000,desc:"",badges:[]},
    {id:114,catId:"agregados",name:"Palta",price:1200,desc:"",badges:[]},
    {id:115,catId:"agregados",name:"Tocino",price:1200,desc:"",badges:[]},
    {id:116,catId:"agregados",name:"Champiñón",price:1200,desc:"",badges:[]},
    {id:117,catId:"agregados",name:"Frijoles negros",price:1200,desc:"",badges:[]},
    {id:118,catId:"agregados",name:"Pollo extra",price:2000,desc:"",badges:[]},
    {id:119,catId:"agregados",name:"Carne extra",price:2500,desc:"",badges:[]},
    {id:120,catId:"agregados",name:"Camarones (6 unidades)",price:3500,desc:"",badges:[]},
    {id:121,catId:"agregados",name:"Tortillas (6 unidades)",price:3500,desc:"",badges:[]}
  ];

  /* ── Category definitions ── */
  var CATEGORIES = [
    {id:"mexicana",name:"Cocina mexicana",eyebrow:"La cocina de Lupita",desc:"Tortillas, frijoles y preparaciones de inspiración mexicana."},
    {id:"hamburguesas",name:"Hamburguesas",eyebrow:"A la parrilla",desc:"Todas incluyen papas rústicas."},
    {id:"chorrillanas",name:"Chorrillanas",eyebrow:"Al centro",desc:"Elige el tamaño antes de agregar."},
    {id:"sandwiches",name:"Sándwiches",eyebrow:"Elige y arma",desc:"Selecciona primero la proteína y luego la receta. Incluyen papas rústicas."},
    {id:"especiales",name:"Especiales de la casa",eyebrow:"Del chef",desc:"Preparaciones propias que solo encuentras aquí."},
    {id:"compartir",name:"Para compartir",eyebrow:"Para partir",desc:"Platos abundantes para comenzar al centro de la mesa."},
    {id:"veganos",name:"Opciones veganas",eyebrow:"100% vegetal",desc:"Sabor completo sin ingredientes de origen animal."},
    {id:"postres",name:"Postres",eyebrow:"Para cerrar",desc:"El final perfecto para tu comida."},
    {id:"bebidas",name:"Bebidas",eyebrow:"Para acompañar",desc:"Frescas y listas para tu mesa."},
    {id:"salsas",name:"Salsas",eyebrow:"El toque final",desc:"Salsas propias y clásicas para acompañar tu plato."},
    {id:"agregados",name:"Agregados",eyebrow:"Hazlo a tu gusto",desc:"Complementos adicionales para personalizar el pedido."}
  ];

  /* ── State ── */
  var cart = [];
  var currentProduct = null;
  var fulfillment = 'retiro';
  var deliveryPrice = 0;
  var selectedDeliveryZone = '';
  var selectedTable = '';
  var cartNotes = '';
  var customState = null;
  var orderId = '';

  /* ── DOM Helpers ── */
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return document.querySelectorAll(s); };

  function safe(fn) {
    try { fn(); } catch (e) { console.warn('[LTL]', e); }
  }

  function fmtPrice(p) {
    var s = String(p);
    return s.length > 3 ? '$' + s.slice(0, -3) + '.' + s.slice(-3) : '$' + s;
  }

  function escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function createOrderId() {
    var now = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    return 'WEB-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' +
      pad(now.getHours()) + pad(now.getMinutes()) + '-' + String(Math.floor(Math.random() * 900) + 100);
  }

  /* ═══ RENDER MENU SECTIONS ═══ */
  function renderMenu() {
    var container = $('#menu-sections');
    if (!container) return;
    var html = '';

    CATEGORIES.forEach(function (cat, catIndex) {
      var prods = PRODUCTS.filter(function (p) { return p.catId === cat.id && !p.customizer; });
      html += '<section class="menu-section menu-section--decor-' + (catIndex % 2 === 0 ? 'a' : 'b') + '" id="' + cat.id + '" aria-labelledby="heading-' + cat.id + '">';
      html += '<div class="section-head">';
      html += '<span class="eyebrow">' + cat.eyebrow + '</span>';
      html += '<h3 id="heading-' + cat.id + '">' + cat.name + '</h3>';
      html += '<p>' + cat.desc + '</p>';
      html += '</div>';
      html += '<div class="product-grid">';

      prods.forEach(function (p, productIndex) {
        var hasVariants = !!p.variants;
        html += '<article class="product-card product-card--tone-' + (productIndex % 4) + '">';

        html += '<div class="product-card__body">';
        html += '<div class="product-card__top">';
        html += '<h4>' + escHtml(p.name) + '</h4>';

        if (hasVariants && p.variants.options && p.variants.options.some(function (o) { return o.price; })) {
          var minP = Math.min.apply(null, p.variants.options.map(function (o) { return o.price || p.price; }));
          html += '<span class="product-card__price product-card__price--from">' + fmtPrice(minP) + '</span>';
        } else {
          html += '<span class="product-card__price">' + fmtPrice(p.price) + '</span>';
        }

        html += '</div>';
        if (p.desc) html += '<p class="product-card__desc">' + escHtml(p.desc) + '</p>';
        html += '<div class="product-card__foot"><div>';

        var badgeMap = {vegano:'Vegano',vegetariano:'Vegetariano',personalizable:'Personalizable',local:'Solo en el local'};
        (p.badges || []).forEach(function (b) {
          html += '<span class="badge badge--' + b + '">' + (badgeMap[b] || b) + '</span> ';
        });

        html += '</div>';
        var btnText = hasVariants ? 'Elegir' : 'Agregar';
        var btnClass = hasVariants ? 'add-btn choose' : 'add-btn';
        html += '<button class="' + btnClass + '" type="button" data-add="' + p.id + '" aria-label="' + btnText + ' ' + escHtml(p.name) + '">' + btnText + '</button>';
        html += '</div></div></article>';
      });

      html += '</div></section>';
    });

    container.innerHTML = html;

    // Wire add buttons
    $$('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleAdd(parseInt(btn.dataset.add));
      });
    });
  }

  /* ═══ CART LOGIC ═══ */
  function cartTotal() { return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0); }
  function cartCount() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }

  function addToCart(product, variantLabel, variantPrice) {
    var price = variantPrice || product.price;
    var key = product.name + '|' + (variantLabel || '');
    if (!orderId) orderId = createOrderId();
    var existing = cart.find(function (c) { return c.key === key; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ key: key, id: product.id, name: product.name, price: price, qty: 1, variant: variantLabel || null });
    }
    updateCartUI();
    showToast(product.name + ' agregado');
  }

  function removeFromCart(key) {
    cart = cart.filter(function (c) { return c.key !== key; });
    updateCartUI();
    renderCart();
  }

  function updateQty(key, delta) {
    var item = cart.find(function (c) { return c.key === key; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { removeFromCart(key); return; }
    updateCartUI();
    renderCart();
  }

  function updateCartUI() {
    var count = cartCount();
    var total = cartTotal();
    var fabCount = $('#fab-count');
    var fabTotal = $('#fab-total');
    var fabCart = $('#fab-cart');
    if (fabCount) fabCount.textContent = count;
    if (fabTotal) fabTotal.textContent = fmtPrice(total);
    if (fabCart) fabCart.classList.toggle('visible', count > 0);
  }

  /* ═══ RENDER CART ═══ */
  function renderCart() {
    var cartBody = $('#cart-body');
    var cartFooter = $('#cart-footer');
    if (!cartBody) return;

    if (cart.length === 0) {
      orderId = '';
      cartBody.innerHTML = '<div class="cart-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg><p>Tu pedido está vacío</p></div>';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    var html = '<ul class="cart-list">';
    cart.forEach(function (item) {
      html += '<li class="cart-item">';
      html += '<div class="cart-item__main"><div>';
      html += '<div class="cart-item__name">' + escHtml(item.name) + '</div>';
      if (item.variant) html += '<div class="cart-item__variant">' + escHtml(item.variant) + '</div>';
      html += '</div><div class="cart-item__price">' + fmtPrice(item.price * item.qty) + '</div></div>';
      html += '<div class="cart-item__controls">';
      html += '<div class="qty-control">';
      html += '<button class="qty-btn" data-qty-key="' + escHtml(item.key) + '" data-qty-delta="-1" aria-label="Restar">−</button>';
      html += '<span class="qty-val">' + item.qty + '</span>';
      html += '<button class="qty-btn" data-qty-key="' + escHtml(item.key) + '" data-qty-delta="1" aria-label="Sumar">+</button>';
      html += '</div>';
      html += '<button class="cart-remove" data-remove-key="' + escHtml(item.key) + '">Eliminar</button>';
      html += '</div></li>';
    });
    html += '</ul>';

    // Fulfillment
    var ZONES = window.__BRAND__.deliveryZones;
    html += '<div class="fulfillment"><h3>¿Cómo quieres recibirlo?</h3>';
    html += '<div class="segmented">';
    html += '<button class="seg-btn' + (fulfillment === 'retiro' ? ' active' : '') + '" data-fulfill="retiro">Retiro</button>';
    html += '<button class="seg-btn' + (fulfillment === 'delivery' ? ' active' : '') + '" data-fulfill="delivery">Delivery</button>';
    html += '<button class="seg-btn' + (fulfillment === 'mesa' ? ' active' : '') + '" data-fulfill="mesa">A la mesa</button>';
    html += '</div>';
    html += '<div class="fulfillment-detail delivery-zone-select' + (fulfillment === 'delivery' ? ' show' : '') + '" id="dz-select">';
    html += '<label for="dz-dropdown">Zona de delivery</label>';
    html += '<select id="dz-dropdown"><option value="">Selecciona tu zona</option>';
    ZONES.forEach(function (z) {
      html += '<option value="' + escHtml(z.zone) + '"' + (selectedDeliveryZone === z.zone ? ' selected' : '') + '>' + escHtml(z.zone) + ' — ' + fmtPrice(z.price) + '</option>';
    });
    html += '</select></div>';
    html += '<div class="fulfillment-detail table-select' + (fulfillment === 'mesa' ? ' show' : '') + '" id="table-select">';
    html += '<label for="table-dropdown">Número de mesa</label><select id="table-dropdown"><option value="">Selecciona tu mesa</option>';
    for (var table = 1; table <= 9; table++) {
      html += '<option value="' + table + '"' + (String(selectedTable) === String(table) ? ' selected' : '') + '>Mesa ' + table + '</option>';
    }
    html += '</select></div><p class="fulfillment-error" id="fulfillment-error" role="alert"></p></div>';

    // Notes
    html += '<div class="notes-field"><label for="cart-notes">Observaciones opcionales</label>';
    html += '<textarea id="cart-notes" placeholder="Ej.: sin cebolla, llamar al llegar..." maxlength="400">' + escHtml(cartNotes) + '</textarea></div>';

    // Totals
    var subtotal = cartTotal();
    html += '<div class="totals" id="cart-totals">';
    html += '<div><span>Subtotal</span><strong>' + fmtPrice(subtotal) + '</strong></div>';
    html += '<div class="total-grand"><span>Total estimado</span><strong id="grand-total">' + fmtPrice(subtotal) + '</strong></div>';
    html += '</div>';

    cartBody.innerHTML = html;
    if (cartFooter) cartFooter.style.display = 'flex';

    // Wire cart events
    $$('[data-qty-key]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        updateQty(btn.dataset.qtyKey, parseInt(btn.dataset.qtyDelta));
      });
    });
    $$('[data-remove-key]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.dataset.removeKey);
      });
    });
    $$('[data-fulfill]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setFulfillment(btn.dataset.fulfill);
      });
    });
    var dd = $('#dz-dropdown');
    if (dd) dd.addEventListener('change', function () { selectedDeliveryZone = dd.value; updateTotals(); });
    var tableDropdown = $('#table-dropdown');
    if (tableDropdown) tableDropdown.addEventListener('change', function () { selectedTable = tableDropdown.value; updateWaLink(); });
    var notes = $('#cart-notes');
    if (notes) notes.addEventListener('input', function () { cartNotes = notes.value; updateWaLink(); });

    updateWaLink();
  }

  function setFulfillment(type) {
    fulfillment = type;
    $$('.seg-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.fulfill === type); });
    var dzs = $('#dz-select');
    var tableSelect = $('#table-select');
    if (dzs) dzs.classList.toggle('show', type === 'delivery');
    if (tableSelect) tableSelect.classList.toggle('show', type === 'mesa');
    if (type !== 'delivery') {
      deliveryPrice = 0;
      selectedDeliveryZone = '';
      var dd = $('#dz-dropdown');
      if (dd) dd.value = '';
    }
    if (type !== 'mesa') {
      selectedTable = '';
      var tableDropdown = $('#table-dropdown');
      if (tableDropdown) tableDropdown.value = '';
    }
    updateTotals();
  }

  function updateTotals() {
    var dd = $('#dz-dropdown');
    if (dd && fulfillment === 'delivery') {
      selectedDeliveryZone = dd.value;
      var zone = window.__BRAND__.deliveryZones.find(function (z) { return z.zone === selectedDeliveryZone; });
      deliveryPrice = zone ? zone.price : 0;
    }
    var gt = $('#grand-total');
    if (gt) gt.textContent = fmtPrice(cartTotal() + deliveryPrice);
    updateWaLink();
  }

  function updateWaLink() {
    var now = new Date();
    if (!orderId) orderId = createOrderId();
    var lines = [
      '¡Hola! 👋 Quiero hacer este pedido a través de la web:',
      '',
      '🍽️ *La Terraza de Lupita* by Mister Mechada'
    ];
    lines.push('', '*🧾 Mi pedido*');
    cart.forEach(function (item, i) {
      var line = (i + 1) + '. ' + item.qty + ' × ' + item.name + ' — ' + fmtPrice(item.price * item.qty);
      if (item.variant) line += '\n   _' + item.variant + '_';
      lines.push(line);
    });
    var subtotal = cartTotal();
    var entregaLine = '*🛵 Entrega:* ';
    if (fulfillment === 'delivery') {
      entregaLine = '*🛵 Entrega:* Delivery' + (selectedDeliveryZone ? ' — ' + selectedDeliveryZone : '');
    } else if (fulfillment === 'mesa') {
      entregaLine = '*🍽️ Entrega:* Atención en mesa' + (selectedTable ? ' — Mesa ' + selectedTable : '');
    } else {
      entregaLine = '*🏠 Entrega:* Retiro en el local';
    }
    lines.push('', entregaLine);
    lines.push('', '*💰 Resumen*');
    lines.push('Subtotal: ' + fmtPrice(subtotal));
    if (fulfillment === 'delivery' && deliveryPrice > 0) {
      lines.push('Delivery: ' + fmtPrice(deliveryPrice));
    }
    lines.push('*Total: ' + fmtPrice(subtotal + deliveryPrice) + '*');
    if (cartNotes.trim()) {
      lines.push('', '*📝 Notas:* ' + cartNotes.trim());
    }
    lines.push('', 'Quedo atento/a a la confirmación, ¡gracias! 🙏');
    lines.push('_Pedido N° ' + orderId + ' — ' + now.toLocaleString('es-CL') + '_');
    var text = encodeURIComponent(lines.join('\n'));
    var cartWaBtn = $('#cart-wa-btn');
    if (cartWaBtn) {
      var valid = validateFulfillment(false);
      cartWaBtn.href = valid ? 'https://wa.me/' + window.__BRAND__.phone + '?text=' + text : '#';
      cartWaBtn.setAttribute('aria-disabled', valid ? 'false' : 'true');
    }
  }

  function validateFulfillment(showMessage) {
    var message = '';
    if (fulfillment === 'delivery' && cartTotal() < window.__BRAND__.deliveryMin) {
      message = 'El pedido mínimo para delivery es ' + fmtPrice(window.__BRAND__.deliveryMin) + '.';
    }
    if (fulfillment === 'delivery' && !selectedDeliveryZone) message = 'Selecciona una zona de delivery.';
    if (fulfillment === 'mesa' && !selectedTable) message = 'Selecciona tu número de mesa.';
    var error = $('#fulfillment-error');
    if (error) error.textContent = showMessage ? message : '';
    if (message && showMessage) showToast(message);
    return !message;
  }

  /* ═══ VARIANT SELECTOR ═══ */
  function openVariantSheet(productId) {
    var product = PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product || !product.variants) return;
    currentProduct = product;
    customState = null;
    var variantTitle = $('#variant-title');
    var variantBody = $('#variant-body');
    var variantConfirm = $('#variant-confirm');
    if (variantTitle) variantTitle.textContent = product.variants.title;
    if (variantConfirm) variantConfirm.textContent = 'Agregar al pedido';

    var html = '';
    if (product.variants.required) {
      html += '<p class="variant-required" style="margin-bottom:12px">* Selección obligatoria</p>';
    }
    html += '<div class="variant-options">';
    product.variants.options.forEach(function (opt, i) {
      var priceLabel = opt.price ? ' — ' + fmtPrice(opt.price) : '';
      html += '<button class="variant-opt" data-idx="' + i + '">';
      html += '<span class="variant-opt__radio"></span>';
      html += '<span class="variant-opt__label">' + escHtml(opt.label) + '</span>';
      if (priceLabel) html += '<span class="variant-opt__price">' + priceLabel + '</span>';
      html += '</button>';
    });
    html += '</div>';
    html += '<p class="variant-error" id="variant-error">Selecciona una opción para continuar</p>';

    if (variantBody) variantBody.innerHTML = html;

    $$('#variant-body .variant-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('#variant-body .variant-opt').forEach(function (o) { o.classList.remove('selected'); });
        btn.classList.add('selected');
        var err = $('#variant-error');
        if (err) err.classList.remove('show');
      });
    });

    openSheet($('#variant-sheet'));
  }

  function openCustomizer(productId) {
    var product = PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product || !product.customizer || !product.customizer.steps) return;
    currentProduct = product;
    customState = { step: 0, selections: {} };
    product.customizer.steps.forEach(function (step) {
      customState.selections[step.key] = [];
    });
    renderCustomStep();
    openSheet($('#variant-sheet'));
  }

  function renderCustomStep() {
    if (!currentProduct || !currentProduct.customizer || !customState) return;
    var steps = currentProduct.customizer.steps;
    var step = steps[customState.step];
    var selected = customState.selections[step.key] || [];
    var variantTitle = $('#variant-title');
    var variantBody = $('#variant-body');
    var variantConfirm = $('#variant-confirm');
    if (variantTitle) variantTitle.textContent = currentProduct.name;

    var helper = step.type === 'multiple'
      ? 'Selecciona exactamente ' + step.count + ' opciones.'
      : 'Selecciona una opción.';
    var html = '<div class="custom-progress" aria-label="Paso ' + (customState.step + 1) + ' de ' + steps.length + '">';
    html += '<div class="custom-progress__meta"><span>Paso ' + (customState.step + 1) + ' de ' + steps.length + '</span><strong>' + escHtml(step.title) + '</strong></div>';
    html += '<div class="custom-progress__track"><span style="width:' + (((customState.step + 1) / steps.length) * 100) + '%"></span></div></div>';
    html += '<p class="custom-step__help">' + helper + '</p>';
    html += '<div class="custom-options custom-options--' + step.type + '">';
    step.options.forEach(function (option, index) {
      var isSelected = selected.indexOf(option) > -1;
      html += '<button type="button" class="custom-opt' + (isSelected ? ' selected' : '') + '" data-custom-option="' + index + '" aria-pressed="' + (isSelected ? 'true' : 'false') + '">';
      html += '<span class="custom-opt__marker" aria-hidden="true"></span><span>' + escHtml(option) + '</span></button>';
    });
    html += '</div>';
    html += '<div class="custom-step__status"><span id="custom-count">' + selected.length + ' de ' + step.count + ' seleccionada' + (step.count === 1 ? '' : 's') + '</span>';
    if (customState.step > 0) html += '<button type="button" class="custom-back" id="custom-back">← Volver al paso anterior</button>';
    html += '</div>';
    html += '<p class="variant-error" id="variant-error" role="alert">Completa la selección indicada para continuar.</p>';
    if (variantBody) variantBody.innerHTML = html;
    if (variantConfirm) variantConfirm.textContent = customState.step === steps.length - 1 ? 'Agregar al pedido' : 'Continuar';

    $$('#variant-body [data-custom-option]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var option = step.options[parseInt(btn.dataset.customOption)];
        var values = customState.selections[step.key];
        var existingIndex = values.indexOf(option);
        if (step.type === 'single') {
          customState.selections[step.key] = [option];
        } else if (existingIndex > -1) {
          values.splice(existingIndex, 1);
        } else if (values.length < step.count) {
          values.push(option);
        } else {
          showToast('Puedes elegir hasta ' + step.count + ' opciones.');
          return;
        }
        var updated = customState.selections[step.key];
        $$('#variant-body [data-custom-option]').forEach(function (choice) {
          var choiceOption = step.options[parseInt(choice.dataset.customOption)];
          var active = updated.indexOf(choiceOption) > -1;
          choice.classList.toggle('selected', active);
          choice.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        var count = $('#custom-count');
        if (count) count.textContent = updated.length + ' de ' + step.count + ' seleccionada' + (step.count === 1 ? '' : 's');
        var error = $('#variant-error');
        if (error) error.classList.remove('show');
      });
    });

    var back = $('#custom-back');
    if (back) back.addEventListener('click', function () {
      customState.step--;
      renderCustomStep();
    });
  }

  function confirmVariant() {
    if (currentProduct && currentProduct.customizer && customState) {
      var steps = currentProduct.customizer.steps;
      var step = steps[customState.step];
      var selectedCustom = customState.selections[step.key] || [];
      if (selectedCustom.length !== step.count) {
        var customError = $('#variant-error');
        if (customError) customError.classList.add('show');
        return;
      }
      if (customState.step < steps.length - 1) {
        customState.step++;
        renderCustomStep();
        return;
      }
      var choiceLabel = [
        'Proteína: ' + customState.selections.protein[0],
        'Ingredientes: ' + customState.selections.ingredients.join(', '),
        'Salsas: ' + customState.selections.sauces.join(', '),
        'Bebida: ' + customState.selections.drink[0]
      ].join(' · ');
      addToCart(currentProduct, choiceLabel, currentProduct.price);
      closeSheet($('#variant-sheet'));
      currentProduct = null;
      customState = null;
      return;
    }

    var selected = $('#variant-body .variant-opt.selected');
    if (!selected && currentProduct && currentProduct.variants && currentProduct.variants.required) {
      var err = $('#variant-error');
      if (err) err.classList.add('show');
      return;
    }
    if (selected && currentProduct) {
      var idx = parseInt(selected.dataset.idx);
      var opt = currentProduct.variants.options[idx];
      addToCart(currentProduct, opt.label, opt.price || currentProduct.price);
    } else if (currentProduct) {
      addToCart(currentProduct, null, null);
    }
    closeSheet($('#variant-sheet'));
    currentProduct = null;
  }

  /* ═══ SHEET OPEN/CLOSE ═══ */
  function openSheet(sheet) {
    var overlay = $('#overlay');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet(sheet) {
    var overlay = $('#overlay');
    if (overlay) overlay.classList.remove('open');
    if (sheet) sheet.classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleAdd(productId) {
    var product = PRODUCTS.find(function (p) { return p.id === productId; });
    if (!product) return;
    if (product.customizer) {
      openCustomizer(productId);
    } else if (product.variants) {
      openVariantSheet(productId);
    } else {
      addToCart(product, null, null);
    }
  }

  /* ═══ SEARCH ═══ */
  function handleSearch() {
    var input = $('#menu-search');
    if (!input) return;
    var q = input.value.toLowerCase().trim();
    var sections = $$('#menu-sections .menu-section');
    var totalVisible = 0;

    sections.forEach(function (sec) {
      var cards = sec.querySelectorAll('.product-card');
      var sectionVisible = 0;
      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var match = !q || text.indexOf(q) > -1;
        card.style.display = match ? '' : 'none';
        if (match) sectionVisible++;
      });
      sec.style.display = sectionVisible > 0 ? '' : 'none';
      totalVisible += sectionVisible;
    });

    var resultCount = $('#result-count');
    if (resultCount) {
      resultCount.textContent = q ? totalVisible + ' resultado' + (totalVisible !== 1 ? 's' : '') : '';
    }
  }

  /* ═══ TOAST ═══ */
  var toastTimeout;
  function showToast(msg) {
    var toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ═══ CATEGORY NAVIGATION ═══ */
  function initCategoryNav() {
    var links = $$('.cat-link');
    var catNavWrap = $('#cat-nav-wrap');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(link.dataset.cat);
        if (target && catNavWrap) {
          var offset = catNavWrap.offsetHeight + 12;
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
      });
    });

    // Scroll spy
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) { l.classList.toggle('active', l.dataset.cat === id); });
          var activeLink = document.querySelector('.cat-link[data-cat="' + id + '"]');
          if (activeLink) activeLink.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    $$('#menu-sections .menu-section').forEach(function (sec) { observer.observe(sec); });

    // Shadow on scroll
    window.addEventListener('scroll', function () {
      if (catNavWrap) catNavWrap.classList.toggle('scrolled', window.scrollY > 300);
    }, { passive: true });
  }

  /* ═══ SPLASH ═══ */
  function initSplash() {
    var splash = $('#splash');
    if (!splash) return;
    var dismiss = function () { splash.classList.add('done'); };
    // CSS animation 1.8s + safety net 6s
    setTimeout(dismiss, 2200);
    setTimeout(dismiss, 6000);
  }

  /* ═══ HAMBURGER ═══ */
  function initHamburger() {
    var hamburger = $('#hamburger');
    var mobileNav = $('#mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══ SCROLL PROGRESS ═══ */
  function initScrollProgress() {
    var bar = $('#scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ═══ CUSTOM CURSOR ═══ */
  function initCursor() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    var outer = $('#cursor-outer');
    var inner = $('#cursor-inner');
    if (!outer || !inner) return;
    var moved = false;

    document.addEventListener('mousemove', function (e) {
      if (!moved) { document.body.classList.add('cursor-visible'); moved = true; }
      outer.style.left = e.clientX + 'px';
      outer.style.top = e.clientY + 'px';
      inner.style.left = e.clientX + 'px';
      inner.style.top = e.clientY + 'px';
    }, { passive: true });

    // Magnetic effect
    $$('.magnetic').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        outer.style.width = '56px';
        outer.style.height = '56px';
        outer.style.margin = '-28px 0 0 -28px';
      });
      el.addEventListener('mouseout', function () {
        outer.style.width = '40px';
        outer.style.height = '40px';
        outer.style.margin = '-20px 0 0 -20px';
      });
    });
  }

  /* ═══ REVEAL ON SCROLL ═══ */
  function initReveal() {
    var reveals = $$('.reveal-up');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    reveals.forEach(function (el) { observer.observe(el); });

    // Safety net: reveal all after 6s
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }, 6000);
  }

  /* ═══ ANIMATED COUNTERS ═══ */
  function initCounters() {
    var counters = $$('.counter');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.dataset.target);
          var duration = 2000;
          var start = 0;
          var startTime = null;

          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var val = Math.floor(progress * target);
            el.textContent = val;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.05 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ═══ OPEN STATUS ═══ */
  function initOpenStatus() {
    var statusEl = $('#open-status');
    if (!statusEl) return;

    var now = new Date();
    var day = now.getDay(); // 0=Sun
    var hour = now.getHours();
    var min = now.getMinutes();
    var timeNum = hour * 60 + min;

    // Open hours: Sun-Thu 19:00-00:00, Fri-Sat 19:00-01:00
    var isWeekend = day === 5 || day === 6;
    var closeTime = isWeekend ? 25 * 60 : 24 * 60; // 01:00 = 25*60
    var openTime = 19 * 60;

    var isOpen = timeNum >= openTime && timeNum < closeTime;
    // Handle past midnight: Fri night → Sat early AM (day 6), Sat night → Sun early AM (day 0)
    if (!isOpen && day === 6 && timeNum < 60) isOpen = true;
    if (!isOpen && day === 0 && timeNum < 60) isOpen = true;

    statusEl.className = 'hours-card__status ' + (isOpen ? 'open' : 'closed');
    statusEl.textContent = isOpen ? 'Abierto ahora' : 'Cerrado — Abrimos a las 19:00';
  }

  /* ═══ GSAP ANIMATIONS ═══ */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Check reduced motion
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Showcase horizontal scroll hint
    safe(function () {
      var track = document.querySelector('.showcase__track');
      if (!track) return;
      gsap.fromTo(track,
        { x: 0 },
        {
          x: -40,
          duration: 1.5,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
          delay: 2,
          scrollTrigger: {
            trigger: '.section--featured',
            start: 'top 80%',
            once: true
          }
        }
      );
    });

    // Gallery items stagger
    safe(function () {
      gsap.utils.toArray('.gallery-item').forEach(function (item, i) {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
            onEnter: function () {
              gsap.fromTo(item,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power2.out' }
              );
            }
          }
        });
      });
    });

    // Separator lines grow
    safe(function () {
      gsap.utils.toArray('.separator__line').forEach(function (line) {
        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              once: true
            }
          }
        );
      });
    });
  }

  /* ═══ INIT ═══ */
  function init() {
    safe(initSplash);
    safe(initHamburger);
    safe(initScrollProgress);
    safe(initCursor);
    safe(renderMenu);
    safe(initCategoryNav);
    safe(initReveal);
    safe(initCounters);
    safe(initOpenStatus);

    // Cart events
    safe(function () {
      var fabCart = $('#fab-cart');
      if (fabCart) fabCart.addEventListener('click', function () { renderCart(); openSheet($('#cart-sheet')); });
      var cartClose = $('#cart-close');
      if (cartClose) cartClose.addEventListener('click', function () { closeSheet($('#cart-sheet')); });
      var variantClose = $('#variant-close');
      if (variantClose) variantClose.addEventListener('click', function () { closeSheet($('#variant-sheet')); });
      var overlay = $('#overlay');
      if (overlay) overlay.addEventListener('click', function () { closeSheet($('#cart-sheet')); closeSheet($('#variant-sheet')); });
      var variantConfirm = $('#variant-confirm');
      if (variantConfirm) variantConfirm.addEventListener('click', confirmVariant);
      $$('[data-custom-add]').forEach(function (btn) {
        btn.addEventListener('click', function () { handleAdd(parseInt(btn.dataset.customAdd)); });
      });
      var cartWaBtn = $('#cart-wa-btn');
      if (cartWaBtn) cartWaBtn.addEventListener('click', function (event) {
        if (!validateFulfillment(true)) event.preventDefault();
      });
      var searchInput = $('#menu-search');
      if (searchInput) searchInput.addEventListener('input', handleSearch);
    });

    updateCartUI();

    // GSAP after libs load
    setTimeout(function () { safe(initGSAP); }, 300);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
