import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export function createControl(camera, canvas) {
    const control = new OrbitControls(camera, canvas)

    control.target.set(0, 0, 5)
    control.enableDamping = true
    control.dampingFactor = 0.1
,
    control.enabled  = false
    return control
}