var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {

    // Create scene
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;

    scene.clearColor = new BABYLON.Color3(.4, 1, .7);

    scene.imageProcessingConfiguration.exposure = 0.6;
    scene.imageProcessingConfiguration.contrast = 1.6;


    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // BABYLON.SceneLoader.Append("", "./tiles.glb", scene, function (scene) {
    // });
    var loader = new BABYLON.AssetsManager(scene);
    var PLaster = loader.addMeshTask("tiles", "", "./sample/tiles/", "Plaster.glb");
    var RelayMove = loader.addMeshTask("tiles", "", "./sample/tiles/", "RelayMove.glb");
    var Brass = loader.addMeshTask("tiles", "", "./sample/tiles/", "Brass.glb");
    var Copper = loader.addMeshTask("tiles", "", "./sample/tiles/", "Copper.glb");
    var DarkDarkGrey = loader.addMeshTask("tiles", "", "./sample/tiles/", "Dark Dark Grey.glb");
    var DarkGreyMetal = loader.addMeshTask("tiles", "", "./sample/tiles/", "Dark Grey Metal.glb");
    var Frame = loader.addMeshTask("tiles", "", "./sample/tiles/", "Frame.glb");
    var GlossyMetal = loader.addMeshTask("tiles", "", "./sample/tiles/", "Glossy Metal.glb");
    var HalfGlossy = loader.addMeshTask("tiles", "", "./sample/tiles/", "Half Glossy.glb");
    var HalfMattGrey = loader.addMeshTask("tiles", "", "./sample/tiles/", "Matt Light Grey.glb");
    var MattBlack = loader.addMeshTask("tiles", "", "./sample/tiles/", "Matt Black.glb");
    var MattLightGrey = loader.addMeshTask("tiles", "", "./sample/tiles/", "Matt Light Grey.glb");

  
    // // Initialize GizmoManager
    // var gizmoManager = new BABYLON.GizmoManager(scene)

    // // Initialize all gizmos
    // gizmoManager.boundingBoxGizmoEnabled = true;
    // gizmoManager.positionGizmoEnabled = true;
    // gizmoManager.rotationGizmoEnabled = true;
    // gizmoManager.scaleGizmoEnabled = true;

    function applyMaterialToMesh(mesh) {

        var pbr = new BABYLON.PBRMaterial("la", scene);
        pbr.albedoColor = new BABYLON.Color3(0, 0, 0);
        pbr.reflectivityColor = new BABYLON.Color3(1, 1, 1);
        pbr.microSurface = .7; // Let the texture controls the value 
        pbr.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
        pbr.reflectivityTexture = new BABYLON.Texture("/textures/133182_header3.jpg", scene);
        pbr.useMicroSurfaceFromReflectivityMapAlpha = true;

        mesh.material = pbr;
    }

    function applyMaterialToGlossyMetal(mesh) {
        var pbr = new BABYLON.PBRMaterial("la", scene);
        pbr.albedoColor = new BABYLON.Color3(0, 0, 0);
        pbr.reflectivityColor = new BABYLON.Color3(1, 1, 1);
        pbr.microSurface = .96; // Let the texture controls the value 
        pbr.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
        pbr.reflectivityTexture = new BABYLON.Texture("/textures/reflective-shiny-chrome-texture-free.jpg", scene);
        pbr.useMicroSurfaceFromReflectivityMapAlpha = true;

        mesh.material = pbr;
    }

    function applyMaterialToFrame(mesh) {
        var pbr = new BABYLON.PBRMaterial("la", scene);
        pbr.albedoColor = new BABYLON.Color3(0, 0, 0);
        pbr.reflectivityColor = new BABYLON.Color3(1, 1, 1);
        pbr.microSurface = .7; // Let the texture controls the value 
        pbr.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
        pbr.reflectivityTexture = new BABYLON.Texture("/textures/reflective-shiny-chrome-texture-free.jpg", scene);
        pbr.useMicroSurfaceFromReflectivityMapAlpha = true;

        mesh.material = pbr;
    }

    function applyMaterialToPLaster(mesh) {

        var plastic = new BABYLON.PBRMaterial("plastic", scene);
        plastic.reflectionTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
        plastic.microSurface = 0.96;
        plastic.albedoColor = new BABYLON.Color3(.9, .9, .9);
        plastic.reflectivityColor = new BABYLON.Color3(0.003, 0.003, 0.003);


        mesh.material = plastic;
    }

    function applyMaterialToCopper(mesh) {

        var pbr = new BABYLON.PBRMaterial("la", scene);

        var pbr = new BABYLON.PBRSpecularGlossinessMaterial("pbr", scene);
        pbr.diffuseColor = new BABYLON.Color3(1.0, 0.766, 0.336);
        pbr.specularColor = new BABYLON.Color3(1.0, 0.766, 0.336);
        pbr.glossiness = 1.0; // Let the texture controls the value 
        pbr.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/textures/Studio_Softbox_2Umbrellas_cube_specular.dds", scene);
        mesh.material = pbr;
    }




    // applies material but does not move to left
    PLaster.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToPLaster(task.loadedMeshes[i])
            // task.loadedMeshes[i].translate(BABYLON.Axis.X, 2, BABYLON.Space.LOCAL);
        }
        
    }

    RelayMove.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    Brass.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToCopper(task.loadedMeshes[i])
        }
    }

    Copper.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToCopper(task.loadedMeshes[i])
        }
    }
    DarkDarkGrey.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    DarkGreyMetal.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    Frame.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToFrame(task.loadedMeshes[i])
        }
    }
    GlossyMetal.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToFrame(task.loadedMeshes[i])
        }
    }
    HalfGlossy.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    HalfMattGrey.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    MattBlack.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }
    MattLightGrey.onSuccess = function (task) {
        for (var i = 0; i < task.loadedMeshes.length; i++) {
            applyMaterialToMesh(task.loadedMeshes[i])
        }
    }









    loader.onFinish = function () {
        engine.runRenderLoop(function () {
            scene.render();
        });
    };

    loader.load();

    return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});