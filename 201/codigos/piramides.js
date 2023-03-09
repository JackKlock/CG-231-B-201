/**
 * Geometria: construye una geometria THREEJS y la retorna
 * Entradas: vx=Arreglo de vertices para la geometria(arreglo de arreglos)
 * Salida: geom=Geometria generada a partir vx
  */
function Geometria (vx) {
    geom = new THREE.Geometry();
      var largoVertice = vx.length;
     for (i = 0; i < largoVertice; i++){
       [x,y,z]=[vx[i][0],vx[i][1],vx[i][2]]
        vector = new THREE.Vector3(x, y, z);
        geom.vertices.push(vector);
      }
      return geom;
    }
     /**
      * 
      * Traslacion construye la matriz de traslacion para el vector  vt y la retorna
      * Entradas vt= vector de traslacion(arreglos de enteros)
      * Salidas matrizT = matriz de traslaccion para el vector vt
      */ 
    function Traslacion(vt) {
      var matrizT = new THREE.Matrix4();
      matrizT.set(1, 0, 0, vt[0],
        0, 1, 0, vt[1],
        0, 0, 1, vt[2],
        0, 0, 0, 1); 
        return matrizT;      
    }
    /**
      * Escalado construye la matriz de escalado para el vector  vs y la retorna
      * Entradas vs= vector de escalado
      * Salida matrizs = matriz de escalado para el vector vs 
      */ 
    function Escalado(vs){
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
        return matrizS;
    }
     /**
      * EscaladoReal: Aplica el vector de escalado vs al objeto pyr
      * Entradas: pyr = Objeto tipo THREE.line que representa el objeto grafico
      * posi = posicion inicial de fig (array de enteros)  
      * vs= vector de escalado
      * Salida:
      */
    function EscaladoReal(pyr, posi, vs){
        vt = [-posi[0],-posi[1],-posi[2]]; //vector de llevar al origen 
        pyr.applyMatrix(Traslacion(vt)); //Translacion de obj al origen
        pyr.applyMatrix(Escalado(vs)); //Escalado de obj
        pyr.applyMatrix(Traslacion(posi)); //Translacion al punto inicial 
    }

    function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 800;
    var arrowSize = 140;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear escenario 
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 200;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

   
    lado = 40; //Lado de la base 
    h = 50; //Altura de la piramide
    [v1,v2,v3,v4,v5]= [[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
    var vertices = [v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];
    geom = Geometria(vertices); 

     // Colores
    color = [{color:0xFF0000}, {color:0x00FF00}, {color:0x0000FF} ];

    material = [];
    for(i=0;i<2; i++)
    material.push( new THREE.ParticleBasicMaterial(color[i]));
    
    // figuras para las piramides
    pyr =[];
    vt = [72,10,35];
    for(i=0;i<2; i++){
        pyr.push(new THREE.Line(geom, material[i]));
        pyr[i].applyMatrix(Traslacion(vt));
    }

    //Escalar una de las piramides en y 
    EscaladoReal(pyr[1],vt,[1,-1,1]);

    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    for(i=0; i<2; i++)
        scene.add(pyr[i]);
    renderer.render(scene, camera);
  }

  init();  // otra forma: window.onload = init;