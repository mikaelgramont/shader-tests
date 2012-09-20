(function() {
	var Parameters = function(){
		this.dividor = 1.0;
		this.refresh = function() {
			update();
		}
	};
	var parameters = new Parameters();
	var gui = new dat.GUI();
	gui.add(parameters, 'dividor', 1, 100);


	var canvas = document.getElementById('maincanvas');
	var renderer = new THREE.WebGLRenderer({
		canvas: canvas
	});

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 60, (canvas.clientWidth / canvas.clientHeight), 1, 10000);
	camera.position.z = 1000;

	var geometry = new THREE.PlaneGeometry( 1000, 1000, 20, 20 );
	var shaderUniforms = {
		dividor: {type: 'f', value: 0.0},
		rotAngle: {type: 'f', value: 0.0},
		shaderType: {type: 'i', value: 1}
	};
	var vertexShader = document.getElementById( 'vertexShader' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

	var material = new THREE.ShaderMaterial({
		uniforms: shaderUniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	});
	var mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);
	update();
	
	document.getElementById('param').addEventListener('onkeypress', function(e){
		param = e.currentTarget.value;
		shaderUniforms.param.value = parseFloat(param);
	});

	function update() {
		shaderUniforms.dividor.value = parameters.dividor;
		shaderUniforms.rotAngle.value += 0.001;
		if (shaderUniforms.rotAngle.value > 2 * Math.PI) {
			shaderUniforms.rotAngle.value -= 2 * Math.PI;
		}
		renderer.render(scene, camera);
		requestAnimationFrame(update);
	}


})();