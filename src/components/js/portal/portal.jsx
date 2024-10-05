// portal.jsx
import * as THREE from 'three';
import gsap from 'gsap';
import { RoughEase } from 'gsap/all';
import { pickPosition } from '../system/mouse';

gsap.registerPlugin(RoughEase);

const TICK_DURATION = 1000 / 60;
const warpParams = {
    offsetX: 0,
    offsetY: 0,
    repeatX: 10,
    repeatY: 4,
    cameraShake: 0
};
let curve, splineGeometry, tubeGeometry, originalTubeGeometry, tubeMaterial;
let scene = new THREE.Scene();

function createPotal(that) {
    scene = that.scene;

    const textureLoader = new THREE.TextureLoader();
    const textureURL = '/images/animationImage/galaxy3.jpg'; // Public klasöründen yükleme

    textureLoader.load(
        textureURL,
        (texture) => { // Başarılı yükleme callback'i
            console.log("Texture yüklendi");
            splineGeometry = new THREE.BufferGeometry();

            const points = [];

            for (let i = 0; i < 5; i += 1) {
                points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
            }

            points[4].y = -0.06;

            curve = new THREE.CatmullRomCurve3(points);

            tubeGeometry = new THREE.TubeGeometry(curve, 70, 0.1, 40, false); // Yarıçapı artırdık

            originalTubeGeometry = tubeGeometry.clone();

            updateCurve(Infinity);

            tubeMaterial = new THREE.MeshBasicMaterial({
                side: THREE.BackSide,
                map: texture, // Yüklenen texture'ı kullan
            });
            tubeMaterial.map.wrapS = THREE.MirroredRepeatWrapping;
            tubeMaterial.map.wrapT = THREE.MirroredRepeatWrapping;
            updateMaterialOffset();

            const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
            scene.add(tubeMesh);
        },
        undefined,
        (error) => { // Hata callback'i
            console.error("Texture yüklenirken hata oluştu:", error);
        }
    );
}

function updateCurve(delta) {
    if (!curve) return; // curve tanımlı değilse çık

    curve.points[2].x = curve.points[4].x = 0.6 * (1 - pickPosition.x) - 0.3;
    curve.points[2].y = curve.points[4].y = 0.6 * (1 - pickPosition.y) - 0.3;

    const points = curve.getPoints(70);
    splineGeometry.setFromPoints(points);

    const vertex = new THREE.Vector3();
    const originalVertex = new THREE.Vector3();
    const splineVertex = new THREE.Vector3();

    const tubePosition = tubeGeometry.getAttribute('position');
    const originalTubePosition = originalTubeGeometry.getAttribute('position');
    const splinePosition = splineGeometry.getAttribute('position');

    const segmentPoints = tubePosition.count / splinePosition.count;

    for (let i = 0; i < tubePosition.count; i += 1) {
        vertex.fromBufferAttribute(tubePosition, i);
        originalVertex.fromBufferAttribute(originalTubePosition, i);

        const index = Math.floor(i / segmentPoints);
        splineVertex.fromBufferAttribute(splinePosition, index);

        tubePosition.setX(
            i,
            vertex.x + (originalVertex.x + splineVertex.x - vertex.x) * Math.min(1, delta / TICK_DURATION / 10)
        );
        tubePosition.setY(
            i,
            vertex.y + (originalVertex.y + splineVertex.y - vertex.y) * Math.min(1, delta / TICK_DURATION / 10)
        );
    }
    tubePosition.needsUpdate = true;
}

function updateMaterialOffset() {
    if (!tubeMaterial || !tubeMaterial.map) return;
    tubeMaterial.map.offset.x = warpParams.offsetX;
    tubeMaterial.map.offset.y = warpParams.offsetY;
    tubeMaterial.map.repeat.x = warpParams.repeatX;
    tubeMaterial.map.repeat.y = warpParams.repeatY;
}

let isSendAnimateOn = false; // Doğru isimlendirme
let hyperspace, shake;

// `sendAnimate` fonksiyonunu callback desteği ile güncelledik
function sendAnimate(callback) {
    if (!isSendAnimateOn) {
        console.log("Animasyon tetiklendi");
        isSendAnimateOn = true;
        hyperspace = gsap.timeline();
        hyperspace.to(warpParams, { duration: 4, repeatX: 0.3, ease: 'power1.easeInOut' });
        hyperspace.to(warpParams, { duration: 12, offsetX: 8, ease: 'power2.easeInOut' }, 0);
        hyperspace.to(warpParams, { duration: 6, repeatX: 10, ease: 'power2.easeInOut' }, '-=5');
        hyperspace.eventCallback("onComplete", () => {
            console.log("Animasyon tamamlandı");
            hyperspace.kill();
            warpParams.repeatX = 10;
            warpParams.offsetX = 0;
            isSendAnimateOn = false;
            gsap.to(".space p", { scaleX: 1, duration: 1 });
            gsap.to(".space p", { boxShadow: "0 0 5px 0px #fff", duration: 0.1 });
            if (callback) callback(); // Animasyon tamamlandığında callback çağrılır
        });

        shake = gsap.timeline();
        shake.to(warpParams, {
            duration: 2,
            cameraShake: -0.01,
            ease: RoughEase.ease.config({
                template: 'power0.easeNone',
                strength: 0.5,
                points: 100,
                taper: 'none',
                randomize: true,
                clamp: false
            })
        }, 4);
        shake.to(warpParams, {
            duration: 1,
            cameraShake: 0,
            ease: RoughEase.ease.config({
                template: 'power0.easeNone',
                strength: 0.5,
                points: 100,
                taper: 'none',
                randomize: true,
                clamp: false
            })
        });
        shake.eventCallback("onComplete", () => {
            shake.kill();
            warpParams.cameraShake = 0;
        });
    }
}

export { warpParams, createPotal, updateCurve, updateMaterialOffset, isSendAnimateOn, sendAnimate };
