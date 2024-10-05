import * as resize from "./system/resize"
import * as mouse from "./system/mouse"
import * as THREE from "three"
import { createCamera } from "./base/camera"
import { createScene } from "./base/scene"
import { createRenderer } from "./base/renderer"
import { createControl } from "./base/control"
import * as Portal from "./portal/portal"

class ThreeApp {
    constructor(container) {
       
        mouse.pickPos()
      
        this.camera = createCamera()
        this.control = createControl(this.camera, container)
        this.scene = createScene()
    
        Portal.createPotal(this)

        this.renderer = createRenderer(container)
        // resize
        resize.resizeEventListener(this.camera, this.renderer)
    }
    render() {
        const tick = () => {
            this.control.update()

            Portal.warpParams.offsetY += 0.0005
            Portal.updateMaterialOffset()
            if (Portal.isSendeAnimateOn) {
                Portal.updateCurve(5)
                this.updateCameraPosition()
            }

            this.renderer.render(this.scene, this.camera)
            window.requestAnimationFrame(tick)
        }
        tick()
    }
    updateCameraPosition() {
        this.camera.position.x = Portal.warpParams.cameraShake
    }
    clear() {
        resize.clear()
        mouse.clear()
        this.tick = null
        this.scene = null
        this.camera = null
        this.renderer.dispose()
        this.control.dispose()
    }
}

export { ThreeApp }
