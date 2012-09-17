(function() {
	var canvas = document.getElementById('maincanvas');
	var renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 60, (canvas.clientWidth / canvas.clientHeight), 1, 10000);
	camera.position.z = 1000;

	var geometry = new THREE.PlaneGeometry( 500, 500, 20, 20 );
	var material = new THREE.ShaderMaterial({
		vertexShader:   document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	});
	var mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);
	renderer.render(scene, camera);
})();