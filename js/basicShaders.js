(function() {
	var canvas = document.getElementById('maincanvas');
	var renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 60, (canvas.clientWidth / canvas.clientHeight), 1, 10000);
	camera.position.z = 1000;

	var geometry = new THREE.PlaneGeometry( 500, 500, 20, 20 );
	var shaderUniforms = {
		rotAngle: {type: 'f', value: 0.0}
	};
	var material = new THREE.ShaderMaterial({
		uniforms: shaderUniforms,
		vertexShader:   document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
	});
	var mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);
	update();
	
	function update() {
		shaderUniforms.rotAngle.value += 0.001;
		if (shaderUniforms.rotAngle.value > 2 * Math.PI) {
			shaderUniforms.rotAngle.value -= 2 * Math.PI;
		}
		renderer.render(scene, camera);
		requestAnimationFrame(update);
	}


})();