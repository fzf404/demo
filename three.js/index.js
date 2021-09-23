// 材质列表
const materialList = [
	'./img/01.png',
	'./img/02.png',
	'./img/03.png',
	'./img/04.png',
	'./img/05.png',
	'./img/06.png'
]

// 画面宽高
const canvasWidth = 500
const canvasHeight = 300
// 全屏
const fullScreen = true

// 鼠标拖动速度
const moveSpeed = 0.01
// 自动移动速度
const autoMoveSpeedX = 0.01
const autoMoveSpeedY = 0


function main() {
	const canvas = document.querySelector('#demo')
	const renderer = new THREE.WebGLRenderer({ canvas })

	renderer.setSize(canvasWidth, canvasHeight)


	// 摄像机参数
	let aspect = canvasWidth / canvasHeight   // 画布宽高比
	let fov = 45     // 视野范围75°
	let minFov = 15     // 最小视野范围
	let near = 0.1   // 可视最近距离
	let far = 100      // 可视最远距离

	// 画布高度
	if (fullScreen) {
		renderer.setSize(window.innerWidth, window.innerHeight)
		aspect =window.innerWidth / window.innerHeight
		// 当浏览器窗口变化时
		window.addEventListener('resize', function () {
			renderer.setSize(window.innerWidth, window.innerHeight)
		})
	}

	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

	// 相机默认在坐标原点，先Z轴正方向移动2，即可看到原点图像
	camera.position.z = 2

	// 新建场景
	const scene = new THREE.Scene()
	scene.background = new THREE.Color('#AACCCC')

	// 光照效果
	{
		const color = 0xFFFFFF
		const intensity = 1
		const light = new THREE.DirectionalLight(color, intensity)
		const light2 = new THREE.DirectionalLight(color, intensity)
		const light3 = new THREE.DirectionalLight(color, intensity)
		light.position.set(3, -3, -3)
		light2.position.set(-3, 3, -3)
		light3.position.set(0, 0, 3)
		scene.add(light)
		scene.add(light2)
		scene.add(light3)
	}

	// 创建盒子
	const boxWidth = 1
	const boxHeight = 1
	const boxDepth = 1
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

	// 创建材质
	const texture = new THREE.TextureLoader()

	const material = materialList.map(item => {
		return new THREE.MeshPhongMaterial({
			side: THREE.DoubleSide,     // 双边渲染
			transparent: true,          // 是否透明
			map: texture.load(item),
			alphaTest: 0.9,             // alpha通道小于0.1的像素点不显示
		})
	})

	// 创建一个网格对象
	const cube = new THREE.Mesh(geometry, material)
	scene.add(cube)

	// 滚动参数
	let targetRotationX = 0
	let targetRotationY = 0
	// 鼠标点击时的角度状态
	let targetRotationXOnMouseDown = 0
	let targetRotationYOnMouseDown = 0
	let mouseX = 0, mouseY = 0

	// 距窗口中心线的位置
	let mouseXOnMouseDown = 0
	let mouseYOnMouseDown = 0
	// 窗口半长宽
	let windowHalfX = window.innerWidth / 2
	let windowHalfY = window.innerHeight / 2
	// 自动移动大小
	let autoMoveSizeX = autoMoveSpeedX
	let autoMoveSizeY = autoMoveSpeedY

	// 触摸事件处理
	function onDocumentTouchStart(event) {
		if (event.touches.length === 1) {
			mouseXOnMouseDown = event.touches[0].pageX - windowHalfX
			mouseYOnMouseDown = event.touches[0].pageY - windowHalfY
			targetRotationXOnMouseDown = targetRotationX
			targetRotationYOnMouseDown = targetRotationY
		}
	}
	function onDocumentTouchMove(event) {
		if (event.touches.length == 1) {
			mouseX = event.touches[0].pageX - windowHalfX
			mouseY = event.touches[0].pageY - windowHalfY
			targetRotationX = targetRotationXOnMouseDown + (mouseX - mouseXOnMouseDown) * moveSpeed
			targetRotationY = targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown) * moveSpeed
		}
	}

	// 鼠标点击事件
	function onDocumentMouseDown(event) {
		autoMoveSizeX = autoMoveSpeedX / 3
		autoMoveSizeY = autoMoveSpeedY / 3
		document.addEventListener('mousemove', onDocumentMouseMove, false)
		document.addEventListener('mouseup', onDocumentMouseUp, false)
		document.addEventListener('mouseout', onDocumentMouseOut, false)
		// 求鼠标相对窗口中线的位置
		mouseXOnMouseDown = event.clientX - windowHalfX
		mouseYOnMouseDown = event.clientY - windowHalfY
		// 保存当前角度值
		targetRotationXOnMouseDown = targetRotationX
		targetRotationYOnMouseDown = targetRotationY
	}

	// 鼠标移动事件
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX
		mouseY = event.clientY - windowHalfY
		targetRotationX = targetRotationXOnMouseDown + (mouseX - mouseXOnMouseDown) * moveSpeed
		targetRotationY = targetRotationYOnMouseDown + (mouseY - mouseYOnMouseDown) * moveSpeed
	}

	// 鼠标抬起事件
	function onDocumentMouseUp(event) {
		autoMoveSizeX = autoMoveSpeedX
		autoMoveSizeY = autoMoveSpeedY
		document.removeEventListener('mousemove', onDocumentMouseMove, false)
		document.removeEventListener('mouseup', onDocumentMouseUp, false)
		document.removeEventListener('mouseout', onDocumentMouseOut, false)
	}
	// 鼠标移开事件
	function onDocumentMouseOut(event) {
		autoMoveSizeX = autoMoveSpeedX
		autoMoveSizeY = autoMoveSpeedY
		document.removeEventListener('mousemove', onDocumentMouseMove, false)
		document.removeEventListener('mouseup', onDocumentMouseUp, false)
		document.removeEventListener('mouseout', onDocumentMouseOut, false)
	}

	// 鼠标滚轮事件
	function onDocumentMouseWheel(event) {
		if (event.wheelDelta > 0) {   //当滑轮向上滚动时
			fov -= (minFov < fov ? 2 : 0)
		}
		else {   // 当滑轮向下滚动时
			fov += (fov < far ? 2 : 0)
		}
		// 改变fov值，更新场景渲染
		camera.fov = fov
		camera.updateProjectionMatrix()
		renderer.render(scene, camera)
	}

	document.addEventListener('mousedown', onDocumentMouseDown, false)
	document.addEventListener('mousewheel', onDocumentMouseWheel, false)
	document.addEventListener('touchstart', onDocumentTouchStart, false)
	document.addEventListener('touchmove', onDocumentTouchMove, false)

	// 渲染场景和相机
	function render(time) {
		// 横向移动
		cube.rotation.y += autoMoveSizeX
		targetRotationX += autoMoveSizeX

		cube.rotation.x += autoMoveSizeY
		targetRotationY += autoMoveSizeY

		cube.rotation.y += (targetRotationX - cube.rotation.y) * 0.1 // 旋转
		cube.rotation.x += (targetRotationY - cube.rotation.x) * 0.1
		renderer.render(scene, camera)
		requestAnimationFrame(render)
	}
	requestAnimationFrame(render)
}