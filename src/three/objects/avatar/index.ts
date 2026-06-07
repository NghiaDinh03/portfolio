import { resources } from "../../../utils/resources";
import { Mesh, Vector3, Euler, Group, ShaderMaterial, LinearSRGBColorSpace, BoxGeometry, MeshBasicMaterial, Box3 } from "three";
import { scene } from "../../core/scene";
import { animations } from "./animations";
import { sceneWeights, sceneWeightsInOut } from "../../../animations/scenes";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { face } from "./face";
import { leftDesktop as avatarLeftDesktop } from "./left-desktop";
import matcapVertexShader from "../../shaders/avatar-matcap/vertex.glsl";
import matcapFragmentShader from "../../shaders/avatar-matcap/fragment.glsl";
import headVertexShader from "../../shaders/avatar-head/vertex.glsl";
import headFragmentShader from "../../shaders/avatar-head/fragment.glsl";
import gsap from "gsap";
import { aboutProgress } from "../../../animations/transitions/about";
import { raycast } from "../../utils/raycast";
import type { ClickableBox3 } from "../../types";
//import { avatarHologram } from "./hologram";

import type { Material, Bone, Texture } from "three";

export const createGlasses = (customMaterial?: Material) => {
  const glasses = new Group();

  const frameMaterial = customMaterial || new MeshBasicMaterial({ color: 0x050505 });
  const lensMaterial = customMaterial || new MeshBasicMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });

  const barThickness = 0.012;
  const frameWidth = 0.11;
  const frameHeight = 0.085;
  const frameDepth = 0.015;

  const horizontalGeom = new BoxGeometry(frameWidth, barThickness, frameDepth);
  const verticalGeom = new BoxGeometry(barThickness, frameHeight, frameDepth);

  // Left Eye Frame
  const leftTop = new Mesh(horizontalGeom, frameMaterial);
  leftTop.position.set(-0.075, 0.035, 0);
  glasses.add(leftTop);

  const leftBottom = new Mesh(horizontalGeom, frameMaterial);
  leftBottom.position.set(-0.075, -0.035, 0);
  glasses.add(leftBottom);

  const leftOuter = new Mesh(verticalGeom, frameMaterial);
  leftOuter.position.set(-0.13, 0, 0);
  glasses.add(leftOuter);

  const leftInner = new Mesh(verticalGeom, frameMaterial);
  leftInner.position.set(-0.02, 0, 0);
  glasses.add(leftInner);

  // Right Eye Frame
  const rightTop = new Mesh(horizontalGeom, frameMaterial);
  rightTop.position.set(0.075, 0.035, 0);
  glasses.add(rightTop);

  const rightBottom = new Mesh(horizontalGeom, frameMaterial);
  rightBottom.position.set(0.075, -0.035, 0);
  glasses.add(rightBottom);

  const rightOuter = new Mesh(verticalGeom, frameMaterial);
  rightOuter.position.set(0.13, 0, 0);
  glasses.add(rightOuter);

  const rightInner = new Mesh(verticalGeom, frameMaterial);
  rightInner.position.set(0.02, 0, 0);
  glasses.add(rightInner);

  // Lenses
  const lensGeom = new BoxGeometry(frameWidth - barThickness, frameHeight - barThickness, 0.005);
  const leftLens = new Mesh(lensGeom, lensMaterial);
  leftLens.position.set(-0.075, 0, 0.002);
  glasses.add(leftLens);

  const rightLens = new Mesh(lensGeom, lensMaterial);
  rightLens.position.set(0.075, 0, 0.002);
  glasses.add(rightLens);

  // Bridge
  const bridgeGeom = new BoxGeometry(0.04, 0.015, frameDepth);
  const bridge = new Mesh(bridgeGeom, frameMaterial);
  bridge.position.set(0, 0.015, 0);
  glasses.add(bridge);

  // Temples (arms)
  const templeGeom = new BoxGeometry(0.008, 0.012, 0.16);
  const leftTemple = new Mesh(templeGeom, frameMaterial);
  leftTemple.position.set(-0.132, 0.015, -0.08);
  leftTemple.rotation.y = 0.05;
  glasses.add(leftTemple);

  const rightTemple = new Mesh(templeGeom, frameMaterial);
  rightTemple.position.set(0.132, 0.015, -0.08);
  rightTemple.rotation.y = -0.05;
  glasses.add(rightTemple);

  return glasses;
};


let mesh: Mesh | null = null;
let rightHandBone: Bone | null = null;
let box3: ClickableBox3 | null = null;

const tIdleIntensity = { value: 0 };

