import { WebGLRenderer } from 'three';
import { sizes } from '../system/sizes';
function createRenderer(container) {
    const renderer = new WebGLRenderer({
        canvas: container,
        antialias: true, 
    })

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = 'srgb-linear'
    return renderer
}

export { createRenderer }