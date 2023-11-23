<script lang="ts">
	import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    import { Enviroment, ImgController, ModelController } from '$lib/lib.js';
    import { onMount } from 'svelte';
    import { deserialize } from '$app/forms';

    
    let myElement: HTMLElement;

    export let file: ArrayBuffer|null;
    export let screenshot: boolean = false;
    export let captureFrame: boolean = false;
    export let id: string = "-1";
    export let isArticle: boolean = false;
    

    $: {
        if(myElement != undefined){
            myElement.appendChild(renderer.domElement);
        }
    };


    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let controls: any;



    onMount(() =>{
        prepareScene();
    });


    function prepareScene(){
        scene = new THREE.Scene();
        scene.background = new THREE.Color(ModelController.CANVAS_BG_COLOR_HEX);


        camera = new THREE.PerspectiveCamera( 75, ModelController.getAspectRatio(), 0.1, 1000 );
        camera.position.set(0,2.5,2.5);

        const a_light = new THREE.AmbientLight( 0xffffff, 0.6 ); // soft white light
        const p_light = new THREE.PointLight( 0xffffff, 20, 100 );
        p_light.position.set( -2, 3, 2 );


        renderer = new THREE.WebGLRenderer();
        renderer.setSize( ModelController.CANVAS_WIDTH, ModelController.CANVAS_HEIGHT );
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        controls = new OrbitControls( camera, renderer.domElement );

        const loader = new GLTFLoader();

        loader.parse(file!, "", ( gltf ) =>{

            let model = gltf.scene;

            const bb: THREE.Box3 = new THREE.Box3().setFromObject(model);
            const size: THREE.Vector3 = bb.getSize(new THREE.Vector3());

            const alowedSize: THREE.Vector3 = new THREE.Vector3(3,3,3);
            const ratio: THREE.Vector3 = size.divide(alowedSize);

            const setScale: number = 1 / Math.max(ratio.x, ratio.y, ratio.z);

            model.scale.set(setScale,setScale,setScale);


            scene.add(model);
        });

        camera.position.set(0, 1.5, 4);
        controls.update();
        
        
        scene.add( a_light );
        scene.add( p_light );
        


        animate();

    }

    function animate() {
        
        controls.update();
        renderer.render( scene, camera );

        if(screenshot && captureFrame){
            captureFrame = false;
            screenshotCanvas(renderer.domElement);
        }

        requestAnimationFrame( animate );
    }

    async function screenshotCanvas(canvas: HTMLCanvasElement) {

        const url = `${Enviroment.ROOT_URL}/upload?/image`;

        const fileName = isArticle ? "a-" + id.toString() : id.toString();

        const fd = new FormData();
        fd.append("fileName", fileName);
        fd.append("base64", canvas.toDataURL(ImgController.IMG_MIME));

        const headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        const request: RequestInfo = new Request(url, {
            method: 'POST',
            body: fd,
        });

        const res = await fetch(request);

        const result = deserialize(await res.text());


        screenshot=false;
    }


</script>






<div bind:this={myElement}></div>