const handleAvatarClick = () => {
  face.triggerClickExpression();

  if (mesh) {
    if (gsap.isTweening(mesh.position)) return;

    const tl = gsap.timeline();
    tl.to(mesh.position, {
      y: 0.5,
      duration: 0.25,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    tl.to(mesh.scale, {
      x: 0.95,
      y: 1.05,
      z: 0.95,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut"
    }, 0);
  }
};

const waypointsPosition = new Vector3();
const waypointsRotation = new Euler();
const transform = new Group();
const uniforms = { uProgress: { value: 0 }, uAmbientStrength: { value: 0 } };
const contactPosition = new Vector3(0, -13, 0);
const contactRotation = new Euler(0, -Math.PI, 0);

const init = () => {
  setupMesh();
  animations.init();
  face.init();
  avatarLeftDesktop.init();
  gsap.ticker.add(tick);
};

const getMaterial = (name: string): Material | null => {
  if (name === "face") return face.getMaterial();
  if (name === "head") {
    const texture = resources.items["head-texture"];
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    texture.generateMipmaps = false;
    return new ShaderMaterial({
      vertexShader: headVertexShader,
      fragmentShader: headFragmentShader,
      transparent: true,
      uniforms: {
        uHeadTexture: { value: texture },
        ...uniforms,
      },
    });
  }

  const tex = resources.items["matcap-black"];
  tex.colorSpace = LinearSRGBColorSpace;
  tex.generateMipmaps = false;

  return new ShaderMaterial({
    vertexShader: matcapVertexShader,
    fragmentShader: matcapFragmentShader,
    transparent: true,
    uniforms: {
      uMatcap: { value: tex },
      ...uniforms,
    },
  });
};

const assignMatcap = (child: Mesh): boolean => {
  let tex: Texture | null = null;

  if (child.name === "black") {
    tex = resources.items["matcap-black"];
  } else if (child.name === "gray") {
    tex = resources.items["matcap-gray"];
  } else if (child.name === "skin") {
    tex = resources.items["matcap-skin"];
  } else if (child.name === "white") {
    tex = resources.items["matcap-white"];
  }

  if (tex) {
    tex.colorSpace = LinearSRGBColorSpace;
    child.userData.matcap = tex;
    return true;
  }

  return false;
};

const setupMesh = () => {
  if (mesh) return;
  const resource = resources.items["avatar-model"];
  mesh = cloneSkeleton(resource.scene.children[0]) as Mesh;

  mesh.frustumCulled = false;

  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = getMaterial(child.name);
      if (!mat) return;
      child.material = mat;
      child.frustumCulled = false;
      child.renderOrder = child.name === "face" ? 25 : 24;

      const hasMatcap = assignMatcap(child);
      if (hasMatcap) {
        child.onBeforeRender = () => {
          child.material.uniforms.uMatcap.value = child.userData.matcap;
        };
      }
    }
  });

  const brain = mesh.getObjectByName("brain") as Mesh;
  if (brain) {
    mesh.remove(brain);
  }

  mesh.rotation.z = 0;

  transform.add(mesh);

  rightHandBone = mesh.getObjectByName("bone-right-hand") as Bone;

  const headBone = mesh.getObjectByName("headBone") as Bone;
  if (headBone) {
    const glasses = createGlasses();
    glasses.name = "glasses";
    // Quay kính 180 độ và điều chỉnh vị trí Z âm vì nhân vật hướng mặt về phía trước (Z âm cục bộ)
    glasses.rotation.y = Math.PI;
    glasses.position.set(0, 0.075, -0.13);
    headBone.add(glasses);
  }

  // Khởi tạo Box3 raycasting cho việc click tương tác nhân vật
  box3 = new Box3().setFromObject(mesh);
  box3.onClick = handleAvatarClick;
  box3.hoverSound = "hover";
  raycast.boxesToCheck.push(box3);

  scene.instance.add(transform);
};

const tick = () => {
  animations.update();

  const isContact = sceneWeights.contact > 0.001;

  if (isContact) {
    transform.position.copy(contactPosition);
    transform.rotation.copy(contactRotation);
    uniforms.uProgress.value = 0;
    uniforms.uAmbientStrength.value = 0;
    transform.visible = true;
    return;
  }

  transform.position.copy(waypointsPosition);
  transform.rotation.copy(waypointsRotation);

  //uniforms.uProgress.value = sceneWeightsInOut.about.in * 1.1 - 0.1;
  uniforms.uProgress.value = aboutProgress.value * 1.1 - 0.1;
  uniforms.uAmbientStrength.value = sceneWeightsInOut.about.in;

  if (!mesh) return;
  if (uniforms.uProgress.value > 0.999 && sceneWeights.contact > 0.99) {
    mesh.visible = false;
  } else {
    mesh.visible = true;
  }

  // Cập nhật động giới hạn Box3 của nhân vật khi chuyển động
  if (box3 && mesh) {
    box3.setFromObject(mesh);
    box3.expandByScalar(0.05);
  }
};

const destroy = () => {
  // Gỡ đăng ký click tương tác nhân vật khi hủy đối tượng
  if (box3) {
    raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
    box3 = null;
  }
  face.destroy();
  gsap.ticker.remove(tick);
};

export const avatar = {
  init,
  destroy,
  getMesh: () => mesh,
  getRightHandBone: () => rightHandBone,
  tIdleIntensity,
  waypointsPosition,
  waypointsRotation,
  uniforms,
  transform,
};
