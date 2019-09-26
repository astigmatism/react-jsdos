import React from 'react'
import * as THREE from 'three';
import './Loading.css'

class Loading extends React.Component {

  constructor(props) {
    super(props)

    this.canvas = null

    this.internalState = {
      idle: 'idle',
      downloading: 'downloading',
      extractingFolder: 'extractingFolder',
      exractingRoot: 'exractingRoot',
      resizeOnStart: 'resizeOnStart'
  }

    this.start = this.start.bind(this);
    this.message = this.message.bind(this)
  }

  start() {
    
    let wrapper = this.refs.dialog
    
    //private members
    var _self = this;
    var _width = wrapper.parentElement.offsetWidth;
    var _height = wrapper.parentElement.offsetHeight;

    var _instances;
    var camera, scene, renderer;
    
    function init() {
        camera = new THREE.PerspectiveCamera( 15, _width / _height, 1, 20 );
        camera.position.z = 2;
        scene = new THREE.Scene();
        // geometry
        var vector = new THREE.Vector4();
        var triangles = 1;
        _instances = 500;
        var positions = [];
        var offsets = [];
        var colors = [];
        var orientationsStart = [];
        var orientationsEnd = [];
        positions.push( 0.025, -0.025, 0 );
        positions.push( -0.025, 0.025, 0 );
        positions.push( 0, 0, 0.025 );
        // instanced attributes
        for ( var i = 0; i < _instances; i ++ ) {
            // offsets
            offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );
            // colors
            colors.push( Math.random(), Math.random(), Math.random(), Math.random() );
            // orientation start
            vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
            vector.normalize();
            orientationsStart.push( vector.x, vector.y, vector.z, vector.w );
            // orientation end
            vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
            vector.normalize();
            orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
        }
        var geometry = new THREE.InstancedBufferGeometry();
        geometry.maxInstancedCount = _instances; // set so its initalized for dat.GUI, will be set in first draw otherwise
        geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets ), 3 ) );
        geometry.addAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
        geometry.addAttribute( 'orientationStart', new THREE.InstancedBufferAttribute( new Float32Array( orientationsStart ), 4 ) );
        geometry.addAttribute( 'orientationEnd', new THREE.InstancedBufferAttribute( new Float32Array( orientationsEnd ), 4 ) );
        
        //var texture = new THREE.TextureLoader().load( box[0].src );
        
        // material
        var material = new THREE.RawShaderMaterial( {
            uniforms: {
                time: { value: 1.0 },
                sineTime: { value: 1.0 },
                //map: { value: texture }
            },
            vertexShader: vertex,
            fragmentShader: shader,
            side: THREE.DoubleSide,
            transparent: true
        } );
        //
        var mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        //
        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( _width, _height );
        
        wrapper.append(renderer.domElement);
        _self.canvas = renderer.domElement
        //container.appendChild( renderer.domElement );

        if ( renderer.extensions.get( 'ANGLE_instanced_arrays' ) === null ) {
            document.getElementById( 'notSupported' ).style.display = '';
            return;
        }
        //
        //var gui = new dat.GUI( { width: 350 } );
        //gui.add( geometry, 'maxInstancedCount', 0, instances );
        //
        //stats = new Stats();
        //container.appendChild( stats.dom );
        //
        //window.addEventListener( 'resize', onWindowResize, false );
    }
    //
    function animate() {
        requestAnimationFrame( animate );
        render();
        // stats.update();
    }
    function render() {
        var time = performance.now();
        var object = scene.children[ 0 ];
        object.rotation.y = time * 0.0005;
        object.material.uniforms.time.value = time * 0.005;
        object.material.uniforms.sineTime.value = Math.sin( object.material.uniforms.time.value * 0.05 );
        renderer.render( scene, camera );
    }

    var vertex = 'precision highp float;uniform float sineTime;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;attribute vec3 position;attribute vec3 offset;attribute vec4 color;attribute vec4 orientationStart;attribute vec4 orientationEnd;varying vec3 vPosition;varying vec4 vColor;void main(){vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );vec3 vcV = cross( orientation.xyz, vPosition );vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );vColor = color;gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );}';
    var shader = 'precision highp float;uniform float time;varying vec3 vPosition;varying vec4 vColor;void main() {vec4 color = vec4( vColor );color.r += sin( vPosition.x * 10.0 + time ) * 0.5;gl_FragColor = color;}';
        
    init();
    animate();
  }

  componentDidMount() {
    this.start();
    this.refs.dialog.style.opacity = 1
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps)
    return true
  }

  message() {
    
    switch (this.props.operation) {
      case this.internalState.idle:
        return <div></div>
      case this.internalState.downloading:
          return <div className='message'>preparing</div>
      case this.internalState.extractingFolder:
          return <div className='message'>extracting</div>
      case this.internalState.exractingRoot:
          if (this.props.percentage < 1) {
            return <div className='message'>extracting</div>
          } else if (this.props.percentage > 95) {
            return <div className='message'>installing</div>
          }


          return <div className='message'>{this.props.percentage}% loaded</div>
      case this.internalState.resizeOnStart:
        return  <div className='message'>ready!</div>
    }
  }

  render() {

    return (
      <div ref='dialog' className='dialog'>
        <div className='shim'></div>
        { this.message() }
      </div>
    )
  }

}

export default Loading